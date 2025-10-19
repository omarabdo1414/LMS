"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import logo from "../../../public/icons8-education-100 (2).png";
import {
  HomeIcon,
  BookOpenIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Image from "next/image";
import { GraduationCap } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  const { userData } = useSelector((state: RootState) => state.user);

  const toggleSidebarCollapse = () => setIsSidebarCollapsed((prev) => !prev);
  const toggleCourses = () => setIsCoursesOpen((prev) => !prev);

  const isAdmin =
    userData?.role === "admin" || userData?.role === "super-admin";
  // console.log(userData.role);

  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname.startsWith(path);
  };

  const coursesChildren = [
    { label: "All Courses", path: "/lessons", icon: BookOpenIcon },
    { label: "My Courses", path: "/my-lessons", icon: BookmarkIcon },
  ];

  if (isAdmin) {
    coursesChildren.push({
      label: "Add Lesson",
      path: "/admin/add-lesson",
      icon: PlusCircleIcon,
    });
  }

  const navigationItems = [
    { label: "Dashboard", path: "/dashboard", icon: HomeIcon },
    { label: "Profile", path: "/profile", icon: UserCircleIcon },
    { label: "Courses", icon: BookOpenIcon, children: coursesChildren },
    isAdmin
      ? { label: "Create Exam", path: "/Exams/add", icon: PencilSquareIcon }
      : { label: "Exams", path: "/Exams/get", icon: ClipboardDocumentListIcon },
    { label: "Logout", path: "/login", icon: ArrowRightStartOnRectangleIcon },
  ];

  const footerItems = [
    { label: "Settings", path: "/", icon: CogIcon },
    { label: "Help", path: "/", icon: QuestionMarkCircleIcon },
  ];

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("userId");
    toast.success("You logged out successfully");
    router.push("/login");
  };

  return (
    <div
      className={`h-screen flex flex-col shadow-lg border-r border-gray-200 transition-all duration-300 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        {!isSidebarCollapsed && (
          <div className="w-11 h-11 bg-accent rounded-md flex justify-center items-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
        )}
        <button
          onClick={toggleSidebarCollapse}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <span className="text-xl text-gray-600 dark:text-gray-400">≡</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto mt-4 px-2 transition-all duration-300">
        {navigationItems.map((item, index) => {
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={index}>
              {hasChildren ? (
                <div
                  onClick={toggleCourses}
                  className={`flex items-center px-3 py-2 mx-1 rounded-lg w-full transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-r-2 border-blue-500 dark:border-blue-400"
                      : "hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-200 text-gray-700 dark:text-gray-300"
                  } ${isSidebarCollapsed ? "" : "cursor-pointer"}`}
                >
                  <div
                    className={`h-6 w-1 rounded-r mr-2 transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-blue-500 dark:bg-blue-400 scale-y-100"
                        : "bg-transparent scale-y-0"
                    }`}
                  ></div>
                  <span title={isSidebarCollapsed ? item.label : ""}>
                    <item.icon className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                  </span>
                  {!isSidebarCollapsed && (
                    <>
                      <span className="ml-3 truncate flex-1">{item.label}</span>
                      {isCoursesOpen ? (
                        <ChevronDownIcon className="h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )}
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path || "#"}
                  onClick={item.label === "Logout" ? handleLogout : undefined}
                  className={`flex items-center px-3 py-2 mx-1 my-1 rounded-lg w-full transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-r-2 border-blue-500 dark:border-blue-400"
                      : "hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-200 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div
                    className={`h-6 w-1 rounded-r mr-2 transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-blue-500 dark:bg-blue-400 scale-y-100"
                        : "bg-transparent scale-y-0"
                    }`}
                  ></div>
                  <span title={isSidebarCollapsed ? item.label : ""}>
                    <item.icon className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </Link>
              )}

              {hasChildren && isCoursesOpen && !isSidebarCollapsed && (
                <div className="ml-10 mt-1 space-y-2">
                  {item.children?.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.path || "#"}
                      className={`flex items-center px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                        isActive(child.path)
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      <child.icon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col space-y-3">
        {footerItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
              isActive(item.path)
                ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            <item.icon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
            {!isSidebarCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
