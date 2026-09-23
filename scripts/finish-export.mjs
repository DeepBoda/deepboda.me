import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname, relative } from "node:path";

const OUT = "out";

/**
 * next build --output export writes /work as out/work.html. Servers differ on
 * whether they will find that from a request for /work: `serve` and Vercel do,
 * nginx needs try_files, python -m http.server never will.
 *
 * This writes out/work/index.html alongside it so the site works on any static
 * server with no configuration at all, and adds the two redirects that used to
 * live in next.config.ts, which output: export cannot carry.
 */

const REDIRECTS = [
  ["uses", "/tools"],
  ["colophon", "/how-this-site-is-built"],
];

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith(".html")) found.push(p);
  }
  return found;
}

let mirrored = 0;

for (const file of await htmlFiles(OUT)) {
  const route = relative(OUT, file).replace(/\.html$/, "");
  /* index.html is already the root document, 404.html is served by config */
  if (route === "index" || route === "404") continue;

  const target = join(OUT, route, "index.html");
  try {
    await stat(target);
    continue; // already there
  } catch {
    /* not there, write it */
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await readFile(file));
  mirrored++;
}

for (const [from, to] of REDIRECTS) {
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="https://deepboda.in${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<meta name="robots" content="noindex">
</head>
<body>
<p>This page moved to <a href="${to}">${to}</a>.</p>
<script>location.replace(${JSON.stringify(to)})</script>
</body>
</html>
`;
  await mkdir(join(OUT, from), { recursive: true });
  await writeFile(join(OUT, from, "index.html"), body);
  await writeFile(join(OUT, `${from}.html`), body);
}

console.log(
  `export finished: ${mirrored} directory index files, ${REDIRECTS.length} redirects`
);
