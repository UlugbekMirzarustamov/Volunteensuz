import { prisma } from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) return Response.json({ error: "Email and password required." }, { status: 400 });
    if (password.length < 6) return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return Response.json({ error: "An account with this email already exists." }, { status: 400 });

    const user = await prisma.user.create({
      data: { email, name: name || "", passwordHash: await hashPassword(password) },
    });
    await createSession(user.id);
    return Response.json({ ok: true, name: user.name, email: user.email });
  } catch (e) {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
