"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChartElement, EditorComponentProps } from "@/lib/interface";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { useEditorStore } from "@/lib/store/editorStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Edit3 } from "lucide-react";

const ChartComponent = ({ 
  element, 
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
}: EditorComponentProps) => {
  const chartElement = element as ChartElement;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(chartElement.chartData);
  const [chartType, setChartType] = useState(chartElement.chartType);
  
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

  // Simplified mock chart rendering
  const renderChart = () => {
    const { chartData } = chartElement;
    const maxValue = Math.max(...chartData.datasets.flatMap(ds => ds.data));
    
    switch (chartElement.chartType) {
      case "bar":
        return (
          <div className="w-full h-full flex items-end justify-around p-4">
            {chartData.labels.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex flex-col-reverse">
                  {chartData.datasets.map((dataset, datasetIndex) => {
                    const height = (dataset.data[index] / maxValue * 100) + "%";
                    const bgColor = Array.isArray(dataset.backgroundColor) 
                      ? dataset.backgroundColor[index] 
                      : dataset.backgroundColor || `hsl(${datasetIndex * 50}, 70%, 50%)`;
                    
                    return (
                      <div 
                        key={datasetIndex} 
                        className="w-10 mx-1 rounded-t"
                        style={{ 
                          height, 
                          backgroundColor: bgColor,
                          minHeight: "10px"
                        }} 
                      />
                    );
                  })}
                </div>
                <span className="text-xs mt-1 text-center">{label}</span>
              </div>
            ))}
          </div>
        );
      case "line":
        return <div className="w-full h-full flex items-center justify-center">Line Chart Placeholder</div>;
      case "pie":
        return <div className="w-full h-full flex items-center justify-center">Pie Chart Placeholder</div>;
      case "doughnut":
        return <div className="w-full h-full flex items-center justify-center">Doughnut Chart Placeholder</div>;
      case "radar":
        return <div className="w-full h-full flex items-center justify-center">Radar Chart Placeholder</div>;
      case "polarArea":
        return <div className="w-full h-full flex items-center justify-center">Polar Area Chart Placeholder</div>;
      default:
        return <div className="w-full h-full flex items-center justify-center">Chart Placeholder</div>;
    }
  };

  const handleSaveChanges = () => {
    updateElementOptimistically(element.id, { 
      chartData: editedData,
      chartType
    });
    setIsEditing(false);
  };

  const handleAddLabel = () => {
    setEditedData(prevData => ({
      ...prevData,
      labels: [...prevData.labels, `Label ${prevData.labels.length + 1}`],
      datasets: prevData.datasets.map(dataset => ({
        ...dataset,
        data: [...dataset.data, 0]
      }))
    }));
  };

  const handleRemoveLabel = (index: number) => {
    setEditedData(prevData => ({
      ...prevData,
      labels: prevData.labels.filter((_, i) => i !== index),
      datasets: prevData.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.filter((_, i) => i !== index)
      }))
    }));
  };

  const handleAddDataset = () => {
    // Create a random color for the new dataset
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgba(${r}, ${g}, ${b}, 0.6)`;
    
    setEditedData(prevData => ({
      ...prevData,
      datasets: [
        ...prevData.datasets,
        {
          label: `Dataset ${prevData.datasets.length + 1}`,
          data: Array(prevData.labels.length).fill(0),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1
        }
      ]
    }));
  };

  const handleRemoveDataset = (index: number) => {
    setEditedData(prevData => ({
      ...prevData,
      datasets: prevData.datasets.filter((_, i) => i !== index)
    }));
  };

  const handleLabelChange = (index: number, value: string) => {
    setEditedData(prevData => ({
      ...prevData,
      labels: prevData.labels.map((label, i) => i === index ? value : label)
    }));
  };

  const handleDatasetLabelChange = (index: number, value: string) => {
    setEditedData(prevData => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset, i) => 
        i === index ? { ...dataset, label: value } : dataset
      )
    }));
  };

  const handleDataValueChange = (datasetIndex: number, dataIndex: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    setEditedData(prevData => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset, i) => 
        i === datasetIndex 
          ? {
              ...dataset,
              data: dataset.data.map((d, j) => j === dataIndex ? numValue : d)
            }
          : dataset
      )
    }));
  };

  return (
    <motion.div
      id={element.id}
      className={cn("chart-container p-4 min-h-[300px] min-w-[300px]", {
        "border-black border-2 border-solid": element.isSelected
      })}
      style={{ ...element.styles }}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
    >
      <div className="w-full h-full relative">
        {renderChart()}
        
        <div className="absolute bottom-2 left-2 text-sm text-gray-500">
          Chart Type: {chartElement.chartType}
        </div>
        
        <div className="absolute bottom-2 right-2 flex gap-2">
          {chartElement.chartData.datasets.map((dataset, i) => (
            <div key={i} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: Array.isArray(dataset.backgroundColor) 
                    ? dataset.backgroundColor[0] 
                    : dataset.backgroundColor 
                }}
              />
              <span className="text-xs">{dataset.label}</span>
            </div>
          ))}
        </div>
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
              <Edit3 className="h-4 w-4 mr-1" /> Edit Chart
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Chart Data</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="data">
              <TabsList>
                <TabsTrigger value="type">Chart Type</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="datasets">Datasets</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {(["bar", "line", "pie", "doughnut", "radar", "polarArea"] as const).map(type => (
                    <div 
                      key={type}
                      className={cn(
                        "border rounded-md p-4 cursor-pointer hover:border-blue-500",
                        chartType === type && "border-blue-500 bg-blue-50"
                      )}
                      onClick={() => setChartType(type)}
                    >
                      <div className="text-center font-medium capitalize">{type}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Chart Labels</h3>
                  <Button onClick={handleAddLabel} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Label
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {editedData.labels.map((label, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={label}
                        onChange={(e) => handleLabelChange(index, e.target.value)}
                      />
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleRemoveLabel(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Data Values</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Dataset</th>
                          {editedData.labels.map((label, i) => (
                            <th key={i} className="p-2">{label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {editedData.datasets.map((dataset, datasetIndex) => (
                          <tr key={datasetIndex}>
                            <td className="p-2 font-medium">{dataset.label}</td>
                            {dataset.data.map((value, dataIndex) => (
                              <td key={dataIndex} className="p-2">
                                <Input 
                                  type="number"
                                  value={value}
                                  onChange={(e) => handleDataValueChange(
                                    datasetIndex, 
                                    dataIndex, 
                                    e.target.value
                                  )}
                                  className="w-20"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="datasets" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Datasets</h3>
                  <Button onClick={handleAddDataset} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Dataset
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {editedData.datasets.map((dataset, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ 
                              backgroundColor: Array.isArray(dataset.backgroundColor)
                                ? dataset.backgroundColor[0]
                                : dataset.backgroundColor
                            }}
                          />
                          <Input 
                            value={dataset.label}
                            onChange={(e) => handleDatasetLabelChange(index, e.target.value)}
                            className="w-48"
                          />
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveDataset(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
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

export default ChartComponent;
