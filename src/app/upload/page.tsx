"use client";

import React from "react";
import { AppShell } from "@/components/app-shell";
import { ErrorBoundary } from "@/components/error-boundary";
import { UploadForm } from "@/components/upload-form";

export default function UploadPage() {
  return (
    <ErrorBoundary>
      <AppShell hideSidebar>
        <div className="px-4 md:px-6 pt-6 pb-8 max-w-[1920px] mx-auto">
          <UploadForm />
        </div>
      </AppShell>
    </ErrorBoundary>
  );
}
