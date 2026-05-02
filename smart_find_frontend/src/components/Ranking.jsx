import { useState } from "react";
import RankingCard from "./RankingCard";

// ─── Default Data ──────────────────────────────────────────────────────────────
const DEFAULT_MATCHES = [
  { id: "nexgen-pro-x1",     rank: 1,  name: "NexGen Pro X1",      tagline: "Best for Photography & Power",    score: 98 },
  { id: "lumina-ultra-5g",   rank: 2,  name: "Lumina Ultra 5G",    tagline: "Optimized for Creator Workflow",  score: 94 },
  { id: "titan-slate-m1",    rank: 3,  name: "Titan Slate M1",     tagline: "Industrial Grade Durability",     score: 91 },
  { id: "zenith-flow-fold",  rank: 4,  name: "Zenith Flow Fold",   tagline: "Multitasking Revolution",         score: 89 },
  { id: "aura-beam-14",      rank: 5,  name: "Aura Beam 14",       tagline: "Minimalist Aesthetic Leader",     score: 87 },
  { id: "pixel-nova-pro",    rank: 6,  name: "Pixel Nova Pro",     tagline: "Pure Android Experience",         score: 84 },
  { id: "vortex-edge-s",     rank: 7,  name: "Vortex Edge S",      tagline: "Gaming-First Performance",        score: 81 },
  { id: "solaris-x200",      rank: 8,  name: "Solaris X200",       tagline: "Best-in-Class Battery Life",      score: 78 },
  { id: "helix-snap-9",      rank: 9,  name: "Helix Snap 9",       tagline: "Budget Flagship Champion",        score: 75 },
  { id: "drift-one-plus",    rank: 10, name: "Drift One Plus",     tagline: "Compact Powerhouse",              score: 72 },
];

// ─── Ranking Component ─────────────────────────────────────────────────────────
// Props:
//   matches         : Array<{ id, rank, name, tagline, score }>
//   activeId        : string        — id of the currently selected match
//   onSelect        : (id) => void  — called when a card is clicked
//   title           : string        — panel heading

export default function Ranking({
  matches  = DEFAULT_MATCHES,
  activeId = DEFAULT_MATCHES[0].id,
  onSelect = () => {},
  title    = "Top 10 Matches",
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        .custom-scrollbar::-webkit-scrollbar       { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
      `}</style>

      <aside
        className="w-full md:w-[400px] flex flex-col border-r z-10"
        style={{
          borderColor: "rgba(199,196,215,0.3)",
          background: "#ffffff",
          boxShadow: "1px 0 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* ── Panel Header ── */}
        <div
          className="px-6 py-5 border-b flex justify-between items-center"
          style={{ borderColor: "rgba(199,196,215,0.2)", background: "#ffffff" }}
        >
          <h2
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h2>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{
              background: "rgba(70,72,212,0.08)",
              color: "#4648d4",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {matches.length} results
          </span>
        </div>

        {/* ── Scrollable Cards List ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          {matches.map((match) => (
            <RankingCard
              key={match.id}
              rank={match.rank}
              name={match.name}
              tagline={match.tagline}
              score={match.score}
              isActive={activeId === match.id}
              onClick={() => onSelect(match.id)}
            />
          ))}
        </div>
      </aside>
    </>
  );
}