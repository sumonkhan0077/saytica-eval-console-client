import { RefreshCw, Search, X } from "lucide-react";


const ModelLeaderBoard = () => {
    return (
        <div>
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
    </div>
    );
};

export default ModelLeaderBoard;