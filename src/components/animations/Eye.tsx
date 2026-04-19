"use client";
import { useEffect, useRef, useState } from "react";

export default function Eye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const needsUpdate = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angleRad = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      if (angleRef.current !== angleRad) {
        angleRef.current = angleRad;
        needsUpdate.current = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const update = () => {
      if (needsUpdate.current && pupilRef.current) {
        pupilRef.current.style.transform = `translate(${Math.cos(angleRef.current) * 4}px, ${Math.sin(angleRef.current) * 4}px)`;
        needsUpdate.current = false;
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    };
    const scheduleNextBlink = () => {
      setTimeout(() => {
        blink();
        scheduleNextBlink();
      }, 5000);
    };
    scheduleNextBlink();
  }, []);

  return (
    <div
      ref={eyeRef}
      className="w-4 h-4 md:w-7 md:h-7 rounded-full bg-white inline-flex items-center justify-center relative overflow-hidden mx-1"
    >
      {/* Pupil */}
      <div
        ref={pupilRef}
        className="rounded-full bg-black absolute transition-transform duration-75"
        style={{
          width: "33%",
          height: "33%",
          transform: `translate(${Math.cos(angleRef.current) * 4}px, ${Math.sin(angleRef.current) * 4}px)`
        }}
      />
      {/* Eyelid */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black transition-transform duration-150 ease-in-out z-10 ${
          isBlinking ? "translate-y-0" : "-translate-y-full"
        }`}
      />
    </div>
  );
}