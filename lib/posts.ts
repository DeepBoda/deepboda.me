export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO
  read: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

/**
 * Manifest for the writing index and the sitemap.
 * Each entry has a matching app/writing/<slug>/page.mdx
 */
export const POSTS: Post[] = [
  {
    slug: "three-lakh-api-calls",
    title: "Ten API calls. Three of them were the same question.",
    summary:
      "The ask was more servers. I spent a day counting instead. One screen, ten calls, one lakh opens a day, and three lakh requests that never needed to exist.",
    date: "2026-08-25",
    read: "7 min",
    tags: ["API design", "Architecture", "Postgres", "Cost"],
    image: "/writing/three-lakh-api-calls.webp",
    imageAlt:
      "Two network panels stacked. The top one lists ten GET requests for a single home screen with five of them marked in red, and the bottom one lists the same screen rebuilt with 7 requests, the merged call marked in green. A handwritten note between them reads that four of these read the same one row.",
  },
  {
    slug: "one-service-took-everything",
    title: "The night one service took everything with it",
    summary:
      "A real postmortem, written the way I write them internally. One host, no isolation, a spike at market open, and every other service on the box went down with it.",
    date: "2026-08-19",
    read: "6 min",
    tags: ["Postmortem", "SRE", "On-call", "Architecture"],
    image: "/writing/one-service-took-everything.webp",
    imageAlt:
      "A dark incident report showing a relative timeline from T+0 to T+40 minutes, with the row at T+6 highlighted where a user reported the outage before any alert fired, and a list of the four things that changed afterwards.",
  },
  {
    slug: "where-it-breaks",
    title: "Where it actually breaks",
    summary:
      "One request, browser to disk. Eight layers, and the specific thing that bites at each one. The expensive bugs live in the seams between them.",
    date: "2026-08-13",
    read: "6 min",
    tags: ["DevOps", "Platform", "Debugging"],
    image: "/writing/where-it-breaks.webp",
    imageAlt:
      "Eight sticky notes on a white grid, one per layer of a request, each naming the failure that happens there. A red arrow marks the gap between the app and the database.",
  },
  {
    slug: "kubernetes-ladder",
    title: "Do you actually need Kubernetes?",
    summary:
      "Five rungs, simplest at the bottom. I run all of them in production right now. Climbing too early costs money, climbing too late costs a night.",
    date: "2026-08-12",
    read: "5 min",
    tags: ["Kubernetes", "AWS", "Architecture"],
    image: "/writing/kubernetes-ladder.webp",
    imageAlt:
      "A hand-drawn ladder on ruled paper with five rungs, from one EC2 with systemd at the bottom up to Kubernetes at the top.",
  },
  {
    slug: "jd-vs-job",
    title: "The job description versus the job",
    summary:
      "I re-read my own job description last week. It describes about 20% of what I actually do. Nobody writes a JD for the other circle.",
    date: "2026-08-14",
    read: "4 min",
    tags: ["Hiring", "DevOps", "Career"],
    image: "/writing/jd-vs-job.webp",
    imageAlt:
      "A hand-drawn Venn diagram. The left circle is what the job description said, the right circle is what the job actually is, and the small overlap is labelled about 20 percent.",
  },
  {
    slug: "terraform-drift",
    title: "Nobody wrote this diff",
    summary:
      "I ran terraform plan against production when nothing was wrong. Three things came back changed, and one of them was mine.",
    date: "2026-08-15",
    read: "5 min",
    tags: ["Terraform", "AWS", "IaC"],
    image: "/writing/terraform-drift.webp",
    imageAlt:
      "A dark terminal showing terraform plan output with three in-place changes, current values in red and desired values in green.",
  },
  {
    slug: "alert-fatigue",
    title: "47 alerts. Two mattered.",
    summary:
      "I muted a production alert last month and it was the right call. An alert that fires every night and never needs action is not monitoring.",
    date: "2026-08-16",
    read: "4 min",
    tags: ["SRE", "On-call", "Observability"],
    image: "/writing/alert-fatigue.webp",
    imageAlt:
      "A phone lock screen at 2:44 AM. Five alert notifications, three dimmed as noise and two highlighted as the ones that needed a human.",
  },
  {
    slug: "boring-reliability",
    title: "None of it was exciting",
    summary:
      "Four years of infrastructure work. The things that genuinely moved reliability were embarrassingly boring, and the exciting ones did nothing.",
    date: "2026-08-17",
    read: "4 min",
    tags: ["Reliability", "SRE", "DevOps"],
    image: "/writing/boring-reliability.webp",
    imageAlt:
      "A printed procedures card in monospace with seven ticked reliability items and three struck out, stamped BORING in red.",
  },
  {
    slug: "restore-time",
    title: "You don't have backups. You have files.",
    summary:
      "Everyone asks whether you have backups. Almost nobody asks how long a restore takes, and only one of those questions matters at 3 AM.",
    date: "2026-08-18",
    read: "4 min",
    tags: ["Reliability", "Disaster Recovery", "AWS"],
    image: "/writing/restore-time.webp",
    imageAlt:
      "A typographic poster asking how long a full restore actually takes, with a blank fill-in line and the seven steps of a real restore listed below.",
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export const sortedPosts = () =>
  [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
