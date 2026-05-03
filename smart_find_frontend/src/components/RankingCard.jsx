// ─── RankingCard Component ─────────────────────────────────────────────────────
// Props:
//   rank     : number
//   phone    : raw phone object from backend
//   isActive : boolean
//   onClick  : () => void

export default function RankingCard({ rank, phone, isActive, onClick }) {
  const rankLabel = String(rank).padStart(2, "0");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .ranking-card { transition: border-color 0.18s, background 0.18s, box-shadow 0.18s; }
        .ranking-card:hover { border-color: rgba(70,72,212,0.5) !important; background: #f2f4f6 !important; }
      `}</style>

      <div
        onClick={onClick}
        className="ranking-card group relative cursor-pointer rounded-xl p-5"
        style={{
          background: isActive ? "rgba(70,72,212,0.05)" : "#ffffff",
          border: isActive ? "2px solid #4648d4" : "1px solid rgba(199,196,215,0.3)",
          boxShadow: isActive ? "0 0 15px rgba(99,102,241,0.1)" : undefined,
        }}
      >
        {/* Top row: rank + score */}
        <div className="flex justify-between items-start mb-2">
          <span
            className="text-2xl font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: isActive ? "#4648d4" : "rgba(70,72,212,0.4)",
            }}
          >
            {rankLabel}
          </span>
          <div className="flex flex-col items-end">
            <span
              className="font-bold text-lg leading-none"
              style={{ color: isActive ? "#4648d4" : "#191c1e" }}
            >
              {Math.round(phone.match_score)}%
            </span>
            <span
              className="text-[10px] uppercase font-bold tracking-widest mt-0.5"
              style={{ color: isActive ? "rgba(70,72,212,0.6)" : "rgba(70,69,84,0.4)" }}
            >
              Match Score
            </span>
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-base font-semibold text-gray-900 mb-1 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {phone.name}
        </h3>

        {/* Tagline — company · OS · price */}
        <p className="text-sm" style={{ color: "#464554", fontFamily: "'Inter', sans-serif" }}>
          {phone.company} · {phone.os_brand} · ₹{phone.price.toLocaleString("en-IN")}
        </p>

        {/* Forward arrow on active */}
        {isActive && (
          <div className="absolute right-4 bottom-4">
            <span className="material-symbols-outlined text-indigo-600">arrow_forward_ios</span>
          </div>
        )}
      </div>
    </>
  );
}