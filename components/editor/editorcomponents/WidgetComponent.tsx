import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EditorComponentProps } from "@/lib/interface";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import FrameComponents from "./FrameComponents";

const WidgetComponent: React.FC<EditorComponentProps> = ({
  element,
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const {
    handleDoubleClick,
    handleContextMenu,
  } = useEditorElementHandlers({
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatShortDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date).toUpperCase();
    return `${date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}, ${month} ${day}`;
  };

  const updateWidgetTimeElements = (frameElements: any[]) => {
    return frameElements.map(el => {
      if (el.type === "Text") {
        if (el.content === "10:25:13") {
          return { ...el, content: formatTime(currentTime) };
        } 
        else if (el.content === "Monday, January 10") {
          return { ...el, content: formatDate(currentTime) };
        }
        else if (el.content === "10:25") {
          return { ...el, content: `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}` };
        }
        else if (el.content === "13") {
          return { ...el, content: currentTime.getSeconds().toString().padStart(2, '0') };
        }
        else if (el.content === "MON, JAN 10") {
          return { ...el, content: formatShortDate(currentTime) };
        }
      }
      
      // For hands of analog clock
      if (el.type === "Frame" && el.name) {
        if (el.name === "HourHand") {
          const hourDegrees = (currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5;
          return {
            ...el,
            styles: {
              ...el.styles,
              transform: `rotate(${hourDegrees}deg)`,
            }
          };
        } else if (el.name === "MinuteHand") {
          const minuteDegrees = currentTime.getMinutes() * 6;
          return {
            ...el,
            styles: {
              ...el.styles,
              transform: `rotate(${minuteDegrees}deg)`,
            }
          };
        } else if (el.name === "SecondHand") {
          const secondDegrees = currentTime.getSeconds() * 6;
          return {
            ...el,
            styles: {
              ...el.styles,
              transform: `rotate(${secondDegrees}deg)`,
            }
          };
        }
      }
      
      // Recursively update nested elements
      if (el.elements && Array.isArray(el.elements)) {
        return {
          ...el,
          elements: updateWidgetTimeElements(el.elements)
        };
      }
      
      return el;
    });
  };

  // Clone the element with updated time values
  const widgetWithTime = {
    ...element,
    elements: element.elements ? updateWidgetTimeElements(element.elements) : [],
  };

  return (
    <motion.div
      id={element.id}
      style={{ ...element.styles }}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
    >
      <FrameComponents
        element={widgetWithTime}
        projectId={projectId}
        setContextMenuPosition={setContextMenuPosition}
        setShowContextMenu={setShowContextMenu}
      />
    </motion.div>
  );
};

export default WidgetComponent;
