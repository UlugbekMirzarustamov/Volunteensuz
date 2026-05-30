import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Length caps to prevent oversized payloads
const cap = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");
const LIMITS = { title: 300, program: 300, content: 100000 };

export async function PUT(req, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await params;
  const { title, program, content } = await req.json();
  const existing = await prisma.essay.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.userId) return Response.json({ error: "Not found" }, { status: 404 });
  const essay = await prisma.essay.update({
    where: { id },
    data: {
      title: cap(title, LIMITS.title) || "Untitled essay",
      program: cap(program, LIMITS.program),
      content: cap(content, LIMITS.content),
    },
  });
  return Response.json({ essay });
}

export async function DELETE(req, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.essay.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.userId) return Response.json({ error: "Not found" }, { status: 404 });
  await prisma.essay.delete({ where: { id } });
  return Response.json({ ok: true });
}
