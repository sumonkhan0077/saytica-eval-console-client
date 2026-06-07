import Link from "next/link";

export default function DashboardLayout({
  children
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside className="w-64 bg-slate-950 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">
          Saytica Console
        </h2>

        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="block rounded-lg p-3 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/model-leaderboard"
            className="block rounded-lg p-3 hover:bg-slate-800"
          >
            Leaderboard
          </Link>

          <Link
            href="/dashboard/task-board"
            className="block rounded-lg p-3 hover:bg-slate-800"
          >
            Task Board
          </Link>
        </nav>
      </aside>

      {/* Content */}

      <main className="flex-1 bg-slate-50 p-8">
        {children}
      </main>
    </div>
  );
}