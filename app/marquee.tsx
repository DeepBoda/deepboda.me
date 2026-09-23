/**
 * The stack, moving. One row scrolling left, one scrolling right, so the eye
 * has something to follow without a single word ever being hard to read. The
 * list is duplicated once so the loop is seamless. Pauses on hover and under
 * reduced motion, where it simply sits still as two readable rows.
 */
const ROW_A = [
  "Kubernetes", "AWS EKS", "AWS ECS", "Terraform", "ArgoCD", "Helm", "Docker",
  "Jenkins", "CircleCI", "GitHub Actions", "CloudFront", "Route 53", "RDS", "S3",
];
const ROW_B = [
  "Node.js", "NestJS", "Express", "TypeScript", "PostgreSQL", "MySQL", "Redis",
  "Elasticsearch", "Socket.io", "Next.js", "React", "Flutter", "Prisma", "Nginx",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`mq-row ${reverse ? "mq-rev" : ""}`}>
      <div className="mq-track">
        {list.map((t, i) => (
          <span key={i} className="mq-item">
            <span className="mq-dot" aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="mq" aria-label="Tools I work with every week">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
