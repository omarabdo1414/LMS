"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user.userData);
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const noSidebarRoutes = ["/login", "/register"];
  const shouldShowSidebar = user && !noSidebarRoutes.includes(pathname);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {shouldShowSidebar && (
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
      )}

      {shouldShowSidebar && !isMobileOpen && (
        <button
          className="md:hidden fixed top-3 left-3 z-50 p-2 bg-blue-600 rounded shadow-lg flex justify-center items-center"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <GraduationCap className="w-6 h-6 text-white" />
        </button>
      )}

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
