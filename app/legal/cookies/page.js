import ThemeToggle from "../../themetoggle";

export const metadata = { title: "Cookie Policy — Volunteens" };

export default function Cookies() {
  return <LegalShell title="Cookie Policy" updated="May 2026">
    <p>This explains how Volunteens uses cookies and similar storage in your browser.</p>
    <h2>What we use</h2>
    <p>We use minimal browser storage to remember your preferences (like light or dark theme) and to keep you signed in once accounts are available. Your draft essays may be stored locally in your browser so you don't lose work.</p>
    <h2>Analytics</h2>
    <p>We may use basic, privacy-respecting analytics to understand which programs and features are useful, so we can improve them. This data is aggregated, not used to identify you personally.</p>
    <h2>Your control</h2>
    <p>You can clear cookies and local storage anytime through your browser settings. Doing so may reset your theme preference and clear locally saved drafts.</p>
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