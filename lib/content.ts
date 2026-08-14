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
    id: "edge",
    layer: "The edge",
    sub: "DNS · TLS · CDN",
    title: "Where the request arrives, and where it quietly dies.",
    body: "Route 53, CloudFront and ACM certificates in front of everything. Cache headers set deliberately rather than inherited, TLS terminated at the edge, and renewals that run on a schedule instead of on the morning something breaks.",
    bite: "Nothing changed. The certificate expired. It is always a Sunday, and it is never in the deploy log.",
    tools: ["CloudFront", "Route 53", "ACM", "Nginx", "SSL/TLS"],
  },
  {
    n: "02",
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
