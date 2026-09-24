import OpengraphImage from "./opengraph-image";
import { profile } from "@/data/profile";

// Pre-rendered at build time for the static export.
export const dynamic = "force-static";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
