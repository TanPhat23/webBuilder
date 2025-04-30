"use server";
interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files?: Record<string, string>;
  category?: string;
  kind?: string;
}

export async function getFontFamily() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`
    );
    const data = await response.json();
    return data.items.map((font: GoogleFont) => font.family).slice(0, 500, 2);
  } catch (error) {
    console.error("Error fetching fonts:", error);
    return [];
  }
}
