import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticRoutes = ["", "/programs", "/legal/privacy", "/legal/terms", "/legal/cookies"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  let programRoutes = [];
  try {
    const programs = await prisma.program.findMany({ select: { id: true, updatedAt: true } });
    programRoutes = programs.map((p) => ({
      url: `${siteUrl}/programs/${p.id}`,
      lastModified: p.updatedAt,
    }));
  } catch {
    // If the DB is unreachable at build/request time, still return static routes.
  }

  return [...staticRoutes, ...programRoutes];
}
