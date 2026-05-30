import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ThemeToggle from "../../themetoggle";
import { HighlightButton } from "@/components/ui/highlight-button";
import { HoverButton } from "@/components/ui/hover-button";

export const dynamic = "force-dynamic";

export default async function ProgramDetail({ params }) {
  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });

  if (!program) notFound();

  const deadline = program.deadline ? new Date(program.deadline) : null;
  const daysLeft = deadline ? Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24)) : null;
  const tags = program.tags ? program.tags.split(",").filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-base text-fg">
      <nav className="sticky top-0 z-50 bg-base/90 backdrop-blur-xl border-b border-base">
        <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-tight">Volunteens</a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <HoverButton href="/programs">← All programs</HoverButton>
          </div>
        </div>
      </nav>

      {/* Hero band */}
      <div className="hero-section border-b border-base">
        <div className="max-w-4xl mx-auto px-8 pt-10 pb-8">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-soft text-soft">{program.category}</span>
            <span className="text-xs px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 font-medium">{program.fundingType} funding</span>
            <span className="text-xs px-3 py-1 rounded-full bg-soft text-soft">{program.isRemote}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight tracking-tight">{program.title}</h1>
          <p className="text-soft text-lg">{program.organization}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <InfoBox label="Location" value={program.country} />
          <InfoBox label="Level" value={program.level} />
          <InfoBox label="App fee" value={program.applicationFee} />
          <InfoBox label="Deadline" value={deadline ? deadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Rolling"} highlight={daysLeft !== null && daysLeft <= 30 && daysLeft > 0} />
        </div>

        {daysLeft !== null && daysLeft > 0 && (
          <div className={`mb-8 px-5 py-4 rounded-2xl border ${daysLeft <= 30 ? "border-amber-500/30 bg-amber-500/10 text-amber-700" : "border-base bg-soft text-soft"}`}>
            ⏳ {daysLeft} days left to apply
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3">About this program</h2>
          <p className="text-soft leading-relaxed whitespace-pre-line">{program.fullDescription}</p>
        </div>

        {tags.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-3">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-soft border border-base text-soft">{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3">Who can apply</h2>
          <p className="text-soft leading-relaxed">Eligible regions: {program.eligibleCountries}. Level: {program.level}.</p>
        </div>

        <HighlightButton href={program.officialLink} target="_blank" highlightColor="rgba(255,255,255,0.4)" borderColor="rgba(255,255,255,0.3)" className="inline-block brand-bg text-white px-8 py-4 rounded-full font-bold text-lg">
          Apply on official site →
        </HighlightButton>
      </div>
    </div>
  );
}

function InfoBox({ label, value, highlight }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-amber-500/30 bg-amber-500/10" : "border-base bg-card"}`}>
      <div className="text-xs text-soft uppercase tracking-wider mb-1">{label}</div>
      <div className="font-semibold text-sm break-words">{value}</div>
    </div>
  );
}