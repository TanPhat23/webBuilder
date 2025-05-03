"use client";

import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ComponentType = 
  | "Text" 
  | "Heading" 
  | "Frame" 
  | "Image" 
  | "Button" 
  | "Link"
  | "Input" 
  | "ListItem"
  | "Select"
  | "Chart"
  | "DataTable"
  | "Form"
  | "Carousel"
  | "Card";
  
const tooltipContent: Record<ComponentType, { title: string; description: string }> = {
  Text: {
    title: "Văn bản",
    description: "Thêm đoạn văn bản vào trang của bạn. Kéo vào canvas và nhấn đúp để chỉnh sửa."
  },
  Heading: {
    title: "Tiêu đề",
    description: "Thêm tiêu đề vào trang của bạn. Sử dụng cho các tiêu đề quan trọng."
  },
  Frame: {
    title: "Khung",
    description: "Tạo một container chứa nhiều thành phần khác. Hữu ích để nhóm và sắp xếp các thành phần."
  },
  Image: {
    title: "Hình ảnh",
    description: "Thêm hình ảnh vào trang của bạn. Kéo và thả để thay đổi vị trí."
  },
  Button: {
    title: "Nút",
    description: "Thêm nút tương tác vào trang của bạn. Có thể tùy chỉnh kiểu dáng và hành động."
  },
  Link: {
    title: "Liên kết",
    description: "Tạo liên kết đến các trang hoặc nội dung khác. Có thể tùy chỉnh văn bản và URL đích."
  },
  Input: {
    title: "Trường nhập",
    description: "Thêm trường nhập dữ liệu. Sử dụng trong biểu mẫu để thu thập thông tin từ người dùng."
  },
  ListItem: {
    title: "Danh sách",
    description: "Tạo danh sách có thứ tự hoặc không có thứ tự. Hữu ích để hiển thị các mục có cấu trúc."
  },
  Select: {
    title: "Trường chọn",
    description: "Tạo dropdown menu cho phép người dùng chọn từ nhiều tùy chọn."
  },
  Chart: {
    title: "Biểu đồ",
    description: "Tạo biểu đồ để hiển thị dữ liệu. Hỗ trợ nhiều loại biểu đồ như cột, đường, tròn, v.v."
  },
  DataTable: {
    title: "Bảng dữ liệu",
    description: "Hiển thị dữ liệu dạng bảng với các hàng và cột. Có thể tùy chỉnh và thêm chức năng sắp xếp."
  },
  Form: {
    title: "Biểu mẫu",
    description: "Tạo biểu mẫu thu thập thông tin từ người dùng. Có thể chứa nhiều loại trường nhập khác nhau."
  },
  Carousel: {
    title: "Băng chuyền",
    description: "Tạo trình diễn slideshow cho hình ảnh hoặc nội dung. Có thể tùy chỉnh với các điều khiển và hiệu ứng."
  },
  Card: {
    title: "Thẻ",
    description: "Tạo container hình chữ nhật để nhóm thông tin liên quan. Thường dùng trong layout dạng lưới."
  }
};

interface ComponentTooltipProps {
  children: ReactNode;
  type: ComponentType;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  disabled?: boolean;
}

export function ComponentTooltip({
  children,
  type,
  side = "right",
  sideOffset = 10,
  disabled = false,
}: ComponentTooltipProps) {
  const content = tooltipContent[type];

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent 
          side={side} 
          sideOffset={sideOffset}
          className="max-w-xs p-3 bg-white text-black border border-gray-200 shadow-md"
        >
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">{content.title}</span>
            <span className="text-xs text-gray-600">{content.description}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}