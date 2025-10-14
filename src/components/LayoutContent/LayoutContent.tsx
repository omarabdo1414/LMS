"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.user.userData);
  const pathname = usePathname();

  const noSidebarRoutes = ["/login", "/register"];
  const shouldShowSidebar = user && !noSidebarRoutes.includes(pathname);

  return (
    <div className="flex h-screen">
      {shouldShowSidebar && <Sidebar />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
