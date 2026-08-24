export const SITE = {
  cv: "/Deep-Boda-DevOps-Engineer-CV.pdf",
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
    "Senior DevOps and Full-Stack Engineer in Ahmedabad. Four years running production on AWS: Kubernetes on EKS, ECS microservices, Terraform and the Node.js on top. Available from 1 September.",
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
    body: "Node.js and Express services, REST APIs, Socket.io streaming live market data, Next.js with SSR on the front, React admin dashboards behind it. On my own product it is NestJS on Fastify with Prisma and PostgreSQL, and a Flutter app talking to it.",
    bite: "One un-awaited promise blocks the event loop, and every user waits for one user's request.",
    tools: [
      "Node.js",
      "Express",
      "NestJS",
      "Socket.io",
      "Next.js",
      "React",
      "Flutter",
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
    note: "And shipping Anonymous India, my own product, solo.",
  },
];

export type Work = {
  id: string;
  name: string;
  role: string;
  kind: "Client platform" | "Company product" | "My own product";
  summary: string;
  points: string[];
  stack: string[];
  caseStudy?: string;
  scale?: string;
  image?: string;
  imageAlt?: string;
};

/**
 * Live products. Client and product names left out on purpose.
 * The decisions are mine to talk about. The names are not.
 */
export const WORK: Work[] = [
  {
    id: "travel",
    name: "Consumer Travel Platform",
    role: "Infrastructure lead",
    kind: "Client platform",
    scale: "90,000+ locations, 500k+ records",
    summary: "Global discovery and data platform running on Kubernetes.",
    points: [
      "Ran the whole EKS environment: cluster design, node groups, autoscaling and rollout strategy, with infrastructure defined in AWS CDK.",
      "90,000+ locations and over 500,000 records behind it, with Elasticsearch doing geo and full-text search and Redis holding API responses under 100ms.",
      "GitOps delivery through ArgoCD, so a bad release was one reverted commit rather than a manual scramble.",
      "CloudFront caching plus query tuning took throughput and page speed to roughly three times what it was.",
    ],
    stack: ["Kubernetes (EKS)", "ArgoCD", "Jenkins", "Node.js", "Express", "PostgreSQL", "Sequelize", "Redis", "Elasticsearch", "CloudFront", "S3", "ECR", "Docker"],
    image: "/work/travel.webp",
    imageAlt: "Architecture diagram: CloudFront and an ALB in front of an EKS cluster running three services, with PostgreSQL, Redis and Elasticsearch behind, and ArgoCD syncing from Git.",
  },
  {
    id: "fintech",
    name: "Fintech Trading Platform",
    role: "Infrastructure lead",
    kind: "Client platform",
    scale: "100,000+ users",
    summary: "Live stock tournaments, leaderboards and portfolios on a real market data feed.",
    points: [
      "Ran the microservices behind it: the main API, scheduled jobs, a leaderboard service, and a Socket.io service pushing live prices from a real-time market data feed.",
      "Split into separate task definitions so the socket service scales alone. When markets open and connections jump, the API and batch jobs stay flat.",
      "That containment is the whole design. One hot service exhausting shared capacity is how the platform goes down.",
      "SQS and Lambda took background jobs and notifications off the request path, which kept the APIs light. 99.9% uptime and deploys around 80% faster after moving to containers and Jenkins.",
    ],
    stack: ["AWS ECS", "ECR", "SQS", "Lambda", "Socket.io", "Node.js", "TypeScript", "MySQL", "MongoDB", "Redis", "Docker", "Jenkins", "Razorpay"],
    image: "/work/fintech.webp",
    imageAlt: "Architecture diagram: an ALB feeding four separate ECS services, with the Socket.io service marked in red as the only one that scales during market hours.",
  },
  {
    id: "anonymous",
    name: "Anonymous India",
    role: "Sole engineer, product to production",
    kind: "My own product",
    scale: "4 codebases, 1 person",
    summary:
      "A social product I own end to end: Flutter app, NestJS API, public site and an admin console.",
    points: [
      "Everything is mine on this one. Product decisions, the data model, the API, the app, the infrastructure and the store releases.",
      "NestJS on the Fastify adapter with Prisma over PostgreSQL 16, Redis 7 for sessions, rate limits and the Socket.io adapter, so realtime works across more than one API container.",
      "Auth is device-based rather than email or phone. A hashed device id, JWT signed RS256, refresh tokens that can be invalidated the moment somebody is banned.",
      "Rate limiting, profanity filtering, reports, bans and an audit log all run server side, because moderation that lives in the client is not moderation.",
      "Multi-stage Docker build on node:20-alpine running as a non-root user, with Postgres, Redis, the API and Nginx composed together for production.",
      "Flutter on the front with Firebase for push, crashlytics and analytics, RevenueCat for subscriptions and AdMob underneath the free tier.",
    ],
    stack: [
      "Flutter",
      "NestJS",
      "Fastify",
      "Prisma",
      "PostgreSQL 16",
      "Redis 7",
      "Socket.io",
      "Docker",
      "Nginx",
      "Firebase",
      "RevenueCat",
    ],
    caseStudy: "/work/anonymous-india",
    image: "/work/anonymous.webp",
    imageAlt:
      "Architecture diagram of Anonymous India: a Flutter app and a Next.js site and admin console calling an Nginx front door, then a NestJS API on Fastify, with PostgreSQL, Redis and Firebase Storage behind it and Socket.io pushing realtime updates.",
  },
  {
    id: "aitools",
    name: "AI Tools Directory",
    role: "Backend & infrastructure lead",
    kind: "Company product",
    summary: "AI tools directory with prompt-based search, owned end to end.",
    points: [
      "Product direction, backend and infrastructure, all mine.",
      "Search runs on the OpenAI API: describe the problem in plain language and get the tools that fit, rather than guessing at a category.",
      "Node.js and Express on MySQL, with Elasticsearch search across the catalogue and Redis caching the busiest queries.",
      "An image resizing pipeline behind S3 and CloudFront, so a content-heavy catalogue still loads fast.",
      "Also the technical SEO and page speed work, which is the half of a directory that decides whether it gets found.",
    ],
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "Redis", "Elasticsearch", "OpenAI API", "S3", "CloudFront", "Nodemailer", "Technical SEO"],
  },
  {
    id: "cards",
    name: "Digital Business Card Platform",
    role: "Backend lead & client delivery",
    kind: "Client platform",
    summary: "Digital business cards linked to physical NFC products.",
    points: [
      "Built the entire backend, and ran both the client relationship and the delivery team through to launch.",
      "Card creation and editing, QR-based profile sharing, and Apple Wallet passes.",
      "Paired with physical NFC hardware: metal cards, wristbands and stickers, each mapped to a profile.",
      "Used the OpenAI API for card recognition on scan, so a photographed card becomes a contact without retyping it.",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Redis", "OpenAI API", "Stripe", "CircleCI", "Docker", "S3", "CloudFront", "NFC"],
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
    role: "Backend lead",
    kind: "Client platform",
    summary: "Back-office platform for a large industrial group, running on Azure.",
    points: [
      "Built the whole backend: employees, attendance with shift logic, leave, equipment, inventory, vendors, purchase, expenses and maintenance, in one dashboard.",
      "Role based access across admins, HR, vendors and technicians, so each group only sees what it should.",
      "This one runs on Azure rather than AWS. Blob Storage behind Multer for uploads, Azure Pipelines for delivery.",
      "It replaced a manual paper workflow. Reporting that used to take a day comes back in minutes.",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Azure Blob Storage", "Azure Pipelines", "Multer", "RBAC"],
  },
];

/**
 * The creed. Every line here is argued out properly in one of the posts.
 */
export const PRINCIPLES = [
  {
    tint: "--l1",
    rule: "Climb only when the rung below actually hurts.",
    why: "One EC2 box with systemd is not embarrassing. Moving to a cluster before the current setup causes real pain buys you complexity you then have to run.",
  },
  {
    tint: "--l2",
    rule: "An alert that never needs action is not monitoring.",
    why: "It is noise with a pager attached. Muting the one that fires nightly is not laziness, it is the work. The rest only mean something once the noise is gone.",
  },
  {
    tint: "--l3",
    rule: "You do not have backups until you have timed a restore.",
    why: "Everyone asks whether backups exist. Almost nobody asks how long the restore takes, and only one of those questions matters at 3 AM.",
  },
  {
    tint: "--l4",
    rule: "Containment beats capacity.",
    why: "One service spiking should never be able to take the other three with it. Splitting workloads so a spike stays where it started is most of what reliability actually is.",
  },
  {
    tint: "--l5",
    rule: "Write it down the same day, while it still hurts.",
    why: "A runbook written a week later is missing the part you only knew at 2 AM. Being the only person who understands something is not job security, it is a bill somebody pays later.",
  },
  {
    tint: "--l6",
    rule: "The boring things are the ones that worked.",
    why: "Four years of this and the changes that genuinely moved reliability were unglamorous. The exciting migrations mostly moved the problem somewhere new.",
  },
];
