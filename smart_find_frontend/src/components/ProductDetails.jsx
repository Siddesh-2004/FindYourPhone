// ─── ProductDetails Component ──────────────────────────────────────────────────
// Props:
//   phone : raw phone object from backend

export default function ProductDetails({ phone }) {
  if (!phone) return null;

  // Build specs array from raw phone fields
  const specs = [
    {
      icon: "memory",
      label: "Processor",
      value: phone.processor,
      sub: `${phone.core} · ${phone.frequency} GHz`,
    },
    {
      icon: "camera_enhance",
      label: "Camera",
      value: phone.rear_camera,
      sub: `Front: ${phone.front_camera}`,
    },
    {
      icon: "battery_charging_full",
      label: "Battery",
      value: `${phone.battery} mAh`,
      sub: `${phone.fast_charging}W fast charging`,
    },
    {
      icon: "developer_board",
      label: "RAM & Storage",
      value: `${phone.ram} GB RAM`,
      sub: phone.ram_inbuilt,
    },
    {
      icon: "screen_rotation",
      label: "Display",
      value: `${phone.display_size}" · ${phone.display_hz}Hz`,
      sub: phone.display_pixels,
    },
    {
      icon: "sim_card",
      label: "SIM & Network",
      value: phone.sim,
      sub: [phone["5G"] ? "5G" : null, phone["4G"] ? "4G" : null, phone.NFC ? "NFC" : null]
        .filter(Boolean)
        .join(" · "),
    },
  ];

  // Build feature badges
  const badges = [
    { label: "5G",     active: phone["5G"]    },
    { label: "4G",     active: phone["4G"]    },
    { label: "NFC",    active: phone.NFC      },
    { label: "VoLTE",  active: phone.VoLTE    },
  ].filter((b) => b.active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .custom-scrollbar::-webkit-scrollbar       { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
        .spec-card { transition: box-shadow 0.18s, transform 0.18s; }
        .spec-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(70,72,212,0.08) !important; }
      `}</style>

      <section
        className="custom-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "40px 48px", background: "#f9f9fc" }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>

          {/* ── Hero Card ── */}
          <div style={{
            background: "#ffffff",
            borderRadius: 24,
            border: "1px solid rgba(199,196,215,0.3)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            padding: "36px 40px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>

              {/* Left: info */}
              <div>
                {/* Company badge */}
                <span style={{
                  display: "inline-block",
                  background: "rgba(70,72,212,0.08)",
                  color: "#4648d4",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, fontSize: 12,
                  padding: "4px 12px", borderRadius: 999,
                  marginBottom: 12,
                }}>
                  {phone.company} · {phone.os_brand} {phone.os_version}
                </span>

                <h1 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800, fontSize: 36,
                  color: "#111827", lineHeight: 1.15,
                  letterSpacing: "-0.02em", marginBottom: 14,
                }}>
                  {phone.name}
                </h1>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: 30, color: "#4648d4",
                  }}>
                    ₹{phone.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Match score pill */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg,#4648d4,#6063ee)",
                  color: "#fff", borderRadius: 999,
                  padding: "8px 18px", marginBottom: 20,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>
                    {Math.round(phone.match_score)}% Match Score
                  </span>
                </div>

                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
                  <span className="material-symbols-outlined" style={{ color: "#f59e0b", fontSize: 20 }}>star</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: "#111827" }}>
                    {phone.rating} / 5
                  </span>
                </div>

                {/* Network badges */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {badges.map((b) => (
                    <span key={b.label} style={{
                      background: "rgba(70,72,212,0.07)",
                      color: "#4648d4",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700, fontSize: 11,
                      padding: "3px 10px", borderRadius: 999,
                      border: "1px solid rgba(70,72,212,0.15)",
                    }}>
                      {b.label}
                    </span>
                  ))}
                  {phone.punch_hole && (
                    <span style={{
                      background: "rgba(16,185,129,0.07)", color: "#059669",
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11,
                      padding: "3px 10px", borderRadius: 999,
                      border: "1px solid rgba(16,185,129,0.15)",
                    }}>
                      Punch Hole
                    </span>
                  )}
                </div>
              </div>

              {/* Right: image */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  src={phone.img}
                  alt={phone.name}
                  style={{ maxHeight: 320, objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))" }}
                />
              </div>
            </div>
          </div>

          {/* ── Specs Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="spec-card"
                style={{
                  background: "#ffffff", borderRadius: 16, padding: "20px 22px",
                  border: "1px solid rgba(199,196,215,0.25)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#4648d4", marginBottom: 10 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{spec.icon}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 700,
                    fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em",
                  }}>
                    {spec.label}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                  fontSize: 14, color: "#111827", margin: "0 0 4px", lineHeight: 1.3,
                }}>
                  {spec.value}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6b7280", margin: 0 }}>
                  {spec.sub}
                </p>
              </div>
            ))}
          </div>

          {/* ── Extra Details ── */}
          <div style={{
            background: "#ffffff", borderRadius: 20, padding: "28px 32px",
            border: "1px solid rgba(199,196,215,0.25)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px",
          }}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
              fontSize: 16, color: "#111827", margin: "0 0 16px",
              gridColumn: "1 / -1",
            }}>
              More Details
            </h3>
            {[
              { label: "Memory Card",  value: phone.memory_card },
              { label: "Extended Upto", value: phone.extended_upto ?? "Not Supported" },
              { label: "Punch Hole",   value: phone.punch_hole ? "Yes" : "No" },
              { label: "Specs Score",  value: `${phone.specs_score} / 100` },
            ].map((row) => (
              <div key={row.label}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af", margin: "0 0 3px" }}>
                  {row.label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}