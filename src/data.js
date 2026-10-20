// Public files resolve against the deploy base (/ or /portfolio/).
const BASE = import.meta.env.BASE_URL

// All site content lives here. Every fact comes from Prudhvi's resumes,
// GitHub repos or direct messages. Do not add numbers that are not verified.

export const profile = {
  name: 'Dupakuntla Prudhvi Krishna',
  shortName: 'Prudhvi Krishna',
  initials: 'PK',
  role: 'Data Science Student',
  university: 'VIT-AP University',
  email: 'prudhvikrishnad@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prudhvi30/',
  linkedinLabel: 'linkedin.com/in/prudhvi30',
  github: 'https://github.com/prudhvikrishn',
  githubLabel: 'github.com/prudhvikrishn',
  resume: `${BASE}resume.pdf`,
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const heroFacts = [
  { label: 'Degree', value: 'B.Sc.–M.Sc. Data Science, since 2024' },
  { label: 'Latest result', value: '96.42% Macro-F1, NLP classifier' },
  { label: 'Leadership', value: 'VP, Data Science Club' },
]

export const aboutChips = {
  tools: [
    ['Python', 'teal'], ['scikit-learn', 'teal'], ['Pandas', 'teal'], ['spaCy', 'teal'], ['Flask', 'teal'],
    ['SQL', 'gold'], ['Tableau', 'gold'], ['Google Cloud Platform', 'gold'],
    ['AutoDock', 'dim'], ['MOE', 'dim'], ['R', 'dim'], ['MATLAB', 'dim'],
  ],
  domains: [
    ['Machine Learning', 'teal'], ['NLP', 'teal'], ['Healthcare Data', 'gold'],
    ['Bioinformatics', 'dim'], ['Drug Discovery', 'dim'], ['Virtual Screening', 'dim'],
  ],
}

// Badge colour for each project kind
export const badgeClass = {
  NLP: 'badge-teal',
  'Machine learning': 'badge-teal',
  Hackathon: 'badge-gold',
  Research: 'badge-sage',
}

export const skillGroups = [
  {
    title: 'Languages',
    skills: ['Python', 'SQL', 'JavaScript', 'R (basic)', 'MATLAB', 'HTML/CSS'],
  },
  {
    title: 'Analysis and statistics',
    skills: [
      'Data cleaning',
      'Exploratory data analysis',
      'Statistical analysis',
      'Correlation analysis',
      'Data visualisation',
    ],
  },
  {
    title: 'Machine learning',
    skills: [
      'Classification',
      'Logistic Regression',
      'Random Forest',
      'Support Vector Machines',
      'K-Means clustering',
      'Feature engineering',
      'Model evaluation',
    ],
  },
  {
    title: 'Natural language processing',
    skills: [
      'Text preprocessing',
      'TF-IDF',
      'Word2Vec',
      'POS tagging and NER',
      'Intent classification',
    ],
  },
  {
    title: 'Libraries and frameworks',
    skills: [
      'Pandas',
      'NumPy',
      'scikit-learn',
      'spaCy',
      'NLTK',
      'Matplotlib',
      'Seaborn',
      'Flask',
      'Streamlit',
      'React',
      'Node.js',
      'Express',
    ],
  },
  {
    title: 'Tools',
    skills: [
      'Excel',
      'Tableau',
      'Power BI',
      'Jupyter',
      'Git and GitHub',
      'SQLite',
      'Google Cloud Platform',
      'AutoDock',
      'MOE',
    ],
  },
]

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Machine learning' },
  { id: 'nlp', label: 'NLP' },
  { id: 'hackathon', label: 'Hackathon' },
]

export const projects = [
  {
    id: 'bank-query-nlp',
    thumb: { type: 'image', src: `${BASE}projects/nlp/customer-page.png`, alt: 'The classifier web app: a customer query about a $450 charge, labelled Fraud Report with 99.3% confidence' },
    results: true,
    title: 'Banking Customer Query Classifier',
    kind: 'NLP',
    period: '2026',
    categories: ['ml', 'nlp'],
    summary:
      'Reads a banking customer’s query in plain language, assigns it to one of 8 intents and routes it to the right team. Unfamiliar or low-confidence queries are flagged for a human to review.',
    problem:
      'Banks receive free-text queries about cards, loans, fraud and passwords. Sorting them by hand is slow, and a wrong route delays the customer.',
    approach: [
      'Cleaned and split the data into stratified train, validation and test sets.',
      'Built Bag-of-Words, TF-IDF and Word2Vec (CBOW and Skip-gram) features, plus POS tags, dependency parses and named entities from spaCy.',
      'Compared 5 classifiers across 6 feature sets and chose the winner on validation data only.',
      'Shipped a Flask web app, Streamlit demos and a command-line tool.',
    ],
    result:
      'A calibrated LinearSVC scored 97.07% accuracy and 96.42% Macro-F1 on 818 held-out test queries.',
    intents: [
      ['Balance Inquiry', 'What is the balance in my savings account?'],
      ['Card Issue', 'My debit card is not working at the ATM.'],
      ['Credit Card Application', 'How do I apply for a credit card?'],
      ['Forgot PIN', 'I forgot the PIN for my debit card.'],
      ['Fraud Report', 'Someone charged $450 on my card and it wasn’t me.'],
      ['Loan Inquiry', 'What are the interest rates for a personal loan?'],
      ['Password Reset', 'I’m locked out, please reset my online banking password.'],
      ['Transaction Query', 'When did my last payment go through?'],
    ],
    stack: ['Python', 'scikit-learn', 'spaCy', 'NLTK', 'Word2Vec', 'Flask', 'Streamlit'],
    skills: [
      'Python', 'scikit-learn', 'spaCy', 'NLTK', 'Flask', 'Streamlit',
      'Text preprocessing', 'TF-IDF', 'Word2Vec', 'POS tagging and NER', 'Intent classification',
      'Classification', 'Logistic Regression', 'Random Forest', 'Support Vector Machines',
      'Feature engineering', 'Model evaluation', 'Data cleaning', 'Exploratory data analysis',
    ],
    links: [
      { label: 'Live demo', href: 'https://nlp-zeta-beryl.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/prudhvikrishn/nlp' },
    ],
  },
  {
    id: 'lawdocx',
    thumb: { type: 'lawdocx' },
    title: 'LawDocx: Legal Forms Digitisation Platform',
    kind: 'Hackathon',
    period: 'Nov 2024',
    award: 'Runner-up, Technov Hackathon (NextGen Cloud Club)',
    categories: ['hackathon'],
    summary:
      'A full-stack platform that puts standard court and legal forms online, such as petitions, affidavits and applications, with a structured form interface.',
    problem:
      'Legal practitioners and citizens fill in standard court forms on paper, which adds overhead to every filing.',
    approach: [
      'Designed the full front-end interface for browsing and filling in legal forms.',
      'Built a Flask back end with form routing and data handling.',
      'Modelled the experience on Google Forms so non-technical users could fill in judicial forms easily.',
    ],
    result: 'Won runner-up at the Technov Hackathon, organised by NextGen Cloud Club.',
    stack: ['Python', 'Flask', 'HTML/CSS', 'Legal tech'],
    skills: ['Python', 'Flask', 'HTML/CSS'],
    links: [],
  },
  {
    id: 'smtps',
    thumb: { type: 'smtps' },
    title: 'SMTPS: Smart Meter Tampering Prevention System and Ticket Prioritization',
    kind: 'Hackathon',
    period: '2026',
    categories: ['ml', 'hackathon'],
    summary:
      'A platform for electricity providers that flags likely meter tampering and power theft and ranks which meters technicians should inspect first, with customer, technician and admin portals.',
    problem:
      'Utilities lose revenue to meter tampering and theft, and field teams need to know which meters to visit first.',
    approach: [
      'Wrote K-Means clustering from scratch to group the meters in each zone by energy discrepancy and consumption, so high-risk meters are inspected first.',
      'Built an appliance audit: Tesseract OCR reads a BEE energy label from a photo, and fuzzy matching identifies the appliance to estimate expected load.',
      'Scored theft risk by comparing billed consumption with the audited load and a vacation baseline, with email alerts to inspectors.',
      'Built a React frontend and an Express + SQLite backend with about 25 API endpoints.',
    ],
    result:
      'A working three-portal prototype with risk-ranked meter lists, AI-assisted audits, complaints, billing-anomaly checks and alerts.',
    stack: ['JavaScript', 'React', 'Node.js', 'Express', 'SQLite', 'K-Means clustering'],
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'SQLite', 'K-Means clustering'],
    links: [{ label: 'GitHub', href: 'https://github.com/prudhvikrishn/smtps' }],
  },
  {
    id: 'virtual-screening',
    thumb: { type: 'docking' },
    title: 'A Data-Centric and Artificial-Intelligence-Based Virtual Screening in Drug Discovery: The Deep-Learning and Computational Innovations',
    kind: 'Research',
    period: 'Manuscript complete — awaiting publication',
    categories: ['research'],
    coAuthors: 'With Dr. Dripta De Joarder (Corresponding Author), Dept. of Chemistry, School of Advanced Sciences, VIT-AP University',
    summary:
      'A review of the transition from classical docking-based virtual screening to AI and quantum-based approaches, examining how data-driven modelling, deep learning, and advanced computation can reshape future drug discovery. Covers contrastive learning, equivariant transformers, diffusion models, GNNs, generative AI, and hybrid AI-physics methods.',
    problem:
      'Classical docking suffers from inaccurate scoring functions, rigid-receptor assumptions, and poor scalability to billion-compound libraries. Purely data-driven AI models lack biophysical grounding and generalise poorly to novel targets.',
    approach: [
      'Reviewed AI paradigms post-2020: contrastive learning (DrugCLIP), equivariant transformers (ETDock), diffusion-based docking (DiffDock), GNNs, and generative AI.',
      'Analysed hybrid AI-physics methods and federated learning architectures that improve physical plausibility and data privacy.',
      'Surveyed quantum computing strategies for molecular simulation and their current scalability limits.',
      'Benchmarked methods using PoseBusters, DUD-E, and PDBbind; identified the RMSD-vs-physical-validity gap in deep-learning docking.',
      'Examined case studies: AlphaFold 3, GNINA, CarsiDock, Halicin/Abaucin antibiotic discovery, and PDGFR inhibitor identification.',
    ],
    result: 'Manuscript complete. Awaiting submission and publication.',
    stack: ['AutoDock Vina', 'MOE', 'Deep learning', 'Machine learning', 'Bioinformatics', 'Quantum computing'],
    skills: ['AutoDock', 'MOE'],
    links: [],
  },
  {
    id: 'diabetes',
    thumb: { type: 'logistic' },
    title: 'ML Diabetes Predictor',
    kind: 'Machine learning',
    period: 'Jan to Apr 2025, rebuilt Oct 2026',
    categories: ['ml'],
    summary:
      'A Flask app that estimates diabetes risk from eight routine health measurements, using a model chosen by comparing Logistic Regression, Random Forest and SVM on the Pima Indians Diabetes dataset.',
    problem: 'Flag patients at higher risk of diabetes early, from measurements such as glucose, BMI and age.',
    approach: [
      'Treated impossible zero readings (glucose, blood pressure, skin thickness, insulin, BMI) as missing and filled them with training-set medians.',
      'Measured how strongly each feature correlates with the outcome.',
      'Compared Logistic Regression, Random Forest and SVM with 5-fold cross-validation, choosing by ROC-AUC.',
      'Served the winning pipeline through a Flask app that shows a risk probability.',
    ],
    result:
      'Logistic Regression won (0.84 cross-validated ROC-AUC) and scored 0.81 ROC-AUC and 70.8% accuracy on 154 held-out patients. Glucose was the strongest single predictor (correlation 0.50), followed by BMI and insulin.',
    stack: ['Python', 'scikit-learn', 'Pandas', 'Flask'],
    skills: [
      'Python', 'scikit-learn', 'Pandas', 'Flask', 'Classification',
      'Logistic Regression', 'Random Forest', 'Support Vector Machines',
      'Data cleaning', 'Exploratory data analysis', 'Correlation analysis',
      'Model evaluation',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/prudhvikrishn/health_predect' }],
  },
]

export const leadership = {
  org: 'Data Science Club, VIT-AP University',
  roles: [
    { title: 'Vice President', status: 'Current' },
    { title: 'V-TOP Manager', status: 'Previous' },
    { title: 'Technical Team Member', status: '2024–25' },
  ],
  highlights: [
    {
      title: 'Research on Law workshop',
      date: '9 October 2026',
      text: 'Organised and conducted the session online, with more than 110 live viewers and a total audience of more than 150.',
    },
  ],
}

export const achievements = [
  {
    title: 'Participant, Radiothon Winter 2026 hackathon',
    org: 'Radion Inc.',
    date: 'Jan 2026',
  },
  {
    title: 'Member, Creative Department',
    org: 'Microsoft Student Chapter, VIT-AP University',
    date: '2024–25',
  },
  {
    title: 'Winner, Cloud Clash',
    org: 'NextGen Cloud Club',
    date: 'Mar 2025',
    text: 'First place for a cloud-based solution.',
  },
  {
    title: 'Datathon participant',
    org: 'Data Science Club, VIT-AP University',
    date: 'Mar 2025',
  },
  {
    title: 'Runner-up, Technov Hackathon',
    org: 'NextGen Cloud Club',
    date: 'Nov 2024',
    text: 'Built LawDocx, a legal forms digitisation platform.',
  },
]

export const certifications = [
  {
    title: 'Tableau',
    org: 'Infosys Springboard',
    date: 'Jun 2025',
    href: `${BASE}certificates/tableau-infosys-springboard.pdf`,
  },
  {
    title: 'Full-Stack Development',
    org: 'Purple Technologies',
    date: 'Jan to Mar 2025',
  },
  {
    title: 'AWS APAC Certification',
    org: 'Forage',
    date: 'Dec 2024',
    href: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_tDXWxh8YgE4RJALT3_1733383260652_completion_certificate.pdf',
  },
]

export const education = {
  school: 'VIT-AP University',
  place: 'Amaravati, Andhra Pradesh',
  degree: 'B.Sc.–M.Sc. Data Science (Integrated)',
  period: 'Since Sep 2024',
  cgpa: '8.36',
  standing: 'Top 20% of the 2024 B.Sc. Data Science batch',
}

// ---- Bank query classifier results (from github.com/prudhvikrishn/nlp README and figures) ----

export const featureSets = ['BoW', 'TF-IDF', 'W2V CBOW', 'W2V Skip-gram', 'Hybrid', 'Hybrid + NLP']

// Validation Macro-F1 (%) per classifier and feature set. null = not applicable.
export const modelComparison = [
  { model: 'Naive Bayes', scores: [94.28, 94.02, null, null, null, null], note: 'Needs non-negative features, so it only runs on BoW and TF-IDF.' },
  { model: 'Logistic Regression', scores: [95.67, 96.65, 93.27, 93.75, 95.34, 96.17] },
  { model: 'LinearSVC', scores: [94.73, 96.7, 94.09, 94.57, 97.28, 97.82] },
  { model: 'Random Forest', scores: [94.96, 94.12, 93.6, 94.89, 92.91, 93.49] },
  { model: 'Gradient Boosting', scores: [94.51, 92.35, 92.61, 92.4, 92.76, 92.83] },
]

export const intentLabels = ['Balance Inquiry', 'Card Issue', 'Credit Card Application', 'Forgot PIN', 'Fraud Report', 'Loan Inquiry', 'Password Reset', 'Transaction Query']

// Held-out test set (818 queries). Rows = true intent, columns = predicted intent.
export const confusion = [
  [44, 0, 0, 0, 4, 1, 0, 0],
  [0, 32, 0, 0, 4, 0, 0, 0],
  [0, 0, 43, 0, 1, 3, 0, 0],
  [0, 0, 0, 36, 0, 0, 0, 0],
  [2, 0, 1, 0, 181, 1, 0, 3],
  [0, 0, 0, 0, 1, 239, 0, 0],
  [0, 0, 0, 0, 2, 0, 43, 0],
  [0, 0, 0, 0, 1, 0, 0, 176],
]

// The Research section shows these; Projects shows the rest.
export const researchItems = projects.filter((p) => p.categories.includes('research'))
export const workProjects = projects.filter((p) => !p.categories.includes('research'))
