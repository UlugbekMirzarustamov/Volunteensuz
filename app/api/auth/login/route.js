import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return Response.json({ error: "No account found with this email." }, { status: 400 });

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return Response.json({ error: "Incorrect password." }, { status: 400 });

    await createSession(user.id);
    return Response.json({ ok: true, name: user.name, email: user.email });
  } catch (e) {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
