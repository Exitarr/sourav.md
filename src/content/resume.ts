/**
 * Single source of truth for all site content.
 * Derived from SouravDas_Resume.pdf (personal projects: from their READMEs) — do not add facts that aren't in a source.
 */

export const profile = {
  name: "Sourav Das",
  handle: "sourav.md",
  role: "Software Engineer",
  team: "Data Security Engineering",
  company: "American Express",
  location: "India",
  headline: "Backend Engineer · Data Security Engineering @ American Express",
  summary:
    "Software Engineer at American Express specializing in backend engineering, distributed systems, performance optimization and enterprise data security. I build REST APIs and backend services in Java, Spring Boot, Python and FastAPI, own a distributed performance benchmarking framework, and work with database systems, messaging technologies and cloud-native infrastructure.",
  summaryExtra:
    "Experienced in owning backend frameworks, improving build efficiency and building automation. Familiar with Generative AI — LLMs, RAG, LangChain, LangGraph, MCP and agentic workflows.",
  strengths: [
    "Backend services & REST APIs — Java, Spring Boot, Python, FastAPI, Flask",
    "Distributed performance benchmarking & optimization",
    "Enterprise data security & cryptographic platforms",
    "Observability — OpenTelemetry, InfluxDB, Grafana",
    "Messaging, caching & storage — Kafka, Redis, Couchbase, AWS S3",
    "Cloud-native delivery — Docker, Kubernetes, Helm, CI/CD",
  ],
} as const;

export const links = {
  email: "souravdas212002@gmail.com",
  github: "https://github.com/Exitarr",
  githubHandle: "Exitarr",
  linkedin: "https://www.linkedin.com/in/sourav-das-8a008a238/",
  linkedinHandle: "sourav-das-8a008a238",
  resume: "/SouravDas_Resume.pdf",
} as const;

export type Role = {
  id: string;
  title: string;
  team: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "amex-se",
    title: "Software Engineer",
    team: "Data Security Engineering",
    company: "American Express",
    location: "India",
    start: "Sep 2025",
    end: "Present",
    current: true,
    points: [
      "Engineer and maintain enterprise backend services and REST APIs in Java, Spring Boot and Python.",
      "Own the Distributed Performance Benchmarking Framework — development, performance optimization, automation and observability.",
      "Support enterprise data security and cryptographic platforms across security, reliability, performance and operational requirements.",
      "Use Cursor, Claude and GitHub Copilot to speed up code analysis, test development and documentation.",
      "Take part in design discussions, code reviews, testing, production support and troubleshooting.",
    ],
    stack: ["Java", "Spring Boot", "Python", "REST APIs", "Cursor", "Claude", "GitHub Copilot"],
  },
  {
    id: "amex-intern",
    title: "Software Engineer Intern",
    team: "Data Security Engineering",
    company: "American Express",
    location: "India",
    start: "Jan 2025",
    end: "Jul 2025",
    current: false,
    points: [
      "Developed backend services and REST API integrations with Python and Flask.",
      "Supported performance engineering, test automation and concurrent execution of application workloads.",
      "Implemented observability through centralized logging and distributed tracing with OpenTelemetry.",
      "Worked with containerization and orchestration using Docker, Kubernetes and Helm.",
      "Automated build, test and deployment workflows with GitHub Actions and Jenkins.",
    ],
    stack: ["Python", "Flask", "OpenTelemetry", "Docker", "Kubernetes", "Helm", "GitHub Actions", "Jenkins"],
  },
];

export type Project = {
  slug: string;
  name: string;
  /** "personal" = side project; "amex" = built at American Express. */
  group: "personal" | "amex";
  kind: "genai" | "backend" | "web";
  tagline: string;
  problem?: string;
  implementation: string[];
  impact?: string[];
  stack: string[];
  repo?: string;
  live?: string;
};

export const projectGroups: { id: Project["group"]; label: string; note: string }[] = [
  { id: "amex", label: "American Express", note: "built as part of my work at Amex" },
  { id: "personal", label: "Personal projects", note: "built on my own time" },
];

export const projects: Project[] = [
  // American Express — from the resume.
  {
    slug: "distributed-benchmarking-framework",
    name: "Distributed Performance Benchmarking Framework",
    group: "amex",
    kind: "backend",
    tagline: "Benchmarks concurrent cryptographic workloads against an encryption SDK, at scale.",
    implementation: [
      "Python/Flask REST API exposing encryption SDK capabilities through dynamic execution and cross-language integration.",
      "Distributed benchmarking of concurrent cryptographic workloads using multi-process execution and isolated environments.",
      "Integrated Redis, Kafka and AWS S3.",
      "Observability with OpenTelemetry, InfluxDB and Grafana.",
    ],
    impact: ["Cut build time by 62.5% — from 2 minutes to 45 seconds — by migrating dependency installation from pip to uv."],
    stack: ["Python", "Flask", "Redis", "Kafka", "AWS S3", "OpenTelemetry", "InfluxDB", "Grafana", "uv"],
  },
  {
    slug: "slack-rag-assistant",
    name: "Slack Knowledge Assistant using RAG",
    group: "amex",
    kind: "genai",
    tagline: "A RAG assistant that answers questions over internal documentation, inside Slack.",
    problem: "Repetitive questions about internal documentation were being answered by hand by approximately 5 developers.",
    implementation: [
      "Document chunking, embeddings and semantic retrieval over internal documentation.",
      "Prompt engineering and grounded LLM response generation.",
      "Integrated with the existing Natalie Bot to deliver contextual answers directly in Slack.",
    ],
    impact: ["Took over repetitive queries previously handled by approximately 5 developers."],
    stack: ["Python", "FastAPI", "LangChain", "LangGraph", "RAG", "LLMs"],
  },
  {
    slug: "key-usage-analytics-api",
    name: "Key Usage Analytics REST API",
    group: "amex",
    kind: "backend",
    tagline: "Gives client applications visibility into the encryption keys tied to them.",
    implementation: [
      "Spring Boot REST API exposing key usage statistics to client applications.",
      "Couchbase used to aggregate key counts by type and usage from the enterprise Key Management System.",
      "Client-facing visibility into the encryption keys associated with each client through API integration.",
    ],
    stack: ["Java", "Spring Boot", "Couchbase", "REST APIs"],
  },

  // Personal projects — details from the project's own README.
  {
    slug: "aimforge",
    name: "AimForge",
    group: "personal",
    kind: "web",
    tagline: "A 3D aim trainer that runs entirely in the browser.",
    problem:
      "Pick a scenario, match your in-game sensitivity, and train flicking, tracking, reflexes and precision — no install and no build step.",
    implementation: [
      "First-person 3D room in Three.js with pointer lock and raw (unaccelerated) mouse input where supported.",
      "Six scenarios covering flicking, tracking, reflexes, precision and depth.",
      "Game-matched sensitivity for CS2 / CS:GO / Apex, Valorant and Overwatch 2, with cm/360 and degrees-per-count readouts.",
      "Adjustable FOV and round length, plus a custom crosshair editor with live preview.",
      "Scoring with streak multiplier, accuracy, kills/sec and time-to-kill; personal bests and the last 30 runs per scenario saved in localStorage.",
      "Synthesised sound effects via the Web Audio API — no audio files.",
    ],
    stack: ["JavaScript", "Three.js", "WebGL", "Pointer Lock API", "Web Audio API", "HTML", "CSS"],
    repo: "https://github.com/Exitarr/aimforge",
    live: "https://aimforge-lyart.vercel.app",
  },
];

export const skills: { group: string; key: string; items: string[] }[] = [
  { group: "Languages", key: "languages", items: ["Java", "Python", "C++", "JavaScript"] },
  { group: "Backend", key: "backend", items: ["Spring Boot", "Flask", "FastAPI", "REST APIs", "Express.js"] },
  {
    group: "Databases & Messaging",
    key: "data",
    items: ["Couchbase", "Redis", "Kafka", "InfluxDB", "PostgreSQL", "MongoDB"],
  },
  {
    group: "Cloud & DevOps",
    key: "cloud_devops",
    items: ["AWS S3", "Docker", "Kubernetes", "Helm", "Cloud Native Buildpacks", "Jenkins", "GitHub Actions", "Linux"],
  },
  { group: "Observability", key: "observability", items: ["OpenTelemetry", "Grafana"] },
  { group: "AI / GenAI", key: "genai", items: ["LLMs", "RAG", "LangChain", "LangGraph", "MCP", "Agentic Workflows"] },
  { group: "Developer Tools", key: "tools", items: ["Cursor", "Claude", "GitHub Copilot"] },
  {
    group: "Engineering Concepts",
    key: "concepts",
    items: [
      "Distributed systems",
      "Performance optimization",
      "REST API development",
      "Enterprise data security",
      "Messaging technologies",
      "Cloud-native infrastructure",
    ],
  },
];

export const education = [
  {
    institution: "National Institute of Technology, Rourkela",
    degree: "B.Tech in Computer Science and Engineering",
    level: "B.Tech",
    major: "Computer Science and Engineering",
    start: "2021",
    end: "2025",
    cgpa: "8.32",
    cgpaScale: "10",
  },
];
