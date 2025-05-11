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
  "Nunito",
  "Merriweather",
  "Ubuntu",
  "Rubik",
  "Work Sans",
  "Quicksand",
  "DM Sans",
  "PT Sans",
  "Fira Sans",
  "Mulish",
];

export const loadFont = (fontName: string) => {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontName
  )}&display=swap`;
  console.log(`Loading font: ${fontName}`);
  
  const existingLinks = document.querySelectorAll(`link[href="${fontUrl}"]`);

  if (existingLinks.length === 0) {
    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};

export const loadFonts = (fontNames: string[]) => {
  fontNames.forEach((font) => loadFont(font));
};

export const loadAllPopularFonts = () => {
  loadFonts(popularFonts);
};

export const createFontStyle = (fontName: string) => {
  return { fontFamily: `'${fontName}', sans-serif` };
};

export const applyFontToWebsite = (fontName: string) => {
  if (!fontName) return;
  
  loadFont(fontName);
  document.documentElement.style.fontFamily = `'${fontName}', sans-serif`;
  localStorage.setItem('website-font', fontName);
};

export const getCurrentWebsiteFont = (): string => {
  if (typeof window === 'undefined') return 'Roboto';
  return localStorage.getItem('website-font') || 'Roboto';
};

export const initializeFontLoading = () => {
  if (typeof window === 'undefined') return;
  
  const savedFont = getCurrentWebsiteFont();
  applyFontToWebsite(savedFont);
};
