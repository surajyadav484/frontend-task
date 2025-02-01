import { Button } from "@/components/ui/button";
import { NavItem } from "@/interfaces/nav-item";
import { cn } from "@/lib/utils";
import { Minus, Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function HomeSidebarContent({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col flex-1 h-screen border-r bg-background transition-all duration-300"
      )}
    >
      <div className="px-4 py-2">
        <div className="flex justify-start items-center gap-2">
          <span className="font-semibold">Overview</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search"
            className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm dark:text-white"
          />
        </div>

        <Tabs defaultValue="myAccount" className=" mt-4">
          <TabsList className="flex justify-start gap-9  border-b border-gray-300 w-full">
            <TabsTrigger value="myAccount">My account</TabsTrigger>
            <TabsTrigger value="sharedToMe">Shared with me</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {navItems.map((item) => (
          <div key={item.title}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent dark:hover:bg-gray-700",
                pathname === item.href && "bg-accent dark:bg-gray-800"
              )}
            >
              {item.icon}
              <>
                <span>{item.title}</span>
                {item.submenu && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto grid place-items-center hover:bg-gray-300 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("clicked", item.title);
                      setOpenSubmenu(
                        openSubmenu === item.title ? null : item.title
                      );
                    }}
                  >
                    {openSubmenu === item.title ? (
                      <Minus className="ml-auto h-4 w-4 transition-all" />
                    ) : (
                      <Plus className="ml-auto h-4 w-4 transition-all" />
                    )}
                  </Button>
                )}
              </>
            </Link>
            {item.submenu && openSubmenu === item.title && (
              <div className="ml-3 mt-2  pl-2 relative">
                {item.submenu.map((subItem) => (
                  <div key={subItem.title} className="relative">
                    <div className="w-[1px] h-full bg-gray-300 absolute top-[-50%]"></div>
                    <div className="flex">
                      <span className="w-4 h-5 border-b border-b-gray-300 absolute left-0 rounded-l-lg"></span>
                      <Link
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 ml-2 px-4 py-2 text-sm transition-all hover:bg-accent dark:hover:bg-gray-700",
                          pathname === subItem.href &&
                            "bg-accent dark:bg-gray-800"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
