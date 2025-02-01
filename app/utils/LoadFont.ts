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
