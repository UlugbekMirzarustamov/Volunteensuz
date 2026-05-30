"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ─── Site colors ──────────────────────────────────────────────────────────────
const BG   = "#0B0E14"; // matches --bg dark
const DOT_COLORS = [[37, 99, 235], [6, 182, 212], [255, 255, 255]]; // blue, cyan, white

// ─── WebGL dot-matrix (TypeScript removed, logic unchanged) ───────────────────

export const CanvasRevealEffect = ({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
  reverse = false,
}) => (
  <div className={cn("h-full relative w-full", containerClassName)}>
    <div className="h-full w-full">
      <DotMatrix
        colors={colors}
        dotSize={dotSize ?? 4}
        opacities={opacities}
        shader={`${reverse ? "u_reverse_active" : "false"}_;animation_speed_factor_${animationSpeed.toFixed(1)}_;`}
        center={["x", "y"]}
      />
    </div>
    {showGradient && (
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />
    )}
  </div>
);

const DotMatrix = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = useMemo(() => {
    let ca = [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];
    if (colors.length === 2) ca = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    else if (colors.length === 3) ca = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    return {
      u_colors:     { value: ca.map((c) => [c[0] / 255, c[1] / 255, c[2] / 255]), type: "uniform3fv" },
      u_opacities:  { value: opacities, type: "uniform1fv" },
      u_total_size: { value: totalSize,  type: "uniform1f" },
      u_dot_size:   { value: dotSize,    type: "uniform1f" },
      u_reverse:    { value: shader.includes("u_reverse_active") ? 1 : 0, type: "uniform1i" },
    };
  }, [colors, opacities, totalSize, dotSize, shader]);

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse;
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy){ return fract(tan(distance(xy*PHI,xy)*0.5)*xy.x); }
        void main(){
          vec2 st = fragCoord.xy;
          ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x,u_total_size)-u_dot_size)*0.5));" : ""}
          ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y,u_total_size)-u_dot_size)*0.5));" : ""}
          float opacity = step(0.0,st.x)*step(0.0,st.y);
          vec2 st2 = vec2(int(st.x/u_total_size),int(st.y/u_total_size));
          float show_offset = random(st2);
          float rand = random(st2*floor((u_time/5.0)+show_offset+5.0));
          opacity *= u_opacities[int(rand*10.0)];
          opacity *= 1.0-step(u_dot_size/u_total_size,fract(st.x/u_total_size));
          opacity *= 1.0-step(u_dot_size/u_total_size,fract(st.y/u_total_size));
          vec3 color = u_colors[int(show_offset*6.0)];
          float spd = 0.5;
          vec2 cg = u_resolution/2.0/u_total_size;
          float dist = distance(cg,st2);
          float t_intro = dist*0.01+(random(st2)*0.15);
          float t_outro = (distance(cg,vec2(0.0))-dist)*0.02+(random(st2+42.0)*0.2);
          if(u_reverse==1){
            opacity *= 1.0-step(t_outro,u_time*spd);
            opacity *= clamp(step(t_outro+0.1,u_time*spd)*1.25,1.0,1.25);
          } else {
            opacity *= step(t_intro,u_time*spd);
            opacity *= clamp((1.0-step(t_intro+0.1,u_time*spd))*1.25,1.0,1.25);
          }
          fragColor = vec4(color,opacity);
          fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
    />
  );
};

const InnerShader = ({ source, uniforms }) => {
  const { size } = useThree();
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  const material = useMemo(() => {
    const p = {};
    for (const k in uniforms) {
      const u = uniforms[k];
      if      (u.type === "uniform1f")  p[k] = { value: u.value };
      else if (u.type === "uniform1i")  p[k] = { value: u.value };
      else if (u.type === "uniform1fv") p[k] = { value: u.value };
      else if (u.type === "uniform3fv") p[k] = { value: u.value.map((v) => new THREE.Vector3().fromArray(v)) };
      else if (u.type === "uniform3f")  p[k] = { value: new THREE.Vector3().fromArray(u.value) };
      else if (u.type === "uniform2f")  p[k] = { value: new THREE.Vector2().fromArray(u.value) };
    }
    p.u_time       = { value: 0 };
    p.u_resolution = { value: new THREE.Vector2(size.width * 2, size.height * 2) };
    return new THREE.ShaderMaterial({
      vertexShader: `
        precision mediump float;
        uniform vec2 u_resolution;
        out vec2 fragCoord;
        void main(){
          gl_Position = vec4(position.xy,0.0,1.0);
          fragCoord = (position.xy+1.0)*0.5*u_resolution;
          fragCoord.y = u_resolution.y-fragCoord.y;
        }`,
      fragmentShader: source,
      uniforms: p,
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });
  }, [size.width, size.height, source]);
  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader = ({ source, uniforms }) => (
  <Canvas className="absolute inset-0 h-full w-full">
    <InnerShader source={source} uniforms={uniforms} />
  </Canvas>
);

// ─── Nav ──────────────────────────────────────────────────────────────────────

// FIX: was `inline-flex items-center h-5` which vertically centered the 40px
// inner div inside a 20px clip box — showing both spans simultaneously.
// Now `inline-flex flex-col h-5` pins the inner div to the top so only the
// first span is visible at rest, and -translate-y-1/2 reveals the second.
function AnimatedNavLink({ href, children }) {
  return (
    <a href={href} className="group inline-flex flex-col overflow-hidden h-5 text-sm">
      <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="text-blue-200/50 leading-5">{children}</span>
        <span className="text-white leading-5">{children}</span>
      </div>
    </a>
  );
}

function MiniNavbar() {
  const [open, setOpen] = useState(false);
  const [shape, setShape] = useState("rounded-full");
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (open) setShape("rounded-2xl");
    else timer.current = setTimeout(() => setShape("rounded-full"), 300);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [open]);

  return (
    <header
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center px-5 py-2.5 ${shape} border border-white/8 w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-300`}
      style={{
        background: "rgba(11,14,20,0.75)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        boxShadow: "0 0 0 1px rgba(37,99,235,0.12), 0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center justify-between w-full gap-5 sm:gap-7">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="url(#sn-lg)" />
            <path d="M16 7L19 16L16 25L13 16L16 7Z" fill="white" />
            <circle cx="16" cy="16" r="2" fill="url(#sn-lg)" />
            <defs>
              <linearGradient id="sn-lg" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#2563EB" /><stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-extrabold text-sm text-white tracking-tight">Volunteens</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden sm:flex items-center gap-5">
          <AnimatedNavLink href="/">Home</AnimatedNavLink>
          <AnimatedNavLink href="/programs">Programs</AnimatedNavLink>
        </nav>

        {/* Desktop buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="/login"
            className="px-4 py-1.5 text-sm border border-white/10 text-blue-200/70 rounded-full hover:border-blue-400/40 hover:text-white transition-all duration-200"
            style={{ background: "rgba(37,99,235,0.06)" }}
          >
            Sign in
          </a>
          <a
            href="/login?mode=signup"
            className="relative px-4 py-1.5 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)", boxShadow: "0 0 12px rgba(37,99,235,0.4)" }}
          >
            Sign up
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="sm:hidden w-7 h-7 flex items-center justify-center text-blue-200/70" onClick={() => setOpen(!open)}>
          {open
            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`sm:hidden w-full overflow-hidden transition-all duration-300 ${open ? "max-h-64 opacity-100 pt-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col items-center gap-3 w-full">
          <a href="/" className="text-blue-200/60 hover:text-white transition w-full text-center py-1">Home</a>
          <a href="/programs" className="text-blue-200/60 hover:text-white transition w-full text-center py-1">Programs</a>
        </nav>
        <div className="flex flex-col gap-2 mt-3">
          <a href="/login" className="text-center border border-white/10 text-blue-200/70 rounded-full py-2 text-sm hover:text-white transition" style={{ background: "rgba(37,99,235,0.06)" }}>Sign in</a>
          <a href="/login?mode=signup" className="text-center text-white font-semibold rounded-full py-2 text-sm hover:opacity-90 transition" style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)" }}>Sign up</a>
        </div>
      </div>
    </header>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export const SignInPage = ({ className }) => {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fwdCanvas, setFwdCanvas] = useState(true);
  const [revCanvas, setRevCanvas] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("mode") === "signup") setMode("signup");
  }, []);

  useEffect(() => {
    if (step === "password") setTimeout(() => passwordRef.current?.focus(), 350);
  }, [step]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) setStep("password");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password || loading) return;
    setError("");
    setLoading(true);
    try {
      const route = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setLoading(false); return; }
      setRevCanvas(true);
      setTimeout(() => setFwdCanvas(false), 60);
      setTimeout(() => setStep("success"), 1900);
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("email");
    setError("");
    setLoading(false);
    setRevCanvas(false);
    setFwdCanvas(true);
  };

  // Shared input class
  const inputCls = "w-full text-white border rounded-full py-3 px-5 focus:outline-none text-center placeholder:text-blue-200/25 transition-all duration-200 focus:border-blue-500/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]";
  const inputStyle = { background: "rgba(37,99,235,0.06)", borderColor: "rgba(255,255,255,0.08)" };

  return (
    <div className={cn("flex w-full flex-col min-h-screen relative overflow-hidden", className)} style={{ background: BG }}>

      {/* ── Background layers ── */}
      <div className="absolute inset-0 z-0">

        {/* WebGL dot canvas */}
        {fwdCanvas && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName=""
              colors={DOT_COLORS}
              dotSize={4}
              showGradient={false}
              reverse={false}
            />
          </div>
        )}
        {revCanvas && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName=""
              colors={DOT_COLORS}
              dotSize={4}
              showGradient={false}
              reverse={true}
            />
          </div>
        )}

        {/* Brand-color ambient glow — matches site's hero-section style */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 70% 50% at 75% 8%, rgba(37,99,235,0.18), transparent),
            radial-gradient(ellipse 55% 40% at 15% 88%, rgba(6,182,212,0.14), transparent),
            radial-gradient(ellipse 40% 35% at 50% 50%, rgba(11,14,20,0.0), transparent)
          `
        }} />

        {/* Dark radial vignette so form text stays readable */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 65% 60% at 50% 52%, rgba(11,14,20,0.82) 20%, transparent 100%)`
        }} />

        {/* Edge fades to exact bg color */}
        <div className="absolute inset-x-0 top-0 h-44 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
        <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none" style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1">
        <MiniNavbar />

        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-[22rem] px-6 mt-16">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Email ── */}
              {step === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6 text-center"
                >
                  <div>
                    <h1
                      className="text-[2.4rem] font-bold leading-[1.1] tracking-tight"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #fff 55%, #93c5fd)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {mode === "login" ? "Welcome back" : "Join Volunteens"}
                    </h1>
                    <p className="text-lg text-blue-200/45 font-light mt-1.5">
                      {mode === "login" ? "Sign in to your account" : "Start your journey"}
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    {mode === "signup" && (
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputCls}
                        style={inputStyle}
                        required
                      />
                    )}
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(inputCls, "pr-14")}
                        style={inputStyle}
                        required
                        autoComplete="email"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 group overflow-hidden hover:shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                        style={{ background: "linear-gradient(135deg,#2563EB,#06B6D4)" }}
                      >
                        <span className="relative block w-full h-full overflow-hidden text-sm">
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">→</span>
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">→</span>
                        </span>
                      </button>
                    </div>
                  </form>

                  <p className="text-sm text-blue-200/35">
                    {mode === "login" ? "No account? " : "Already have one? "}
                    <button
                      type="button"
                      onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                      className="underline text-blue-300/60 hover:text-white transition"
                    >
                      {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                  </p>

                  <p className="text-xs text-blue-200/20 pb-4">
                    By continuing you agree to our{" "}
                    <a href="/legal/terms" className="underline hover:text-blue-200/50 transition">Terms</a>
                    {" "}and{" "}
                    <a href="/legal/privacy" className="underline hover:text-blue-200/50 transition">Privacy Policy</a>.
                  </p>
                </motion.div>
              )}

              {/* ── Step 2: Password ── */}
              {step === "password" && (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6 text-center"
                >
                  <div>
                    <h1
                      className="text-[2.4rem] font-bold leading-[1.1] tracking-tight"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #fff 55%, #93c5fd)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {mode === "login" ? "Your password" : "Set a password"}
                    </h1>
                    <p className="text-sm text-blue-200/35 mt-2 truncate px-2">{email}</p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-3">
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder={mode === "login" ? "Password" : "Create a password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputCls}
                      style={inputStyle}
                      required
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          key="err"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="text-red-400 text-sm"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3 pt-1">
                      <motion.button
                        type="button"
                        onClick={handleBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="rounded-full font-medium px-7 py-3 w-[35%] transition-all duration-200 text-blue-200/70 hover:text-white"
                        style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={!password || loading}
                        whileHover={{ scale: password && !loading ? 1.02 : 1 }}
                        whileTap={{ scale: password && !loading ? 0.97 : 1 }}
                        className="flex-1 rounded-full font-semibold py-3 text-white transition-all duration-300"
                        style={
                          password && !loading
                            ? { background: "linear-gradient(90deg,#2563EB,#06B6D4)", boxShadow: "0 0 16px rgba(37,99,235,0.45)", cursor: "pointer" }
                            : { background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)", cursor: "not-allowed", opacity: 0.5 }
                        }
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2 justify-center">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>{mode === "login" ? "Signing in…" : "Creating…"}</span>
                          </span>
                        ) : mode === "login" ? "Sign in" : "Create account"}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── Step 3: Success ── */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: "easeOut", delay: 0.15 }}
                  className="space-y-6 text-center"
                >
                  <div>
                    <h1
                      className="text-[2.4rem] font-bold leading-[1.1] tracking-tight"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #fff 55%, #93c5fd)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      You're in!
                    </h1>
                    <p className="text-lg text-blue-200/45 font-light mt-1.5">
                      {mode === "login" ? "Welcome back" : "Welcome to Volunteens"}
                    </p>
                  </div>

                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.35, type: "spring", bounce: 0.45 }}
                    className="py-6 flex justify-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg,#2563EB,#06B6D4)",
                        boxShadow: "0 0 32px rgba(37,99,235,0.5)",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.a
                    href="/essays"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                    className="block w-full rounded-full font-semibold py-3 text-white text-center transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(90deg,#2563EB,#06B6D4)",
                      boxShadow: "0 0 20px rgba(37,99,235,0.4)",
                    }}
                  >
                    Go to my essays →
                  </motion.a>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
