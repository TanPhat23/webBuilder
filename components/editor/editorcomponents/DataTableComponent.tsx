"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DataTableElement, EditorComponentProps } from "@/lib/interface";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { useEditorStore } from "@/lib/store/editorStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Edit3, ChevronUp, ChevronDown, Search } from "lucide-react";

const DataTableComponent = ({
  element,
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
}: EditorComponentProps) => {
  const tableElement = element as DataTableElement;
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeaders, setEditedHeaders] = useState([...tableElement.headers]);
  const [editedRows, setEditedRows] = useState([...tableElement.rows]);
  const [tableSettings, setTableSettings] = useState({
    ...(tableElement.tableSettings || {
      sortable: false,
      searchable: false,
      pagination: false,
      rowsPerPage: 10,
      striped: false,
      bordered: true,
      hoverEffect: true,
    }),
  });
  
  // Table display state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: number | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  
  const { updateElementOptimistically } = useEditorStore();
  
  const {
    handleDoubleClick,
    handleContextMenu,
  } = useEditorElementHandlers({
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
  });

  const handleSaveChanges = () => {
    updateElementOptimistically(element.id, { 
      headers: editedHeaders,
      rows: editedRows,
      tableSettings,
    });
    setIsEditing(false);
  };

  // Header operations
  const handleAddHeader = () => {
    setEditedHeaders([...editedHeaders, `Column ${editedHeaders.length + 1}`]);
    setEditedRows(rows => rows.map(row => [...row, ""]));
  };

  const handleRemoveHeader = (index: number) => {
    setEditedHeaders(headers => headers.filter((_, i) => i !== index));
    setEditedRows(rows => rows.map(row => row.filter((_, i) => i !== index)));
  };

  const handleHeaderChange = (index: number, value: string) => {
    setEditedHeaders(headers => headers.map((header, i) => i === index ? value : header));
  };

  // Row operations
  const handleAddRow = () => {
    setEditedRows([...editedRows, Array(editedHeaders.length).fill("")]);
  };

  const handleRemoveRow = (index: number) => {
    setEditedRows(rows => rows.filter((_, i) => i !== index));
  };

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    setEditedRows(rows => 
      rows.map((row, i) => 
        i === rowIndex 
          ? row.map((cell, j) => j === colIndex ? value : cell)
          : row
      )
    );
  };

  // Settings operations
  const handleSettingChange = (key: string, value: any) => {
    setTableSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Table display operations
  const requestSort = (key: number) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getFilteredRows = () => {
    if (!tableElement.tableSettings?.searchable || !searchTerm) return tableElement.rows;
    
    return tableElement.rows.filter(row => 
      row.some(cell => 
        String(cell).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getSortedRows = (rows: Array<Array<string | number>>) => {
    if (!tableElement.tableSettings?.sortable || sortConfig.key === null) return rows;
    
    return [...rows].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const getPaginatedRows = (rows: Array<Array<string | number>>) => {
    if (!tableElement.tableSettings?.pagination) return rows;
    
    const startIndex = (currentPage - 1) * (tableElement.tableSettings.rowsPerPage || 10);
    return rows.slice(startIndex, startIndex + (tableElement.tableSettings.rowsPerPage || 10));
  };

  // Combine all table operations
  const getDisplayRows = () => {
    let rows = getFilteredRows();
    rows = getSortedRows(rows);
    rows = getPaginatedRows(rows);
    return rows;
  };

  const totalPages = tableElement.tableSettings?.pagination 
    ? Math.ceil(getFilteredRows().length / (tableElement.tableSettings.rowsPerPage || 10)) 
    : 1;

  return (
    <motion.div
      id={element.id}
      className={cn("data-table-container", {
        "border-black border-2 border-solid": element.isSelected
      })}
      style={{ ...element.styles }}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
    >
      <div className="overflow-x-auto">
        {/* Search bar */}
        {tableElement.tableSettings?.searchable && (
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Table */}
        <table className={cn("w-full", {
          "border-collapse border border-gray-200": tableElement.tableSettings?.bordered,
        })}>
          <thead>
            <tr>
              {tableElement.headers.map((header, index) => (
                <th 
                  key={index}
                  className={cn("p-2 font-bold border-b-2 border-gray-200 text-left", {
                    "cursor-pointer select-none": tableElement.tableSettings?.sortable
                  })}
                  onClick={() => tableElement.tableSettings?.sortable && requestSort(index)}
                >
                  <div className="flex items-center gap-1">
                    {header}
                    {tableElement.tableSettings?.sortable && sortConfig.key === index && (
                      sortConfig.direction === "asc" 
                        ? <ChevronUp className="h-4 w-4" />
                        : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getDisplayRows().map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className={cn({
                  "bg-gray-50": tableElement.tableSettings?.striped && rowIndex % 2 === 1,
                  "hover:bg-gray-100": tableElement.tableSettings?.hoverEffect,
                  "border-b border-gray-200": tableElement.tableSettings?.bordered
                })}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        {tableElement.tableSettings?.pagination && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * (tableElement.tableSettings.rowsPerPage || 10) + 1, getFilteredRows().length)} to {Math.min(currentPage * (tableElement.tableSettings.rowsPerPage || 10), getFilteredRows().length)} of {getFilteredRows().length} entries
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {element.isSelected && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2 z-10"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="h-4 w-4 mr-1" /> Edit Table
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Data Table</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="data">
              <TabsList>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              {/* Data Tab */}
              <TabsContent value="data" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Table Data</h3>
                  <Button onClick={handleAddRow} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Row
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-2 w-10">#</th>
                        {editedHeaders.map((header, index) => (
                          <th key={index} className="p-2">{header}</th>
                        ))}
                        <th className="w-10 p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="p-2">{rowIndex + 1}</td>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-2">
                              <Input 
                                value={cell}
                                onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                                className="min-w-[100px]"
                              />
                            </td>
                          ))}
                          <td className="p-2">
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => handleRemoveRow(rowIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              {/* Headers Tab */}
              <TabsContent value="headers" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Table Headers</h3>
                  <Button onClick={handleAddHeader} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Header
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {editedHeaders.map((header, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={header}
                        onChange={(e) => handleHeaderChange(index, e.target.value)}
                      />
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleRemoveHeader(index)}
                        disabled={editedHeaders.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sortable">Sortable</Label>
                    <Switch 
                      id="sortable"
                      checked={tableSettings.sortable}
                      onCheckedChange={(checked) => handleSettingChange("sortable", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="searchable">Searchable</Label>
                    <Switch 
                      id="searchable"
                      checked={tableSettings.searchable}
                      onCheckedChange={(checked) => handleSettingChange("searchable", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pagination">Pagination</Label>
                    <Switch 
                      id="pagination"
                      checked={tableSettings.pagination}
                      onCheckedChange={(checked) => handleSettingChange("pagination", checked)}
                    />
                  </div>
                  
                  {tableSettings.pagination && (
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rowsPerPage">Rows Per Page</Label>
                      <Input 
                        id="rowsPerPage"
                        type="number"
                        min={1}
                        max={100}
                        className="w-20"
                        value={tableSettings.rowsPerPage}
                        onChange={(e) => handleSettingChange("rowsPerPage", parseInt(e.target.value) || 10)}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="striped">Striped Rows</Label>
                    <Switch 
                      id="striped"
                      checked={tableSettings.striped}
                      onCheckedChange={(checked) => handleSettingChange("striped", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bordered">Bordered</Label>
                    <Switch 
                      id="bordered"
                      checked={tableSettings.bordered}
                      onCheckedChange={(checked) => handleSettingChange("bordered", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hoverEffect">Hover Effect</Label>
                    <Switch 
                      id="hoverEffect"
                      checked={tableSettings.hoverEffect}
                      onCheckedChange={(checked) => handleSettingChange("hoverEffect", checked)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default DataTableComponent;
