"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../themetoggle";
import { HoverButton } from "@/components/ui/hover-button";

const FONTS = [
  { name: "Sans", css: "ui-sans-serif, system-ui, sans-serif" },
  { name: "Serif", css: "Georgia, 'Times New Roman', serif" },
  { name: "Mono", css: "ui-monospace, 'Courier New', monospace" },
  { name: "Elegant", css: "'Palatino Linotype', 'Book Antiqua', serif" },
  { name: "Modern", css: "'Trebuchet MS', sans-serif" },
  { name: "Classic", css: "'Garamond', serif" },
  { name: "Clean", css: "'Helvetica Neue', Arial, sans-serif" },
];

const COLORS = [
  { name: "Default", val: "inherit", swatch: "var(--fg)" },
  { name: "Red", val: "#DC2626", swatch: "#DC2626" },
  { name: "Green", val: "#16A34A", swatch: "#16A34A" },
  { name: "Blue", val: "#2563EB", swatch: "#2563EB" },
  { name: "Purple", val: "#7C3AED", swatch: "#7C3AED" },
  { name: "Amber", val: "#D97706", swatch: "#D97706" },
];

const Ico = {
  bold: <path d="M6 4h7a4 4 0 0 1 0 8H6zM6 12h8a4 4 0 0 1 0 8H6z" />,
  italic: <><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></>,
  underline: <><path d="M6 4v7a6 6 0 0 0 12 0V4" /><line x1="4" y1="21" x2="20" y2="21" /></>,
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />,
  pause: <><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none" /></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>,
  timer: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2" /><path d="M9 2h6" /></>,
  flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></>,
  expand: <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>,
  shrink: <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  plusSquare: <><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></>,
  trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></>,
  back: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
};

function Icon({ d, className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{d}</svg>
  );
}

function IconBtn({ children, onClick, active, title }) {
  return (
    <button onClick={onClick} title={title} className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${active ? "border border-blue-400 bg-blue-500/10 text-blue-600" : "hover:bg-soft text-soft hover:text-fg"}`}>
      {children}
    </button>
  );
}

function PromptsPanel({ prompts, programName }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-5 rounded-xl border border-blue-500/20 overflow-hidden" style={{ background: "color-mix(in srgb, #2563EB 4%, var(--card))" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-blue-500/5 transition-colors text-left"
      >
        <span className="w-1.5 h-1.5 rounded-full shrink-0 brand-bg" />
        <span className="text-xs font-semibold uppercase tracking-wider brand-text flex-1">
          Official prompts · {programName}
        </span>
        <svg
          className={`w-3 h-3 text-soft transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
      {open && (
        <ol className="px-4 pb-4 pt-1 space-y-3 border-t border-blue-500/10">
          {prompts.map((p, i) => (
            <li key={i} className="flex gap-3 pt-2.5">
              <span className="text-xs font-bold brand-text mt-0.5 shrink-0 tabular-nums w-4">{i + 1}.</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-fg">{p.prompt}</p>
                {p.wordLimit && (
                  <span className="text-xs text-soft mt-1 block">{p.wordLimit} words max</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function EssaysPage() {
  const [essays, setEssays] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [font, setFont] = useState(FONTS[0].css);
  const [fontSize, setFontSize] = useState(18);
  const [focus, setFocus] = useState(false);
  const [zen, setZen] = useState(false);
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });
  const [showTimer, setShowTimer] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessionGoal, setSessionGoal] = useState(0);
  const [sessionMenuOpen, setSessionMenuOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [activeSound, setActiveSound] = useState(null);
  const audioCtxRef = useRef(null);
  const soundNodesRef = useRef([]);
  const editorRef = useRef(null);
  const [confirm, setConfirm] = useState(null); // {type, id} or null

  const [user, setUser] = useState(null);
  const saveTimer = useRef(null);
  const [prompts, setPrompts] = useState([]);
  const promptTimerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const meRes = await fetch("/api/auth/me");
      const me = await meRes.json();
      if (!me.user) { window.location.href = "/login"; return; }
      setUser(me.user);
      const res = await fetch("/api/essays");
      const data = await res.json();
      const list = data.essays || [];
      setEssays(list);
      if (list.length > 0) setActiveId(list[0].id);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        if (sessionGoal > 0 && next >= sessionGoal) { setRunning(false); return next; }
        return next;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [running, sessionGoal]);

  const active = essays.find((e) => e.id === activeId);
  useEffect(() => {
    if (editorRef.current && active) editorRef.current.innerHTML = active.content || "";
  }, [activeId]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { if (zen) setZen(false); else if (focus) setFocus(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, zen]);

  useEffect(() => {
    const program = active?.program?.trim();
    if (!program) { setPrompts([]); return; }
    clearTimeout(promptTimerRef.current);
    promptTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/programs/prompts?title=${encodeURIComponent(program)}`);
        const data = await res.json();
        setPrompts(data.prompts || []);
      } catch { setPrompts([]); }
    }, 500);
    return () => clearTimeout(promptTimerRef.current);
  }, [active?.program]);

  const createEssay = async () => {
    const res = await fetch("/api/essays", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "Untitled essay", program: "", content: "" }) });
    const { essay } = await res.json();
    setEssays([essay, ...essays]);
    setActiveId(essay.id);
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const updateActive = (changes) => {
    setEssays((prev) => prev.map((e) => (e.id === activeId ? { ...e, ...changes } : e)));
    clearTimeout(saveTimer.current);
    const updated = { ...essays.find((e) => e.id === activeId), ...changes };
    saveTimer.current = setTimeout(() => {
      fetch(`/api/essays/${activeId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: updated.title, program: updated.program, content: updated.content }) });
    }, 800);
  };

  const deleteEssay = async (id) => {
    await fetch(`/api/essays/${id}`, { method: "DELETE" });
    const remaining = essays.filter((e) => e.id !== id);
    setEssays(remaining);
    if (activeId === id) {
      setActiveId(remaining[0]?.id || null);
      if (editorRef.current) editorRef.current.innerHTML = remaining[0]?.content || "";
    }
  };

  const checkFormats = () => {
    try {
      setActiveFormats({ bold: document.queryCommandState("bold"), italic: document.queryCommandState("italic"), underline: document.queryCommandState("underline") });
    } catch {}
  };
  const onInput = () => { if (editorRef.current) updateActive({ content: editorRef.current.innerHTML }); checkFormats(); };
  const format = (cmd) => { document.execCommand(cmd, false, null); editorRef.current?.focus(); checkFormats(); };
  const setColor = (c) => { document.execCommand("foreColor", false, c); editorRef.current?.focus(); };

  // Derive counts from state (active.content), not the DOM, so they stay in
  // sync when switching essays instead of showing a stale count for one render.
  const plainText = (active?.content || "")
    .replace(/<(br|div|p|li)[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = plainText.length;

  const fmtTime = (s) => {
    const m = Math.floor((s % 3600) / 60); const sec = s % 60; const h = Math.floor(s / 3600);
    return (h > 0 ? `${h}:` : "") + `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };
  const startTimer = () => { if (sessionGoal === 0) setSeconds(0); setRunning(true); };
  const startSession = (m) => { setSessionGoal(m * 60); setSeconds(0); setRunning(true); setSessionMenuOpen(false); };
  const resetTimer = () => { setRunning(false); setSeconds(0); setSessionGoal(0); setSessionMenuOpen(false); };

  const stopSound = () => { soundNodesRef.current.forEach((n) => { try { n.stop?.(); n.disconnect?.(); } catch {} }); soundNodesRef.current = []; setActiveSound(null); };
  const playSound = (type) => {
    if (activeSound === type) { stopSound(); return; }
    stopSound();
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtxRef.current; ctx.resume();
    if (["brown", "rain", "wind"].includes(type)) {
      const size = 2 * ctx.sampleRate; const buf = ctx.createBuffer(1, size, ctx.sampleRate); const d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < size; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
      const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = type === "brown" ? 600 : type === "rain" ? 1800 : 400;
      const gain = ctx.createGain(); gain.gain.value = type === "wind" ? 0.5 : 0.35;
      noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination); noise.start();
      soundNodesRef.current = [noise, filter, gain];
    } else if (type === "lofi") {
      [220, 277, 330].forEach((f) => { const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = f; const g = ctx.createGain(); g.gain.value = 0.06; osc.connect(g); g.connect(ctx.destination); osc.start(); soundNodesRef.current.push(osc, g); });
    }
    setActiveSound(type);
  };
  useEffect(() => () => stopSound(), []);

  const sounds = [
    { id: "brown", label: "Brown noise", emoji: "🟤" },
    { id: "rain", label: "Rain", emoji: "🌧️" },
    { id: "wind", label: "Wind", emoji: "💨" },
    { id: "lofi", label: "Lo-fi pad", emoji: "🎵" },
  ];

  const MusicMenu = () => (
    <div className="relative">
      <IconBtn onClick={() => setMusicOpen(!musicOpen)} active={!!activeSound} title="Ambient sound"><Icon d={Ico.music} /></IconBtn>
      {musicOpen && (
        <div className="absolute right-0 top-11 w-52 rounded-xl border border-base bg-card shadow-lg p-2 z-50">
          <div className="text-xs uppercase tracking-wider text-soft px-2 py-2">Ambient sound</div>
          {sounds.map((s) => (
            <button key={s.id} onClick={() => playSound(s.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${activeSound === s.id ? "bg-blue-500/10 text-blue-600" : "hover:bg-soft"}`}>
              <span><span className="mr-2">{s.emoji}</span>{s.label}</span>
              {activeSound === s.id && <Icon d={Ico.check} className="w-4 h-4" />}
            </button>
          ))}
          {activeSound && (<button onClick={stopSound} className="w-full text-xs text-soft hover:text-fg mt-1 px-3 py-2 rounded-lg hover:bg-soft transition">Stop sound</button>)}
        </div>
      )}
    </div>
  );

  const Toolbar = () => (
    <div className="flex flex-wrap items-center gap-1.5">
      <IconBtn onClick={() => format("bold")} active={activeFormats.bold} title="Bold"><Icon d={Ico.bold} /></IconBtn>
      <IconBtn onClick={() => format("italic")} active={activeFormats.italic} title="Italic"><Icon d={Ico.italic} /></IconBtn>
      <IconBtn onClick={() => format("underline")} active={activeFormats.underline} title="Underline"><Icon d={Ico.underline} /></IconBtn>
      <div className="w-px h-6 bg-base mx-1" />
      <IconBtn onClick={() => setFontSize((s) => Math.max(12, s - 1))} title="Decrease text size"><Icon d={Ico.minus} /></IconBtn>
      <input type="number" min="12" max="48" value={fontSize} onChange={(e) => { const v = parseInt(e.target.value) || 18; setFontSize(Math.min(48, Math.max(12, v))); }} className="w-14 h-9 rounded-lg border border-base bg-card text-center text-sm font-mono outline-none focus:border-blue-400 transition" title="Text size (12-48)" />
      <IconBtn onClick={() => setFontSize((s) => Math.min(48, s + 1))} title="Increase text size"><Icon d={Ico.plus} /></IconBtn>
      <div className="w-px h-6 bg-base mx-1" />
      {COLORS.map((c) => (<button key={c.name} onClick={() => setColor(c.val)} title={c.name} className="w-7 h-7 rounded-md border border-base hover:scale-110 transition flex items-center justify-center font-bold text-sm" style={{ color: c.swatch }}>A</button>))}
      <div className="w-px h-6 bg-base mx-1" />
      <select value={font} onChange={(e) => setFont(e.target.value)} className="bg-card border border-base rounded-lg px-3 h-9 text-sm outline-none hover:border-blue-400 transition cursor-pointer">
        {FONTS.map((f) => <option key={f.name} value={f.css}>{f.name}</option>)}
      </select>
    </div>
  );

  const TimerControls = () => (
    <div className="flex items-center gap-2 relative">
      {showTimer && (
        <>
          <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-base">
            <Icon d={Ico.timer} className="w-4 h-4 text-soft" />
            <span className="font-mono font-semibold tabular-nums text-sm min-w-[55px] text-center">{fmtTime(seconds)}</span>
            {sessionGoal > 0 && <span className="text-xs text-soft">/ {fmtTime(sessionGoal)}</span>}
          </div>
          <IconBtn onClick={running ? () => setRunning(false) : startTimer} active={running} title={running ? "Pause" : "Start"}><Icon d={running ? Ico.pause : Ico.play} /></IconBtn>
          <div className="relative">
            <IconBtn onClick={() => setSessionMenuOpen(!sessionMenuOpen)} active={sessionGoal > 0} title="Writing session goal"><Icon d={Ico.flag} /></IconBtn>
            {sessionMenuOpen && (
              <div className="absolute right-0 top-11 w-44 rounded-xl border border-base bg-card shadow-lg p-2 z-50">
                <div className="text-xs uppercase tracking-wider text-soft px-2 py-2">Writing session</div>
                {[15, 25, 50].map((m) => (
                  <button key={m} onClick={() => startSession(m)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${sessionGoal === m * 60 ? "bg-blue-500/10 text-blue-600" : "hover:bg-soft"}`}>
                    <span>{m} min session</span>
                    {sessionGoal === m * 60 && <Icon d={Ico.check} className="w-4 h-4" />}
                  </button>
                ))}
                {sessionGoal > 0 && (<button onClick={resetTimer} className="w-full text-xs text-soft hover:text-fg mt-1 px-3 py-2 rounded-lg hover:bg-soft transition">Clear session</button>)}
              </div>
            )}
          </div>
        </>
      )}
      <IconBtn onClick={() => setShowTimer(!showTimer)} title={showTimer ? "Hide timer" : "Show timer"}><Icon d={showTimer ? Ico.eye : Ico.eyeOff} /></IconBtn>
    </div>
  );

  if (focus && active) {
    return (
      <div className="fixed inset-0 z-[100] bg-base text-fg flex flex-col">
        {!zen && (
          <div className="border-b border-base px-6 h-16 flex items-center justify-between gap-4 bg-base/95 backdrop-blur">
            <div className="flex items-center gap-3">
              <IconBtn onClick={() => setFocus(false)} title="Back"><Icon d={Ico.back} /></IconBtn>
              <span className="font-semibold truncate max-w-xs">{active.title || "Untitled"}</span>
            </div>
            <Toolbar />
            <div className="flex items-center gap-2">
              <TimerControls />
              <MusicMenu />
              <IconBtn onClick={() => setZen(true)} title="Zen mode"><Icon d={Ico.expand} /></IconBtn>
              <ThemeToggle />
            </div>
          </div>
        )}
        {zen && (<button onClick={() => setZen(false)} title="Exit zen" className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full border border-base bg-card hover:border-blue-400 transition flex items-center justify-center"><Icon d={Ico.shrink} /></button>)}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto px-8 py-12 h-full flex flex-col">
            <div className="mb-8">
              <input value={active.title} onChange={(e) => updateActive({ title: e.target.value })} placeholder="Essay title" className="w-full bg-transparent text-4xl font-extrabold outline-none placeholder:text-soft tracking-tight" />
              <div className="h-1 w-16 brand-bg rounded-full mt-3" />
            </div>
            {!zen && prompts.length > 0 && <PromptsPanel prompts={prompts} programName={active.program} />}
            <div ref={editorRef} contentEditable onInput={onInput} onKeyUp={checkFormats} onMouseUp={checkFormats} suppressContentEditableWarning className="w-full outline-none leading-relaxed flex-1" style={{ fontFamily: font, fontSize: `${fontSize}px` }} />
          </div>
        </div>
        {!zen && (
          <div className="border-t border-base px-6 py-3 flex items-center justify-between text-sm text-soft bg-base/95 backdrop-blur">
            <div className="flex gap-4"><span><b className="text-fg">{wordCount}</b> words</span><span><b className="text-fg">{charCount}</b> chars</span></div>
            <span className="text-green-600 flex items-center gap-1.5"><Icon d={Ico.check} className="w-3.5 h-3.5" /> Auto-saved</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-fg">
      <nav className="sticky top-0 z-50 glass border-b border-base">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl tracking-tight">Volunteens</a>
          <div className="flex items-center gap-3"><ThemeToggle /><HoverButton href="/programs">Programs</HoverButton><HoverButton onClick={() => setConfirm({ type: "logout" })}>Log out</HoverButton></div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Writing <span className="brand-text">studio</span></h1>
        <p className="text-soft mb-8">Write your essays in focus. Everything auto-saves.</p>
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <div>
            <button onClick={createEssay} className="w-full brand-bg text-white rounded-xl py-3 font-semibold mb-4 hover:opacity-90 transition flex items-center justify-center gap-2"><Icon d={Ico.plusSquare} /> New essay</button>
            <div className="space-y-2">
              {essays.length === 0 && <div className="text-sm text-soft text-center py-8 border border-dashed border-base rounded-xl">No essays yet.</div>}
              {essays.map((e) => (
                <div key={e.id} onClick={() => setActiveId(e.id)} className={`group p-4 rounded-xl border cursor-pointer transition ${e.id === activeId ? "border-blue-400 bg-card" : "border-base bg-card hover:border-blue-400/40"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm truncate">{e.title || "Untitled"}</div>
                      {e.program && <div className="text-xs brand-text truncate mt-0.5">{e.program}</div>}
                    </div>
                    <button onClick={(ev) => { ev.stopPropagation(); setConfirm({ type: "delete", id: e.id }); }} className="opacity-0 group-hover:opacity-100 text-soft hover:text-red-500 transition"><Icon d={Ico.trash} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {!active ? (
              <div className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-base rounded-2xl text-soft">Create or select an essay to start writing.</div>
            ) : (
              <div className="card-lift rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-5 pb-5 border-b border-base">
                  <Toolbar />
                  <div className="ml-auto flex items-center gap-2">
                    <TimerControls />
                    <MusicMenu />
                    <IconBtn onClick={() => setFocus(true)} title="Focus mode"><Icon d={Ico.expand} /></IconBtn>
                  </div>
                </div>
                <div className="mb-6">
                  <input value={active.title} onChange={(e) => updateActive({ title: e.target.value })} placeholder="Essay title" className="w-full bg-transparent text-3xl font-extrabold outline-none placeholder:text-soft tracking-tight" />
                  <div className="h-1 w-12 brand-bg rounded-full mt-2" />
                  <input value={active.program} onChange={(e) => updateActive({ program: e.target.value })} placeholder="Which program is this for? (optional)" className="w-full bg-transparent text-sm text-soft outline-none mt-4 placeholder:text-soft" />
                </div>
                {prompts.length > 0 && <PromptsPanel prompts={prompts} programName={active.program} />}
                <div className="border-t border-base pt-6">
                  <div ref={editorRef} contentEditable onInput={onInput} onKeyUp={checkFormats} onMouseUp={checkFormats} suppressContentEditableWarning className="w-full outline-none leading-relaxed min-h-[400px]" style={{ fontFamily: font, fontSize: `${fontSize}px` }} />
                </div>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-base text-sm text-soft">
                  <div className="flex gap-4"><span><b className="text-fg">{wordCount}</b> words</span><span><b className="text-fg">{charCount}</b> characters</span></div>
                  <span className="text-green-600 flex items-center gap-1.5"><Icon d={Ico.check} className="w-3.5 h-3.5" /> Auto-saved</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {confirm && (
        <div onClick={() => setConfirm(null)} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 fade-bg p-4">
          <div onClick={(e) => e.stopPropagation()} className="pop-in bg-card border border-base rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-2">
              {confirm.type === "delete" ? "Delete this essay?" : "Log out?"}
            </h3>
            <p className="text-soft text-sm mb-6">
              {confirm.type === "delete" ? "This can't be undone. Your essay will be permanently removed." : "You'll need to sign in again to access your essays."}
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirm(null)} className="px-4 py-2 rounded-xl border border-base hover:bg-soft transition text-sm font-medium">Cancel</button>
              <button onClick={async () => {
                if (confirm.type === "delete") { await deleteEssay(confirm.id); }
                else { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; }
                setConfirm(null);
              }} className={`px-4 py-2 rounded-xl text-white text-sm font-semibold transition ${confirm.type === "delete" ? "bg-red-500 hover:bg-red-600" : "brand-bg hover:opacity-90"}`}>
                {confirm.type === "delete" ? "Delete" : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}