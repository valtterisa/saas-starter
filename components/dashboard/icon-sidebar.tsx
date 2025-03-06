"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavigationLink from "../ui/link";
import { signOutAction } from "@/src/app/actions";

export function IconSidebar() {
  const pathname = usePathname();

  // Simplified navigation - just home and settings
  const navItems = [
    {
      href: "/dashboard",
      title: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/dashboard/settings",
      title: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-16 border-r bg-background h-screen flex flex-col items-center py-4">
      <div className="mb-8">
        <div className="size-10 rounded-full bg-purple-500" />
      </div>

      {/* Main navigation */}
      <nav className="flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <NavigationLink
            key={item.href}
            href={item.href}
            className={cn(
              "p-2 rounded-md transition-colors group relative",
              pathname === item.href ||
                (item.href === "/dashboard" && pathname === "/dashboard")
                ? "bg-purple-100 text-purple-500 dark:bg-purple-900/30"
                : "text-muted-foreground hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            )}
            title={item.title}
          >
            {item.icon}
            <span className="sr-only">{item.title}</span>

            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity shadow-sm border z-50">
              {item.title}
            </div>
          </NavigationLink>
        ))}
      </nav>

      {/* Logout button at the bottom */}
      <div className="mt-auto mb-6">
        <button
          className="p-2 rounded-md transition-colors group relative text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Logout"
          onClick={() => signOutAction()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="sr-only">Logout</span>

          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity shadow-sm border z-50">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}
