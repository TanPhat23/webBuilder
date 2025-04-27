import { auth } from "@clerk/nextjs/server";
import { streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { GetAll } from "@/app/data/element/elementDAL";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const user = await auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  // Validate the request body with zod
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

  const {
    projectId,
    format,
    includeStyles,
    includeInteractivity,
    customPrompt,
  } = result.data;

  const userElements = await GetAll(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${projectId}`
  );

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
  - Other properties specific to element types (src for images, href for links, etc.)
  - Convert styles to Tailwind CSS classes if possible.
  - Remove any styles that is the same as the tailwindStyles.
  Here are the elements to convert to code:
  ${JSON.stringify(userElements, null, 2)}
  
  Respond with ONLY the generated code with no explanations or additional text. Return valid, complete ${format} code that can be directly used.`;

  const aiResponse = streamText({
    model: google("gemini-2.0-flash-001"),
    prompt,
    tools: {
      getCode: tool({
        description: "Get code from the AI",
        parameters: z.object({
          code: z.string(),
        }),
        execute: async ({ code }) => {
          return code;
        }
      }),
    },
  });

  return aiResponse.toDataStreamResponse();
}
