export const popularFonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Inter",
  "Oswald",
  "Source Sans Pro",
  "Playfair Display",
];

export const loadFont = (fontName: string) => {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontName
  )}&display=swap`;
  
  const existingLinks = document.querySelectorAll(`link[href="${fontUrl}"]`);

  if (existingLinks.length === 0) {
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};

// Load multiple fonts at once
export const loadFonts = (fontNames: string[]) => {
  fontNames.forEach((font) => loadFont(font));
};

// Load all popular fonts at once
export const loadAllPopularFonts = () => {
  loadFonts(popularFonts);
};

// Create a style object for a specific font
export const createFontStyle = (fontName: string) => {
  return { fontFamily: `'${fontName}', sans-serif` };
};
