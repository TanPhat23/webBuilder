export interface Element {
  type: string;
  id: string;
  content: string;
  isSelected: boolean;
  styles?: React.CSSProperties;
  x: number;
  y: number;
}

export type EditorAction =
  | { type: "ADD_ELEMENT"; payload: Element }
  | {
      type: "UPDATE_ELEMENT";
      payload: { id: string; updates: Partial<Element> };
    }
  | { type: "DELETE_ELEMENT"; payload: string }
  | { type: "SAVE_ELEMENTS_TO_LOCAL_STORAGE"; payload: Element[] }
  | { type: "LOAD_ELEMENTS_FROM_LOCAL_STORAGE"; payload: Element[] }
  | { type: "UPDATE_ALL_ELEMENTS"; payload: Partial<Element> }
  | { type: "UNDO"; payload: Element[] }
  | { type: "REDO"; payload: Element[] };

export type TextAlign = "left" | "center" | "right" | "justify";
