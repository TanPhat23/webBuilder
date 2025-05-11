"use client";

import { useEffect } from "react";
import { applyFontToWebsite, getCurrentWebsiteFont } from "../../utils/LoadFont";

export const FontLoader = () => {
  useEffect(() => {
    const savedFont = getCurrentWebsiteFont();
    if (savedFont) {
      applyFontToWebsite(savedFont);
    }
  }, []);

  return null;
};
