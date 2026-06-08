"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  RefreshCw,
} from "lucide-react";

const providers = (data) => [
  "All Providers",
  ...new Set(data.map((d) => d.provider)),
];

const modelTypes = ["All Models", "Mini", "7B", "13B", "Max", "Lite"];

function accuracyColor(val) {
  if (val === null) return "text-slate-400";
  if (val >= 0.85) return "text-green-500";
  if (val >= 0.75) return "text-orange-400";
  return "text-red-400";
}

function latencyColor(val) {
  if (val === null) return "text-slate-400";
  if (val >= 1000) return "text-red-400";
  return "text-slate-700";
}

function costColor(val) {
  if (val === null) return "text-slate-400";
  if (val >= 1.0) return "text-red-400";
  return "text-green-500";
}

function SortIcon({ column, sortKey, direction }) {
  if (sortKey !== column)
    return <ArrowUpDown size={13} className="text-slate-400 inline ml-1" />;

  return direction === "asc" ? (
    <ArrowUp size={13} className="text-indigo-500 inline ml-1" />
  ) : (
    <ArrowDown size={13} className="text-indigo-500 inline ml-1" />
  );
}

export default function ModelLeaderBoard({ initialTasks = [] }) {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All Providers");
  const [modelType, setModelType] = useState("All Models");
  const [sort, setSort] = useState({ key: "accuracy", dir: "desc" });

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );
  };

  // ✅ MAIN FIX: use backend data
  const data = useMemo(() => {
    let rows = [...initialTasks];

    if (search) {
      rows = rows.filter(
        (r) =>
          r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.provider?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (provider !== "All Providers") {
      rows = rows.filter((r) => r.provider === provider);
    }

    if (modelType !== "All Models") {
      rows = rows.filter((r) => r.name?.includes(modelType));
    }

    rows.sort((a, b) => {
      const av = a[sort.key] ?? -Infinity;
      const bv = b[sort.key] ?? -Infinity;

      return sort.dir === "asc" ? av - bv : bv - av;
    });

    return rows;
  }, [initialTasks, search, provider, modelType, sort]);

  const clear = () => {
    setSearch("");
    setProvider("All Providers");
    setModelType("All Models");
  };

  const providerList = providers(initialTasks);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Model Leaderboard
          </h1>
          <p className="text-sm text-slate-500">
            Compare performance of different AI models
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <RefreshCw size={13} />
          Live data from backend
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#e4e4e46a] p-4 rounded-2xl space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search model or provider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white w-56"
            />
          </div>

          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white"
          >
            {providerList.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white"
          >
            {modelTypes.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <button
            onClick={clear}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white"
          >
            <X size={13} /> Clear
          </button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100">
                {[
                  { label: "Model", key: "name" },
                  { label: "Provider", key: "provider" },
                  { label: "Accuracy", key: "accuracy" },
                  { label: "Latency (ms)", key: "latencyMs" },
                  { label: "Cost per 1K (USD)", key: "costPer1k" },
                  { label: "Evaluated At", key: "evaluatedAt" },
                ].map(({ label, key }) => (
                  <th
                    key={label}
                    onClick={() => key && toggleSort(key)}
                    className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase cursor-pointer"
                  >
                    {label}
                    {key && (
                      <SortIcon
                        column={key}
                        sortKey={sort.key}
                        direction={sort.dir}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row._id || i}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {row.name}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {row.provider}
                  </td>

                  <td className={`px-5 py-4 ${accuracyColor(row.accuracy)}`}>
                    {row.accuracy ?? "—"}
                  </td>

                  <td className={`px-5 py-4 ${latencyColor(row.latencyMs)}`}>
                    {row.latencyMs ?? "—"}
                  </td>

                  <td className={`px-5 py-4 ${costColor(row.costPer1k)}`}>
                    {row.costPer1k
                      ? `$${row.costPer1k.toFixed(2)}`
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {row.evaluatedAt}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No models found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}