"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/interfaces/nav-item";
import { cn } from "@/lib/utils";
import {
  CheckSquare,
  FolderClosed,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import HomeSidebarContent from "./home-sidebar-content";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
}

// Using similar item titles and icons for simplicity
const sidebarItems: SidebarItem[] = [
  { title: "Home", icon: <Home className="w-4 h-4" /> },
  { title: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: "Projects", icon: <FolderClosed className="w-4 h-4" /> },
  { title: "Tasks", icon: <CheckSquare className="w-4 h-4" /> },
  { title: "Settings", icon: <Settings className="w-4 h-4" /> },
  { title: "Messages", icon: <MessageSquare className="w-4 h-4" /> },
];

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <FolderClosed className="w-4 h-4" />,
  },
  { title: "Tasks", href: "/tasks", icon: <CheckSquare className="w-4 h-4" /> },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="w-4 h-4" />,
    submenu: [
      { title: "My details", href: "/settings/details" },
      { title: "My profile", href: "/settings/profile" },
      { title: "Security", href: "/settings/security" },
      { title: "Integrations", href: "/settings/integrations" },
      { title: "Billing", href: "/settings/billing" },
    ],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

const sidebarContentMap = {
  Home: <HomeSidebarContent navItems={navItems} />,
  Overview: <NotCreated />,
  Projects: <NotCreated />,
  Tasks: <NotCreated />,
  Settings: <NotCreated />,
  Messages: <NotCreated />,
};

export function Sidebar() {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<string | null>(
    null
  );
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile toggle

  return (
    <div className="absolute">
      <div className="md:hidden flex items-center absolute z-50">
        <Button
          variant="ghost"
          className={cn("flex items-center justify-center", sidebarOpen && "hidden")}
          onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar on click
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div
        className={cn(
          "h-screen border-r bg-gray-200 transition-all duration-300 hidden md:flex z-50",
          sidebarOpen ? "flex" : "hidden"
        )}
      >
        <div className="flex flex-col items-center border-r h-full w-[64px]">
          <nav>
            <Button
              variant="ghost"
              className="flex items-center justify-center py-5"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 text-orange-500 dark:text-yellow-400" />
              ) : (
                <Moon className="h-4 w-4 text-yellow-400 dark:text-orange-500" />
              )}
            </Button>

            {sidebarItems.map((item) => (
              <Button
                variant="ghost"
                key={item.title}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent dark:hover:bg-gray-700",
                  selectedSidebarItem === item.title &&
                    "bg-accent dark:bg-gray-800",
                  selectedSidebarItem && "justify-center"
                )}
                onClick={() => {
                  if (selectedSidebarItem === item.title) {
                    setSelectedSidebarItem(null);
                    return;
                  }
                  setSelectedSidebarItem(item.title);
                }}
              >
                {item.icon}
              </Button>
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div className="flex flex-col items-center gap-3">
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent dark:hover:bg-gray-700",
                  selectedSidebarItem && "justify-center"
                )}
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent dark:hover:bg-gray-700",
                  selectedSidebarItem && "justify-center"
                )}
              >
                <CheckSquare className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        {selectedSidebarItem && (
          <div className="bg-background">
            <Button variant="ghost" className="absolute top-0 right-0 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              X
            </Button>
            {sidebarContentMap[selectedSidebarItem]}
          </div>
        )}
      </div>
    </div>
  );
}

function NotCreated() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      Click on home icon to view the content.
    </div>
  );
}
