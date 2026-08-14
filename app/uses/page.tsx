import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The hardware, editor, terminal and tools I actually use to run production infrastructure and write the code on top of it.",
  alternates: { canonical: `${SITE.url}/uses` },
  openGraph: {
    title: "Uses",
    url: `${SITE.url}/uses`,
    images: [
      `/og?title=${encodeURIComponent("What I actually use.")}&kicker=${encodeURIComponent("Uses")}`,
    ],
  },
};

const GROUPS: { title: string; note?: string; items: [string, string][] }[] = [
  {
    title: "Machine",
    items: [
      ["MacBook Pro", "Apple Silicon. The reason I can build and notarise universal binaries locally."],
      ["External display", "One screen for the terminal, one for everything else."],
    ],
  },
  {
    title: "Editor and terminal",
    items: [
      ["VS Code", "With Vim keybindings. I have tried to leave and keep coming back."],
      ["iTerm2 + zsh", "Split panes, one per environment. Colour-coded so prod looks different from staging."],
      ["CtrlOps", "A desktop DevOps terminal I built in Rust with Tauri. SSH sessions over IPC and an LLM wired into the same core to explain commands mid-incident."],
    ],
  },
  {
    title: "Infrastructure",
    note: "The things open on my second screen most days.",
    items: [
      ["AWS Console + CLI", "EKS, ECS, RDS, S3, CloudFront, IAM."],
      ["Terraform", "Everything, including the things we swore we would only do once."],
      ["k9s", "Faster than kubectl for the ninety percent of cluster work that is just looking."],
      ["ArgoCD", "GitOps delivery. A bad release is one reverted commit."],
      ["Grafana + Prometheus", "Alerts tuned so a page means a human has to act."],
    ],
  },
  {
    title: "Building",
    items: [
      ["Node.js + Express", "Most of the backends I write."],
      ["Next.js + React", "Including this site."],
      ["Rust", "For CtrlOps. Tokio and ssh2."],
      ["Postman", "For the APIs I did not write."],
    ],
  },
  {
    title: "Shipping",
    items: [
      ["Xcode Cloud", "iOS builds on tag, straight to TestFlight."],
      ["App Store Connect", "Certificates, provisioning profiles, review submissions."],
      ["Google Play Console", "Signed AABs and staged rollouts."],
      ["notarytool", "macOS notarisation, stapled before the DMG ships."],
    ],
  },
];

export default function Uses() {
  return (
    <main className="wrap pt-16 pb-24 md:pt-24">
      <p className="eyebrow reveal">Uses</p>
      <h1 className="h2 mt-4 max-w-[18ch] reveal">What I actually use.</h1>
      <p className="lede mt-5 max-w-[54ch] reveal">
        Not an aspirational list. These are the things that are open right now.
      </p>

      <div className="mt-16 space-y-14 max-w-[720px]">
        {GROUPS.map((g) => (
          <section key={g.title} className="reveal">
            <h2 className="h3">{g.title}</h2>
            {g.note && (
              <p className="mt-2 text-[0.92rem] text-[var(--soft)]">{g.note}</p>
            )}
            <dl className="mt-6">
              {g.items.map(([k, v]) => (
                <div
                  key={k}
                  className="grid sm:grid-cols-[186px_1fr] gap-x-6 gap-y-1 py-3.5 border-t border-[var(--hair)]"
                >
                  <dt className="font-medium text-[var(--ink)]">{k}</dt>
                  <dd className="text-[var(--mid)] leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}
