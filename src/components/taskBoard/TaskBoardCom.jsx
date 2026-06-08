"use client";

import { useState } from "react";
import {
  UserRound,
  BriefcaseBusiness,
  ChevronRight,
  Info,
} from "lucide-react";

import { updateTaskStatus } from "@/server/tasks.service";

const PAGE_SIZE = 6;

// স্টাইল কীগুলো স্ট্যাটাসের সাথে মিলানো হয়েছে
const statusStyle = {
  "pending": "bg-amber-100 text-amber-700 border border-amber-200",
  "in_progress": "bg-sky-100 text-sky-700 border border-sky-200",
  "done": "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const statusOptions = ["pending", "in_progress", "done"];

function StatusBadge({ value, editable, onChange }) {
  if (!editable) {
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[value] || "bg-slate-100"}`}>
        {value}
      </span>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200 outline-none cursor-pointer ${statusStyle[value] || "bg-slate-100"}`}
    >
      {statusOptions.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

export default function TaskBoardCom({ initialTasks }) {
  const [role, setRole] = useState("annotator");
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState(initialTasks || []);

 
  const updateStatus = async (id, status) => {
    const res = await updateTaskStatus(id, status);
    if (res?.success) {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status } : task
        )
      );
    }
  };


  const totalTasks = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;
  
  const progressPercent = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  
  const totalPages = Math.ceil(totalTasks / PAGE_SIZE);
  const paginatedTasks = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Task Board</h1>
          <p className="text-sm text-slate-500">
            {role === "annotator" ? "Manage and update your assigned tasks" : "Read-only project insights & metrics"}
          </p>
        </div>

        {/* Role Toggle Button */}
        <div className="flex items-center bg-slate-100 rounded-full p-1 gap-1 border border-slate-200">
          <button
            onClick={() => setRole("annotator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              role === "annotator"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserRound size={15} />
            Annotator
          </button>

          <button
            onClick={() => setRole("client")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              role === "client"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BriefcaseBusiness size={15} />
            Client
          </button>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BASED ON ROLE */}
      {role === "client" ? (
        /* ================= CLIENT VIEW (SUMMARY) ================= */
        <div className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Tasks</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{totalTasks}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-400">
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Pending</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{pendingCount}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-sky-400">
              <p className="text-xs font-medium text-sky-600 uppercase tracking-wider">In Progress</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{inProgressCount}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-400">
              <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Done</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{doneCount}</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Overall Project Progress</h3>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ================= ANNOTATOR VIEW (EDITABLE TABLE) ================= */
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 text-sm">My Tasks</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
                {totalTasks} total
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-600 font-medium">
                  <th className="px-5 py-3">Task Name</th>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.length > 0 ? (
                  paginatedTasks.map((row) => (
                    <tr key={row._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-700">{row.title}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.projectName}</td>
                      <td className="px-5 py-3.5 capitalize">
                        <StatusBadge 
                          value={row.status} 
                          editable={true} 
                          onChange={(newStatus) => updateStatus(row._id, newStatus)} 
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-5 py-8 text-center text-slate-400">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs text-slate-500">
                Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, totalTasks)} of {totalTasks}
              </span>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                      page === n ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400 bg-slate-50">
            <Info size={13} className="text-indigo-500" />
            <span>As an <strong>Annotator</strong>, you can update statuses. Switch to <strong>Client</strong> mode for analytics.</span>
          </div>
        </div>
      )}
    </div>
  );
}