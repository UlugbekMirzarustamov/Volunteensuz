// TEMPORARY diagnostic endpoint — remove after debugging the deploy.
// Reports the real database error and which env vars are present (no secrets).
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL || "";
  const env = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    dbUrlLength: url.length,
    dbHasPooler: url.includes("-pooler"),
    dbHasPgbouncer: url.includes("pgbouncer=true"),
    dbHasQuotes: url.startsWith('"') || url.endsWith('"'),
    hasDirectUrl: !!process.env.DIRECT_URL,
    hasJwtSecret: !!process.env.JWT_SECRET,
    node: process.version,
  };
  try {
    const count = await prisma.program.count();
    return Response.json({ ok: true, programCount: count, env });
  } catch (e) {
    return Response.json(
      { ok: false, error: e.message, name: e.name, code: e.code, env },
      { status: 500 }
    );
  }
}
