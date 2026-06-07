"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
    },
    {
      name: "Task Board",
      href: "/dashboard/tasks",
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        Saytica Console
      </h2>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`block rounded-lg p-3 transition ${
              pathname === menu.href
                ? "bg-violet-600"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}