import { auth } from "@clerk/nextjs/server";
import { streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const user = await auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  console.log("Received request body:", JSON.stringify(body.elements, null, 2));

  const schema = z.object({
    projectId: z.string(),
    format: z
      .enum(["html", "react", "vue", "angular", "code"])
      .default("react"),
    includeStyles: z.boolean().default(true),
    includeInteractivity: z.boolean().default(false),
    customPrompt: z.string().optional(),
  });

  const result = schema.safeParse(body);
  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { format, includeStyles, includeInteractivity, customPrompt } =
    result.data;

  let promptPrefix = "";
  if (customPrompt) {
    promptPrefix = `${customPrompt}\n\n`;
  }

  const prompt = `${promptPrefix}Generate ${format} code from the following structured elements. ${
    includeStyles ? "Include styling." : "Don't include styling."
  } ${
    includeInteractivity
      ? "Include interactivity and functionality."
      : "Don't include interactivity."
  }
  The elements follow this structure format and may be nested:
  
  Element Structure:
  - type: The type of element (Text, Button, Frame, Carousel, etc.)
  - id: Unique identifier
  - content: Text content
  - styles: CSS styles as React.CSSProperties
  - tailwindStyles: Tailwind CSS classes
  - x/y: Position coordinates
  - elements: Array of child elements (for container elements)
  - Override tailwindStyles with styles (React.CSSProperties) if both are present Using arbitrary values
  - Other properties specific to element types (src for images, href for links, etc.)
  Here are the elements to convert to code:
  ${JSON.stringify(body.elements, null, 2)}
  
  Respond with ONLY the generated code with no explanations or additional text. Return valid, complete ${format} code that can be directly used.`;

  const aiResponse = streamText({
    model: google("gemini-1.5-pro"),
    prompt,
    temperature: 0.2,
    maxRetries: 3,
    tools: {
      getCode: tool({
        description: "Get code from the AI",
        parameters: z.object({
          code: z.string(),
        }),
        execute: async ({ code }) => {
          return code;
        },
      }),
      convertToTailwind: tool({
        description:
          "Convert React CSS properties to Tailwind CSS classes using arbitrary values (ex: text-[14px]) and override existing tailwindStyles",
        parameters: z.object({
          tailwindStyles: z.string(),
        }),
        execute: async ({ tailwindStyles }) => {
          return tailwindStyles;
        },
      }),
    },
  });

  return aiResponse.toDataStreamResponse();
}
