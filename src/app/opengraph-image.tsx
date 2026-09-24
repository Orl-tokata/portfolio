import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Pre-rendered at build time for the static export.
export const dynamic = "force-static";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const stack = ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#05070d",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(96,165,250,0.28), transparent 45%), radial-gradient(circle at 90% 90%, rgba(167,139,250,0.25), transparent 45%)",
          color: "#eef2ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(110deg, #60a5fa, #22d3ee, #a78bfa)",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 26, color: "#a3acc2" }}>{`${profile.company} · Global Product`}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 600,
              marginTop: 16,
              backgroundImage: "linear-gradient(100deg, #60a5fa, #22d3ee, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 24,
                color: "#d6deeb",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
