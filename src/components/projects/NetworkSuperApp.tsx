"use client";

import React from "react";
import { motion } from "framer-motion";

interface NetworkSuperAppProps {
  onBack: () => void;
}

const pillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const leftPills = ["Billing & Payments", "AI Chatbot", "Diagnostics"];
const rightPills = ["Biometric Auth", "Rewards System", "Dark/Light Mode"];

const NetworkSuperApp = ({ onBack }: NetworkSuperAppProps) => {
  return (
    <div className="bg-white text-gray-900 font-sans space-y-12">
      {/* Hero showcase */}
      <div className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Gradient edges */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 py-16 sm:py-20">
          {/* Title */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white/40 text-sm tracking-[0.3em] uppercase mb-3">
              Telecom Super App
            </h2>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Network SuperApp
            </h1>
            <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm sm:text-base">
              An all-in-one mobile platform for a telecom network — billing,
              diagnostics, AI support, shop, and rewards in a single app.
            </p>
          </motion.div>

          {/* Floating pills */}
          <div className="relative flex items-center justify-center">
            {/* Left pills — hidden on mobile */}
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

            {/* Center icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[80px]" />
                <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <div className="w-3 h-3 rounded-full bg-indigo-400" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">NS</span>
                  <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">SuperApp</span>
                </div>
              </div>
            </motion.div>

            {/* Right pills — hidden on mobile */}
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

          {/* Mobile pills row */}
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
              Network SuperApp – All-in-One Telecom Platform
            </h1>

            <p className="text-gray-700 mb-8">
              A fully working React Native super-app prototype for a major telecom
              network operator. Consolidates account management, billing, device
              diagnostics, AI-powered support, channel shop, and rewards into a
              single seamless mobile experience spanning 30+ screens across 13
              modules.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Tech Stack</span>
                <span className="text-gray-900">
                  React Native, TypeScript, Expo
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">State Management</span>
                <span className="text-gray-900">
                  Zustand, Redux Toolkit, RTK Query
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Backend</span>
                <span className="text-gray-900">
                  Node.js, Express, MongoDB
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Key Features</span>
                <span className="text-gray-900">
                  AI Chat, Billing, Diagnostics, Rewards
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Type</span>
                <span className="text-gray-900">Full-Stack Super App Prototype</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 gap-6">
                <span className="font-medium text-gray-500 whitespace-nowrap">
                  Role
                </span>
                <p className="text-gray-900 leading-relaxed max-w-[70%]">
                  Sole Developer (Designed and built the complete super-app
                  prototype end-to-end with backend integration)
                </p>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Platform</span>
                <span className="text-gray-900">iOS & Android</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Modules</span>
                <span className="text-gray-900">13 feature modules, 30+ screens</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Problem Statement</h2>
              <p className="text-gray-700 leading-relaxed">
                Telecom subscribers juggle multiple apps and portals to manage
                their accounts — separate tools for billing, device diagnostics,
                support tickets, channel subscriptions, and rewards. This
                fragmented experience leads to high support call volumes, low
                digital adoption, and missed engagement opportunities. The client
                needed a unified mobile experience that consolidates every customer
                touchpoint into one intelligent super-app.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Outcome</h2>
              <p className="text-gray-700 leading-relaxed">
                Delivered a production-ready prototype with 30+ screens spanning
                authentication (email, social, biometric), smart dashboard with
                outage alerts, full billing lifecycle with payment processing,
                real-time device diagnostics with signal monitoring and remote
                reboot, AI-powered universal search and chatbot, channel
                marketplace, rewards system, and multi-language support — all with
                complete light/dark theme support and skeleton loading states for a
                premium native experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">App Modules</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>
                  <span className="font-semibold">Auth & Onboarding:</span>{" "}
                  Email, social login, biometrics, OTP, device binding, and
                  interactive onboarding tour
                </li>
                <li>
                  <span className="font-semibold">Dashboard:</span> Account
                  summary, plan overview, wallet balance, quick actions, and live
                  outage notifications
                </li>
                <li>
                  <span className="font-semibold">Billing & Payments:</span>{" "}
                  Invoice history (6 months), detailed billing, multi-method
                  payments, and transaction tracking
                </li>
                <li>
                  <span className="font-semibold">Diagnostics:</span> Device
                  list, STB signal strength, speed tests, line quality checks,
                  ping & traceroute, remote reboot, and guided troubleshooting
                </li>
                <li>
                  <span className="font-semibold">AI Features:</span> Universal
                  search with AI answers, conversational chatbot with threads,
                  voice input, and contextual prompts
                </li>
                <li>
                  <span className="font-semibold">Shop:</span> Plan overview,
                  upgrade/downgrade flows, and channel store with
                  subscribe/unsubscribe
                </li>
                <li>
                  <span className="font-semibold">Settings:</span> Profile
                  management, communication preferences, language selection,
                  theme toggle, linked accounts, and trusted devices
                </li>
                <li>
                  <span className="font-semibold">Rewards:</span> Points
                  tracking, earning rules, and redemption marketplace
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Technical Highlights</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>✅ Full light/dark mode with system preference detection</li>
                <li>✅ Skeleton loaders for all async operations</li>
                <li>✅ JWT authentication with secure token storage</li>
                <li>✅ React Navigation with stack + tab + nested navigators</li>
                <li>✅ Backend with MongoDB models for all entities</li>
                <li>✅ NativeWind (Tailwind) for consistent styling</li>
                <li>✅ Mock API layer for demo-ready offline usage</li>
                <li>✅ Multi-language support (English/Filipino)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSuperApp;
