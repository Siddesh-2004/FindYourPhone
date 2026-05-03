import { useState, useEffect, useRef } from "react";

/**
 * Question
 * ─────────────────────────────────────────────────────────────────
 * Props:
 *   question    : string
 *   options     : Array<{ label, value, description? }>
 *   type        : "single" | "multi"   — radio vs checkbox
 *   progress    : number (0–100)
 *   deviceType  : string
 *   deviceIcon  : string  (Material Symbol name)
 *   questionNum : number  (used to key the slide animation)
 *   isLast      : boolean — shows Submit button instead of Next arrow
 *   onBack      : () => void
 *   onNext      : (value | value[]) => void
 */
export default function Question({
  question    = "What is your primary use case?",
  options     = [],
  type        = "single",
  progress    = 30,
  deviceType  = "Phone Finder",
  deviceIcon  = "smartphone",
  questionNum = 0,
  isLast      = false,
  onBack      = () => {},
  onNext      = () => {},
}) {
  const [selected, setSelected] = useState(type === "multi" ? new Set() : null);
  const [animDir,  setAnimDir]  = useState("from-right");
  const [visible,  setVisible]  = useState(false);
  const prevNum = useRef(questionNum);

  // Reset selection on question change
  useEffect(() => {
    setSelected(type === "multi" ? new Set() : null);
  }, [questionNum, type]);

  // Slide-in animation
  useEffect(() => {
    const dir = questionNum >= prevNum.current ? "from-right" : "from-left";
    prevNum.current = questionNum;
    setVisible(false);
    setAnimDir(dir);
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [questionNum]);

  const hasSelection = type === "multi" ? selected.size > 0 : selected !== null;

  const isChosen = (value) =>
    type === "single" ? selected === value : selected.has(value);

  const toggle = (value) => {
    if (type === "single") {
      setSelected(value);
      // Auto-advance after a 260ms flash so the user sees their selection highlight
      // Exception: last question — they need to click Submit explicitly
      if (!isLast) {
        setTimeout(() => onNext(value), 260);
      }
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
      });
    }
  };

  const handleNext = () => {
    if (!hasSelection) return;
    const payload = type === "multi" ? [...selected] : selected;
    onNext(payload);
  };

  const cols = options.length <= 3 ? 1 : 2;

  // Show an explicit action button only for multi-select or the last question.
  // single (non-last) auto-advances on tap — no button needed.
  const showActionBtn = type === "multi" || isLast;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .msym {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
          font-style: normal;
        }
        .q-card {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(14px);
          border: 1.5px solid rgba(220,224,255,0.55);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.18s;
        }
        .q-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(80,82,220,0.10); }
        .q-card.chosen {
          border-color: #4648d4;
          background: rgba(240,241,255,0.92);
          box-shadow: 0 4px 22px rgba(70,72,212,0.14);
        }
        .q-slide { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.4,0,.2,1); }
        .q-slide.hidden.from-right { opacity: 0; transform: translateX(48px); }
        .q-slide.hidden.from-left  { opacity: 0; transform: translateX(-48px); }
        .q-slide.shown             { opacity: 1; transform: translateX(0); }
        .prog-bar { transition: width 0.55s cubic-bezier(.4,0,.2,1); }
        .indicator {
          width: 22px; height: 22px; flex-shrink: 0;
          border: 2px solid #cbd5e1;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.18s, background 0.18s;
        }
        .indicator.single { border-radius: 50%; }
        .indicator.multi  { border-radius: 5px; }
        .indicator.active { border-color: #4648d4; background: #4648d4; }
        .back-btn { transition: transform 0.18s; }
        .back-btn:hover { transform: scale(1.08); }
        .next-arrow-btn { transition: opacity 0.2s, transform 0.18s, box-shadow 0.2s; }
        .next-arrow-btn:hover:not(:disabled) { transform: scale(1.07) translateY(-50%); }
        .next-arrow-btn:active:not(:disabled) { transform: scale(0.96) translateY(-50%); }
        .submit-btn { transition: opacity 0.2s, transform 0.18s, box-shadow 0.2s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); }
        .submit-btn:active:not(:disabled) { transform: scale(0.97); }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#f4f5fb",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Ambient blobs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-12%", left: "-8%", width: "45%", height: "45%", borderRadius: "50%", background: "rgba(180,190,255,0.28)", filter: "blur(110px)" }} />
          <div style={{ position: "absolute", bottom: "-12%", right: "-8%", width: "38%", height: "38%", borderRadius: "50%", background: "rgba(220,200,255,0.22)", filter: "blur(90px)" }} />
          <div style={{ position: "absolute", top: "40%", left: "55%", width: "20%", height: "20%", borderRadius: "50%", background: "rgba(160,220,255,0.15)", filter: "blur(70px)" }} />
        </div>

        {/* Progress bar */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "3px", background: "rgba(200,205,255,0.4)", zIndex: 70 }}>
          <div className="prog-bar" style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#4648d4)" }} />
        </div>

        {/* Header */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 32px",
          background: "rgba(248,249,255,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(210,215,255,0.4)",
          boxShadow: "0 2px 16px rgba(99,102,241,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="msym" style={{ color: "#4648d4", fontSize: 22 }}>devices</span>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em", color: "#1e1b4b" }}>
              SmartFind
            </span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(238,240,255,0.9)", padding: "6px 14px",
            borderRadius: 999, border: "1px solid rgba(180,185,255,0.4)",
          }}>
            <span className="msym" style={{ color: "#4648d4", fontSize: 15 }}>{deviceIcon}</span>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 13, color: "#4648d4" }}>
              {deviceType}
            </span>
          </div>
        </header>

        {/* Slide content */}
        <main
          className={`q-slide ${visible ? "shown" : `hidden ${animDir}`}`}
          style={{
            flex: 1, width: "100%", maxWidth: 700,
            padding: isLast ? "120px 24px 130px" : "120px 24px 80px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", zIndex: 1,
          }}
        >
          {/* Badge */}
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{
              fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#6366f1", background: "rgba(238,240,255,0.9)",
              padding: "4px 14px", borderRadius: 999,
              border: "1px solid rgba(180,185,255,0.5)",
            }}>
              {type === "multi" ? "Select all that apply" : "Choose one"}
            </span>
          </div>

          {/* Question text */}
          <h2 style={{
            fontFamily: "'Sora',sans-serif", fontWeight: 800,
            fontSize: "clamp(1.5rem,3vw,2rem)",
            color: "#1e1b4b", textAlign: "center", marginBottom: 32,
            lineHeight: 1.25, letterSpacing: "-0.02em",
          }}>
            {question}
          </h2>

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: cols === 2 ? "1fr 1fr" : "1fr", gap: 12 }}>
            {options.map((opt, i) => {
              const chosen = isChosen(opt.value);
              return (
                <button
                  key={i}
                  onClick={() => toggle(opt.value)}
                  className={`q-card${chosen ? " chosen" : ""}`}
                  style={{
                    borderRadius: 14, padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 14,
                    cursor: "pointer", textAlign: "left", background: "none",
                  }}
                >
                  <div className={`indicator ${type === "single" ? "single" : "multi"}${chosen ? " active" : ""}`}>
                    {chosen && type === "single" && (
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />
                    )}
                    {chosen && type === "multi" && (
                      <span className="msym" style={{ color: "#fff", fontSize: 14, lineHeight: 1 }}>check</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#1e1b4b", lineHeight: 1.3 }}>
                      {opt.label}
                    </p>
                    {opt.description && (
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>
                        {opt.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        {/* Back button */}
        <button
          className="back-btn"
          onClick={onBack}
          style={{
            position: "fixed", left: 20, top: "50%", transform: "translateY(-50%)",
            zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "14px 12px", borderRadius: 999, cursor: "pointer",
            background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(210,215,255,0.6)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
            color: "#4648d4",
          }}
        >
          <span className="msym" style={{ fontSize: 22 }}>arrow_back</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Back</span>
        </button>

        {/* ── Action button ── */}
        {showActionBtn && (
          isLast
            ? (
              /* SUBMIT — fixed bottom bar */
              <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
                padding: "16px 24px 28px",
                background: "rgba(244,245,251,0.94)",
                backdropFilter: "blur(18px)",
                borderTop: "1px solid rgba(210,215,255,0.5)",
                display: "flex", justifyContent: "center",
              }}>
                <button
                  className="submit-btn"
                  onClick={handleNext}
                  disabled={!hasSelection}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "15px 52px", borderRadius: 999,
                    background: hasSelection
                      ? "linear-gradient(135deg,#6366f1 0%,#4648d4 100%)"
                      : "#d1d5f5",
                    border: "none", color: "#fff",
                    cursor: hasSelection ? "pointer" : "not-allowed",
                    boxShadow: hasSelection ? "0 10px 32px -4px rgba(70,72,212,0.5)" : "none",
                    fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15,
                    letterSpacing: "0.06em",
                  }}
                >
                  <span className="msym" style={{ fontSize: 20 }}>check_circle</span>
                  Submit
                </button>
              </div>
            )
            : (
              /* NEXT ARROW — fixed right (multi-select only) */
              <button
                className="next-arrow-btn"
                onClick={handleNext}
                disabled={!hasSelection}
                style={{
                  position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
                  zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "20px 16px", borderRadius: 999,
                  cursor: hasSelection ? "pointer" : "not-allowed",
                  background: "#4648d4",
                  boxShadow: hasSelection ? "0 10px 28px -4px rgba(70,72,212,0.45)" : "none",
                  border: "none", color: "#fff",
                  opacity: hasSelection ? 1 : 0.45,
                }}
              >
                <span className="msym" style={{ fontSize: 28 }}>arrow_forward</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Next</span>
              </button>
            )
        )}

      </div>
    </>
  );
}