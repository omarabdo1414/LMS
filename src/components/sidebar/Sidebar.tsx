"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { GraduationCap } from "lucide-react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  toggleCollapse,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const toggleCourses = () => setIsCoursesOpen((prev) => !prev);
  const isAdmin =
    userData?.role === "admin" || userData?.role === "super-admin";

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
    { label: "Help", path: "/", icon: QuestionMarkCircleIcon },
  ];

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("userId");
    toast.success("You logged out successfully");
    router.push("/login");
    setIsMobileOpen(false);
  };

  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      }
    }
  }, []);

  // الزر بيشتغل على حسب الجهاز
  const handleToggle = () => {
    if (isDesktop) {
      toggleCollapse();
    } else {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* Sidebar container */}
      <div
        className={`fixed md:relative top-0 left-0 h-full z-50 flex flex-col shadow-lg border-r border-gray-200 dark:border-transparent transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
          ${isCollapsed ? "w-20 md:w-20" : "w-64"}
          transform md:translate-x-0 ${
            isMobileOpen || isDesktop ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {(isMobileOpen || isDesktop) && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div
                className={`cursor-pointer transition-all duration-300 flex justify-center items-center
    ${
      isDesktop
        ? "w-11 h-11 bg-accent rounded-md"
        : !isCollapsed
        ? "w-11 h-11 bg-accent rounded-md"
        : "w-10 h-10"
    }
  `}
                onClick={handleToggle}
              >
                <GraduationCap
                  className={`transition-all duration-300 ${
                    isDesktop || !isCollapsed
                      ? "w-7 h-7 text-white"
                      : "w-6 h-6 text-gray-700 dark:text-gray-200"
                  }`}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto mt-4 px-1 transition-all duration-300">
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
                        } ${isCollapsed ? "" : "cursor-pointer"}`}
                      >
                        <div
                          className={`h-6 w-1 rounded-r mr-2 transition-all duration-300 ${
                            isActive(item.path)
                              ? "bg-blue-500 dark:bg-blue-400 scale-y-100"
                              : "bg-transparent scale-y-0"
                          }`}
                        ></div>
                        <span title={isCollapsed ? item.label : ""}>
                          <item.icon className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                        </span>
                        {!isCollapsed && (
                          <>
                            <span className="ml-3 truncate flex-1">
                              {item.label}
                            </span>
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
                        onClick={
                          item.label === "Logout"
                            ? handleLogout
                            : () => setIsMobileOpen(false)
                        }
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
                        <span title={isCollapsed ? item.label : ""}>
                          <item.icon className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                        </span>
                        {!isCollapsed && (
                          <span className="ml-3 truncate">{item.label}</span>
                        )}
                      </Link>
                    )}

                    {hasChildren && isCoursesOpen && !isCollapsed && (
                      <div className="ml-10 mt-1 space-y-2">
                        {item.children?.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.path || "#"}
                            onClick={() => setIsMobileOpen(false)}
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

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-transparent p-4 flex flex-col space-y-3">
              {/* Dark Mode Button */}
              <button
                onClick={toggleDarkMode}
                className={`flex items-center px-3 py-2 mx-1 my-1 rounded-lg w-full transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-r-2 border-blue-500 dark:border-blue-400"
                    : "hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-200 text-gray-700 dark:text-gray-300"
                }`}
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 mr-2 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                )}
                {!isCollapsed && <span>Toggle Mode</span>}
              </button>

              {/* Help Link */}
              {footerItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`flex items-center px-3 py-2 mx-1 my-1 rounded-lg w-full transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-700 dark:hover:text-blue-200 text-gray-700 dark:text-gray-300`}
                >
                  <item.icon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
