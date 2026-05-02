// ─── ProductDetails Component ──────────────────────────────────────────────────
// Props:
//   product : {
//     id          : string
//     name        : string
//     price       : string
//     originalPrice: string (optional)
//     image       : string  (url)
//     description : string
//     specs       : Array<{ icon, label, value, sub }>
//     insights    : Array<{ icon, title, body }>
//     verdict     : string
//   }

const DEFAULT_PRODUCT = {
  id: "nexgen-pro-x1",
  name: "NexGen Pro X1",
  price: "$1,199.00",
  originalPrice: "$1,349.00",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZOQxev2dz7wW6hiPnWT39SzAEfvwS990N-0O3sveeTcePvk_Ah6SQA8XWrR1GNlpKIuDiP_IlWAkgewWV-4hN16YADL5bwkJLuznjJzz_ItyL7vHlwOXuuJeVy50NngTo9xWtcBJepkH_AydADToe7Pw-56FskKUlX_XOqu93AVZw3QL1qNEQkdMnGur6P5SWm7wygUfOUPq5MHNYsAwuPguFHBfMDnxEMujwrMCuPNJdiphey6uVWOR02UYMcEp0ODdxwVCEKpO2",
  description:
    "The NexGen Pro X1 is engineered for those who demand uncompromising performance. With an AI-driven triple-lens system and the latest hyper-efficient silicon, it aligns perfectly with your requirements for high-end mobile photography and heavy multitasking.",
  specs: [
    { icon: "memory",                label: "Processor", value: "Snapdragon 8 Gen 3",  sub: "Hyper-threaded AI processing" },
    { icon: "camera_enhance",        label: "Camera",    value: "200MP Triple Array",   sub: "Periscope zoom & Night vision" },
    { icon: "battery_charging_full", label: "Battery",   value: "5500mAh / 120W",       sub: "Full charge in 18 minutes" },
  ],
  insights: [
    {
      icon: "photo_camera",
      title: "Photography Priority",
      body: "Based on your upload of 'Landscape Photography', this sensor offers the best dynamic range in its class.",
    },
    {
      icon: "speed",
      title: "Power-User Profile",
      body: "Your multi-app usage data suggests you need at least 12GB of RAM; this device provides 16GB.",
    },
  ],
  verdict:
    "The NexGen Pro X1 outperforms 98% of alternatives for your specific blend of media consumption and professional photography. While more expensive than your base budget, the 3-year residual value makes it a superior investment.",
};

export default function ProductDetails({ product = DEFAULT_PRODUCT }) {
  const {
    name,
    price,
    originalPrice,
    image,
    description,
    specs  = [],
    insights = [],
    verdict,
  } = product;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .custom-scrollbar::-webkit-scrollbar       { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
      `}</style>

      <section
        className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-20"
        style={{ background: "#ffffff" }}
      >
        <div className="max-w-3xl mx-auto space-y-8">

          {/* ── Hero Card ── */}
          <div
            className="rounded-[2rem] p-8 md:p-12"
            style={{ background: "#ffffff", border: "1px solid rgba(199,196,215,0.3)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div className="order-2 md:order-1">
                <h1
                  className="text-5xl font-extrabold text-gray-900 mb-3 leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
                >
                  {name}
                </h1>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#4648d4", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {price}
                  </span>
                  {originalPrice && (
                    <span
                      className="text-base line-through"
                      style={{ color: "#767586", fontFamily: "'Inter', sans-serif" }}
                    >
                      {originalPrice}
                    </span>
                  )}
                </div>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#464554", fontFamily: "'Inter', sans-serif" }}
                >
                  {description}
                </p>
              </div>

              {/* Right: image */}
              <div className="order-1 md:order-2 flex items-center justify-center">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-auto max-h-[420px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* ── Specs Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="p-6 rounded-xl"
                style={{ background: "#ffffff", border: "1px solid rgba(199,196,215,0.2)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-2 mb-3" style={{ color: "#4648d4" }}>
                  <span className="material-symbols-outlined">{spec.icon}</span>
                  <span
                    className="text-xs uppercase font-semibold tracking-widest"
                    style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {spec.label}
                  </span>
                </div>
                <h4
                  className="text-lg font-semibold text-gray-900 leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {spec.value}
                </h4>
                <p
                  className="text-sm mt-1"
                  style={{ color: "#464554", fontFamily: "'Inter', sans-serif" }}
                >
                  {spec.sub}
                </p>
              </div>
            ))}
          </div>

          {/* ── SmartFind Intelligence Report ── */}
          <div
            className="p-8 md:p-12 rounded-2xl text-white"
            style={{ background: "linear-gradient(135deg, #4648d4 0%, #6063ee 100%)" }}
          >
            {/* Report header */}
            <h3
              className="text-2xl font-bold mb-8 flex items-center gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              SmartFind Intelligence Report
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Insights list */}
              <div className="space-y-6">
                {insights.map((insight) => (
                  <div key={insight.title} className="flex items-start gap-6">
                    <span
                      className="material-symbols-outlined p-2 rounded-lg shrink-0"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      {insight.icon}
                    </span>
                    <div>
                      <h5
                        className="font-bold mb-1"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {insight.title}
                      </h5>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif" }}
                      >
                        {insight.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Verdict box */}
              <div
                className="p-6 rounded-xl"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
              >
                <h5
                  className="font-bold mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  AI Verdict
                </h5>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Inter', sans-serif" }}
                >
                  "{verdict}"
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}