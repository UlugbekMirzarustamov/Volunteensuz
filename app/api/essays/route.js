import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Not signed in" }, { status: 401 });
  const essays = await prisma.essay.findMany({
    where: { userId: session.userId },
    orderBy: { updatedAt: "desc" },
  });
  return Response.json({ essays });
}

// Length caps to prevent oversized payloads
const cap = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");
const LIMITS = { title: 300, program: 300, content: 100000 };

export async function POST(req) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { title, program, content } = await req.json();
  const essay = await prisma.essay.create({
    data: {
      userId: session.userId,
      title: cap(title, LIMITS.title) || "Untitled essay",
      program: cap(program, LIMITS.program),
      content: cap(content, LIMITS.content),
    },
  });
  return Response.json({ essay });
}