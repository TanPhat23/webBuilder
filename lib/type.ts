import React from "react";

export interface Element {
  type: string;
  id: string;
  content: string;
  isSelected: boolean;
  styles?: React.CSSProperties;
  x: number;
  y: number;
  parentElements?: string[];
  src?: string;
  href?: string;
}

export interface FrameElement extends Element {
  elements: EditorElement[];
}
export interface ButtonElement extends Element {
  type: "Button";
  events?: {
    onClick?: () => void;
    onHover?: () => void;
    onFocus?: () => void;
  };
}

export interface ListItem {
  id: string;
  content: string;
  isSelected: boolean;
  styles?: React.CSSProperties;
}
export interface ListElement extends Element {
  type: "List";
  items: ListItem[];
}

export type EditorElement =
  | Element
  | FrameElement
  | ButtonElement
  | ListElement;

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
  | {
      type: "UPDATE_LIST_ITEM";
      payload: { listId: string; itemId: string; updates: Partial<ListItem> };
    }
  | {
      type: "UPDATE_FRAME_ELEMENT";
      payload: {
        parentElement: EditorElement;
        childUpdates: string;
        updates: Partial<EditorElement>;
      };
    }
  | { type: "UNDO"; payload: EditorElement[] }
  | { type: "REDO"; payload: EditorElement[] };

export type TextAlign = "left" | "center" | "right" | "justify";
