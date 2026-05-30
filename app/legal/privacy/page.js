import ThemeToggle from "../../themetoggle";

export const metadata = { title: "Privacy Policy — Volunteens" };

export default function Privacy() {
  return <LegalShell title="Privacy Policy" updated="May 2026">
    <p>Volunteens ("we", "us") helps students discover opportunities and write applications. This policy explains what we collect and how we use it.</p>
    <h2>What we collect</h2>
    <p>Account details you give us (name, email), the essays and notes you create, and basic usage data like which programs you view. Essays you write are stored so you can access them across sessions.</p>
    <h2>How we use it</h2>
    <p>To run the platform: save your work, show relevant programs, send deadline reminders you opt into, and improve the product. We do not sell your personal data.</p>
    <h2>Sharing</h2>
    <p>We share data only with services that help us operate (such as hosting and database providers) and when required by law. Official program links take you to third-party sites with their own policies.</p>
    <h2>Your choices</h2>
    <p>You can edit or delete your essays and request deletion of your account data by contacting us. You can opt out of notifications at any time.</p>
    <h2>Contact</h2>
    <p>Questions? Reach us on Telegram <a href="https://t.me/Ulugbekmirzarustamov" target="_blank" className="brand-text font-semibold">@Ulugbekmirzarustamov</a>.</p>
  </LegalShell>;
}

function LegalShell({ title, updated, children }) {
  return (
    <div className="min-h-screen bg-base text-fg">
      <nav className="sticky top-0 z-50 glass border-b border-base">
        <div className="max-w-3xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-tight">Volunteens</a>
          <div className="flex items-center gap-3"><ThemeToggle /><a href="/" className="text-sm text-soft hover:text-fg transition">← Home</a></div>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-8 py-12 legal-body">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">{title}</h1>
        <p className="text-soft text-sm mb-10">Last updated: {updated}</p>
        {children}
        <p className="text-soft text-sm mt-12 pt-6 border-t border-base">This is a general template provided for transparency and is not legal advice.</p>
      </article>
      <style>{`.legal-body h2{font-size:1.25rem;font-weight:700;margin:1.75rem 0 .5rem}.legal-body p{color:var(--fg-soft);line-height:1.7;margin-bottom:.75rem}`}</style>
    </div>
  );
}