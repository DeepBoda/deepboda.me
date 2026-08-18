import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
    h2: (p) => <h2 className="h3 mt-14 mb-4 scroll-mt-24" {...p} />,
    h3: (p) => (
      <h3
        className="mt-10 mb-3 font-semibold t-md tracking-[-0.02em]"
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
    table: (p) => (
      <div className="my-8 -mx-1 overflow-x-auto">
        <table className="w-full min-w-[26rem] border-collapse text-left" {...p} />
      </div>
    ),
    thead: (p) => <thead className="border-b border-[var(--line)]" {...p} />,
    th: (p) => (
      <th
        className="py-2.5 pr-6 font-semibold t-sm uppercase tracking-[0.1em] text-[var(--faint)]"
        {...p}
      />
    ),
    tr: (p) => <tr className="border-b border-[var(--hair)] last:border-0" {...p} />,
    td: (p) => (
      <td
        className="py-3 pr-6 align-top text-[var(--mid)] leading-relaxed first:whitespace-nowrap first:font-medium first:text-[var(--ink)] first:w-[5.5rem]"
        {...p}
      />
    ),
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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
