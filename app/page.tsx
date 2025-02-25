"use client";
import React from "react";
import Navbar from "@/components/landingpage/Navbar";
import Footer from "@/components/landingpage/Footer";
import Main from "@/components/landingpage/Main";
function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <Navbar />
      <div className="flex-1">
        <Main />
      </div>
      <Footer />
    </div>
  );
}


export default LandingPage;
