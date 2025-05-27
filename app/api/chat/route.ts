import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { EditorElement } from "@/lib/type";
import { NextResponse } from "next/server";

export const maxDuration = 30;

const requestSchema = z.object({
  projectId: z.string(),
  format: z.enum(["html", "react", "vue", "angular", "code"]).default("react"),
  includeStyles: z.boolean().default(true),
  includeInteractivity: z.boolean().default(false),
  customPrompt: z.string().optional(),
  elements: z.array(z.any()).min(1, "At least one element is required"),
});

function buildSystemPrompt(format: string): string {
  const formatInstructions = {
    react:
      "Generate modern React/JSX components using functional components with hooks",
    html: "Generate semantic HTML5 with proper structure and accessibility",
    vue: "Generate Vue 3 components using Composition API with script setup syntax",
    angular:
      "Generate Angular components with TypeScript and proper lifecycle hooks",
    code: "Generate clean, production-ready code with best practices",
  };

  return `You are an expert frontend developer and code generator. Your role is to convert visual design elements into high-quality, production-ready code.

## Core Responsibilities:
- Generate clean, maintainable, and accessible code
- Follow modern best practices and conventions
- Ensure responsive design and cross-browser compatibility
- Optimize for performance and SEO when applicable

## Code Style Guidelines:
- Use semantic HTML elements for better accessibility
- Implement proper ARIA attributes when needed
- Follow naming conventions for the specified framework
- Include proper error handling where applicable
- Write clean, readable code with appropriate comments

## Framework-Specific Instructions:
${
  formatInstructions[format as keyof typeof formatInstructions] ||
  formatInstructions.code
}

## Styling Guidelines:
- Convert all styling to Tailwind CSS classes with arbitrary values
- Use responsive design patterns (mobile-first approach)
- Implement proper spacing, typography, and color schemes
- Examples: "width: 100px" → "w-[100px]", "font-size: 14px" → "text-[14px]"

## Output Format:
- Provide only the final generated code
- Include necessary imports and dependencies
- Structure code in logical, reusable components
- Add brief comments for complex logic only`;
}

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

  const styleInstructions = includeStyles
    ? "Include comprehensive styling using Tailwind CSS classes. Convert all inline styles and CSS properties to Tailwind equivalents with arbitrary values where needed."
    : "Generate structural code only without styling classes.";

  const interactivityInstructions = includeInteractivity
    ? "Include interactive functionality, event handlers, state management, and user interactions."
    : "Focus on static presentation without interactive features.";

  const carouselInstructions = elements.some(
    (el) => el.type?.includes("carousel") || el.type?.includes("slider")
  )
    ? `
## Special Carousel/Slider Instructions:
When generating carousel components, use this structure:

\`\`\`jsx
import { useState, useEffect } from 'react';

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  return (
    <div className="carousel-container w-full h-full relative overflow-hidden">
      <div className="carousel-track flex transition-transform duration-300 ease-in-out">
        {/* Slide items */}
        <div className="carousel-slide w-full flex-shrink-0 h-[300px] flex justify-center items-center">
          <img
            src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HCsVvJMP3n5oua8HZp7xcC12WYGi4vtArlfkbO"
            alt="Slide 1"
            className="h-full object-cover mx-auto"
          />
        </div>
        {/* Additional slides... */}
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        &#8249;
      </button>
      <button 
        onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
      >
        &#8250;
      </button>
    </div>
  );
};
\`\`\`
`
    : "";

  return `${
    customPrompt ? `${customPrompt}\n\n` : ""
  }Generate ${format} code from the following design elements:

## Requirements:
- Target format: ${format.toUpperCase()}
- ${styleInstructions}
- ${interactivityInstructions}

## Design Elements:
${JSON.stringify(elements, null, 2)}

${carouselInstructions}

## Additional Guidelines:
- Ensure semantic HTML structure for accessibility
- Use modern ${format} patterns and best practices
- Optimize for performance and maintainability
- Include proper TypeScript types if applicable
- Make the design responsive and mobile-friendly

Generate clean, production-ready code that accurately represents the provided design elements.`;
}
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request format",
          details: result.error.issues,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const {
      format,
      includeStyles,
      includeInteractivity,
      customPrompt,
      elements,
    } = result.data;

    // Enhanced validation
    if (!elements || elements.length === 0) {
      return new Response(
        JSON.stringify({
          error:
            "No elements found. Please add elements to your project before generating code.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Rate limiting check (basic implementation)
    const requestCount = parseInt(req.headers.get("x-request-count") || "0");
    if (requestCount > 100) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const model = google("gemini-2.0-flash");
    const systemPrompt = buildSystemPrompt(format);
    const userPrompt = buildPrompt({
      format,
      includeStyles,
      includeInteractivity,
      customPrompt,
      elements,
    });

    const response = await streamText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.2, // Lower temperature for more consistent code generation
      maxRetries: 3,
      maxTokens: 8000, // Increased for complex components
    });

    return response.toDataStreamResponse({
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    // Enhanced error handling
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return new Response(
          JSON.stringify({
            error:
              "API rate limit exceeded. Please try again in a few minutes.",
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (error.message.includes("timeout")) {
        return new Response(
          JSON.stringify({
            error:
              "Request timeout. The AI service is temporarily unavailable.",
          }),
          {
            status: 504,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({
        error: "Internal server error. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
