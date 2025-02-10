import { ButtonElement, Element } from "@/lib/type";

export const createElements = (
  name: string,
  dispatch: Function,
  x: number,
  y: number
) => {
  if (name !== "Button") {
    const element: Element = {
      type: name,
      id: name + "-" + Date.now(),
      content: name,
      isSelected: false,
      x: x,
      y: y,
      styles: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        width: "100px",
        textAlign: "center",
      },
    };
    dispatch({
      type: "ADD_ELEMENT",
      payload: element,
    });
  } else {
    const buttonElement: ButtonElement = {
      type: "Button",
      id: "Button-" + Date.now(),
      content: "Button",
      isSelected: false,
      x: x,
      y: y,
      styles: {
        height: "50px",
        width: "100px",
        textAlign: "center",
      },
    };
    dispatch({
      type: "ADD_ELEMENT",
      payload: buttonElement,
    });
  }
};
