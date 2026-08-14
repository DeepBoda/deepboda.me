import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? SITE.tagline;
  const kicker = searchParams.get("kicker") ?? "DevOps · Platform · Full-Stack";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfcfa",
          padding: "72px 76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent rule */}
        <div style={{ display: "flex", width: 92, height: 6, background: "#c8365a" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#8a8a92",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: title.length > 58 ? 60 : 72,
              fontWeight: 700,
              letterSpacing: -2.6,
              lineHeight: 1.06,
              color: "#1d1d1f",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e2e3e7",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#1d1d1f", fontWeight: 600 }}>
            Deep Boda
            <span style={{ color: "#8a8a92", fontWeight: 400, marginLeft: 12 }}>
              Senior DevOps &amp; Full-Stack Engineer
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8a8a92" }}>deepboda.me</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control": "public, immutable, no-transform, max-age=31536000",
      },
    }
  );
}
