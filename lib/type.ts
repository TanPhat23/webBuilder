export interface Element {
  type: string;
  id: string;
  content: string;
  isSelected: boolean;
  styles?: React.CSSProperties;
  x: number;
  y: number;
}

export interface ButtonElement extends Element {
  type: "Button";
  events?: {
    onClick?: () => void;
    onHover?: () => void;
    onFocus?: () => void;
  };
}

export type EditorElement = ButtonElement | Element;

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
  | { type: "UNDO"; payload: EditorElement[] }
  | { type: "REDO"; payload: EditorElement[] };

export type TextAlign = "left" | "center" | "right" | "justify";
