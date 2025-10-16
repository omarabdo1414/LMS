import { Loader, LoaderCircle } from "lucide-react";
import React from "react";
// loading page
export default function LoadingPage() {
  return (
    <div className="bg-background fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center">
      <LoaderCircle className="w-20 h-20 animate-spin text-primary" />
    </div>
  );
}
