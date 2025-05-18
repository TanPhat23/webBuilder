import {
  ButtonElement,
  CarouselElement,
  ChartElement,
  DataTableElement,
  Element,
  FrameElement,
  InputElement,
  ListElement,
  SelectElement,
  FormElement,
  YouTubeEmbedElement, 
} from "./interface";

export type CarouselElementChild = Element | ButtonElement | FrameElement;

export type EditorElement =
  | Element
  | FrameElement
  | ButtonElement
  | CarouselElement
  | ListElement
  | InputElement
  | SelectElement
  | ChartElement
  | DataTableElement
  | FormElement 
  | YouTubeEmbedElement; 

export interface ElementAnimationState {
  isEntering?: boolean;
  isExiting?: boolean;
  isDragging?: boolean;
}

export type AnimatedEditorElement = EditorElement & ElementAnimationState;

/** this is DEPRECIATED use The
 * @file editorStore.tsx to mange your state
 * @deprecated
 * */
export type EditorAction =
  | { type: "ADD_ELEMENT"; payload: EditorElement }
  | {
      type: "UPDATE_ELEMENT";
      payload: { id: string; updates: Partial<EditorElement> };
    }
  | { type: "DELETE_ELEMENT"; payload: string }
  | { type: "SAVE_ELEMENTS_TO_LOCAL_STORAGE"; payload: EditorElement[] }
  | { type: "LOAD_ELEMENTS_FROM_LOCAL_STORAGE"; payload: EditorElement[] }
  | { type: "UPDATE_ALL_ELEMENTS"; payload: Partial<EditorElement> }
  | { type: "UPDATE_ALL_SELECTED_ELEMENTS"; payload: Partial<EditorElement> }
  | { type: "UNDO"; payload: EditorElement[] }
  | { type: "REDO"; payload: EditorElement[] }
  | { type: "LOAD_ELEMENTS_FROM_DB"; payload: EditorElement[] };

export type TextAlign = "left" | "center" | "right" | "justify";

export type ElementTypes =
  | "Text"
  | "Link"
  | "Button"
  | "Frame"
  | "List"
  | "Carousel"
  | "ListItem"
  | "Input"
  | "Select"
  | "Chart"
  | "DataTable"
  | "Image"
  | "Form" 
  | "YouTubeEmbed"; 

export type ContainerElement =
  | FrameElement
  | CarouselElement
  | ListElement
  | SelectElement
  | FormElement;
