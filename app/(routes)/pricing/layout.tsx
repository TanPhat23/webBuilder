"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
interface PricingLayoutProps {
  children: React.ReactNode;
}
const PricingLayout: React.FC<PricingLayoutProps> = ({ children }) => {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-auto">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-6 py-3 rounded-lg">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span className="text-gray-800 font-medium">Pricing</span>
      </nav>
      {children}
    </main>
  );
};

export default PricingLayout;
