import { execSync } from "node:child_process";

/**
 * Captured at build time and baked into the static output.
 * On Vercel the git details come from the platform env; locally we shell out.
 * Nothing here is invented. If a value cannot be read it says so.
 */
function git(cmd: string): string | null {
  try {
    return execSync(`git ${cmd}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

const sha =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
  git("rev-parse --short HEAD") ??
  null;

const message =
  process.env.VERCEL_GIT_COMMIT_MESSAGE?.split("\n")[0] ??
  git("log -1 --pretty=%s") ??
  null;

const commitDate = git("log -1 --date=iso-strict --pretty=%cd") ?? null;

export const BUILD = {
  sha,
  message,
  commitDate,
  builtAt: new Date().toISOString(),
  branch:
    process.env.VERCEL_GIT_COMMIT_REF ?? git("rev-parse --abbrev-ref HEAD") ?? null,
  region: process.env.VERCEL_REGION ?? null,
  env: process.env.VERCEL_ENV ?? "local",
  node: process.version,
  next:
    (() => {
      try {
        return require("next/package.json").version as string;
      } catch {
        return null;
      }
    })(),
  repo: "https://github.com/DeepBoda/deepboda.me",
};
