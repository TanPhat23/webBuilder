import { buttonOnHoverEvent } from "@/lib/eventtypes";

export const OnHover = () => {
  const hoverData: buttonOnHoverEvent = JSON.parse(
    localStorage.getItem("onHoverEvent") as string
  );
  const element = document.getElementById(hoverData.selectedElementId);
  if (element) {
    element.addEventListener("mouseover", () => {
      element.style.backgroundColor = hoverData.backColor;
      element.style.color = hoverData.textColor;
    });
    element.addEventListener("mouseout", () => {
      element.style.backgroundColor = "";
      element.style.color = "";
    });
  }
}
