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

export interface CanvasStyles extends React.CSSProperties {
  backgroundColor?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  gridEnabled?: boolean;
  gridSize?: number;
  snapToGrid?: boolean;
  gridColor?: string;
  overflow?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  backdropFilter?: string;
  transition?: string;
}
export interface appProject {
  id?: string;
  name: string;
  description?: string;
  subdomain?: string;
  published?: boolean;
  styles: CanvasStyles;
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
  carouselSettings: SlickSettings;
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
  chartOptions?: Record<string, <T>(data: T) => T>;
}

export interface YouTubeEmbedElement extends Element {
  type: "YouTubeEmbed";
  videoId: string;
  showControls?: boolean;
  autoplay?: boolean;
  allowFullscreen?: boolean;
  attributes?: {
    allow?: string;
    title?: string;
    [key: string]: string | undefined;
  };
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

export interface FormElement extends Element {
  elements: EditorElement[];
  formSettings?: Partial<HTMLFormElement>;
}
