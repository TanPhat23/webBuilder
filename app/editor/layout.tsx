"use client"
import { SideBar2 } from "@/components/editor/sidebar/SideBar";
import EditorProvider from "@/components/provider/EditorProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function EditorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <EditorProvider>
        <div className="flex w-screen h-screen">
          <SideBar2 />
          <main className="w-full">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </EditorProvider>
    </SidebarProvider>
  );
}
