"use client";
import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

function HighlightButton({
  className,
  highlightColor = "color-mix(in oklab, currentColor 55%, transparent)",
  highlightSize = 64,
  borderColor = "color-mix(in oklab, currentColor 40%, transparent)",
  children,
  onClick,
  href,
  target,
  rel,
  ...props
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (!ref.current || clicked) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, [clicked]);

  const onMouseEnter = useCallback(() => setHovering(true), []);
  const onMouseLeave = useCallback(() => { setHovering(false); setClicked(false); }, []);

  const handleClick = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setClickPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    setClicked(true);
    setTimeout(() => setClicked(false), 650);
    onClick?.(e);
  }, [onClick]);

  const sharedProps = {
    ref,
    className: cn(
      "relative overflow-hidden transition-all duration-150 active:scale-[0.97] cursor-pointer",
      className
    ),
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick: handleClick,
    style: { borderColor: hovering ? borderColor : undefined },
    ...props,
  };

  const inner = (
    <>
      {hovering && !clicked && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: pos.x,
            top: pos.y,
            width: highlightSize,
            height: highlightSize,
            backgroundColor: highlightColor,
            transform: "translate(-50%,-50%)",
            filter: "blur(20px)",
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-current/[0.04]" />
      {clicked && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: clickPos.x,
            top: clickPos.y,
            backgroundColor: highlightColor,
            transform: "translate(-50%,-50%)",
            animation: "highlight-button-ripple 0.65s ease-out forwards",
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return <a href={href} target={target} rel={rel} {...sharedProps}>{inner}</a>;
  }
  return <button {...sharedProps}>{inner}</button>;
}

export { HighlightButton };
export default HighlightButton;
