"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Settings } from "react-slick";

// Dynamically import the CarouselSlider component with ssr: false
const CarouselSlider = dynamic(
  () => import("@/components/preview/CarouselSlider"),
  {
    ssr: false,
  }
);

interface DynamicCarouselProps {
  children: React.ReactNode;
  settings?: Settings;
  style?: React.CSSProperties;
}

export default function DynamicCarousel({
  children,
  settings,
  style,
}: DynamicCarouselProps) {
  return (
    <CarouselSlider settings={settings} style={style}>
      {children}
    </CarouselSlider>
  );
}
