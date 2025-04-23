import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonElement, EditorComponentProps, FormElement } from "@/lib/interface";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { EditorElement } from "@/lib/type";
import FrameComponents from "./FrameComponents";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import ChartComponent from "./ChartComponent";
import DataTableComponent from "./DataTableComponent";
import ListItemComponent from "./ListItemComponent";

const FormComponent = (props: EditorComponentProps) => {
  const { projectId, element, setShowContextMenu, setContextMenuPosition } = props;

  const {
    handleKeyDown,
    handleDrop,
    handleDoubleClick,
    handleContextMenu,
    handleImageDrop,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    getContentProps,
    getCommonProps,
    draggingElement,
  } = useEditorElementHandlers(props);

  const formElement = element as FormElement;
  const formSettings = formElement.formSettings || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (formSettings.action && !element.isSelected) {
      return true;
    } else {
      alert(JSON.stringify(data, null, 2));
      return false;
    }
  };

  const renderElement = (element: EditorElement): React.ReactNode => {
    const commonProps = getCommonProps(
      element,
    );
    const contentProps = getContentProps(element);

    switch (element.type) {
      case "Frame":
        return (
          <FrameComponents
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );
        
      case "Form":
        return (
          <FormComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );

      case "Button":
        return (
          <ButtonComponent
            key={element.id}
            element={element}
            commonProps={commonProps}
            draggingElement={draggingElement}
            projectId={projectId}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
          />
        );

      case "ListItem":
        return (
          <ListItemComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            parentHandlers={{
              handleDrop,
              handleDoubleClick,
              handleContextMenu,
              handleImageDrop,
              getContentProps,
              getCommonProps,
              draggingElement,
            }}
          />
        );

      case "Select":
        return (
          <SelectComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            parentHandlers={{
              handleDoubleClick,
              handleContextMenu,
              getCommonProps,
              draggingElement,
            }}
          />
        );

      case "Input":
        return (
          <InputComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            commonProps={commonProps}
          />
        );

      case "Link":
        return (
          <motion.a
            key={element.id}
            {...commonProps}
            {...contentProps}
            onKeyDown={(e) => handleKeyDown(e, element)}
            onDrop={(e: React.DragEvent<HTMLAnchorElement>) =>
              handleDrop(e, element)
            }
          />
        );

      case "Image":
        if (element.src) {
          return (
            <motion.img
              key={element.id}
              {...commonProps}
              src={element.src}
              onDrop={(e: React.DragEvent<HTMLImageElement>) =>
                handleImageDrop(e, element)
              }
              drag={element.isSelected}
            />
          );
        } else {
          return (
            <motion.div
              key={element.id}
              {...commonProps}
              onDragStart={(e, info) => handleDragStart(e, element, info)}
              onDrag={(e, info) => handleDragOver(e, element, info)}
              onDragEnd={(e, info) => handleDragEnd(e, info)}
              onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                handleImageDrop(e, element)
              }
              drag={element.isSelected}
              {...contentProps}
            />
          );
        }
        
      default:
        return (
          <motion.div
            key={element.id}
            {...commonProps}
            {...contentProps}
            onKeyDown={(e) => handleKeyDown(e, element)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) =>
              handleDrop(e, element)
            }
            onDragStart={(e, info) => handleDragStart(e, element, info)}
            onDrag={(e, info) => handleDragOver(e, element, info)}
            onDragEnd={(e, info) => handleDragEnd(e, info)}
          />
        );
    }
  };

  return (
    <motion.form
      id={element.id}
      style={{ ...element.styles }}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={(e) => e.preventDefault()}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
      onSubmit={handleSubmit}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
      action={formSettings.action}
      method={formSettings.method}
      encType={formSettings.encType}
      target={formSettings.target}
      name={formSettings.name}
      acceptCharset={formSettings.acceptCharset}
      autoComplete={formSettings.autocomplete}
      noValidate={formSettings.noValidate}
    >
      {formElement.elements?.map((childElement) => (
        <React.Fragment key={childElement.id}>
          {renderElement(childElement)}
        </React.Fragment>
      ))}
      {!hasSubmitButton(formElement) && (
        <motion.button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          whileHover={{ scale: 1.05 }}
        >
          Submit
        </motion.button>
      )}
    </motion.form>
  );
};

const hasSubmitButton = (formElement: FormElement) => {
  return formElement.elements?.some(
    el => el.type === 'Button' && 
    (el as ButtonElement).buttonType === 'submit'
  );
};

export default FormComponent;