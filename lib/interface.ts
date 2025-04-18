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
  handleCopy: (
    e: React.ClipboardEvent<HTMLElement>,
    element: EditorElement
  ) => void;
  handlePaste: (
    e: React.ClipboardEvent<HTMLElement>,
    element: EditorElement
  ) => void;
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
export interface InputElement extends Element {
  inputSettings: Partial<HTMLInputElement>;
}
export interface ListElement extends Element {
  elements: EditorElement[];
}
export interface SelectElement extends Element {
  options: Array<Partial<HTMLOptionElement>>;
  selectSettings?: Partial<HTMLSelectElement>;
}

export interface ChartElement extends Element {
  type: "Chart";
  chartType: "bar" | "line" | "pie" | "doughnut" | "radar" | "polarArea";
  chartData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      fill?: boolean;
    }>;
  };
  chartOptions?: Record<string, any>;
}

export interface DataTableElement extends Element {
  type: "DataTable";
  headers: string[];
  rows: Array<Array<string | number>>;
  tableSettings?: {
    sortable?: boolean;
    searchable?: boolean;
    pagination?: boolean;
    rowsPerPage?: number;
    striped?: boolean;
    bordered?: boolean;
    hoverEffect?: boolean;
  };
}
