const phoneQuestions = [

  // ── HARD FILTERS ────────────────────────────────────────────────

  {
    id: "budget",
    question: "What is your budget for the phone?",
    type: "single",
    options: [
      { label: "Under ₹10,000",        value: 10000  },
      { label: "₹10,000 – ₹20,000",    value: 20000  },
      { label: "₹20,000 – ₹40,000",    value: 40000  },
      { label: "₹40,000 – ₹70,000",    value: 70000  },
      { label: "Above ₹70,000",        value: 150000 },
    ]
  },

  {
    id: "os_brand",
    question: "Which operating system do you prefer?",
    type: "single",
    options: [
      { label: "Android",       value: "Android"    },
      { label: "iPhone (iOS)",  value: "iOS"        },
      { label: "No preference", value: null         },
    ]
  },

  {
    id: "need_5g",
    question: "Which type of network is available in your area?",
    type: "single",
    options: [
      { label: "5G", value: true  },
      { label: "4G", value: false },
    ]
  },

  {
    id: "need_nfc",
    question: "Do you use Online payment features?",
    type: "single",
    options: [
      { label: "Yes — I use UPI tap / contactless payments", value: true  },
      { label: "No — I don't need NFC",                     value: false },
    ]
  },

  // ── SPEC PREFERENCES (map to user vector) ───────────────────────

  {
    id: "ram",
    question: "How do you use your phone day-to-day?",
    type: "single",
    options: [
      { label: "Basic — calls, WhatsApp, social media",        value: 4  },
      { label: "Moderate — streaming, light gaming, multitask", value: 8  },
      { label: "Heavy — heavy gaming, many apps at once",      value: 12 },
    ]
  },

  {
    id: "storage",
    question: "How much stuff do you store on your phone?",
    type: "single",
    options: [
      { label: "Low — I use cloud for photos/videos",          value: 64  },
      { label: "Medium — some offline music, apps, photos",    value: 128 },
      { label: "High — lots of media, games, no cloud",        value: 256 },
    ]
  },

  {
    id: "battery",
    question: "How long do you need your phone to last on a charge?",
    type: "single",
    options: [
      { label: "Half a day is fine",          value: 4000 },
      { label: "Full day (8–10 hours)",       value: 4500 },
      { label: "More than a day",             value: 5000 },
    ]
  },

  {
    id: "fast_charging",
    question: "How quickly do you need your phone to charge?",
    type: "single",
    options: [
      { label: "No rush — standard charging is fine", value: 18 },
      { label: "Fairly fast — 30–45 min top up",      value: 33 },
      { label: "Super fast — under 30 min",           value: 65 },
    ]
  },

  {
    id: "rear_camera_mp",
    question: "How important is the main (rear) camera to you?",
    type: "single",
    options: [
      { label: "Basic — just for casual shots",        value: 13  },
      { label: "Good — food, travel, everyday photos", value: 50  },
      { label: "Pro — high detail, low light, zoom",   value: 108 },
    ]
  },

  {
    id: "front_camera_mp",
    question: "How much do you care about the selfie camera?",
    type: "single",
    options: [
      { label: "Not much",                           value: 8  },
      { label: "Decent — video calls and selfies",   value: 16 },
      { label: "High quality — content creation",    value: 32 },
    ]
  },

  {
    id: "specs_score",
    question: "Overall, how powerful do you need your phone to be?",
    type: "single",
    options: [
      { label: "Entry level — just the basics",        value: 30 },
      { label: "Mid range — smooth everyday use",      value: 60 },
      { label: "Flagship — top performance",           value: 85 },
    ]
  },

  // ── FEATURE IMPORTANCE (map to feature_importance dict) ─────────

  {
    id: "fi_ram",
    question: "How important is smooth multitasking (RAM) to you?",
    type: "single",
    maps_to: { key: "feature_importance", field: "ram" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  {
    id: "fi_storage",
    question: "How important is having a lot of storage?",
    type: "single",
    maps_to: { key: "feature_importance", field: "storage" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  {
    id: "fi_battery",
    question: "How important is long battery life to you?",
    type: "single",
    maps_to: { key: "feature_importance", field: "battery" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  {
    id: "fi_fast_charging",
    question: "How important is fast charging to you?",
    type: "single",
    maps_to: { key: "feature_importance", field: "fast_charging" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  {
    id: "fi_rear_camera_mp",
    question: "How important is a great main camera to you?",
    type: "single",
    maps_to: { key: "feature_importance", field: "rear_camera_mp" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  {
    id: "fi_front_camera_mp",
    question: "How important is a good selfie camera to you?",
    type: "single",
    maps_to: { key: "feature_importance", field: "front_camera_mp" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  {
    id: "fi_specs_score",
    question: "How important is overall performance / flagship feel?",
    type: "single",
    maps_to: { key: "feature_importance", field: "specs_score" },
    options: [
      { label: "Not important",  value: 1 },
      { label: "Somewhat",       value: 3 },
      { label: "Very important", value: 5 },
    ]
  },

  // ── RESULT COUNT ────────────────────────────────────────────────

  {
    id: "top_n",
    question: "How many phone recommendations do you want to see?",
    type: "single",
    options: [
      { label: "Top 3",  value: 3  },
      { label: "Top 5",  value: 5  },
      { label: "Top 10", value: 10 },
    ]
  },

];

export default phoneQuestions;