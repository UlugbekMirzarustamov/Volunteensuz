"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./themetoggle";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HighlightButton } from "@/components/ui/highlight-button";
import { HoverButton } from "@/components/ui/hover-button";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { homeTranslations } from "@/lib/i18n/home";

export default function HomeClient({ featured }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [lang, setLang] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { fetch("/api/auth/me").then(r => r.json()).then(d => setUser(d.user)); }, []);
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && homeTranslations[saved]) setLang(saved);
  }, []);
  const changeLang = (l) => { setLang(l); localStorage.setItem("lang", l); };
  const t = homeTranslations[lang];

  const goToSearch = () => router.push(`/programs?q=${encodeURIComponent(search)}`);
  const goToCategory = (label) => router.push(`/programs?q=${encodeURIComponent(label)}`);

  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["features", "categories"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stepNums = ["01", "02", "03"];
  const steps = t.steps.map((s, i) => ({ n: stepNums[i], t: s.t, d: s.d }));

  // icon/color/count are layout — labels stay English (DB query values)
  const catMeta = [
    { icon: "cap",    color: "#2563EB", label: "Scholarship",    count: "40+" },
    { icon: "sun",    color: "#D97706", label: "Summer Program",  count: "25+" },
    { icon: "trophy", color: "#CA8A04", label: "Competition",     count: "18+" },
    { icon: "flask",  color: "#16A34A", label: "Research",        count: "12+" },
    { icon: "bag",    color: "#7C3AED", label: "Internship",      count: "20+" },
    { icon: "globe",  color: "#0891B2", label: "Exchange",        count: "15+" },
  ];

  const featIcons = ["check", "bookmark", "bell", "filter", "globe", "search"];
  const featColors = ["#16A34A", "#2563EB", "#D97706", "#7C3AED", "#0891B2", "#CA8A04"];
  const features = t.features.map((f, i) => ({ icon: featIcons[i], color: featColors[i], t: f.t, d: f.d }));

  return (
    <div className="min-h-screen bg-base text-fg overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-base/90 backdrop-blur-xl border-b border-base" : "glass"}`}>
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-extrabold text-xl tracking-tight">Volunteens</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <NavLink href="#features" label={t.nav.features} active={activeSection === "features"} />
            <NavLink href="#categories" label={t.nav.categories} active={activeSection === "categories"} />
            <NavLink href="/programs" label={t.nav.programs} active={false} />
            <NavLink href="/essays" label={t.nav.essays} active={false} />
          </div>
          <div className="flex items-center gap-3">
            <LangSwitch lang={lang} onChange={changeLang} />
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <HoverButton href="/essays">{t.nav.myEssays}</HoverButton>
                  <HoverButton onClick={() => setConfirm({ type: "logout" })}>{t.nav.logOut}</HoverButton>
                </>
              ) : (
                <a href="/login" className="text-sm brand-bg text-white px-5 py-2.5 rounded-full font-semibold hover:opacity-90 transition">{t.nav.signIn}</a>
              )}
            </div>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-base text-fg hover:bg-soft transition"
            >
              {mobileOpen
                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 border-t border-base" : "max-h-0"}`}>
          <div className="bg-base/95 backdrop-blur-xl px-8 py-4 flex flex-col gap-1">
            <a href="#features" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm text-soft hover:text-fg transition">{t.nav.features}</a>
            <a href="#categories" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm text-soft hover:text-fg transition">{t.nav.categories}</a>
            <a href="/programs" className="py-2.5 text-sm text-soft hover:text-fg transition">{t.nav.programs}</a>
            <a href="/essays" className="py-2.5 text-sm text-soft hover:text-fg transition">{t.nav.essays}</a>
            <div className="pt-3 mt-2 border-t border-base">
              {user ? (
                <div className="flex flex-col gap-2">
                  <a href="/essays" className="text-center text-sm border border-base rounded-full py-2.5 hover:bg-soft transition">{t.nav.myEssays}</a>
                  <button onClick={() => { setMobileOpen(false); setConfirm({ type: "logout" }); }} className="text-sm border border-base rounded-full py-2.5 hover:bg-soft transition">{t.nav.logOut}</button>
                </div>
              ) : (
                <a href="/login" className="block text-center text-sm brand-bg text-white px-5 py-2.5 rounded-full font-semibold hover:opacity-90 transition">{t.nav.signIn}</a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-8 overflow-hidden">
        <InfiniteGrid fadeBottom />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="fade-up inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-base bg-card text-sm text-soft">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t.heroBadge}
          </div>

          <h1 className="fade-up delay-100 text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-8">
            {t.heroLine1}
            <br />
            {t.heroLine2}{" "}
            <span className="brand-text">{t.heroLine3}</span>
          </h1>

          <p className="fade-up delay-200 text-xl text-soft max-w-2xl mx-auto mb-12">
            {t.heroSub}
          </p>

          <div className="fade-up delay-300 max-w-2xl mx-auto mb-6">
            <div className="flex items-center gap-3 bg-card border border-base rounded-2xl px-5 py-4 focus-within:border-blue-400 transition shadow-sm">
              <Icon name="search" className="w-5 h-5 text-soft" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goToSearch()}
                placeholder={t.searchPlaceholder}
                className="bg-transparent flex-1 outline-none text-fg placeholder:text-soft"
              />
              <HighlightButton onClick={goToSearch} highlightColor="rgba(255,255,255,0.4)" borderColor="rgba(37,99,235,0.6)" className="brand-bg text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
                {t.searchBtn}
              </HighlightButton>
            </div>
          </div>

          <div className="fade-up delay-400 flex flex-wrap items-center justify-center gap-2 text-sm text-soft">
            <span>{t.popularLabel}</span>
            {[
              { l: "Scholarship", q: "Scholarship" },
              { l: "Summer", q: "Summer Program" },
              { l: "Full funding", q: "Full" },
              { l: "Research", q: "Research" },
            ].map((tag) => (
              <span key={tag.l} onClick={() => goToCategory(tag.q)} className="px-3 py-1 rounded-full border border-base hover:border-blue-400 cursor-pointer transition">
                {tag.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <p className="text-sm font-semibold brand-text uppercase tracking-wider mb-4">{t.previewLabel}</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                {t.previewTitle}<br />
                <span className="brand-text">{t.previewTitleBrand}</span>
              </h2>
              <p className="text-soft text-lg max-w-2xl mx-auto">
                {t.previewSub}
              </p>
            </>
          }
        >
          <PlatformPreview />
        </ContainerScroll>
      </section>

      {/* STATS */}
      <section className="px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { n: "100+", l: t.statLabels[0] },
            { n: "30+", l: t.statLabels[1] },
            { n: "4,000+", l: t.statLabels[2] },
            { n: t.statFreeN, l: t.statLabels[3] },
          ].map((s) => (
            <div key={s.l} className="text-center card-lift rounded-2xl py-10">
              <div className="text-4xl md:text-5xl font-extrabold brand-text">{s.n}</div>
              <div className="text-sm text-soft mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold brand-text uppercase tracking-wider mb-3">{t.featuredLabel}</div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{t.featuredTitle}</h2>
            <p className="text-soft text-lg">{t.featuredSub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featured.map((p) => {
              const deadline = p.deadline ? new Date(p.deadline) : null;
              const daysLeft = deadline ? Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24)) : null;
              return (
                <a key={p.id} href={`/programs/${p.id}`} className="card-lift rounded-2xl overflow-hidden flex flex-col text-left">
                  <div className="h-1" style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)" }} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-soft text-soft">{p.category}</span>
                      <span className="text-xs px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 font-medium">{p.fundingType}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 leading-snug">{p.title}</h3>
                    <p className="text-sm text-soft mb-3">{p.organization}</p>
                    <p className="text-sm text-soft leading-relaxed mb-4 flex-1">{p.shortDescription}</p>
                    <div className="flex items-center gap-4 text-xs text-soft">
                      <span>📍 {p.country}</span>
                      {daysLeft !== null && daysLeft > 0 && (
                        <span className={daysLeft <= 30 ? "text-amber-600 font-medium" : ""}>⏳ {daysLeft} {t.daysLeft}</span>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="text-center">
            <HighlightButton href="/programs" highlightColor="rgba(255,255,255,0.35)" borderColor="rgba(255,255,255,0.3)" className="inline-block brand-bg text-white px-8 py-4 rounded-full font-bold text-lg">
              {t.seeAll}
            </HighlightButton>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-24 tint-blue">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold brand-text uppercase tracking-wider mb-3">{t.featuresLabel}</div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{t.featuresTitle}</h2>
            <p className="text-soft text-lg max-w-2xl mx-auto">{t.featuresSub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.t} className="card-lift card-shine rounded-2xl p-8 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: `color-mix(in srgb, ${f.color} 14%, transparent)` }}>
                  <Icon name={f.icon} className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-xl mb-2">{f.t}</h3>
                <p className="text-soft leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="px-8 py-24 dark-blue">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold brand-text uppercase tracking-wider mb-3">{t.categoriesLabel}</div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{t.categoriesTitle}</h2>
            <p className="text-soft text-lg">{t.categoriesSub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {catMeta.map((cat) => (
              <div key={cat.label} onClick={() => goToCategory(cat.label)} className="card-lift card-shine rounded-2xl p-8 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: `color-mix(in srgb, ${cat.color} 14%, transparent)` }}>
                  <Icon name={cat.icon} className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: cat.color }} />
                </div>
                <div className="font-bold text-xl mb-1">{cat.label}</div>
                <div className="text-sm brand-text font-semibold">{cat.count} {t.programsWord}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 py-24 bg-soft">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-16 tracking-tight">{t.howTitle}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.n}>
                <div className="text-6xl font-extrabold brand-text mb-4">{step.n}</div>
                <h3 className="text-2xl font-bold mb-2">{step.t}</h3>
                <p className="text-soft leading-relaxed text-lg">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="card-lift rounded-3xl p-8 md:p-12 grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <img src="/founder.jpg" alt="Ulugbek Mirzarustamov" className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover mx-auto" />
            <div>
              <div className="text-sm font-semibold brand-text uppercase tracking-wider mb-2">{t.founderLabel}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Ulugbek Mirzarustamov</h2>
              <p className="text-soft leading-relaxed mb-5">
                {t.founderBio}
              </p>
              <a href="https://t.me/Ulugbekmirzarustamov" target="_blank" className="inline-flex items-center gap-2 brand-bg text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
                {t.founderCTA}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AuroraBackground className="my-8 py-28 px-8 rounded-none">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-sm text-slate-800 dark:text-white">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-white animate-pulse" /> {t.ctaBadge}
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight text-slate-900 dark:text-white">{t.ctaTitle}</h2>
          <p className="text-slate-600 dark:text-white/80 text-lg mb-10 max-w-xl mx-auto">{t.ctaSub}</p>
          <HighlightButton href="https://t.me/volunteensuz" target="_blank" highlightColor="rgba(255,255,255,0.4)" borderColor="rgba(255,255,255,0.3)" className="inline-block brand-bg text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg">
            {t.ctaBtn}
          </HighlightButton>
        </div>
      </AuroraBackground>

      {/* FOOTER */}
      <footer className="px-8 pt-16 pb-8 border-t border-base bg-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <Logo />
                <span className="font-extrabold text-xl">Volunteens</span>
              </div>
              <p className="text-soft max-w-sm leading-relaxed mb-6">
                {t.footerDesc}
              </p>
              <div className="flex gap-3">
                <Social href="https://t.me/volunteensuz" label="TG" />
                <Social href="https://instagram.com/volunteensuz" label="IG" />
                <Social href="https://linkedin.com/company/volunteens" label="in" />
                <Social href="https://youtube.com/@volunteensuz" label="YT" />
              </div>
            </div>
            <div>
              <div className="font-bold mb-4">{t.footerPlatform}</div>
              <ul className="space-y-3 text-soft text-sm">
                <li><a href="/programs" className="hover:text-fg transition">{t.footerExplore}</a></li>
                <li><a href="#features" className="hover:text-fg transition">{t.footerFeatures}</a></li>
                <li><a href="#categories" className="hover:text-fg transition">{t.footerCategories}</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-4">{t.footerLegal}</div>
              <ul className="space-y-3 text-soft text-sm">
                <li><a href="/legal/privacy" className="hover:text-fg transition">{t.footerPrivacy}</a></li>
                <li><a href="/legal/terms" className="hover:text-fg transition">{t.footerTerms}</a></li>
                <li><a href="/legal/cookies" className="hover:text-fg transition">{t.footerCookies}</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-base flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-soft">
            <div>{t.footerCopyright}</div>
            <div>{t.footerTagline}</div>
          </div>
        </div>
      </footer>

      {loggingOut && (
        <div className="fixed inset-0 z-[300] bg-base/75 backdrop-blur-sm fade-bg flex items-center justify-center pointer-events-none">
          <div className="pop-in flex items-center gap-3 bg-card border border-base rounded-2xl px-6 py-4 shadow-2xl">
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-soft">{t.signingOut}</span>
          </div>
        </div>
      )}

      {confirm && (
        <div onClick={() => setConfirm(null)} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 fade-bg p-4">
          <div onClick={(e) => e.stopPropagation()} className="pop-in bg-card border border-base rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-2">{t.logoutTitle}</h3>
            <p className="text-soft text-sm mb-6">{t.logoutDesc}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirm(null)} className="px-4 py-2 rounded-xl border border-base hover:bg-soft transition text-sm font-medium">{t.cancel}</button>
              <button onClick={async () => { setConfirm(null); setLoggingOut(true); await fetch("/api/auth/logout", { method: "POST" }); setTimeout(() => { setUser(null); setLoggingOut(false); }, 650); }} className="px-4 py-2 rounded-xl brand-bg text-white text-sm font-semibold hover:opacity-90 transition">{t.logoutConfirm}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlatformPreview() {
  const programs = [
    { title: "Gates Cambridge Scholarship", org: "University of Cambridge", type: "Full",    cat: "Scholarship", days: 42  },
    { title: "Google Summer of Code",        org: "Google Open Source",      type: "Free",    cat: "Internship",  days: 88  },
    { title: "Fulbright Program",            org: "U.S. Dept. of State",     type: "Full",    cat: "Exchange",    days: 15  },
    { title: "Rhodes Scholarship",           org: "Rhodes Trust",            type: "Full",    cat: "Scholarship", days: 30  },
    { title: "DAAD Scholarship",             org: "DAAD Germany",            type: "Full",    cat: "Scholarship", days: 60  },
    { title: "MIT Research Science Inst.",   org: "MIT",                     type: "Free",    cat: "Research",    days: 120 },
  ];
  const typeColor = {
    Full:    { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
    Free:    { bg: "#cffafe", text: "#0e7490", border: "#67e8f9" },
    Partial: { bg: "#dbeafe", text: "#1d4ed8", border: "#93c5fd" },
    Paid:    { bg: "#fef3c7", text: "#b45309", border: "#fcd34d" },
  };
  return (
    <div className="w-full h-full rounded-xl overflow-hidden" style={{ background: "#FAF8F4" }}>
      <div style={{ background: "rgba(255,255,255,0.95)", borderBottom: "1px solid rgba(20,17,13,0.08)", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)", borderRadius: 5, width: 20, height: 20, flexShrink: 0 }} />
          <span style={{ fontWeight: 800, fontSize: 13, color: "#14110D" }}>Volunteens</span>
        </div>
        <div style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)", borderRadius: 20, padding: "4px 12px", color: "white", fontSize: 11, fontWeight: 600 }}>Browse programs</div>
      </div>
      <div style={{ padding: 12, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, height: "calc(100% - 45px)", overflow: "hidden" }}>
        {programs.map((p) => {
          const c = typeColor[p.type] || typeColor.Partial;
          return (
            <div key={p.title} style={{ background: "white", borderRadius: 12, border: "1px solid rgba(20,17,13,0.08)", borderTop: `3px solid ${c.border}`, padding: 10, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ background: "#F1EEE8", color: "#6B6459", borderRadius: 20, padding: "2px 7px", fontSize: 9, fontWeight: 500 }}>{p.cat}</span>
                <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 20, padding: "2px 7px", fontSize: 9, fontWeight: 600 }}>{p.type}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#14110D", lineHeight: 1.3, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 10, color: "#6B6459" }}>{p.org}</div>
              <div style={{ fontSize: 10, color: "#6B6459", marginTop: "auto", paddingTop: 6 }}>⏳ {p.days}d left</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="url(#g)" />
      <path d="M16 7L19 16L16 25L13 16L16 7Z" fill="white" />
      <circle cx="16" cy="16" r="2" fill="url(#g)" />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LangSwitch({ lang, onChange }) {
  const langs = [
    { code: "en", label: "EN" },
    { code: "uz", label: "UZ" },
    { code: "ru", label: "RU" },
  ];
  return (
    <div className="flex items-center gap-0.5 bg-soft border border-base rounded-lg p-0.5" title="Language">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition ${
            lang === l.code ? "brand-bg text-white" : "text-soft hover:text-fg"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Social({ href, label }) {
  return (
    <a href={href} target="_blank" className="w-10 h-10 rounded-full border border-base flex items-center justify-center text-soft hover:bg-card hover:text-fg transition text-xs font-semibold">
      {label}
    </a>
  );
}

function NavLink({ href, label, active }) {
  return (
    <a href={href} className={`relative px-3 py-2 rounded-lg transition-all duration-200 group ${active ? "text-blue-500 font-semibold" : "text-soft hover:text-fg"}`}>
      {label}
      <span className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full brand-bg transition-all duration-300 origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
    </a>
  );
}

function Icon({ name, className, style }) {
  const paths = {
    search:   <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
    filter:   <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
    check:    <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>,
    bell:     <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
    globe:    <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    bookmark: <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    cap:      <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
    sun:      <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
    trophy:   <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" /></>,
    flask:    <><path d="M9 3h6M10 3v6.5L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9.5V3" /></>,
    bag:      <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {paths[name]}
    </svg>
  );
}
