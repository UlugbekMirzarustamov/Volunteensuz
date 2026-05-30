import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title")?.trim();
  if (!title) return Response.json({ prompts: [] });

  // Prefer an exact title match so substrings (e.g. "Youth Summit" vs
  // "Youth Summit 2026") don't load the wrong program's prompts.
  // Fall back to a contains match only if no exact match exists.
  const program =
    (await prisma.program.findFirst({
      where: { title: { equals: title } },
      select: { essayPrompts: true },
    })) ||
    (await prisma.program.findFirst({
      where: { title: { contains: title } },
      select: { essayPrompts: true },
    }));

  if (!program?.essayPrompts) return Response.json({ prompts: [] });

  try {
    const parsed = JSON.parse(program.essayPrompts);
    return Response.json({ prompts: Array.isArray(parsed) ? parsed : [] });
  } catch {
    return Response.json({ prompts: [] });
  }
}
