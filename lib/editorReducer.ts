import { EditorAction, Element } from "./type";

export const elementsReducer = (
  state: Element[],
  action: EditorAction
): Element[] => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return [...state, action.payload];

    case "UPDATE_ELEMENT":
      return state.map((element) =>
        element.id === action.payload.id
          ? { ...element, ...action.payload.updates }
          : element
      );

    case "DELETE_ELEMENT":
      return state.filter((element) => element.id !== action.payload);

    case "SAVE_ELEMENTS_TO_LOCAL_STORAGE":
      localStorage.setItem("elements", JSON.stringify(state));
      return state;

    case "LOAD_ELEMENTS_FROM_LOCAL_STORAGE":
      return action.payload;

    case "UPDATE_ALL_ELEMENTS":
      return state.map((element) => ({ ...element, ...action.payload }));
    
    case "UNDO":
      return state.slice(0, -1);

    case "REDO":
      return state.concat(action.payload);
    default:
      return state;
  }
};
