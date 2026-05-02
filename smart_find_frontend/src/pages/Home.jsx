const PHONE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCSndcAYjhxuN38AIhkJgiGQM3n7d7_8R8Ki8QZB8jvqkpimb2-yJizQrLICGDKPabcp3JVNQGx1Wx1kgRm9zmGvSrafIgHPhjiwSaF8NM2ulpX7G_mEtQn0d-bozoJj5fe_Xy5ajcX7_s0llSvptcpjY_2O3vxtRFEg63TwOkcpY0M1X-D5z0EOdy4nhNR2UlbWHpMbPS4bH92CUvMLabNYdOkH9TP7z8yR6c8otmMqF_2122_h39Zz2cmXYG5q2Hn8ZCvDc-bJTsQ";
const LAPTOP_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDtouFeHoOUozdqcB2Uh0k78QADOFWdMmzcG_wUBgcRkgEkkEtLRGzXtEra--VUhK_C_tQ1xnWY6nZh2ZalTBVGirpitwW5THE7k-kOkQj2ikvGJj978iMuRt2EE0RzUoM0fd7i6Dw14Y-MES9A9snwRiqoV0W6TAhYYPagtgQPPmAyq-SgvadZLFCJG75g0jA58Z4G4dZlQc3JRaGoDfOEWJe8ytprF8dpq9lL96EqfzdxqkjtrsLBR0NC8_YIP8YyoUho98rjcjvY";

export default function DeviceSelector() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;600&display=swap');
        .glow-indigo { box-shadow: 0 0 40px rgba(99, 102, 241, 0.25); }
        .glow-slate  { box-shadow: 0 0 40px rgba(71, 85, 105, 0.25); }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-6 md:p-12"
        style={{ background: "#f7f9fb", fontFamily: "'Inter', sans-serif" }}
      >
        <main className="max-w-6xl mx-auto w-full py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ── Phone Card ── */}
            <section className="group relative bg-indigo-950 rounded-[2.5rem] overflow-hidden border border-indigo-500/30 flex flex-col min-h-[500px]">
              {/* Gradients / glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-transparent" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                style={{ background: "rgba(99,102,241,0.20)", filter: "blur(80px)" }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-6 md:p-20 text-center">
                {/* Icon wrapper */}
                <div
                  className="glow-indigo mb-6 p-4 rounded-full border border-indigo-400/20 group-hover:scale-105 transition-transform duration-500"
                  style={{ background: "rgba(99,102,241,0.10)" }}
                >
                  <img
                    src={PHONE_IMG}
                    alt="Find My Phone"
                    className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                  />
                </div>

                <h2
                  className="text-white mb-3 text-3xl font-bold"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Find My Phone
                </h2>
                <p className="text-indigo-200 text-base max-w-xs mb-6 opacity-80 leading-relaxed">
                  Locate your mobile device in seconds with AI-powered precision tracking.
                </p>
                <button className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl border border-indigo-400/50 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-indigo-900/40 text-lg">
                  Track Now
                </button>
              </div>
            </section>

            {/* ── Laptop Card ── */}
            <section className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-700/50 flex flex-col min-h-[500px]">
              {/* Gradients / glow */}
              <div className="absolute inset-0 bg-gradient-to-bl from-slate-800/50 to-transparent" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                style={{ background: "rgba(100,116,139,0.20)", filter: "blur(80px)" }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-6 md:p-20 text-center">
                {/* Icon wrapper */}
                <div
                  className="glow-slate mb-6 p-4 rounded-full border border-slate-400/20 group-hover:scale-105 transition-transform duration-500"
                  style={{ background: "rgba(100,116,139,0.10)" }}
                >
                  <img
                    src={LAPTOP_IMG}
                    alt="Find My Laptop"
                    className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
                  />
                </div>

                <h2
                  className="text-white mb-3 text-3xl font-bold"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Find My Laptop
                </h2>
                <p className="text-slate-300 text-base max-w-xs mb-6 opacity-80 leading-relaxed">
                  Never lose your workstation. Real-time location pings and remote security.
                </p>
                <button className="w-full md:w-auto px-10 py-4 bg-slate-100 text-slate-950 font-bold rounded-xl border border-slate-300 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/40 text-lg">
                  Secure Device
                </button>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}