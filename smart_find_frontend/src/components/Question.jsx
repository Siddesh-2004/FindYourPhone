import { useState } from "react";

// ─── QuestionPage Component ────────────────────────────────────────────────────
// Props (all optional — defaults provided):
//   question      : string         — the question text
//   options       : Array<{ id, label, description }>
//   progress      : number (0–100) — progress bar percentage
//   deviceType    : string         — shown in the top badge (e.g. "Phone Finder")
//   deviceIcon    : string         — Material Symbol icon name for badge
//   onBack        : () => void
//   onNext        : (selectedId) => void

const DEFAULT_OPTIONS = [
  { id: "photo",      label: "Photography & Video",  description: "Professional lenses and 8K recording" },
  { id: "gaming",     label: "Gaming",                description: "High refresh rates and powerful GPU" },
  { id: "productivity", label: "Daily Productivity",  description: "Multitasking, email, and long battery" },
  { id: "basic",      label: "Basic Social & Calls",  description: "Light usage, messaging, and simplicity" },
];

export default function Question({
  question    = "What is your primary use case?",
  options     = DEFAULT_OPTIONS,
  progress    = 30,
  deviceType  = "Phone Finder",
  deviceIcon  = "smartphone",
  onBack      = () => {},
  onNext      = () => {},
}) {
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected !== null) onNext(selected);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .glass-card {
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226,232,240,0.5);
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center relative overflow-hidden"
        style={{ background: "#f7f9fb", fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Background Decoration ── */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{ top: "-10%", left: "-10%", width: "50%", height: "50%", background: "rgba(199,210,254,0.3)", filter: "blur(120px)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "rgba(233,213,255,0.2)", filter: "blur(100px)" }}
          />
        </div>

        {/* ── Progress Bar ── */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[60]">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ── Header ── */}
        <header
          className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto border-b border-slate-200/50"
          style={{ backdropFilter: "blur(20px)", background: "rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(99,102,241,0.05)" }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">devices</span>
            <span
              className="text-xl font-extrabold tracking-tighter text-slate-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              SmartFind
            </span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
            <span className="material-symbols-outlined text-indigo-600" style={{ fontSize: "16px" }}>{deviceIcon}</span>
            <span
              className="text-sm font-semibold text-indigo-600"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {deviceType}
            </span>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="flex-1 w-full px-6 pt-32 pb-12 flex flex-col justify-center gap-2 max-w-3xl">
          {/* Question */}
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold text-slate-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              {question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid gap-3 grid-cols-2">
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  className="flex items-center gap-6 glass-card rounded-xl hover:scale-[1.02] transition-all duration-300 p-4 text-left"
                  style={{
                    border: isSelected ? "2px solid #4648d4" : "1px solid rgba(226,232,240,0.5)",
                    boxShadow: isSelected
                      ? "0 4px 20px rgba(99,102,241,0.12)"
                      : "0 4px 20px rgba(99,102,241,0.05)",
                  }}
                >
                  {/* Radio indicator */}
                  <div
                    className="w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: isSelected ? "#4648d4" : "#cbd5e1" }}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full" style={{ background: "#4648d4" }} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 mb-0 leading-snug">{opt.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#464554" }}>{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        {/* ── Back Button ── */}
        <button
          onClick={onBack}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-2 p-4 rounded-full border border-slate-200 hover:scale-110 transition-all duration-300 text-indigo-600"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
        </button>

        {/* ── Next Button ── */}
        <button
          onClick={handleNext}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-2 p-6 rounded-full text-white hover:scale-110 active:scale-95 transition-all duration-300"
          style={{
            background: "#4648d4",
            boxShadow: "0 10px 25px -5px rgba(70,72,212,0.4)",
            opacity: selected ? 1 : 0.6,
            cursor: selected ? "pointer" : "not-allowed",
          }}
        >
          <span className="material-symbols-outlined text-3xl">arrow_forward</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Next</span>
        </button>
      </div>
    </>
  );
}