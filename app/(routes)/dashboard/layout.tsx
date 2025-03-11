"use client";
import { ToastContainer } from "react-toastify";
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex w-screen h-screen">
      {children}
      <ToastContainer />
    </main>
  );
}
