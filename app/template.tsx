/**
 * A template remounts on every navigation, so this is where the page
 * transition lives. Opacity only, on purpose: a transform here would
 * become the containing block for anything position: fixed inside a
 * page, which would break the reading progress bar on articles.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
