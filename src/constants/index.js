export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
];

export const skills = [
  { name: "Python", level: 92, icon: "🐍", category: "Language" },
  { name: "SQL", level: 82, icon: "🗃️", category: "Database" },
  { name: "Machine Learning", level: 88, icon: "🤖", category: "AI/ML" },
  { name: "Bioinformatics", level: 76, icon: "🧬", category: "Research" },
  { name: "Flask", level: 85, icon: "🌐", category: "Framework" },
  { name: "GCP", level: 67, icon: "☁️", category: "Cloud" },
  { name: "AutoDock / MOE", level: 74, icon: "⚗️", category: "Research" },
  { name: "R", level: 70, icon: "📐", category: "Statistical" },
  { name: "Pandas / NumPy", level: 90, icon: "📊", category: "Data" },
  { name: "Scikit-learn", level: 88, icon: "🔬", category: "AI/ML" },
];

export const projects = [
  {
    name: "LawDocx",
    description: "Full-stack platform to digitise legal and judicial paperwork. Makes standard court forms available online with structured form interfaces — built with Flask back-end and complete front-end UI.",
    tags: ["Python", "Flask", "HTML/CSS", "Legal Tech"],
    badge: "Hackathon",
    accent: "#c49a52",
  },
  {
    name: "SMTPS",
    description: "Smart Meter Ticketing & Prioritization System. Automated document organisation for utility providers using K-Means clustering to identify meter risks and streamline field agent communication.",
    tags: ["Python", "Flask", "SQLite", "K-Means"],
    badge: "Hackathon",
    accent: "#c49a52",
  },
  {
    name: "AI-Based Virtual Screening",
    description: "In-draft review paper examining ML integration with classical molecular docking to optimise drug-target interaction predictions using AutoDock and MOE tools.",
    tags: ["AutoDock", "MOE", "Machine Learning", "Bioinformatics"],
    badge: "Research",
    accent: "#9b9a6a",
  },
  {
    name: "ML Diabetes Predictor",
    description: "Classification model identifying key health predictors — BMI and glucose — using clinical datasets with feature selection and model evaluation pipelines via Scikit-learn.",
    tags: ["Python", "Scikit-learn", "Pandas", "Classification"],
    badge: "ML",
    accent: "#16676a",
  },
];

export const experiences = [
  {
    title: "V-TOP Student Coordinator for DSC Club",
    company: "VIT-AP University · Amaravati",
    date: "2024 — Present",
    points: [
      "Actively drive leadership initiatives managing operational workflows for the Data Science Club.",
      "Oversee peer contributions and motivate students to maintain consistent productivity.",
      "Enforce standards and administrative requirements using agile methodology principles.",
    ],
  },
  {
    title: "B.Sc. Data Science",
    company: "VIT-AP University",
    date: "Ongoing",
    points: [
      "Core coursework in machine learning, statistics, databases, bioinformatics, and cloud computing.",
      "Active coordinator of the Data Science Club (DSC).",
      "Research focus on computational biology and AI-driven drug discovery.",
    ],
  },
];

export const achievements = [
  { icon: "🥈", title: "Runner-up · Technov Hackathon", desc: "Placed second among competitive teams with the SMTPS platform." },
  { icon: "🏆", title: "Winner · Cloud Clash", desc: "First place at NextGen Cloud Club's Cloud Clash competition at VIT-AP." },
  { icon: "◈", title: "VIT-AP Datathon 2025", desc: "Recognised for outstanding analytical contributions." },
  { icon: "∞", title: "Full-Stack Dev · Purple Tech", desc: "Full-stack web development certification." },
];
