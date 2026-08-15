export const SITE = {
  name: "Deep Boda",
  role: "Senior DevOps & Full-Stack Engineer",
  url: "https://deepboda.me",
  email: "deepboda18@gmail.com",
  phone: "+91 8128769896",
  linkedin: "https://linkedin.com/in/deep-boda",
  location: "Ahmedabad, India",
  available: "Available from 1 September",
  tagline:
    "I run production infrastructure, and I write the code that runs on it.",
  description:
    "Senior DevOps and Full-Stack Engineer. Four years running production on AWS: Kubernetes on EKS serving millions of requests a day, ECS microservices behind a platform with 100,000+ users, Terraform, CI/CD, and the Node.js backends on top.",
};

export type Layer = {
  n: string;
  tint: string;
  weight: number;
  id: string;
  layer: string;
  sub: string;
  title: string;
  body: string;
  bite: string;
  tools: string[];
};

/**
 * The homepage is one request travelling down the stack.
 * Each layer is a section, and each section is what I do there.
 */
export const LAYERS: Layer[] = [
  {
    n: "01",
    tint: "var(--l1)",
    weight: 14,
    id: "edge",
    layer: "The edge",
    sub: "DNS · TLS · CDN",
    title: "Where the request arrives, and where it quietly dies.",
    body: "Route 53, CloudFront and ACM certificates in front of everything. Cache headers I set on purpose instead of inheriting whatever the framework does, TLS at the edge, and certificate renewals on a schedule so nobody meets them for the first time on a Sunday.",
    bite: "Nothing changed. The certificate expired. It is always a Sunday, and it is never in the deploy log.",
    tools: ["CloudFront", "Route 53", "ACM", "Nginx", "SSL/TLS"],
  },
  {
    n: "02",
    tint: "var(--l2)",
    weight: 18,
    id: "balancer",
    layer: "The load balancer",
    sub: "ALB · target groups · health checks",
    title: "The layer that decides whether the fleet lives.",
    body: "Application load balancers with target groups, health check paths chosen carefully, and autoscaling policies tuned from measured peak traffic rather than a round number somebody picked in a meeting.",
    bite: "If the health check path touches the database, one slow query drains the whole fleet at once.",
    tools: ["ALB", "Target groups", "Autoscaling", "Route 53"],
  },
  {
    n: "03",
    tint: "var(--l3)",
    weight: 26,
    id: "cluster",
    layer: "The cluster",
    sub: "Kubernetes · ECS · Terraform",
    title: "Kubernetes when it earns it. Not before.",
    body: "EKS clusters serving millions of requests a day, and ECS microservices behind a platform with 100,000+ users. Cluster design, HPA and Cluster Autoscaler, Helm charts, ECR, and GitOps delivery through ArgoCD so a bad release is one reverted commit. All of it defined in Terraform.",
    bite: "Every rung up the ladder costs you a person. That is the real price, not the AWS bill.",
    tools: [
      "Kubernetes (EKS)",
      "ECS",
      "Fargate",
      "Terraform",
      "Helm",
      "ArgoCD",
      "Docker",
      "ECR",
    ],
  },
  {
    n: "04",
    tint: "var(--l4)",
    weight: 21,
    id: "app",
    layer: "The application",
    sub: "Node.js · Next.js · React",
    title: "I write this part too.",
    body: "Node.js and Express services, REST APIs, Socket.io streaming live market data, Next.js with SSR on the front, React admin dashboards behind it. Plus a desktop DevOps terminal built in Rust with Tauri, with an LLM wired into the same core so it explains and writes commands mid-incident.",
    bite: "One un-awaited promise blocks the event loop, and every user waits for one user's request.",
    tools: [
      "Node.js",
      "Express",
      "Socket.io",
      "Next.js",
      "React",
      "Rust",
      "Tauri",
    ],
  },
  {
    n: "05",
    tint: "var(--l5)",
    weight: 13,
    id: "data",
    layer: "The data",
    sub: "PostgreSQL · Redis · Elasticsearch",
    title: "Connections, not queries.",
    body: "PostgreSQL on RDS with replicas, Redis on ElastiCache for caching and pub/sub, Elasticsearch powering search across large catalogues. Schema design, replication, caching strategy and query tuning that holds under sustained production load.",
    bite: "pool size × replicas quietly passes max_connections. It works perfectly right up until you scale out.",
    tools: ["PostgreSQL", "MySQL", "Redis", "Elasticsearch", "RDS"],
  },
  {
    n: "06",
    tint: "var(--l6)",
    weight: 8,
    id: "machine",
    layer: "The machine",
    sub: "Linux · Nginx · PM2",
    title: "The boring floor everything else stands on.",
    body: "Linux servers across the estate. Nginx reverse proxy with SSL termination and load balancing, PM2 process supervision, systemd units, log rotation, SSH access control and hardening. The layer nobody budgets for and everybody depends on.",
    bite: "Logs fill the disk, and the app dies of something that has nothing to do with the app.",
    tools: ["Linux", "Nginx", "PM2", "systemd", "Bash", "SSH"],
  },
];

export const RELEASE = {
  title: "One tag. Three stores. No manual signing.",
  body: "The part that actually breaks releases is not the code. It is certificates, provisioning profiles, notarisation and store compliance.",
  lanes: [
    {
      name: "iOS",
      sub: "App Store Connect",
      steps: ["Xcode Cloud", "Signing", "TestFlight", "App Store"],
    },
    {
      name: "Android",
      sub: "Play Console",
      steps: ["Signed AAB", "Upload key", "Internal track", "Staged rollout"],
    },
    {
      name: "macOS",
      sub: "Direct distribution",
      steps: ["Universal binary", "Developer ID", "Notarisation", "Signed DMG"],
    },
  ],
};

export const STATS = [
  { v: "Millions", l: "requests a day on EKS" },
  { v: "100,000+", l: "users on ECS microservices" },
  { v: "4", l: "CI/CD toolchains in parallel" },
  { v: "3", l: "app stores shipped to" },
];

export const TIMELINE = [
  {
    year: "2021",
    title: "Professional Web Development",
    org: "Shree Academy, Rajkot",
    note: "Six months, graded A. Where the foundation got built.",
  },
  {
    year: "2022",
    title: "Joined as a developer",
    org: "TST Technology, Ahmedabad",
    note: "Backend work on client platforms. Node.js, Express, schema design.",
  },
  {
    year: "2023",
    title: "Took over infrastructure",
    org: "AWS, Docker, CI/CD",
    note: "First pipelines, first on-call, first outage that was mine to fix.",
  },
  {
    year: "2024",
    title: "Kubernetes and scale",
    org: "EKS, ECS, Terraform, ArgoCD",
    note: "Millions of requests a day. GitOps delivery. Infrastructure as code.",
  },
  {
    year: "2025",
    title: "Release engineering",
    org: "iOS, Android, macOS",
    note: "Store accounts, signing, notarisation, staged rollouts.",
  },
  {
    year: "2026",
    title: "Senior DevOps & Full-Stack Engineer",
    org: "Sole or lead infra engineer across the portfolio",
    note: "And building CtrlOps, a desktop DevOps terminal in Rust.",
  },
];

export type Work = {
  id: string;
  name: string;
  role: string;
  kind: "Client platform" | "Internal product";
  summary: string;
  points: string[];
  stack: string[];
  scale?: string;
};

/**
 * Seven live products. Client and product names left out on purpose.
 * The decisions are mine to talk about. The names are not.
 */
export const WORK: Work[] = [
  {
    id: "travel",
    name: "Consumer Travel Platform",
    role: "Infrastructure lead",
    kind: "Client platform",
    scale: "Millions of requests a day",
    summary: "Global discovery and content site running on Kubernetes.",
    points: [
      "Ran the whole EKS environment: cluster design, node groups, autoscaling and rollout strategy.",
      "Three connected apps behind it, a Node.js backend, a Next.js site and a React admin, with Elasticsearch powering location search and Redis keeping it fast under global traffic.",
      "GitOps delivery through ArgoCD, so a bad release was one reverted commit rather than a manual scramble.",
    ],
    stack: ["Kubernetes (EKS)", "ArgoCD", "Node.js", "Next.js", "React", "PostgreSQL", "Redis", "Elasticsearch", "Nginx"],
  },
  {
    id: "fintech",
    name: "Fintech Trading Platform",
    role: "Infrastructure lead",
    kind: "Client platform",
    scale: "100,000+ users",
    summary: "Stock market application streaming live market data.",
    points: [
      "Ran the AWS ECS microservices: the main API, scheduled jobs, a leaderboard, and a Socket.io service pushing live prices.",
      "Split into separate task definitions so the socket service scales alone. When markets open and connections jump, the API and batch jobs stay flat.",
      "That containment is the whole design. One hot service exhausting shared capacity is how the platform goes down.",
    ],
    stack: ["AWS ECS", "ECR", "Socket.io", "Node.js", "Redis", "PostgreSQL"],
  },
  {
    id: "ctrlops",
    name: "DevOps Desktop Application",
    role: "Product engineer",
    kind: "Internal product",
    summary: "A desktop terminal and SSH client with an LLM wired into the core.",
    points: [
      "Migrated the app from Electron to Tauri 2.0 with a Rust core. Far lighter on memory and noticeably faster.",
      "xterm.js driving a real PTY, with SSH sessions streamed over IPC rather than shelling out to a subprocess.",
      "The AI part is useful rather than decorative: it explains unfamiliar commands and writes them mid-incident, inside the terminal you are already in.",
      "Signed and notarised for macOS on both Apple Silicon and Intel.",
    ],
    stack: ["Rust", "Tokio", "ssh2", "Tauri 2.0", "React", "Vite", "xterm.js", "macOS notarisation"],
  },
  {
    id: "aitools",
    name: "AI Tools Directory",
    role: "Backend & infrastructure lead",
    kind: "Internal product",
    summary: "Search and discovery platform for AI tools, owned end to end.",
    points: [
      "Product direction, backend and infrastructure, all mine.",
      "Node.js and Express on MySQL, with Elasticsearch search across the catalogue and Redis caching the busiest queries.",
      "Also the technical SEO and page speed work, which is the half of a directory that decides whether it gets found.",
    ],
    stack: ["Node.js", "Express", "MySQL", "Redis", "Elasticsearch", "AWS", "Nginx", "Technical SEO"],
  },
  {
    id: "cards",
    name: "Digital Business Card Platform",
    role: "Backend lead & client delivery",
    kind: "Client platform",
    summary: "Digital cards and professional networking.",
    points: [
      "Built the entire backend, and ran both the client relationship and the delivery team through to launch.",
      "Card creation and editing, QR-based profile sharing, and Apple Wallet passes via PassKit.",
    ],
    stack: ["Node.js", "Express", "MySQL", "Redis", "Apple PassKit"],
  },
  {
    id: "news",
    name: "Industry News Mobile Application",
    role: "Backend engineer",
    kind: "Client platform",
    summary: "Sector news, regulation updates and a knowledge base.",
    points: [
      "Built the backend and APIs behind the mobile app: content delivery, search, and the feed that keeps professionals current on regulatory changes.",
    ],
    stack: ["Node.js", "Express", "MySQL"],
  },
  {
    id: "erp",
    name: "Enterprise ERP",
    role: "Backend engineer",
    kind: "Client platform",
    summary: "Internal ERP for a renewable energy group.",
    points: [
      "Backend services and APIs for the core business modules, with PostgreSQL schema design and Redis caching.",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Redis"],
  },
];
