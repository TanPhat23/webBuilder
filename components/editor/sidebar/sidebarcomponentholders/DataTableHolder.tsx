"use client";

import { Table } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const DataTableHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="DataTable">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "DataTable")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>DataTable</div>
        <Table />
      </div>
    </ComponentTooltip>
  );
};

export default DataTableHolder;
