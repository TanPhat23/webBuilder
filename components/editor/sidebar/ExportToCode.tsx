// import React from "react";
// import { Button } from "@/components/ui/button";
// import { buttonOnClickEvent } from "@/lib/eventtypes";

// const generateHTML = (elements: Element[]) => {
//   return elements
//     .map((element) => {
//       const { id, type, content, styles, x, y, src, href } = element;
//       if (!styles) return;

//       const positionStyle = {
//         position: "absolute",
//         left: `${x}px`,
//         top: `${y}px`,
//         ...styles,
//       };

//       const styleString = Object.entries(positionStyle)
//         .map(([key, value]) => `${key}: ${value};`)
//         .join(" ");

//       switch (type) {
//         case "Img":
//           return /*html*/ `<img id="${id}" src="${src}" style="${styleString}" alt="${content}" />`;
//         case "A":
//           return /*html*/ `<a id="${id}" href="${href}" style="${styleString}">${content}</a>`;
//         case "Text":
//           return /*html*/ `<p id="${id}" style="${styleString}">${content}</p>`;
//         default:
//           return /*html*/ `<${type.toLowerCase()} id="${id}" style="${styleString}">${content}</${type.toLowerCase()}>`;
//       }
//     })
//     .join("\n");
// };

// const generateCSS = (elements: Element[]) => {
//   return elements
//     .map((element) => {
//       const { id, styles } = element;
//       if (!styles) return;

//       const { position, left, top, ...restStyles } = styles;
//       const styleString = Object.entries(restStyles)
//         .map(([key, value]) => `${key}: ${value};`)
//         .join(" ");

//       return `#${id} { ${styleString} }`;
//     })
//     .join("\n");
// };

// const generateJS = () => {
//   try {
//     const clickData: buttonOnClickEvent = JSON.parse(
//       localStorage.getItem("onClick") || "{}"
//     );
//     const elementId = clickData.selectedElementId;
//     const onClickFunction = clickData.number;

//     if (!elementId || !onClickFunction) return "";

//     return `
//       document.getElementById("${elementId}").addEventListener("click", () => {
//         ${onClickFunction};
//       });
//     `;
//   } catch (error) {
//     console.error("Error generating JS:", error);
//     return "";
//   }
// };

// const exportToCode = (elements: Element[]) => {
//   const html = generateHTML(elements);
//   const css = generateCSS(elements);
//   const js = generateJS();

//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Exported Code</title>
//       <style>
//         ${css}
//       </style>
//     </head>
//     <body>
//       ${html}
//       <script>
//         ${js}
//       </script>
//     </body>
//     </html>
//   `;
// };

// const downloadCode = (code: string, filename: string) => {
//   const blob = new Blob([code], { type: "text/html" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// };

// const ExportButton = ({ elements }: { elements: Element[] }) => {
//   const handleExport = () => {
//     const code = exportToCode(elements);
//     downloadCode(code, "exported-code.html");
//   };

//   return <Button onClick={handleExport}>Export to Code</Button>;
// };

// export default ExportButton;
