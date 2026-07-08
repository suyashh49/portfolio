"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ariloLogo from "../../assets/images/projects/arilo/arilo-logo.png";
import ariloIcon from "../../assets/images/projects/arilo/1024x1024_arilo.png";

const pillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const leftPills = ["Voice & Text Echoes", "Deep Query AI", "Next Steps"];
const rightPills = ["Persona Analysis", "Folders & Tags", "Dark / Light Mode"];

interface AriloProps {
  onBack: () => void;
}

const Arilo = ({ onBack }: AriloProps) => {
  return (
    <div className="bg-white text-gray-900 font-sans space-y-12">
      {/* Hero showcase */}
      <div className="relative bg-[#0a0a0a] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white/40 text-sm tracking-[0.3em] uppercase mb-3">
              Personal Memory Companion
            </h2>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Arilo
            </h1>
            <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm sm:text-base">
              Capture your thoughts, uncover deep connections, and never let an
              idea slip away — powered by AI.
            </p>
          </motion.div>

          <div className="relative flex items-center justify-center">
            <div className="hidden md:flex flex-col gap-3 items-end mr-10 lg:mr-16">
              {leftPills.map((label, i) => (
                <motion.span
                  key={label}
                  custom={i}
                  variants={pillVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white/6 text-white/70 border border-white/10 backdrop-blur-sm whitespace-nowrap"
                >
                  {label}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <div className="relative w-[200px] sm:w-[220px] flex items-center justify-center">
                <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-[100px]" />
                <Image
                  src={ariloLogo}
                  alt="Arilo logo"
                  className="relative w-[180px] sm:w-[200px] h-auto drop-shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                  priority
                />
              </div>
            </motion.div>

            <div className="hidden md:flex flex-col gap-3 items-start ml-10 lg:ml-16">
              {rightPills.map((label, i) => (
                <motion.span
                  key={label}
                  custom={i + 3}
                  variants={pillVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white/6 text-white/70 border border-white/10 backdrop-blur-sm whitespace-nowrap"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex md:hidden flex-wrap justify-center gap-2 mt-8">
            {[...leftPills, ...rightPills].map((label, i) => (
              <motion.span
                key={label}
                custom={i}
                variants={pillVariants}
                initial="hidden"
                animate="visible"
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/6 text-white/70 border border-white/10 backdrop-blur-sm"
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-semibold leading-snug mb-4">
              Arilo – Your Personal Memory Companion
            </h1>

            <p className="text-gray-700 mb-8">
              Arilo is more than a note-taking app — it&apos;s a memory engine
              that helps you capture fleeting thoughts via voice or text,
              automatically extract action items, and query your past with an
              AI agent grounded in your own echoes. Live on Google Play with a
              polished mobile experience and a dedicated product website.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Tech Stack</span>
                <span className="text-gray-900 text-right max-w-[60%]">
                  React Native, TypeScript, Expo, Redux Toolkit, NativeWind
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Key Features</span>
                <span className="text-gray-900 text-right max-w-[60%]">
                  Echoes, Deep Query, Next Steps, Persona Analysis
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Type</span>
                <span className="text-gray-900">AI-Powered Mobile App</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 gap-6">
                <span className="font-medium text-gray-500 whitespace-nowrap">
                  Role
                </span>
                <p className="text-gray-900 leading-relaxed max-w-[70%]">
                  Mobile Developer — built core app experience including capture
                  flows, Deep Query chat, persona analysis, and polished UI/UX
                </p>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Platform</span>
                <span className="text-gray-900">Android (Google Play)</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Website</span>
                <a
                  href="https://arilo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  arilo.in →
                </a>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Download</span>
                <a
                  href="https://play.google.com/store/apps/details?id=com.anonymous.projectxapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Play →
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">About Arilo</h2>
              <p className="text-gray-700 leading-relaxed">
                Most of us lose thousands of thoughts because we lack an easy way
                to store and find them later. Arilo lets you record &quot;Echoes&quot;
                — voice or text memories — and uses AI to summarize, extract
                next steps, and surface connections across your personal history.
                The product website at{" "}
                <a
                  href="https://arilo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  arilo.in
                </a>{" "}
                showcases the app&apos;s vision, features, and privacy-first
                approach.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Problem Statement</h2>
              <p className="text-gray-700 leading-relaxed">
                People capture ideas in scattered notes, voice memos, and chat
                threads — but rarely revisit them. Manual organization is
                tedious, and generic AI assistants don&apos;t know your personal
                context. There was no simple mobile tool to capture thoughts in
                the moment and later ask intelligent questions grounded in your
                own memories.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Outcome</h2>
              <p className="text-gray-700 leading-relaxed">
                Arilo ships as a production Android app with smart capture,
                AI-extracted tasks, memory-grounded Deep Query chat, persona
                analysis, and organized folders/tags — all wrapped in a clean,
                premium interface with dark and light modes. Users can install
                directly from{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.anonymous.projectxapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Play
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>
                  <span className="font-semibold">Smart Capture:</span> Record
                  echoes via voice or text with a single tap
                </li>
                <li>
                  <span className="font-semibold">AI Processing:</span>{" "}
                  Automatic summarization, highlights, and next-step extraction
                </li>
                <li>
                  <span className="font-semibold">Deep Query:</span> Chat with
                  your memories — AI answers grounded in your echoes with
                  citations
                </li>
                <li>
                  <span className="font-semibold">Persona Analysis:</span>{" "}
                  Discover patterns and insights about yourself over time
                </li>
                <li>
                  <span className="font-semibold">Organization:</span> Custom
                  folders, tags, and a chronological echo history with search
                </li>
                <li>
                  <span className="font-semibold">Privacy First:</span> Your
                  thoughts stay yours — built with security at the core
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arilo;
