import { SidebarProvider } from "@/components/ui/sidebar";

export default function DefaultSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-screen h-screen">
      <SidebarProvider>{children}</SidebarProvider>
    </main>
  );
}
