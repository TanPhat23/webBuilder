"use client"
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");

  const handleInput = (event: any) => {
    setContent(event.target.innerText);
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={handleInput}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
