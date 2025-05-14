import { CustomComponent } from "../styleconstants";
import { v4 as uuidv4 } from "uuid";
import { YouTubeEmbedElement } from "@/lib/interface";

export const youtubeIframeComponent: CustomComponent = {
  component: {
    type: "Frame",
    name: "YouTubeVideo",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      width: "100%",
      maxWidth: "800px",
      aspectRatio: "16/9",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      position: "relative",
    },
    tailwindStyles: "w-full max-w-4xl aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-md mx-auto relative",
    elements: [
      {
        type: "Frame",
        name: "iFrameContainer",
        id: uuidv4(),
        content: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
        },
        tailwindStyles: "w-full h-full relative flex items-center justify-center p-0",
        elements: [
          {
            type: "YouTubeEmbed",
            name: "YouTubeEmbed",
            id: uuidv4(),
            content: "https://www.youtube.com/embed/6biMWgD6_JY",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              width: "100%",
              height: "100%",
              border: "none",
            },
            tailwindStyles: "w-full h-full border-0",
            href: "",
            src: "https://www.youtube.com/embed/6biMWgD6_JY", 
            parentId: "",
            projectId: "",
            videoId: "6biMWgD6_JY", 
            showControls: true,
            autoplay: false,
            allowFullscreen: true,
            attributes: {
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              title: "YouTube video player",
            },
          } as YouTubeEmbedElement
        ],
      },
      {
        type: "Text",
        name: "VideoCaption",
        id: uuidv4(),
        content: "YouTube Video",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#6b7280",
          textAlign: "center",
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          borderTop: "1px solid #e5e7eb",
        },
        tailwindStyles: "text-sm text-gray-500 text-center p-2 bg-white/90 absolute bottom-0 left-0 right-0 border-t border-gray-200",
      }
    ],
  }
};