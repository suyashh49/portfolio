"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import welcomeScreen from "../../assets/images/projects/creditup/welcome.png";
import loginScreen from "../../assets/images/projects/creditup/login.png";
import signupScreen from "../../assets/images/projects/creditup/signup.png";
import spendingScreen from "../../assets/images/projects/creditup/spending.png";
import recommendationsScreen from "../../assets/images/projects/creditup/recommendations.png";
import cardDetailsScreen from "../../assets/images/projects/creditup/cardDetails.png";
import comparisonScreen from "../../assets/images/projects/creditup/comparison.png";
import scoreBoosterScreen from "../../assets/images/projects/creditup/scoreBooster.png";
import profileScreen from "../../assets/images/projects/creditup/profile.png";

const carouselImages = [
  welcomeScreen,
  loginScreen,
  signupScreen,
  spendingScreen,
  recommendationsScreen,
  cardDetailsScreen,
  comparisonScreen,
  scoreBoosterScreen,
  profileScreen,
];

interface CreditUpProps {
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

const leftPills = ["Smart Recommendations", "Eligibility Engine", "OTP Auth"];
const rightPills = ["Card Comparison", "Spending Profiler", "Credit Booster"];

const CreditUp = ({ onBack }: CreditUpProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollable = scrollableRef.current;

    if (!container || !scrollable) return;

    let isManualScrolling = false;
    let manualScrollTimeout: NodeJS.Timeout | null = null;

    const handleVerticalScroll = () => {
      if (isManualScrolling) return;

      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const maxScroll = scrollable.scrollWidth - scrollable.clientWidth;

      // Only scroll slider while within container
      if (scrollTop >= containerTop && scrollTop <= containerTop + maxScroll) {
        scrollable.scrollLeft = scrollTop - containerTop;
      } else if (scrollTop > containerTop + maxScroll) {
        scrollable.scrollLeft = maxScroll;
      } else {
        scrollable.scrollLeft = 0;
      }
    };

    const handleManualScroll = () => {
      isManualScrolling = true;
      if (manualScrollTimeout) clearTimeout(manualScrollTimeout);
      manualScrollTimeout = setTimeout(() => {
        isManualScrolling = false;
      }, 150);
    };

    const setup = () => {
      const isMobile = window.innerWidth <= 1024;

      window.removeEventListener("scroll", handleVerticalScroll);
      scrollable.removeEventListener("scroll", handleManualScroll);

      scrollable.scrollLeft = 0;

      if (isMobile) {
        container.style.height = "auto";
        // Allow free horizontal scrolling on mobile, no auto-scroll
      } else {
        const scrollDistance = scrollable.scrollWidth - scrollable.clientWidth;
        container.style.height = `${scrollDistance + window.innerHeight}px`;

        window.addEventListener("scroll", handleVerticalScroll);
        scrollable.addEventListener("scroll", handleManualScroll);
      }
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      if (manualScrollTimeout) clearTimeout(manualScrollTimeout);
      window.removeEventListener("resize", setup);
      window.removeEventListener("scroll", handleVerticalScroll);
      scrollable.removeEventListener("scroll", handleManualScroll);
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans space-y-12">
      {/* Screenshot carousel */}
      <div ref={containerRef} className="relative w-full">
        <div className="md:sticky top-0">
          <div
            ref={scrollableRef}
            className="flex space-x-8 p-6 items-center overflow-x-auto scroll-smooth hide-scrollbar"
          >
            {carouselImages.map((img, idx) => (
              <div key={idx} className="flex-shrink-0">
                {/* iPhone frame */}
                <div className="relative w-[240px] sm:w-[270px] md:w-[290px]">
                  <div className="relative bg-[#1a1a1a] rounded-[3rem] p-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_70px_-15px_rgba(0,0,0,0.3)]">
                    {/* Side buttons */}
                    <div className="absolute -right-[2.5px] top-[120px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-r-sm" />
                    <div className="absolute -left-[2.5px] top-[100px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
                    <div className="absolute -left-[2.5px] top-[140px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
                    <div className="absolute -left-[2.5px] top-[72px] w-[3px] h-[16px] bg-[#2a2a2a] rounded-l-sm" />

                    <div className="relative bg-black rounded-[2.4rem] overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-20 w-[90px] h-[26px] bg-black rounded-full" />

                      <div className="relative aspect-[9/19.5]">
                        <Image
                          src={img}
                          alt={`CreditUp Screenshot ${idx + 1}`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              Full-Stack Mobile App
            </h2>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              CreditUp
            </h1>
            <p className="text-white/50 mt-3 max-w-md mx-auto text-sm sm:text-base">
              Smart credit card recommendations for first jobbers — powered by spending analytics.
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
                <div className="absolute inset-0 bg-[#46ec13]/20 rounded-full blur-[80px]" />
                <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] bg-[#131811] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(70,236,19,0.1)] flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl font-bold text-[#46ec13]">C</span>
                  <span className="text-5xl sm:text-6xl font-bold text-white">U</span>
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
              CreditUp – Smart Credit Card Recommendation Platform
            </h1>

            <p className="text-gray-700 mb-8">
              A comprehensive full-stack platform that helps first-time jobbers
              find the best credit card based on their spending patterns. Features
              an AI-powered recommendation engine, eligibility assessment, multi-card
              comparison, and a beautiful dark-themed mobile experience.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Tech Stack</span>
                <span className="text-gray-900">
                  React Native, TypeScript, Node.js, Express
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Databases</span>
                <span className="text-gray-900">
                  PostgreSQL (NeonDB), MongoDB Atlas
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">State Management</span>
                <span className="text-gray-900">
                  Redux Toolkit, RTK Query
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Key Features</span>
                <span className="text-gray-900">
                  AI Recommendations, Card Comparison, OTP Auth
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Type</span>
                <span className="text-gray-900">Full-Stack Mobile App</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 gap-6">
                <span className="font-medium text-gray-500 whitespace-nowrap">
                  Role
                </span>
                <p className="text-gray-900 leading-relaxed max-w-[70%]">
                  Sole Developer (End-to-end designed, developed backend APIs,
                  database architecture, and mobile app)
                </p>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-500">Platform</span>
                <span className="text-gray-900">iOS & Android (Expo)</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Problem Statement</h2>
              <p className="text-gray-700 leading-relaxed">
                First-time jobbers in India are overwhelmed by the sheer number of
                credit card options and lack the financial literacy to evaluate
                which card truly maximizes their rewards based on their actual
                spending habits. Existing comparison tools are generic, focusing on
                surface-level features rather than personalized value analysis
                factoring in spending patterns, fees, welcome bonuses, and milestone
                benefits.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Outcome</h2>
              <p className="text-gray-700 leading-relaxed">
                CreditUp delivers a personalized credit card matchmaking experience.
                The recommendation engine analyzes spending across 9 categories,
                calculates annual rewards per card, considers welcome bonuses and
                milestone benefits, deducts annual fees (with waiver logic), and
                ranks by net annual value. Users get actionable, data-driven card
                suggestions tailored to their financial profile — transforming a
                confusing decision into a confident one.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Architecture</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>
                  <span className="font-semibold">Backend API:</span> Node.js +
                  Express + TypeScript with JWT authentication, OTP middleware, and
                  a modular controller-based architecture
                </li>
                <li>
                  <span className="font-semibold">Dual Database Design:</span>{" "}
                  PostgreSQL for relational user data (ACID compliance) and MongoDB
                  for flexible credit card metadata
                </li>
                <li>
                  <span className="font-semibold">Smart Recommendation Engine:</span>{" "}
                  Custom algorithm analyzing spending patterns, reward rates, fee
                  waivers, and milestone benefits to rank cards by net value
                </li>
                <li>
                  <span className="font-semibold">Mobile App:</span> 18 screens
                  built with React Native (Expo), Redux Toolkit for state, RTK
                  Query for caching, and NativeWind for styling
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>🔐 Multi-auth system (Email/Password, Mobile OTP, Google OAuth)</li>
                <li>📊 Eligibility engine with age, income, and credit score validation</li>
                <li>💳 Spending profiler across 9 spending categories</li>
                <li>🤖 AI-powered card recommendations ranked by net annual value</li>
                <li>⚖️ Side-by-side multi-card comparison with reward breakdowns</li>
                <li>📈 Credit score booster tips and guidance</li>
                <li>🌙 Dark theme with neon green (#46ec13) accent</li>
                <li>🗃️ 10 pre-seeded Indian credit cards for instant demo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditUp;
