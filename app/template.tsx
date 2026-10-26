"use client";

import { useEffect } from "react";

/* Set once the first page has mounted. The fade is for moving between pages:
   on the very first load it held every heading at opacity 0, Chrome never
   counted them as painted, and mobile LCP read 5.9 s for a page that is on
   screen in a tenth of a second. */
let navigated = false;

/**
 * A template remounts on every navigation, so this is where the page
 * transition lives. Opacity only, on purpose: a transform here would
 * become the containing block for anything position: fixed inside a
 * page, which would break the reading progress bar on articles.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    navigated = true;
  }, []);
  return <div className={navigated ? "page-in" : undefined}>{children}</div>;
}
