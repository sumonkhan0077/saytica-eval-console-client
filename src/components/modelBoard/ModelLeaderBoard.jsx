"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, X, RefreshCw } from "lucide-react";

const MOCK_DATA = [
  { id: 1, model: "Vox-Mini",   provider: "Vox AI",       color: "bg-violet-500", accuracy: 0.992, latency: 120,  costPer1K: 0.05,  evaluatedAt: "Aug 12, 2025" },
  { id: 2, model: "Aurora-7B",  provider: "Aurora Labs",  color: "bg-purple-500", accuracy: 0.871, latency: 842,  costPer1K: 0.40,  evaluatedAt: "Aug 10, 2025" },
  { id: 3, model: "Lingua-Max", provider: "LinguaAI",     color: "bg-green-500",  accuracy: null,  latency: 530,  costPer1K: 1.20,  evaluatedAt: "Aug 09, 2025" },
  { id: 4, model: "Nova-13B",   provider: "NovaMind",     color: "bg-sky-500",    accuracy: 0.756, latency: 1020, costPer1K: 0.31,  evaluatedAt: "Aug 11, 2025" },
  { id: 5, model: "Askly-2.1",  provider: "Askly",        color: "bg-pink-500",   accuracy: 0.702, latency: 610,  costPer1K: 0.07,  evaluatedAt: "Aug 08, 2025" },
  { id: 6, model: "Terra-Lite", provider: "TerraWorks",   color: "bg-emerald-500",accuracy: null,  latency: 310,  costPer1K: null,  evaluatedAt: "Aug 07, 2025" },
];

const providers = ["All Providers", ...new Set(MOCK_DATA.map((d) => d.provider))];
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
  if (sortKey !== column) return <ArrowUpDown size={13} className="text-slate-400 inline ml-1" />;
  return direction === "asc"
    ? <ArrowUp size={13} className="text-indigo-500 inline ml-1" />
    : <ArrowDown size={13} className="text-indigo-500 inline ml-1" />;
}

export default function ModelLeaderBoard() {
  const [search, setSearch]       = useState("");
  const [provider, setProvider]   = useState("All Providers");
  const [modelType, setModelType] = useState("All Models");
  const [sort, setSort]           = useState({ key: "accuracy", dir: "desc" });

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }
    );
  };

  const data = useMemo(() => {
    let rows = [...MOCK_DATA];

    if (search)                        rows = rows.filter((r) => r.model.toLowerCase().includes(search.toLowerCase()) || r.provider.toLowerCase().includes(search.toLowerCase()));
    if (provider !== "All Providers")  rows = rows.filter((r) => r.provider === provider);
    if (modelType !== "All Models")    rows = rows.filter((r) => r.model.includes(modelType));

    rows.sort((a, b) => {
      const av = a[sort.key] ?? -Infinity;
      const bv = b[sort.key] ?? -Infinity;
      return sort.dir === "asc" ? av - bv : bv - av;
    });

    return rows;
  }, [search, provider, modelType, sort]);

  const clear = () => { setSearch(""); setProvider("All Providers"); setModelType("All Models"); };

    return (
        <div className="space-y-4">
     {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Model Leaderboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Compare performance of different AI models</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <RefreshCw size={13} />
          Last updated: Aug 12, 2025 10:30 AM
        </div>
      </div>
<div className="bg-[#e4e4e46a] p-4 rounded-2xl space-y-2">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search model or provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 w-56"
          />
        </div>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
        >
          {providers.map((p) => <option key={p}>{p}</option>)}
        </select>

        <select
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
        >
          {modelTypes.map((m) => <option key={m}>{m}</option>)}
        </select>

        <button
          onClick={clear}
          className="flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors text-slate-600"
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
                { label: "Model",           key: null         },
                { label: "Provider",        key: null         },
                { label: "Accuracy",        key: "accuracy"   },
                { label: "Latency (ms)",    key: "latency"    },
                { label: "Cost per 1K (USD)", key: "costPer1K"},
                { label: "Evaluated At",    key: null         },
              ].map(({ label, key }) => (
                <th
                  key={label}
                  onClick={() => key && toggleSort(key)}
                  className={`px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide ${key ? "cursor-pointer hover:text-slate-700 select-none" : ""}`}
                >
                  {label}
                  {key && <SortIcon column={key} sortKey={sort.key} direction={sort.dir} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={`border-b border-slate-200 hover:bg-slate-50/70 transition-colors ${i === data.length - 1 ? "border-none" : ""}`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-md ${row.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {row.model[0]}
                    </span>
                    <span className="font-medium text-slate-800">{row.model}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-500">{row.provider}</td>
                <td className={`px-5 py-4 font-medium ${accuracyColor(row.accuracy)}`}>
                  {row.accuracy !== null ? row.accuracy.toFixed(3) : "—"}
                </td>
                <td className={`px-5 py-4 font-medium ${latencyColor(row.latency)}`}>
                  {row.latency !== null ? row.latency : "—"}
                </td>
                <td className={`px-5 py-4 font-medium ${costColor(row.costPer1K)}`}>
                  {row.costPer1K !== null ? `$${row.costPer1K.toFixed(2)}` : "—"}
                </td>
                <td className="px-5 py-4 text-slate-400">{row.evaluatedAt}</td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
                  No models match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

</div>

    </div>
    );
};

