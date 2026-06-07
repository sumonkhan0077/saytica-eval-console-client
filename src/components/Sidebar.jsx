"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, FolderKanban, ChevronDown } from "lucide-react";

const menus = [
  { name: "Leaderboard", href: "/dashboard/model-leaderboard", icon: LayoutDashboard },
  { name: "Task Board",  href: "/dashboard/task-board",        icon: ClipboardList   },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-[#0f1535] text-white">

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500 font-bold text-sm shrink-0">
          Sy
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-sm text-white">Saytica</p>
          <p className="text-xs text-indigo-300">Eval Console</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {menus.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-5 border-t border-white/10">
        <button className="flex items-center gap-3 w-full rounded-lg hover:bg-white/5 px-2 py-2 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
            U
          </div>
          <div className="flex-1 text-left leading-tight">
            <p className="text-sm font-medium text-white">User Name</p>
            <p className="text-xs text-slate-400">Annotator</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

    </aside>
  );
}
