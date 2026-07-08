import { JSX } from "react";
import {
  FaReact,
  FaHtml5,
  FaJs,
  FaServer,
  FaDatabase,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaMobileAlt,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiFramer,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiPostman,
  SiVercel,
  SiExpo,
  SiRealm,
  SiRedux,
} from "react-icons/si";
import { BsBootstrap } from "react-icons/bs";
import reactNative from "../assets/images/React_Native.png";
import mernStack from "../assets/images/MERN_Stack.png";
import { StaticImageData } from "next/image";

export type SkillItem = {
  name: string;
  desc: string;
  icon: JSX.Element;
  badge: string;
};

export type FeaturedItem = {
  name: string;
  desc: string;
  badge: string;
  icon: JSX.Element;
  banner?: string;
  image?: StaticImageData | string;
};

export type CategoryData = {
  featured: FeaturedItem[];
  skills: SkillItem[];
  learning: SkillItem[];
  recent: SkillItem[];
};

export type SkillsData = {
  [category: string]: CategoryData;
};

const skillsData: SkillsData = {
  Frontend: {
    skills: [
      {
        name: "React.js",
        desc: "Used to build interactive UIs in web projects and dashboards using reusable components.",
        badge: "TOP SKILL",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "HTML5 & CSS3",
        desc: "Built responsive layouts and semantic markup for client websites and projects.",
        badge: "CORE WEB",
        icon: <FaHtml5 className="text-orange-500" />,
      },
      {
        name: "Bootstrap",
        desc: "Used for responsive design during internships and personal projects.",
        badge: "UI TOOLKIT",
        icon: <BsBootstrap className="text-indigo-400" />,
      },
      {
        name: "JavaScript",
        desc: "Used in React Native and web projects, including state and DOM manipulation.",
        badge: "Most Used",
        icon: <FaJs className="text-yellow-300" />,
      },
      {
        name: "TypeScript",
        desc: "Used in React Native and web projects for better type safety and maintainability.",
        badge: "MODERN STACK",
        icon: <SiTypescript className="text-blue-500" />,
      },
      {
        name: "Tailwind CSS",
        desc: "Utilized for fast and custom UI design in portfolio and product-based UIs.",
        badge: "UI TOOLKIT",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
    recent: [
      {
        name: "Tailwind CSS",
        desc: "Used in recent portfolio redesigns for rapid prototyping.",
        badge: "UI TOOLKIT",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "TypeScript",
        desc: "Use TypeScript regularly in both my professional React Native work and personal projects to maintain type safety and catch bugs early.",
        badge: "MODERN STACK",
        icon: <SiTypescript className="text-blue-500" />,
      },
    ],
    featured: [
      {
        name: "Tailwind CSS",
        desc: "Utilized for fast and custom UI design in portfolio and product-based UIs.",
        badge: "DESIGN TOOLKIT",
        icon: <SiTailwindcss className="text-sky-400 text-4xl" />,
        banner: "from-sky-400 via-blue-300 to-blue-500",
      },
      {
        name: "Next.js",
        desc: "Built my portfolio using it to ensure good SEO and fast load times.",
        badge: "FULLSTACK",
        icon: <SiNextdotjs className="text-black text-4xl" />,
        banner: "from-neutral-800 via-gray-900 to-black",
      },
    ],
    learning: [
      {
        name: "Next.js",
        desc: "Exploring for advanced server-side rendering and API routes.",
        badge: "FRAMEWORK",
        icon: <SiNextdotjs className="text-black" />,
      },
      {
        name: "Framer Motion",
        desc: "Used for animations and smooth transitions in this portfolio.",
        badge: "ANIMATION",
        icon: <SiFramer className="text-pink-400" />,
      },
    ],
  },

  Backend: {
    skills: [
      {
        name: "Node.js",
        desc: "Built backend services and REST APIs for full-stack apps using Express.",
        badge: "Backend Favorite",
        icon: <FaNodeJs className="text-green-500" />,
      },
      {
        name: "Express.js",
        desc: "Used with Node.js to create RESTful APIs and middleware for projects.",
        badge: "FULL-STACK",
        icon: <FaServer className="text-gray-300" />,
      },
      {
        name: "Python",
        desc: "Used for AI/ML projects, scripting, and solving 550+ LeetCode DSA problems.",
        badge: "VERSATILE & POPULAR",
        icon: <FaPython className="text-blue-400" />,
      },
    ],
    recent: [
      {
        name: "Node.js",
        desc: "Used recently in full-stack project with MongoDB and Firebase integration.",
        badge: "Backend Favorite",
        icon: <FaNodeJs className="text-green-500" />,
      },
    ],
    featured: [
      {
        name: "Node.js",
        desc: "Efficient backend runtime used in scalable full-stack projects.",
        badge: "Backend Favorite",
        icon: <FaNodeJs className="text-green-500 text-4xl" />,
        banner: "from-green-400 via-emerald-500 to-green-600",
      },
    ],
    learning: [
      {
        name: "Redis",
        desc: "Exploring for caching strategies and session storage while learning URL shortening",
        badge: "CACHE",
        icon: <SiRedis className="text-red-500" />,
      },
    ],
  },

  Database: {
    skills: [
      {
        name: "MongoDB",
        desc: "Used as NoSQL database for full-stack project with Mongoose ORM.",
        badge: "FLEXIBLE STORAGE",
        icon: <SiMongodb className="text-green-600" />,
      },
      {
        name: "Firestore",
        desc: "Integrated with Firebase for real-time database syncing in react native based app and client web sites.",
        badge: "REAL-TIME DB",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "RealmDB",
        desc: "Used for offline-first local storage in React Native projects.",
        badge: "LOCAL SYNC",
        icon: <SiRealm className="text-indigo-500" />,
      },
      {
        name: "MySQL",
        desc: "Used in Spring Boot projects during internship to store structured data.",
        badge: "TRUSTED DB",
        icon: <SiMysql className="text-blue-500" />,
      },
      {
        name: "SQL",
        desc: "Proficient in writing complex queries for relational data analysis.",
        badge: "DATA ACCESS",
        icon: <FaDatabase className="text-purple-400" />,
      },
    ],
    recent: [
      {
        name: "RealmDB",
        desc: "Recently used for persistent storage in mobile app(SlayDay) built with Expo.",
        badge: "LOCAL SYNC",
        icon: <SiRealm className="text-indigo-500" />,
      },
    ],
    featured: [
      {
        name: "Firestore",
        desc: "Used for live syncing and user authentication data in mobile apps.",
        badge: "REALTIME DB",
        icon: <SiFirebase className="text-orange-500 text-4xl" />,
        banner: "from-yellow-300 via-orange-400 to-red-500",
      },
    ],
    learning: [],
  },

  Tools: {
    skills: [
      {
        name: "Firebase",
        desc: "Implemented user auth, analytics, and database in mobile/web apps.",
        badge: "CLOUD",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "Git",
        desc: "Used for version control and collaborative development across teams.",
        badge: "CONTROL",
        icon: <FaGitAlt className="text-orange-400" />,
      },
      {
        name: "Postman",
        desc: "Used for API testing, debugging, and sharing during backend development.",
        badge: "TESTING",
        icon: <SiPostman className="text-orange-300" />,
      },
      {
        name: "Vercel",
        desc: "Deployed portfolio with seamless CI/CD workflows.",
        badge: "DEPLOY",
        icon: <SiVercel className="text-black" />,
      },
    ],
    recent: [],
    featured: [
      {
        name: "Firebase",
        desc: "Used for user authentication, real-time DB, and hosting.",
        badge: "CLOUD",
        icon: <SiFirebase className="text-yellow-400 text-4xl" />,
        banner: "from-yellow-300 via-orange-400 to-amber-500",
      },
    ],
    learning: [
      {
        name: "Postman",
        desc: "Exploring advanced API test automation with collections.",
        badge: "TESTING",
        icon: <SiPostman className="text-orange-300" />,
      },
    ],
  },

  "Mobile Development": {
    skills: [
      {
        name: "React Native",
        desc: "Built Arilo (AI memory companion on Google Play), animated cross-platform components, and production mobile apps with charts and Firebase.",
        badge: "MOBILE DEV",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Expo",
        desc: "Used in Arilo and other apps to streamline React Native development, OTA updates, and builds.",
        badge: "MOBILE",
        icon: <SiExpo className="text-black" />,
      },
      {
        name: "Redux Toolkit",
        desc: "State management in Arilo — slices for notes, tasks, deep query, mood, and user preferences with typed hooks.",
        badge: "STATE MGMT",
        icon: <SiRedux className="text-purple-500" />,
      },
      {
        name: "Expo Router",
        desc: "File-based navigation in Arilo with typed routes, tab layouts, and nested stacks via expo-router.",
        badge: "NAVIGATION",
        icon: <SiExpo className="text-black" />,
      },
      {
        name: "React Native Reanimated",
        desc: "Fluid animations and gesture-driven UI in Arilo — tab transitions, modals, and interactive components.",
        badge: "ANIMATION",
        icon: <SiFramer className="text-pink-400" />,
      },
      {
        name: "NativeWind",
        desc: "Utility-first styling in Arilo for consistent theming, dark/light modes, and rapid UI iteration.",
        badge: "UTILITY STYLE",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
    recent: [
      {
        name: "Redux Toolkit",
        desc: "Recently used in Arilo for modular slice-based state across notes, tasks, and AI chat.",
        badge: "STATE MGMT",
        icon: <SiRedux className="text-purple-500" />,
      },
      {
        name: "Expo Router",
        desc: "File-based routing in Arilo with tab navigation and typed routes.",
        badge: "NAVIGATION",
        icon: <SiExpo className="text-black" />,
      },
    ],
    featured: [
      {
        name: "React Native",
        desc: "Shipped Arilo on Google Play — AI memory companion with voice capture, Deep Query, and persona analysis.",
        badge: "MOBILE DEV",
        icon: <FaReact className="text-cyan-400 text-4xl" />,
        banner: "from-violet-400 via-purple-500 to-indigo-500",
      },
    ],
    learning: [],
  },

  All: {
    skills: [
      {
        name: "React Native",
        desc: "Built Arilo (AI memory companion on Google Play), animated cross-platform components, and production mobile apps.",
        badge: "MOBILE DEV",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Expo",
        desc: "Used in Arilo and other apps to streamline React Native development, updates, and builds.",
        badge: "MOBILE",
        icon: <SiExpo className="text-black" />,
      },
      {
        name: "Redux Toolkit",
        desc: "State management in Arilo — slices for notes, tasks, deep query, mood, and user preferences.",
        badge: "STATE MGMT",
        icon: <SiRedux className="text-purple-500" />,
      },
      {
        name: "Expo Router",
        desc: "File-based navigation in Arilo with typed routes, tab layouts, and nested stacks.",
        badge: "NAVIGATION",
        icon: <SiExpo className="text-black" />,
      },
      {
        name: "React Native Reanimated",
        desc: "Fluid animations and gesture-driven UI in Arilo — tab transitions, modals, and interactive components.",
        badge: "ANIMATION",
        icon: <SiFramer className="text-pink-400" />,
      },
      {
        name: "Python",
        desc: "Used for AI/ML projects, scripting, and solving 550+ LeetCode DSA problems.",
        badge: "VERSATILE & POPULAR",
        icon: <FaPython className="text-blue-400" />,
      },
      {
        name: "React.js",
        desc: "Used to build interactive UIs in web projects and dashboards using reusable components.",
        badge: "TOP SKILL",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Next.js",
        desc: "Built my portfolio using it to ensure good SEO and fast load times.",
        badge: "FULLSTACK",
        icon: <SiNextdotjs className="text-black text-4xl" />,
      },
      {
        name: "TypeScript",
        desc: "Use TypeScript regularly in both my professional React Native work and personal projects to maintain type safety and catch bugs early.",
        badge: "MODERN STACK",
        icon: <SiTypescript className="text-blue-500" />,
      },
      {
        name: "Tailwind CSS",
        desc: "Utilized for fast and custom UI design in portfolio and product-based UIs.",
        badge: "UI TOOLKIT",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "NativeWind",
        desc: "Utility-first styling in Arilo for consistent theming, dark/light modes, and rapid UI iteration.",
        badge: "UTILITY STYLE",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "HTML5 & CSS3",
        desc: "Built responsive layouts and semantic markup for client websites and projects.",
        badge: "CORE WEB",
        icon: <FaHtml5 className="text-orange-500" />,
      },
      {
        name: "JavaScript",
        desc: "Used in React Native and web projects, including state and DOM manipulation.",
        badge: "Most Used",
        icon: <FaJs className="text-yellow-300" />,
      },
      {
        name: "Bootstrap",
        desc: "Used for responsive design during internships and personal projects.",
        badge: "UI TOOLKIT",
        icon: <BsBootstrap className="text-indigo-400" />,
      },
      {
        name: "Node.js",
        desc: "Built backend services and REST APIs for full-stack apps using Express.",
        badge: "Backend Favorite",
        icon: <FaNodeJs className="text-green-500" />,
      },
      {
        name: "Firestore",
        desc: "Integrated with Firebase for real-time database syncing in react native based app and client web sites.",
        badge: "REAL-TIME DB",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "RealmDB",
        desc: "Used for offline-first local storage in React Native projects.",
        badge: "LOCAL SYNC",
        icon: <SiRealm className="text-indigo-500" />,
      },
      {
        name: "Firebase",
        desc: "Implemented user auth, analytics, and database in mobile/web apps.",
        badge: "CLOUD",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "Vercel",
        desc: "Deployed portfolio with seamless CI/CD workflows.",
        badge: "DEPLOY",
        icon: <SiVercel className="text-black" />,
      },
      {
        name: "MongoDB",
        desc: "Used as NoSQL database for full-stack project with Mongoose ORM.",
        badge: "FLEXIBLE STORAGE",
        icon: <SiMongodb className="text-green-600" />,
      },
      {
        name: "MySQL",
        desc: "Used in Spring Boot projects during internship to store structured data.",
        badge: "TRUSTED DB",
        icon: <SiMysql className="text-blue-500" />,
      },
      {
        name: "SQL",
        desc: "Proficient in writing complex queries for relational data analysis.",
        badge: "DATA ACCESS",
        icon: <FaDatabase className="text-purple-400" />,
      },
      {
        name: "Git",
        desc: "Used for version control and collaborative development across teams.",
        badge: "CONTROL",
        icon: <FaGitAlt className="text-orange-400" />,
      },
      {
        name: "Postman",
        desc: "Used for API testing, debugging, and sharing during backend development.",
        badge: "TESTING",
        icon: <SiPostman className="text-orange-300" />,
      },
      {
        name: "Express.js",
        desc: "Used with Node.js to create RESTful APIs and middleware for projects.",
        badge: "FULL-STACK",
        icon: <FaServer className="text-gray-300" />,
      },
    ],

    recent: [
      {
        name: "Redux Toolkit",
        desc: "Recently used in Arilo for modular slice-based state across notes, tasks, and AI chat.",
        badge: "STATE MGMT",
        icon: <SiRedux className="text-purple-500" />,
      },
      {
        name: "TypeScript",
        desc: "Actively used in Arilo and React Native codebases for type safety and bug prevention.",
        badge: "MODERN STACK",
        icon: <SiTypescript className="text-blue-500" />,
      },
      {
        name: "Node.js",
        desc: "Used recently in full-stack project with MongoDB and Firebase integration.",
        badge: "Backend Favorite",
        icon: <FaNodeJs className="text-green-500" />,
      },
      {
        name: "RealmDB",
        desc: "Recently used for persistent storage in mobile app(SlayDay) built with Expo.",
        badge: "LOCAL SYNC",
        icon: <SiRealm className="text-indigo-500" />,
      },
    ],

    featured: [
      {
        name: "MERN Stack",
        desc: "Full-stack JavaScript development using MongoDB, Express, React, and Node.js.",
        badge: "Web Favorite",
        icon: <FaCode className="text-green-400 text-4xl" />,
        banner: "from-green-400 via-green-500 to-green-600",
        image: mernStack,
      },
      {
        name: "React Native",
        desc: "Shipped Arilo on Google Play — AI memory companion with voice capture, Deep Query, and persona analysis.",
        badge: "Mobile Favorite",
        icon: <FaMobileAlt className="text-blue-400 text-4xl" />,
        banner: "from-violet-400 via-purple-500 to-indigo-500",
        image: reactNative,
      },
    ],

    learning: [
      {
        name: "Next.js",
        desc: "Exploring for advanced server-side rendering and API routes.",
        badge: "FRAMEWORK",
        icon: <SiNextdotjs className="text-black" />,
      },
      {
        name: "Framer Motion",
        desc: "Used for animations and smooth transitions in this portfolio.",
        badge: "ANIMATION",
        icon: <SiFramer className="text-pink-400" />,
      },
      {
        name: "Redis",
        desc: "Exploring for caching strategies and session storage while learning URL shortening",
        badge: "CACHE",
        icon: <SiRedis className="text-red-500" />,
      },
      {
        name: "Postman",
        desc: "Exploring advanced API test automation with collections.",
        badge: "TESTING",
        icon: <SiPostman className="text-orange-300" />,
      },
    ],
  },
};

export default skillsData;
