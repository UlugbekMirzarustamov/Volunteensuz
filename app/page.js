import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const programs = await prisma.program.findMany({
    where: { featured: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const featured = programs.map((p) => ({
    ...p,
    deadline: p.deadline ? p.deadline.toISOString() : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <HomeClient featured={featured} />;
}