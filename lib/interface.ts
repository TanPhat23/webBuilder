import { Settings as SlickSettings } from "react-slick";
import { CarouselElementChild, EditorElement } from "./type";

export interface EditorComponentProps {
  element: EditorElement;
  setContextMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}

export interface commonProps {
  onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  onBlur: (e: React.FormEvent<HTMLElement>) => void;
  contentEditable: boolean;
  suppressContentEditableWarning: boolean;
  className: string;
  dragConstraints: React.RefObject<HTMLDivElement | null>;
  drag: boolean;
  dragMomentum: boolean;
  dragSnapToOrigin: boolean;
  dragElastic: number;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  style: React.CSSProperties;
}
export interface Element {
  type: string;
  id: string;
  content: string;
  isSelected: boolean;
  name?: string;
  styles?: React.CSSProperties;
  tailwindStyles?: string;
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
export interface CarouselElement extends Element {
  settings: SlickSettings;
  elements: CarouselElementChild[];
}
export interface ButtonElement extends Element {
  buttonType: string;
  element?: FrameElement;
}

export interface ListElement extends Element {
  elements: EditorElement[];
}
