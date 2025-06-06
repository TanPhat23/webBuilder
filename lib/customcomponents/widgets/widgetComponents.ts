import { CustomComponent } from "../styleconstants";
import { v4 as uuidv4 } from "uuid";

export const clockWidgetComponent: CustomComponent = {
  component: {
    type: "Frame",
    name: "WidgetClock", 
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      width: "280px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    },
    tailwindStyles: "w-72 bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow",
    elements: [
      {
        type: "Text",
        content: "Current Time",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#6b7280",
          textAlign: "center",
        },
        tailwindStyles: "text-base font-semibold text-gray-500 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Frame",
        name: "ClockFace",
        id: uuidv4(),
        content: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "4px solid #3b82f6",
          backgroundColor: "#f3f4f6",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        tailwindStyles: "w-48 h-48 rounded-full border-4 border-blue-500 bg-gray-100 relative flex justify-center items-center",
        elements: [
          {
            type: "Frame",
            name: "ClockCenter",
            id: uuidv4(),
            content: "",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              position: "absolute",
              zIndex: "10",
            },
            tailwindStyles: "w-3 h-3 rounded-full bg-blue-500 absolute z-10",
            elements: [],
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          // Hour Hand
          {
            type: "Frame",
            name: "HourHand",
            id: uuidv4(),
            content: "",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              width: "6px",
              height: "60px",
              backgroundColor: "#1f2937",
              borderRadius: "3px",
              transform: "rotate(45deg)",
              transformOrigin: "bottom center",
              bottom: "50%",
              zIndex: "5",
            },
            tailwindStyles: "absolute w-1.5 h-[60px] bg-gray-800 rounded-full transform rotate-45 origin-bottom bottom-1/2 z-5",
            elements: [],
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          // Minute Hand
          {
            type: "Frame",
            name: "MinuteHand",
            id: uuidv4(),
            content: "",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              width: "4px",
              height: "80px",
              backgroundColor: "#4b5563",
              borderRadius: "2px",
              transform: "rotate(90deg)",
              transformOrigin: "bottom center",
              bottom: "50%",
              zIndex: "6",
            },
            tailwindStyles: "absolute w-1 h-[80px] bg-gray-600 rounded-full transform rotate-90 origin-bottom bottom-1/2 z-6",
            elements: [],
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          // Second Hand
          {
            type: "Frame",
            name: "SecondHand",
            id: uuidv4(),
            content: "",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              width: "2px",
              height: "90px",
              backgroundColor: "#ef4444",
              borderRadius: "1px",
              transform: "rotate(180deg)",
              transformOrigin: "bottom center",
              bottom: "50%",
              zIndex: "7",
            },
            tailwindStyles: "absolute w-0.5 h-[90px] bg-red-500 rounded-full transform rotate-180 origin-bottom bottom-1/2 z-7",
            elements: [],
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          // Clock Numbers
          {
            type: "Text",
            content: "12",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              top: "8%",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
            },
            tailwindStyles: "absolute top-[8%] text-base font-bold text-gray-900",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text",
            content: "3",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              right: "8%",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
            },
            tailwindStyles: "absolute right-[8%] text-base font-bold text-gray-900",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text",
            content: "6",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              bottom: "8%",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
            },
            tailwindStyles: "absolute bottom-[8%] text-base font-bold text-gray-900",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text",
            content: "9",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              position: "absolute",
              left: "8%",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#111827",
            },
            tailwindStyles: "absolute left-[8%] text-base font-bold text-gray-900",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
        ],
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text",
        content: "10:25:13",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "24px",
          fontWeight: "700",
          color: "#111827",
          marginTop: "12px",
          fontFamily: "monospace",
        },
        tailwindStyles: "text-2xl font-bold text-gray-900 mt-3 font-mono",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text",
        content: "Monday, January 10",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#6b7280",
        },
        tailwindStyles: "text-sm text-gray-500",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
    ],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  },
};

export const digitalClockWidgetComponent: CustomComponent = {
  component: {
    type: "Frame",
    name: "WidgetDigitalClock", 
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      width: "280px",
      backgroundColor: "#1f2937",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
    },
    tailwindStyles: "w-72 bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-shadow",
    elements: [
      {
        type: "Text",
        content: "DIGITAL CLOCK",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          fontWeight: "600",
          color: "#9ca3af",
          letterSpacing: "0.1em",
        },
        tailwindStyles: "text-sm font-semibold text-gray-400 tracking-wider",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text",
        content: "10:25",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "48px",
          fontWeight: "700",
          color: "#ffffff",
          fontFamily: "monospace",
        },
        tailwindStyles: "text-5xl font-bold text-white font-mono",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text",
        content: "13",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "24px",
          fontWeight: "700",
          color: "#60a5fa",
          fontFamily: "monospace",
          marginTop: "-16px",
        },
        tailwindStyles: "text-2xl font-bold text-blue-400 font-mono -mt-4",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Frame",
        name: "DateAndLocation",
        id: uuidv4(),
        content: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
        },
        tailwindStyles: "w-full flex justify-between items-center mt-2",
        elements: [
          {
            type: "Text",
            content: "MON, JAN 10",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontSize: "14px",
              color: "#9ca3af",
              fontWeight: "500",
            },
            tailwindStyles: "text-sm text-gray-400 font-medium",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text",
            content: "NEW YORK",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontSize: "14px",
              color: "#9ca3af",
              fontWeight: "500",
            },
            tailwindStyles: "text-sm text-gray-400 font-medium",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
        ],
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
    ],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  },
};
