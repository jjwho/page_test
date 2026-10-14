"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** 位移倍率：正數比捲動快（前景感），負數比捲動慢（背景感） */
  speed?: number;
  className?: string;
  children: React.ReactNode;
};

/** 依元素與視窗中心的距離做垂直位移，並對齊 4px 格線保持像素感 */
export default function Parallax({ speed = 0.3, className, children }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      if (reduce.matches) {
        inner.style.transform = "";
        return;
      }
      const rect = outer.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      inner.style.transform = `translate3d(0, ${Math.round(offset / 4) * 4}px, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [speed]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
