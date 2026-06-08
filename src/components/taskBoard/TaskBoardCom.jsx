"use client";

import { useState } from "react";
import { UserRound, BriefcaseBusiness, ChevronDown, Info } from "lucide-react";

// --- Mock Data ---
const TASKS = [
  { id: 1, task: "Label product images",        project: "E-commerce",   status: "Pending"     },
  { id: 2, task: "Review product descriptions", project: "E-commerce",   status: "In Progress" },
  { id: 3, task: "Annotate user reviews",       project: "SentimentX",   status: "Pending"     },
  { id: 4, task: "Audio transcription",         project: "VoiceBase",    status: "In Progress" },
  { id: 5, task: "Moderation des contenus",     project: "ContentSafe",  status: "Done"        },
  { id: 6, task: "Data verification",           project: "HealthAI",     status: "Pending"     },
  { id: 7, task: "Image classification",        project: "E-commerce",   status: "Done"        },
  { id: 8, task: "Sentiment tagging",           project: "SentimentX",   status: "In Progress" },
  { id: 9, task: "Speech segmentation",         project: "VoiceBase",    status: "Pending"     },
  { id: 10, task: "Content flagging",           project: "ContentSafe",  status: "Done"        },
  { id: 11, task: "Clinical note review",       project: "HealthAI",     status: "In Progress" },
  { id: 12, task: "Product tagging",            project: "E-commerce",   status: "Pending"     },
];

const PROJECT_STATS = [
  { name: "E-commerce",  pending: 3, inProgress: 9, done: 6,  total: 18 },
  { name: "SentimentX",  pending: 5, inProgress: 4, done: 3,  total: 12 },
  { name: "VoiceBase",   pending: 2, inProgress: 0, done: 8,  total: 10 },
  { name: "ContentSafe", pending: 2, inProgress: 4, done: 1,  total: 7  },
  { name: "HealthAI",    pending: 2, inProgress: 1, done: 1,  total: 4  },
];

const PROJECTS = ["All Projects", ...PROJECT_STATS.map((p) => p.name)];
const PAGE_SIZE = 6;

// --- Helpers ---
const statusStyle = {
  "Pending":     "bg-orange-100 text-orange-500",
  "In Progress": "bg-blue-100 text-blue-500",
  "Done":        "bg-green-100 text-green-600",
};

const statusOptions = ["Pending", "In Progress", "Done"];

function StatusBadge({ value, editable, onChange }) {
  if (!editable) return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[value]}`}>{value}</span>
  );
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer ${statusStyle[value]}`}
    >
      {statusOptions.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}




const TaskBoardCom = () => {
    const [role, setRole]       = useState("annotator"); // "annotator" | "client"
  const [project, setProject] = useState("All Projects");
  const [page, setPage]       = useState(1);
  const [tasks, setTasks]     = useState(TASKS);

  const updateStatus = (id, status) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
  };

  // Filtered + paginated tasks
  const filtered = tasks.filter((t) => project === "All Projects" || t.project === project);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

 
    return (
        <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Task Board</h1>
          <p className="text-sm text-slate-500 mt-0.5">View and manage annotation tasks</p>
        </div>

        {/* Role Toggle */}
        <div className="flex items-center bg-slate-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setRole("annotator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              role === "annotator" ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <UserRound size={15} /> Annotator
          </button>
          <button
            onClick={() => setRole("client")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              role === "client" ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <BriefcaseBusiness size={15} /> Client
          </button>
        </div>

        {/* Project Filter (client only) */}
        {role === "client" && (
          <div className="relative">
            <select
              value={project}
              onChange={(e) => { setProject(e.target.value); setPage(1); }}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              {PROJECTS.map((p) => <option key={p}>{p}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* === LEFT: Annotator Task Table === */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <span className="font-semibold text-slate-800 text-sm">Annotator: My Tasks</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">{tasks.length} tasks</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Task</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Project</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr key={row.id} className={`border-b border-slate-100 hover:bg-slate-50/60 transition-colors ${i === paginated.length - 1 ? "border-none" : ""}`}>
                  <td className="px-5 py-3.5 text-slate-700">{row.task}</td>
                  <td className="px-5 py-3.5 text-slate-500">{row.project}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge value={row.status} editable={true} onChange={(s) => updateStatus(row.id, s)} />
                  </td>
                  <td className="px-3 py-3.5 text-slate-300"><ChevronDown size={14} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} tasks
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 disabled:opacity-30 text-xs">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${page === n ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 disabled:opacity-30 text-xs">›</button>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
            <Info size={13} className="text-indigo-400" /> You can update the status of your tasks
          </div>
        </div>

      

      </div>
    </div>
  );
   
};

export default TaskBoardCom;