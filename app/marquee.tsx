/**
 * Two slow rows of the stack, running opposite ways. Pure CSS, no client JS.
 *
 * Each row holds the same list twice and slides by exactly half its width, so
 * the loop has no seam. The second copy is aria-hidden, and a reduced-motion
 * visitor gets one static wrapped copy instead of anything moving. Only the
 * tools named here are ones in daily use, the same list as the Skills section
 * of the CV.
 */
const INFRA = [
  "Kubernetes",
  "AWS EKS",
  "ECS",
  "Terraform",
  "ArgoCD",
  "Jenkins",
  "GitHub Actions",
  "Prometheus",
  "Grafana",
  "CloudFront",
];
const APP = [
  "Node.js",
  "NestJS",
  "Next.js",
  "PostgreSQL",
  "Redis",
  "Elasticsearch",
  "Socket.io",
  "Docker",
  "Nginx",
  "Flutter",
];

function Row({
  items,
  rev = false,
  dur,
  flip = false,
}: {
  items: string[];
  rev?: boolean;
  dur: number;
  /* start the solid/outline alternation on the other foot, so the two rows
     never put the same treatment on top of each other */
  flip?: boolean;
}) {
  const copy = (dup: boolean) => (
    <ul
      className="marquee-copy"
      data-dup={dup}
      aria-hidden={dup ? true : undefined}
      aria-label={dup ? undefined : "Stack"}
    >
      {items.map((t, i) => (
        <li key={t} className="marquee-item" data-o={(i % 2 === 1) !== flip}>
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="marquee-row"
      data-rev={rev}
      style={{ ["--dur" as string]: `${dur}s` }}
    >
      {copy(false)}
      {copy(true)}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="The stack" className="marquee">
      <Row items={INFRA} dur={52} />
      <Row items={APP} dur={60} rev flip />
    </section>
  );
}
