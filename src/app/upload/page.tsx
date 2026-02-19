"use client";

import React from "react";
import { AppShell } from "@/components/app-shell";
import { UploadForm } from "@/components/upload-form";

export default function UploadPage() {
  return (
    <AppShell hideSidebar>
      <div className="px-4 md:px-6 pt-6 pb-8 max-w-[1920px] mx-auto">
        <UploadForm />
      </div>
    </AppShell>
  );
}
