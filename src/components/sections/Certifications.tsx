"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BadgeCheck, Copy, Check } from "lucide-react";
import BlurText from "../animations/BlurText";
import VariableProximity from "../animations/VariableProximity";
import { colors } from "@/src/lib/colors";
import { CERTIFICATIONS, type Certification } from "@/src/lib/certifications";

const badgeStyles = {
  anthropic: {
    bg: colors.lavender.light,
    text: colors.lavender.dark,
    label: "Anthropic",
  },
  gcp: {
    bg: colors.blue.light,
    text: colors.blue.dark,
    label: "Google Cloud",
  },
} as const;

const Certifications = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certs"
      ref={ref}
      className="w-full px-6 md:px-12 py-10 flex flex-col items-center"
      aria-labelledby="certifications-heading"
    >
      <h2 id="certifications-heading" className="sr-only">
        Certifications
      </h2>
      <BlurText
        text="Certifications"
        delay={120}
        animateBy="words"
        direction="top"
        className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-heading font-normal text-center mb-4"
      />
      <p className="text-gray-600 text-sm md:text-base text-center max-w-xl mb-10">
        Formal training and cloud credentials that back the work I ship in
        production.
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {CERTIFICATIONS.map((cert, index) => (
          <CertificationCard key={`${cert.issuer}-${cert.title}`} cert={cert} index={index} inView={inView} />
        ))}
      </div>
    </section>
  );
};

const CertificationCard: React.FC<{
  cert: Certification;
  index: number;
  inView: boolean;
}> = ({ cert, index, inView }) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const style =
    cert.badge && badgeStyles[cert.badge]
      ? badgeStyles[cert.badge]
      : badgeStyles.anthropic;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-3xl p-5 flex flex-col gap-3 border border-black/5 shadow-sm h-full min-h-[11.5rem] min-w-0"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-2xl bg-white/40 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" aria-hidden />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-wide opacity-80">
          {style.label}
        </span>
      </div>

      <div
        ref={titleContainerRef}
        className="relative min-w-0 flex-1 min-h-[4.25rem]"
      >
        <h3 className="sr-only">{cert.title}</h3>
        <VariableProximity
          label={cert.title}
          className="variable-proximity-demo font-heading font-bold text-[0.95rem] sm:text-base md:text-[1.05rem] leading-snug cursor-default block w-full"
          fromFontVariationSettings="'wght' 400, 'opsz' 30"
          toFontVariationSettings="'wght' 1000, 'opsz' 80"
          containerRef={titleContainerRef}
          radius={70}
          falloff="linear"
          aria-hidden
        />
      </div>

      {cert.validationNumber ? (
        <ValidationBadge value={cert.validationNumber} />
      ) : (
        <div className="flex items-center gap-1.5 text-xs opacity-80 mt-auto">
          <BadgeCheck className="w-3.5 h-3.5" aria-hidden />
          <span>Completed</span>
        </div>
      )}
    </motion.article>
  );
};

const ValidationBadge: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mt-auto pt-2">
      <p className="text-[11px] uppercase tracking-wide opacity-70 mb-1">
        Validation number
      </p>
      <button
        type="button"
        onClick={copy}
        className="w-full min-w-0 flex items-start justify-between gap-2 rounded-xl bg-white/35 hover:bg-white/50 px-3 py-2 text-left text-[10px] sm:text-xs font-mono leading-relaxed transition"
        aria-label="Copy GCP validation number"
      >
        <span className="break-all">{value}</span>
        {copied ? (
          <Check className="w-3.5 h-3.5 shrink-0" aria-hidden />
        ) : (
          <Copy className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
        )}
      </button>
    </div>
  );
};

export default Certifications;
