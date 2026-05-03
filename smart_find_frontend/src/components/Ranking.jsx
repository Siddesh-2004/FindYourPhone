import RankingCard from "./RankingCard";

// ─── Ranking Component ─────────────────────────────────────────────────────────
// Props:
//   recommendations : raw phone array from backend
//   activeId        : string (_id of selected phone)
//   onSelect        : (_id) => void

export default function Ranking({ recommendations = [], activeId, onSelect }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        .custom-scrollbar::-webkit-scrollbar       { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
      `}</style>

      <aside
        style={{
          width: "380px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(199,196,215,0.3)",
          background: "#ffffff",
          boxShadow: "1px 0 4px rgba(0,0,0,0.04)",
          height: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(199,196,215,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#111827",
              margin: 0,
            }}
          >
            Top {recommendations.length} Matches
          </h2>
          <span
            style={{
              background: "rgba(70,72,212,0.08)",
              color: "#4648d4",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              padding: "4px 12px",
              borderRadius: 999,
            }}
          >
            {recommendations.length} results
          </span>
        </div>

        {/* Scrollable list */}
        <div
          className="custom-scrollbar"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {recommendations.map((phone, i) => (
            <RankingCard
              key={phone._id}
              rank={i + 1}
              phone={phone}
              isActive={activeId === phone._id}
              onClick={() => onSelect(phone._id)}
            />
          ))}
        </div>
      </aside>
    </>
  );
}