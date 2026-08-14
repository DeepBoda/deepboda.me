import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (p) => <h2 className="h3 mt-14 mb-4 scroll-mt-24" {...p} />,
    h3: (p) => (
      <h3
        className="mt-10 mb-3 font-semibold text-[1.05rem] tracking-[-0.02em]"
        {...p}
      />
    ),
    p: (p) => <p className="my-5 text-[var(--mid)] leading-[1.75]" {...p} />,
    ul: (p) => <ul className="my-5 space-y-2.5 list-none" {...p} />,
    li: (p) => (
      <li
        className="relative pl-5 text-[var(--mid)] leading-[1.7] before:absolute before:left-0 before:top-[0.7em] before:w-[5px] before:h-[5px] before:rounded-[1px] before:bg-[var(--faint)]"
        {...p}
      />
    ),
    strong: (p) => <strong className="font-semibold text-[var(--ink)]" {...p} />,
    blockquote: (p) => (
      <blockquote
        className="my-7 border-l-2 border-[var(--accent)] pl-5 text-[var(--ink)] font-medium leading-relaxed"
        {...p}
      />
    ),
    hr: () => <hr className="my-12 border-0 border-t border-[var(--hair)]" />,
    a: (p) => <a className="link-u text-[var(--ink)]" {...p} />,
    code: (p) => (
      <code
        className="mono px-1.5 py-0.5 rounded bg-[var(--hair)] text-[var(--ink)]"
        {...p}
      />
    ),
    img: (props) => (
      <Image
        src={typeof props.src === "string" ? props.src : ""}
        alt={props.alt ?? ""}
        width={1080}
        height={1350}
        className="my-10 w-full h-auto rounded-xl border border-[var(--line)]"
      />
    ),
    ...components,
  };
}
