import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <Sidebar />

      {/* Content */}

      <main className="flex-1 bg-slate-50 p-8">
        {children}
      </main>
    </div>
  );
}