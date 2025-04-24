import { SettingSideBar } from "@/components/settings/SettingsSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="w-screen h-screen flex">
        <SettingSideBar/>
        {children}
      </div>
    </SidebarProvider>
  );
};

export default SettingsLayout;
