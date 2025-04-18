"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "@/lib/store/editorStore";
import { useParams } from "next/navigation";

const DataTableHolder = () => {
  const { addElement } = useEditorStore();
  const params = useParams();
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("elementType", "DataTable");
  };

  const handleClick = () => {
    const newElement = {
      type: "DataTable" as const,
      id: uuidv4(),
      content: "",
      isSelected: false,
      x: 0,
      y: 0,
      styles: {
        width: "100%",
        maxWidth: "900px",
        padding: "16px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
      tailwindStyles: "w-full max-w-5xl p-4 bg-white rounded-lg shadow",
      headers: ["Name", "Email", "Role", "Status"],
      rows: [
        ["John Doe", "john@example.com", "Developer", "Active"],
        ["Jane Smith", "jane@example.com", "Designer", "Active"],
        ["Robert Johnson", "robert@example.com", "Manager", "On Leave"],
        ["Emily Wilson", "emily@example.com", "Marketing", "Active"],
      ],
      tableSettings: {
        sortable: true,
        searchable: true,
        pagination: true,
        rowsPerPage: 10,
        striped: true,
        bordered: true,
        hoverEffect: true,
      },
      projectId: params.projectid as string,
    };

    addElement(newElement);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className="bg-white p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md cursor-grab flex items-center justify-center select-none"
    >
      <div className="text-center">
        <div className="mb-2 text-gray-600 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="15" y1="3" x2="15" y2="21"></line>
          </svg>
        </div>
        <span className="text-sm font-medium">Data Table</span>
      </div>
    </div>
  );
};

export default DataTableHolder;
