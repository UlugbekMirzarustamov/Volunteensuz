import ThemeToggle from "../../themetoggle";

export const metadata = { title: "Terms of Use — Volunteens" };

export default function Terms() {
  return <LegalShell title="Terms of Use" updated="May 2026">
    <p>By using Volunteens, you agree to these terms. If you don't agree, please don't use the platform.</p>
    <h2>Using the platform</h2>
    <p>Volunteens curates opportunities and gives you tools to write applications. You may use it for your own genuine educational purposes. Don't misuse it, attempt to break it, or scrape its content.</p>
    <h2>Your content</h2>
    <p>Essays and notes you create belong to you. You're responsible for what you write. We store your content to provide the service and don't claim ownership of it.</p>
    <h2>Accuracy of listings</h2>
    <p>We verify programs carefully, but details (deadlines, funding, eligibility) can change. Always confirm on the official program site before applying. We're not responsible for decisions made by third-party programs.</p>
    <h2>Availability</h2>
    <p>The platform is provided "as is." We work to keep it running but can't guarantee it will always be available or error-free.</p>
    <h2>Contact</h2>
    <p>Questions about these terms? Reach us on Telegram <a href="https://t.me/Ulugbekmirzarustamov" target="_blank" className="brand-text font-semibold">@Ulugbekmirzarustamov</a>.</p>
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