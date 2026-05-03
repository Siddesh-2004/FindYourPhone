import { useState} from "react";
import Question from "../components/Question";
import phoneQuestions from "../../questions/phonequestions.js"; // your existing array
import { useNavigate } from "react-router";
import api from '../axios/axios.config.js'
/**
 * QuestionForPhoneAndLaptop
 * ─────────────────────────────────────────────────────────────────
 * Usage (React Router v6 example):
 *   <Route path="/quiz/:device" element={<QuestionForPhoneAndLaptop onComplete={(prefs) => navigate("/results", { state: prefs })} />} />
 *
 * Or pass `device` as a prop directly:
 *   <QuestionForPhoneAndLaptop device="phones" onComplete={handleDone} />
 *
 * Props:
 *   device      : "phones" | "laptops"  — can also come from useParams()
 *   onComplete  : (preferences: object) => void
 */

// ── Laptop questions placeholder ──────────────────────────────────
// Replace / extend with your real laptop question array
const laptopQuestions = [
  {
    id: "budget",
    question: "What is your budget for the laptop?",
    type: "single",
    options: [
      { label: "Under ₹30,000",         value: 30000  },
      { label: "₹30,000 – ₹60,000",     value: 60000  },
      { label: "₹60,000 – ₹1,00,000",   value: 100000 },
      { label: "Above ₹1,00,000",       value: 200000 },
    ],
  },
  {
    id: "os_brand",
    question: "Which operating system do you prefer?",
    type: "single",
    options: [
      { label: "Windows",       value: "Windows" },
      { label: "macOS",         value: "macOS"   },
      { label: "No preference", value: null      },
    ],
  },
  {
    id: "top_n",
    question: "How many laptop recommendations do you want?",
    type: "single",
    options: [
      { label: "Top 3",  value: 3  },
      { label: "Top 5",  value: 5  },
      { label: "Top 10", value: 10 },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────

/**
 * Merge a single answer into the preferences object.
 *
 * Normal question  → prefs[id] = value
 * maps_to question → prefs[maps_to.key][maps_to.field] = value
 *   e.g. fi_ram with maps_to { key:"feature_importance", field:"ram" }
 *        → prefs.feature_importance.ram = value
 */
function applyAnswer(prefs, question, value) {
  const next = { ...prefs };

  if (question.maps_to) {
    const { key, field } = question.maps_to;
    next[key] = { ...(next[key] || {}), [field]: value };
  } else {
    next[question.id] = value;
  }

  return next;
}

// ── Component ─────────────────────────────────────────────────────

export default function QuestionForPhoneAndLaptop({
  device     = "phones",   // "phones" | "laptops"
}) {

  const navigate = useNavigate();
  // --- Try to pull device from React Router params if available ---
  // If you're using React Router v6, uncomment the line below and
  // remove the `device` prop default:
  //
  // const { device: deviceParam } = useParams();
  // const resolvedDevice = deviceParam || device;
  //
  
  const onComplete= async (preferences) => {
  try {
    const response=await api.post("phones/getPhoneRecommendations",preferences,{
      withCredentials:true
    });
    console.log(response.data.data);
   navigate("/results", { state: { recommendations: response.data.data } });

  } catch (err) {
    console.error("Submit failed:", err);
  }
};















  const resolvedDevice = device;

  // Pick question set
  const questions =
    resolvedDevice === "phones" ? phoneQuestions : laptopQuestions;

  const [stepIndex,   setStepIndex]   = useState(0);
  const [preferences, setPreferences] = useState({});
  const [animating,   setAnimating]   = useState(false);

  const totalSteps = questions.length;
  const currentQ   = questions[stepIndex];
  const progress   = Math.round(((stepIndex) / totalSteps) * 100);

  // Device display info
  const isPhone   = resolvedDevice === "phones";
  const deviceLabel = isPhone ? "Phone Finder" : "Laptop Finder";
  const deviceIcon  = isPhone ? "smartphone"   : "laptop";

  // ── Navigate forward ──
  const handleNext = (value) => {
    if (animating) return;

    // 1. Store answer immediately
    const updatedPrefs = applyAnswer(preferences, currentQ, value);
    setPreferences(updatedPrefs);

    // 2. Last question → call onComplete
    if (stepIndex === totalSteps - 1) {
      onComplete(updatedPrefs);
      return;
    }

    // 3. Slide to next question
    setAnimating(true);
    setTimeout(() => {
      setStepIndex((i) => i + 1);
      setAnimating(false);
    }, 60); // tiny delay so Question re-mounts after state flush
  };

  // ── Navigate backward ──
  const handleBack = () => {
    if (animating || stepIndex === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStepIndex((i) => i - 1);
      setAnimating(false);
    }, 60);
  };

  // ── Map question options to Question component format ──
  // Question component expects: { label, value, description? }
  // phoneQuestions already use { label, value } — pass through directly
  const mappedOptions = currentQ.options.map((opt) => ({
    label:       opt.label,
    value:       opt.value,
    description: opt.description ?? undefined,
  }));

  return (
    <Question
      key={stepIndex}              // forces re-mount on step change → triggers slide-in
      question={currentQ.question}
      options={mappedOptions}
      type={currentQ.type ?? "single"}
      progress={progress}
      deviceType={deviceLabel}
      deviceIcon={deviceIcon}
      questionNum={stepIndex}
      isLast={stepIndex === totalSteps - 1}
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}