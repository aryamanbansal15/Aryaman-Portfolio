const SITE = {
  name: "Aryaman Bansal",

  email: "aryamanbansal88@gmail.com",

  links: {
    github: "https://github.com/aryamanbansal15",

    linkedin: "https://www.linkedin.com/in/aryaman-bansal-5b27ba322/",

    figma: "",

    resume: "assets/AryamanBansalResume.pdf",

    internshipCert: "https://drive.google.com/file/d/1aH2B_8SMxqHIBEJcWXuQhNYqnSUX14h-/view"
  },

  photo: "assets/photo.jpeg"
};


const PROJECTS = [
  {
    id: "speak4u",
    title: "Speak4U",
    kind: "Android accessibility app",
    category: "interface",
    featured: true,
    art: "speak4u",
    period: "May to July 2025",
    team: "Solo project",
    guide: "Mr. Virender Garg",
    blurb: "An Android accessibility app built around a modular text-to-speech and voice-command pipeline, with a secure backend for per-user sessions.",
    details: [
      "Designed a modular text-to-speech and voice-command pipeline with configurable parameters, so the app behaves consistently across devices.",
      "Built a FastAPI and MySQL backend with JWT authentication, bcrypt password hashing and per-user session management.",
      "Covered the full stack, from the mobile client to the backend service."
    ],
    stack: ["Java", "Android SDK", "FastAPI", "MySQL", "JWT", "Bcrypt"],
    links: {
      github: "https://github.com/aryamanbansal15/Speak4U/tree/Translation",
      live: "",
      figma: ""
    }
  },
  {
    id: "servgenie",
    title: "ServGenie mobile UI and TTS",
    kind: "Internship at Escorts Kubota Limited",
    category: "interface",
    art: "servgenie",
    period: "May to July 2025",
    team: "Team of 5",
    guide: "Mr. Virender Garg",
    blurb: "Responsive mobile interfaces and a text-to-speech system for an AI-integrated enterprise chatbot.",
    details: [
      "Built production-grade responsive mobile interfaces, tuning rendering performance, animation pipelines and component reusability.",
      "Designed and deployed a scalable text-to-speech system into ServGenie, an AI-integrated enterprise chatbot.",
      "Delivered a working, production-facing tool as part of a five-person team."
    ],
    stack: ["Responsive mobile UI", "Animation", "Text-to-speech", "AI chatbot"],
    note: "Built inside a company, so the code is private.",
    links: { github: "", live: "", figma: "" }
  },
  {
    id: "liquidity-flow",
    title: "Liquidity Flow",
    kind: "Invoice financing platform",
    category: "backend",
    art: "liquidity",
    period: "January to April 2026",
    team: "Team of 3",
    guide: "Dr. Mukesh Mohania",
    blurb: "A backend platform for invoice financing with optimized schemas, REST APIs, JWT authentication and role-based access control.",
    details: [
      "Architected a scalable backend data platform for invoice financing.",
      "Designed optimized database schemas and RESTful APIs with production-grade reliability.",
      "Enforced authentication with JWT and role-based access control (RBAC) for secure data management."
    ],
    stack: ["Python", "FastAPI", "MySQL", "SQLAlchemy", "REST APIs", "JWT", "RBAC"],
    links: {
      github: "https://github.com/aryamanbansal15/Liquidity-Flow",
      live: "",
      figma: ""
    }
  },
  {
    id: "university-erp",
    title: "University ERP",
    kind: "Enterprise management system",
    category: "interface",
    art: "erp",
    period: "",
    team: "",
    guide: "",
    blurb: "A Java desktop ERP with a modular object-oriented design, MySQL storage and a Swing interface.",
    details: [
      "Engineered a Java ERP system with MySQL integration and a modular, object-oriented application design.",
      "Implemented JDBC database operations and secure Bcrypt authentication.",
      "Built responsive interface components with Swing and MigLayout."
    ],
    stack: ["Java", "Swing", "MySQL", "JDBC", "Maven", "MigLayout", "Bcrypt"],
    links: {
      github: "https://github.com/aryamanbansal15/University-ERP",
      live: "",
      figma: ""
    }
  },
  {
    id: "autograd",
    title: "Autograd Framework",
    kind: "Machine learning framework from scratch",
    category: "systems",
    art: "autograd",
    period: "June to July 2026",
    team: "Solo project",
    guide: "",
    blurb: "A machine learning framework built from scratch in Python and NumPy, with automatic differentiation checked against numerical gradients.",
    details: [
      "Implemented automatic differentiation and backpropagation through a computation graph.",
      "Verified correctness with numerical gradient checking.",
      "Designed neural network layers and optimizers, and trained a multi-layer network to 98.61% accuracy."
    ],
    stack: ["Python", "NumPy", "Automatic differentiation", "scikit-learn"],
    links: {
      github: "https://github.com/aryamanbansal15/Autograd-Framework",
      live: "",
      figma: ""
    }
  },
  {
    id: "log-analyzer",
    title: "AI-Powered Log Analyzer",
    kind: "Multithreaded C++ log aggregation server",
    category: "systems",
    art: "logs",
    period: "May to June 2026",
    team: "Solo project",
    guide: "",
    blurb: "A multithreaded C++ log server that aggregates logs over TCP and uses the Gemini API to suggest root causes.",
    details: [
      "Engineered a multithreaded log aggregation server on TCP sockets, with thread-safe synchronization using mutex locks and condition variables.",
      "Built a thread-safe hash map with write-ahead logging.",
      "Integrated the Gemini API for AI-driven root cause analysis."
    ],
    stack: ["C++17", "TCP sockets", "POSIX threads", "libcurl", "JSON", "Gemini API"],
    links: {
      github: "https://github.com/aryamanbansal15/AI-Powered-Log-Analyzer",
      live: "",
      figma: ""
    }
  },
  {
    id: "unix-shell",
    title: "Simple Unix Shell",
    kind: "Operating systems project in C",
    category: "systems",
    art: "shell",
    period: "September to October 2025",
    team: "Team of 2",
    guide: "Dr. Vivek Kumar",
    blurb: "A Unix shell written in C that covers processes, pipes, redirection and signals.",
    details: [
      "Implemented a Unix shell from scratch.",
      "Handled process management and concurrency with fork, exec and waitpid.",
      "Added I/O redirection with pipes and dup2, plus signal handling."
    ],
    stack: ["C", "POSIX", "fork/exec", "pipe", "dup2", "signals"],
    links: {
      github: "https://github.com/aryamanbansal15/SIMPLE-SHELL",
      live: "",
      figma: ""
    }
  }

  
];
