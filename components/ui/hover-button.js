"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const HoverButton = React.forwardRef(function HoverButton(
  { className, children, href, target, rel, ...props },
  forwardedRef
) {
  const innerRef = React.useRef(null);
  const [isListening, setIsListening] = React.useState(false);
  const [circles, setCircles] = React.useState([]);
  const lastAddedRef = React.useRef(0);

  const setRef = (el) => {
    innerRef.current = el;
    if (!forwardedRef) return;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else forwardedRef.current = el;
  };

  const createCircle = React.useCallback((x, y) => {
    const w = innerRef.current?.offsetWidth || 0;
    const xPos = x / w;
    const color = `linear-gradient(to right, var(--hb-start) ${xPos * 100}%, var(--hb-end) ${xPos * 100}%)`;
    setCircles((prev) => [...prev, { id: Date.now(), x, y, color, fadeState: null }]);
  }, []);

  const handlePointerMove = React.useCallback((e) => {
    if (!isListening) return;
    const now = Date.now();
    if (now - lastAddedRef.current > 100) {
      lastAddedRef.current = now;
      const rect = e.currentTarget.getBoundingClientRect();
      createCircle(e.clientX - rect.left, e.clientY - rect.top);
    }
  }, [isListening, createCircle]);

  const handlePointerEnter = React.useCallback(() => setIsListening(true), []);
  const handlePointerLeave = React.useCallback(() => setIsListening(false), []);

  React.useEffect(() => {
    circles.forEach((circle) => {
      if (!circle.fadeState) {
        setTimeout(() => setCircles((p) => p.map((c) => c.id === circle.id ? { ...c, fadeState: "in" } : c)), 0);
        setTimeout(() => setCircles((p) => p.map((c) => c.id === circle.id ? { ...c, fadeState: "out" } : c)), 1000);
        setTimeout(() => setCircles((p) => p.filter((c) => c.id !== circle.id)), 2200);
      }
    });
  }, [circles]);

  const baseClass = cn(
    "relative isolate px-5 py-2 rounded-full",
    "text-fg font-medium text-sm leading-5",
    "backdrop-blur-md cursor-pointer overflow-hidden",
    "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
    "before:pointer-events-none before:z-[1] before:transition-transform before:duration-300",
    "before:shadow-[inset_0_0_0_1px_rgba(37,99,235,0.18),inset_0_0_20px_0_rgba(6,182,212,0.06),inset_0_-2px_10px_0_rgba(37,99,235,0.10),0_1px_4px_0_rgba(0,0,0,0.18),0_4px_14px_0_rgba(0,0,0,0.14)]",
    "active:before:scale-[0.975]",
    "transition-all duration-200",
    className
  );

  const sharedProps = {
    ref: setRef,
    className: baseClass,
    onPointerMove: handlePointerMove,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    style: {
      background: "rgba(37,99,235,0.05)",
      "--hb-start": "#2563EB",
      "--hb-end": "#06B6D4",
      ...props.style,
    },
    ...props,
  };
  delete sharedProps.style["--hb-start"]; // handled inline below
  // Re-add correctly
  sharedProps.style = {
    background: "rgba(37,99,235,0.05)",
    "--hb-start": "#2563EB",
    "--hb-end": "#06B6D4",
    ...props.style,
  };

  const inner = (
    <>
      {circles.map(({ id, x, y, color, fadeState }) => (
        <div
          key={id}
          className={cn(
            "absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "blur-xl pointer-events-none z-[-1] transition-opacity duration-300",
            fadeState === "in"  && "opacity-80",
            fadeState === "out" && "opacity-0 !duration-[1.2s]",
            !fadeState         && "opacity-0"
          )}
          style={{ left: x, top: y, background: color }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) return <a href={href} target={target} rel={rel} {...sharedProps}>{inner}</a>;
  return <button {...sharedProps}>{inner}</button>;
});

HoverButton.displayName = "HoverButton";
export { HoverButton };
export default HoverButton;
