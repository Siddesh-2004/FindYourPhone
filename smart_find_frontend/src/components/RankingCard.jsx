// ─── RankingCard Component ─────────────────────────────────────────────────────
// Props:
//   rank        : number        — position (1, 2, 3 …)
//   name        : string        — device name
//   tagline     : string        — short descriptor
//   score       : number        — match score (0–100)
//   isActive    : boolean       — whether this card is currently selected
//   onClick     : () => void    — callback when card is clicked

const DEFAULT_PROPS = {
  rank: 1,
  name: "NexGen Pro X1",
  tagline: "Best for Photography & Power",
  score: 98,
  isActive: true,
  onClick: () => {},
};

export default function RankingCard({
  rank     = DEFAULT_PROPS.rank,
  name     = DEFAULT_PROPS.name,
  tagline  = DEFAULT_PROPS.tagline,
  score    = DEFAULT_PROPS.score,
  isActive = DEFAULT_PROPS.isActive,
  onClick  = DEFAULT_PROPS.onClick,
}) {
  const rankLabel = String(rank).padStart(2, "0"); // "01", "02" …

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}</style>

      <div
        onClick={onClick}
        className="group relative cursor-pointer rounded-xl p-6 transition-all duration-200"
        style={{
          background: isActive ? "rgba(70,72,212,0.05)" : "#ffffff",
          border: isActive ? "2px solid #4648d4" : "1px solid rgba(199,196,215,0.3)",
          boxShadow: isActive
            ? "0 0 15px rgba(99,102,241,0.1)"
            : undefined,
        }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.borderColor = "rgba(70,72,212,0.5)";
            e.currentTarget.style.background = "#f2f4f6";
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.borderColor = "rgba(199,196,215,0.3)";
            e.currentTarget.style.background = "#ffffff";
          }
        }}
      >
        {/* Top row: rank + score */}
        <div className="flex justify-between items-start mb-2">
          {/* Rank number */}
          <span
            className="text-2xl font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: isActive ? "#4648d4" : "rgba(70,72,212,0.4)",
            }}
          >
            {rankLabel}
          </span>

          {/* Score */}
          <div className="flex flex-col items-end">
            <span
              className="font-bold text-lg leading-none"
              style={{ color: isActive ? "#4648d4" : "#191c1e" }}
            >
              {score}%
            </span>
            <span
              className="text-[10px] uppercase font-bold tracking-widest mt-0.5"
              style={{ color: isActive ? "rgba(70,72,212,0.6)" : "rgba(70,69,84,0.4)" }}
            >
              Match Score
            </span>
          </div>
        </div>

        {/* Device name */}
        <h3
          className="text-base font-semibold text-gray-900 mb-1 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </h3>

        {/* Tagline */}
        <p className="text-sm" style={{ color: "#464554", fontFamily: "'Inter', sans-serif" }}>
          {tagline}
        </p>

        {/* Forward arrow — only on active */}
        {isActive && (
          <div className="absolute right-4 bottom-4">
            <span className="material-symbols-outlined text-indigo-600">arrow_forward_ios</span>
          </div>
        )}
      </div>
    </>
  );
}