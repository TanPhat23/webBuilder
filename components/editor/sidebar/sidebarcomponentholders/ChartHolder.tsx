"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "@/lib/store/editorStore";
import { useParams } from "next/navigation";

const ChartHolder = () => {
  const { addElement } = useEditorStore();
  const params = useParams();
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("elementType", "Chart");
  };

  const handleClick = () => {
    const newElement = {
      type: "Chart" as const,
      id: uuidv4(),
      content: "",
      isSelected: false,
      x: 0,
      y: 0,
      styles: {
        width: "100%",
        maxWidth: "800px",
        height: "400px",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
      tailwindStyles: "w-full max-w-4xl h-96 p-5 bg-white rounded-lg shadow-sm",
      chartType: "bar",
      chartData: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Sales",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Revenue",
            data: [7, 11, 5, 8, 3, 7],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          }
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Chart Data",
          },
        },
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
      className="bg-white p-4 border border-gray-200 rounded-md shadow-xs hover:shadow-md cursor-grab flex items-center justify-center select-none"
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
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <span className="text-sm font-medium">Chart</span>
      </div>
    </div>
  );
};

export default ChartHolder;
