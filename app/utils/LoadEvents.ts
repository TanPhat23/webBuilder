import { buttonOnClickEvent } from "@/lib/eventconstants";

export const loadEventFromLocalStorage = () => {
  try {
    const storedEventData = localStorage.getItem("onClickEvent");
    console.log(storedEventData);

    if (storedEventData) {
      const eventData : buttonOnClickEvent = JSON.parse(storedEventData);

      const buttonElement = document.getElementById(eventData.selectedElementId);
      const element = document.getElementById(eventData.selectedComboboxElementId);

      if (element && buttonElement) {
        buttonElement.addEventListener("click", () => {
          const currentValue = parseInt(element.innerText) || 0;
          element.innerText = `${currentValue + eventData.number}`;
        });

      } else {
        console.error("Element not found:", eventData.selectedElementId);
      }
    }
  } catch (e) {
    console.error("Error loading event from local storage:", e);
  }
};
