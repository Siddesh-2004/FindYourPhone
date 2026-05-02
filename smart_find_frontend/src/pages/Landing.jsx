import { useState } from "react";

const PHONE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBsyTlslec6VxZEv1QTzZQ7pHwO8xNxx1uL4kH3I348EHGsiPtSpsSnUFYqqqh9aDSf4-ML_E5oaLSSVOgbXEpc7JH8xxGmWdqMKnBzujrz3890fUmTWKh6tYbNt8lAyGToxOgwpmnsEExETIDmgF7G8_lA3yi9hRol0Ay1cxdHcM7ETJKmAlGLNRsLJGINXg2QGSZSEGRoqN_9qN2cjdcKvNdjKEdSvN7jmz3m2uEXDfSmurVP_08PLy8mC8i0HJaLxlWVdzml2wTs";
const LAPTOP_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuB6Vib7q1k6YbOo6xAHZkjEzuESxWaU1GAuEXZfT-dhJALyqxW4fxePsEVoq-39QXLr1Xh_mxULkcFYivtFM2V2KTwKHyxlLkZuzPl447AyYUU2Zkz2qdT2gVCafN0qHjMw17XFgg4LPw9diwRKVHgvbKym0PR5jLEm7MphhqfJxaz-t7mooWX2ZOm8n1UWE77TG4UNv5LNO2kBZ3eJ_y2un_FFeRhSWi0Gfcy9T7pKS2-QpGPzbwF7Ph92GWVpJ2sXVYHpPieApOA2";
const STUDENT_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuA5j0KCIhJNNoznCCsQk3_ZYl6YOWxAWTsM31IlrjyRePXmQiTd3sFFkGRjKuHmX2HTBrvy7fiT9tZ64rYFwHSBu4oCYFb4l2An4CU1V5lQYV6cAFTke35iaGxKWPfUA5iqBp58w8xomYMC1zQ9jrfA4xksURHfI3GRFqE-YjhGcg9kjr6J7wxmD4cSutkS_vcE7I7NHBs7H1rMFfIiD2ZHaRYwTXYCAwkELzxskok6_qCkzm6Rbe1RAwGvFk6xm5T2DGGYHS6PVCXk";
const CREATOR_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAang2L_E-6Ap51JVGQ2E-rKUaE2J3SpqP5QitiNTIcM38GvA5-bprUqChdw8XX2SgM3F9xtU9mbli5PoDDI23pJit1-iLw1YeI56cwMZNyypG4usw-dXSBWxsAGUNRlsOimIvwsbMlOXnRhWClBXgCokMdNzne6ppsSV_r162TVEOmHM6SzEkDZ8Z3iPeMa_8fxp2NYuJVxmV5iVvwqD_0L9aGuF6O4LxJpSwlvBK2aj89BVLnzSgTuWMh5h_l5O4Au5Zd-Enjnv6j";
const GAMER_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBCryBnzr1-DToiQeBPtfL7vm98z17Hx-JGb-QTkUaF0FcxHelpfGLATwGErrRyVSBkcBwI6otYCnA4Lw1jmBE9acFP5voor6cbBnQslXA7V9Dc4NtCws-6oSYazZq7pOzOImZyUIwVNhrIxmffwyjZniYzdeQ3Kj5jTDWQ_cGeEtKufgAlIE3t8iPnjmu8sGCwhVJaGfatC3igUWl8HSP_dj9IEA-931K0KwGDYJuQ6uFxvx3vyVp3WnG6cyp0lMDxJTpcGQ8ahya_";

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-indigo-100/20 bg-white/80"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600 text-3xl">devices</span>
          <span
            className="text-2xl font-extrabold tracking-tight"
            style={{ background: "linear-gradient(to right, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            SmartFind
          </span>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-indigo-200">
          Find My Device
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <div className="md:col-span-6 space-y-6 text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Stop Scrolling.<br />
            <span className="text-indigo-600">Start Matching.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
            SmartFind learns what matters to you and recommends the perfect phone or laptop — in seconds. No more endless specs, just your perfect match.
          </p>
          <div className="pt-4">
            <button
              className="bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-xl shadow-indigo-200"
              style={{ boxShadow: "0 0 25px rgba(99, 102, 241, 0)" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 25px rgba(99,102,241,0.2)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 20px 40px rgba(99,102,241,0.25)"}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="md:col-span-6 relative mt-12 md:mt-0">
          <div className="absolute inset-0 bg-indigo-100 blur-[100px] -z-10 rounded-full scale-125 opacity-60" />
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 translate-y-8">
              <img
                src={PHONE_IMG}
                alt="Phones"
                className="rounded-3xl shadow-2xl w-full transition-transform duration-500"
                style={{ transform: "rotate(-6deg)" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "rotate(-6deg)")}
              />
            </div>
            <div className="col-span-8">
              <img src={LAPTOP_IMG} alt="Laptop" className="rounded-3xl shadow-2xl relative z-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ───────────────────────────────────────────────────────────────
const steps = [
  { num: "01", icon: "filter_alt", title: "Set Your Filters", desc: "Choose your budget range and core platform preferences to narrow the vast field of options." },
  { num: "02", icon: "tune", title: "Tune Your Priorities", desc: "Adjust weights for battery life, performance, camera quality, or portability to guide our AI." },
  { num: "03", icon: "stars", title: "Get Your Match", desc: "Receive a ranked list of devices with personalized match scores based on your exact needs." },
];

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How It Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Three simple steps to find the technology that actually complements your lifestyle.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-indigo-600 font-extrabold text-4xl mb-6">{s.num}</div>
              <span className="material-symbols-outlined text-4xl text-indigo-600 mb-6 block">{s.icon}</span>
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.title}</h3>
              <p className="text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Selector ───────────────────────────────────────────────────────────
function ProductSelector() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Phone Card */}
        <div
          className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white p-12 min-h-[400px] flex flex-col justify-end transition-all duration-500 hover:scale-[1.02]"
          style={{ transition: "transform 0.5s, box-shadow 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 25px rgba(99,102,241,0.2)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
        >
          <img
            src={PHONE_IMG}
            alt="Smartphones"
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Find My Phone</h3>
            <p className="mb-12 text-slate-300 max-w-md">Discover smartphones that excel in camera tech, battery, or raw performance.</p>
            <button className="bg-white text-slate-900 px-12 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
              Start Finder
            </button>
          </div>
        </div>

        {/* Laptop Card */}
        <div
          className="group relative overflow-hidden rounded-[2.5rem] bg-indigo-600 text-white p-12 min-h-[400px] flex flex-col justify-end transition-all duration-500 hover:scale-[1.02]"
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 25px rgba(99,102,241,0.2)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
        >
          <img
            src={LAPTOP_IMG}
            alt="Laptop"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Find My Laptop</h3>
            <p className="mb-12 text-white/80 max-w-md">Compare workhorses, gaming beasts, and ultra-portables tailored to your workflow.</p>
            <button className="bg-white text-indigo-600 px-12 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
              Start Finder
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Persona Section ────────────────────────────────────────────────────────────
const personas = [
  { img: STUDENT_IMG, name: "The Student", tag: "Efficiency First", quote: '"Found a laptop that lasts 12 hours on a single charge and fits my budget perfectly."', borderColor: "border-indigo-200", featured: false },
  { img: CREATOR_IMG, name: "The Creator", tag: "Raw Performance", quote: '"The AI prioritize color accuracy and GPU power for me. It saved me weeks of research."', borderColor: "border-indigo-600", featured: true },
  { img: GAMER_IMG, name: "The Gamer", tag: "Visual Fidelity", quote: '"I just wanted the highest refresh rate for my price point. SmartFind found it in seconds."', borderColor: "border-indigo-300", featured: false },
];

function PersonaSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Built for Your Lifestyle
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {personas.map((p) => (
            <div
              key={p.name}
              className={`bg-white p-12 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center ${p.featured ? "scale-105 shadow-xl shadow-indigo-100" : ""}`}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden mb-6 border-4 ${p.borderColor}`}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.name}</h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">{p.tag}</p>
              <p className="text-gray-500 italic">{p.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Match Score Showcase ───────────────────────────────────────────────────────
function MatchShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="bg-indigo-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-20 text-white">
        {/* Gradient overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/30 to-transparent" />

        {/* Left */}
        <div className="relative z-10 md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Live Result Sample
          </div>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            The Power of 90%+ Match
          </h2>
          <p className="text-indigo-100 text-lg mb-12">
            When our algorithm hits the 90th percentile, it's more than a suggestion—it's a perfect digital companion tailored to your DNA.
          </p>
          <div className="flex gap-6">
            <div className="bg-white/5 p-6 rounded-2xl">
              <div className="text-2xl font-bold">12k+</div>
              <div className="text-xs text-indigo-300 uppercase tracking-wider">Devices Analyzed</div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-xs text-indigo-300 uppercase tracking-wider">Metrics Scored</div>
            </div>
          </div>
        </div>

        {/* Right — Match Card */}
        <div className="relative z-10 md:w-1/2 w-full">
          <div className="bg-white rounded-[2rem] p-12 text-slate-900 shadow-2xl md:rotate-3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ASUS VivoBook 15</h3>
                <p className="text-slate-500 font-bold">$799.00</p>
              </div>
              <div className="w-20 h-20 rounded-full border-[6px] border-indigo-600 flex items-center justify-center">
                <span className="text-xl font-extrabold text-indigo-600">92%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Portability</span>
                <span className="text-indigo-600">10/10</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-full" />
              </div>
              <div className="flex justify-between text-sm font-medium pt-1">
                <span>Battery Life</span>
                <span className="text-indigo-600">8.5/10</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[85%]" />
              </div>
            </div>

            <button className="w-full mt-12 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              See Detailed Match
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ──────────────────────────────────────────────────────────────
const features = [
  { icon: "person_search", title: "Personalized Ranking", desc: "Scores are unique to you, not generic charts." },
  { icon: "bolt", title: "Instant Results", desc: "AI-powered analysis in under 30 seconds." },
  { icon: "settings_input_component", title: "You're in Control", desc: "Fine-tune every weight and priority live." },
  { icon: "analytics", title: "Transparent Scoring", desc: "We show you exactly why we matched it." },
];

function FeaturesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-indigo-600 text-3xl">{f.icon}</span>
            </div>
            <h4 className="font-bold mb-1 text-gray-900">{f.title}</h4>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 w-full rounded-t-2xl">
      <div className="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">devices</span>
            <span className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SmartFind</span>
          </div>
          <p className="text-sm text-slate-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            The world's first intent-based device engine.
          </p>
        </div>
        <div className="text-sm text-slate-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Built with ❤️ by the SmartFind team · 2025
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        body { font-family: 'Inter', sans-serif; background: #f7f9fb; color: #191c1e; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}</style>
      <div className="bg-gray-50 text-gray-900 min-h-screen">
        <Navbar />
        <main className="overflow-x-hidden">
          <Hero />
          <HowItWorks />
          <ProductSelector />
          <PersonaSection />
          <MatchShowcase />
          <FeaturesGrid />
        </main>
        <Footer />
      </div>
    </>
  );
}