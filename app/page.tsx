"use client";
import React from "react";
import Navbar from "@/components/landingpage/Navbar";
import Footer from "@/components/landingpage/Footer";
import Hero from "@/components/landingpage/Hero";
import Features from "@/components/landingpage/Features";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function LandingPage() {
  const user = useUser();
  const router = useRouter();
  React.useEffect(() => {
    if (user.isSignedIn) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Hero />
        <Features />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
