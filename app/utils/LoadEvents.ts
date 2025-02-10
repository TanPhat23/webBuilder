import { onClick } from "./eventsloader/OnClick";
import { OnHover } from "./eventsloader/OnHover";

export const loadEventFromLocalStorage = () => {
  try {
    onClick();

    OnHover();
  } catch (e) {
    console.error("Error loading event from local storage:", e);
  }
};
