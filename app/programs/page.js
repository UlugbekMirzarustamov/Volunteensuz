import { prisma } from "@/lib/prisma";
import ProgramsClient from "./ProgramsClient";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = programs.map((p) => ({
    ...p,
    deadline: p.deadline ? p.deadline.toISOString() : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <ProgramsClient programs={serialized} />;
}