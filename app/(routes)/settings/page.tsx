"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  useEffect(() => {
    // Redirect to preferences by default
    redirect("/settings/preferences");
  }, []);
  
  return null;
}
