"use client";

import { useState, useMemo, useEffect } from "react";
import ThemeToggle from "../themetoggle";
import { HighlightButton } from "@/components/ui/highlight-button";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";

export default function ProgramsClient({ programs }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [funding, setFunding] = useState("All");
  const [level, setLevel] = useState("All");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      const cats = ["Scholarship", "Summer Program", "Competition", "Research", "Internship", "Exchange"];
      const funds = ["Full", "Partial", "Free", "Paid"];
      if (cats.includes(q)) setCategory(q);
      else if (funds.includes(q)) setFunding(q);
      else setSearch(q);
    }
  }, []);

  const categories = ["All", "Scholarship", "Summer Program", "Competition", "Research", "Internship", "Exchange"];
  const fundings = ["All", "Full", "Partial", "Free", "Paid"];
  const levels = ["All", "High School", "Undergraduate", "Graduate"];

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.organization.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      const matchFund = funding === "All" || p.fundingType === funding;
      const matchLevel = level === "All" || p.level === level;
      return matchSearch && matchCat && matchFund && matchLevel;
    });
  }, [programs, search, category, funding, level]);

  return (
    <div className="min-h-screen bg-base text-fg">
      <nav className="sticky top-0 z-50 bg-base/90 backdrop-blur-xl border-b border-base">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-tight">Volunteens</a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="https://t.me/volunteensuz" target="_blank" className="text-sm brand-bg text-white px-5 py-2.5 rounded-full font-semibold hover:opacity-90 transition">
              Join channel
            </a>
          </div>
        </div>
      </nav>

      {/* Page header with atmosphere */}
      <div className="relative overflow-hidden border-b border-base">
        <InfiniteGrid revealRadius={260} />
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight">
            Find your <span className="brand-text">opportunity</span>
          </h1>
          <p className="text-soft text-lg">{filtered.length} programs available right now.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-6">
          <div className="flex items-center gap-3 bg-card border border-base rounded-2xl px-5 py-4 focus-within:border-blue-400 transition shadow-sm">
            <Icon name="search" className="w-5 h-5 text-soft" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, organization, or tag..."
              className="bg-transparent flex-1 outline-none text-fg placeholder:text-soft"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <FilterGroup label="Category" value={category} setValue={setCategory} options={categories} />
          <FilterGroup label="Funding" value={funding} setValue={setFunding} options={fundings} />
          <FilterGroup label="Level" value={level} setValue={setLevel} options={levels} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-soft border border-dashed border-base rounded-2xl">
            No programs match your filters. Try adjusting them.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, value, setValue, options }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-soft uppercase tracking-wider px-1">{label}</span>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-card border border-base text-fg rounded-xl px-4 py-2.5 text-sm outline-none hover:border-blue-400 transition cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ProgramCard({ program }) {
  const fundingColors = {
    Full:    "text-green-600 border-green-500/30 bg-green-500/10",
    Partial: "text-blue-600 border-blue-500/30 bg-blue-500/10",
    Free:    "text-cyan-600 border-cyan-500/30 bg-cyan-500/10",
    Paid:    "text-amber-600 border-amber-500/30 bg-amber-500/10",
  };
  const fundingStripe = { Full: "#16A34A", Partial: "#2563EB", Free: "#0891B2", Paid: "#D97706" };

  const deadline = program.deadline ? new Date(program.deadline) : null;
  const daysLeft = deadline ? Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div className="card-lift rounded-2xl overflow-hidden flex flex-col">
      <div className="h-1 flex-shrink-0" style={{ background: fundingStripe[program.fundingType] || "#6B7280" }} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-soft text-soft">{program.category}</span>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${fundingColors[program.fundingType] || "text-soft border-base"}`}>
            {program.fundingType}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-1 leading-snug">{program.title}</h3>
        <p className="text-sm text-soft mb-3">{program.organization}</p>
        <p className="text-sm text-soft leading-relaxed mb-4 flex-1">{program.shortDescription}</p>

        <div className="flex items-center gap-4 text-xs text-soft mb-4">
          <span>📍 {program.country}</span>
          <span>🎓 {program.level}</span>
        </div>

        {daysLeft !== null && (
          <div className="mb-4">
            {daysLeft > 0 ? (
              <span className={`text-xs font-medium ${daysLeft <= 30 ? "text-amber-600" : "text-soft"}`}>
                ⏳ {daysLeft} days left
              </span>
            ) : (
              <span className="text-xs text-red-500">Deadline passed</span>
            )}
          </div>
        )}

        <HighlightButton href={`/programs/${program.id}`} className="w-full text-center bg-soft hover:brand-bg hover:text-white border border-base hover:border-transparent rounded-xl py-2.5 text-sm font-semibold transition-all">
          View details →
        </HighlightButton>
      </div>
    </div>
  );
}

function Icon({ name, className }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
}
