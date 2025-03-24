import React from "react";

export interface Element {
  type: string;
  id: string;
  content: string;
  isSelected: boolean;
  name?: string;
  styles?: React.CSSProperties;
  tailwindStyle?: string;
  x: number;
  y: number;
  src?: string;
  href?: string;
  parentId?: string;
  projectId?: string;
}

export interface FrameElement extends Element {
  elements: EditorElement[];
}
export interface ButtonElement extends Element {}

export type EditorElement = Element | FrameElement | ButtonElement;

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

export type ElementTypes = "Text" | "Link" | "Button" | "Frame" | "List";

export interface appProjectTypes {
  id?: string;
  name: string;
  description?: string;
}
