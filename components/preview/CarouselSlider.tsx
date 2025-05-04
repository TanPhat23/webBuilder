"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

interface CarouselSliderProps {
  children: React.ReactNode;
  settings?: Settings;
  style?: React.CSSProperties;
}

export default function CarouselSlider({
  children,
  settings,
  style,
}: CarouselSliderProps) {
  return (
    <div className="w-full carousel-container px-10">
      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className="h-full relative px-2 pb-8">
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ height: style?.height }}
            >
              {child}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
