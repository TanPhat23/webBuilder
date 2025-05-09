import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { EditorElement } from "@/lib/type";

export const maxDuration = 30;

const requestSchema = z.object({
  projectId: z.string(),
  format: z.enum(["html", "react", "vue", "angular", "code"]).default("react"),
  includeStyles: z.boolean().default(true),
  includeInteractivity: z.boolean().default(false),
  customPrompt: z.string().optional(),
  elements: z.any(),
});

function buildPrompt(options: {
  format: string;
  includeStyles: boolean;
  includeInteractivity: boolean;
  customPrompt?: string;
  elements: EditorElement[];
}): string {
  const {
    format,
    includeStyles,
    includeInteractivity,
    customPrompt,
    elements,
  } = options;

  const prompt = `
  ${customPrompt ? `${customPrompt}\n\n` : ""}
  Generate ${format} code from the following structured elements.
  ${includeStyles ? "Include styling." : "Don't include styling."}
  ${
    includeInteractivity
      ? "Include interactivity."
      : "Don't include interactivity."
  }
  ${JSON.stringify(elements, null, 2)}
  
  First, generate the ${format} code.
  Then, convert any styles to Tailwind classes using arbitrary values.
  for example, "width: 100px" becomes "w-[100px]", "font: 14px" becomes "text-[14px]".
  IF Element is a Carousel MUST generate  the code in this format example:
    <div className="carousel-container w-full h-full px-10">
      <Slider {...carouselSettings}>
        <div className="h-[300px] flex justify-center items-center">
          <img
            src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HCsVvJMP3n5oua8HZp7xcC12WYGi4vtArlfkbO"
            alt="Image 1"
            className="h-[300px] object-cover mx-auto"
          />
        </div>
        <div className="h-[300px] flex justify-center items-center">
          <img
            src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HCBDWIViKtNfzEYKZQD5ijMhTn109kb63USpCR"
            alt="Image 2"
            className="h-[300px] object-cover mx-auto"
          />
        </div>
        <div className="h-[300px] flex justify-center items-center">
          <img
            src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HC92K3xECKVOb9IwgW7hs01CMfqYdFZ8iGue3X"
            alt="Image 3"
            className="h-[300px] object-cover mx-auto"
          />
        </div>
      </Slider>
    </div>
  
  Respond with ONLY the final generated code with Tailwind classes.
  `;
  return prompt;
}

export async function POST(req: Request) {
  const user = await auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const result = requestSchema.safeParse(body);
  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const {
    format,
    includeStyles,
    includeInteractivity,
    customPrompt,
    elements,
  } = result.data;

  if (!elements || elements.length === 0) {
    return new Response("No elements found", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const model = google("gemini-2.0-flash-001");
  const prompt = buildPrompt({
    format,
    includeStyles,
    includeInteractivity,
    customPrompt,
    elements,
  });

  const response = await streamText({
    model,
    system: "You are a helpful assistant that generates code ",
    prompt,
    temperature: 0.3,
    maxRetries: 3,
  });

  return response.toDataStreamResponse();
}
