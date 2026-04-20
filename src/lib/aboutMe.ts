/**
 * Knowledge base used by the "Ask me anything" AI search bar.
 *
 * This is the ONLY source of truth the LLM is allowed to use when answering
 * questions about Suyash. Keep it factual and concise — every extra line is
 * extra context (and extra tokens) for the model.
 *
 * Feel free to edit / extend this file as your portfolio evolves.
 */

export const ABOUT_ME = `
# Suyash Bhagat — Profile

## Snapshot
- Full name: Suyash Bhagat
- Role: Software Engineer (Full-stack + Mobile)
- Current employer: Searce Inc. — Software Engineer (July 2025 – Present)
- Previous role: Software Engineer Intern at Searce Inc. (Jan 2025 – June 2025)
- Experience: 2+ years contributing to a low-code product's core codebase,
  combining full-stack and mobile expertise to solve real-world challenges.
- Location: Kanpur, Uttar Pradesh, India (open to remote / relocation).
- Education: B.Tech in Computer Science, DAIICT Gandhinagar (2021 – 2025).
- Resume: https://drive.google.com/file/d/1VV3aaI0PigYiPG0z3xZfEBHy0XFXyQNT/view?usp=sharing

## What I do
I design and develop meaningful digital experiences that blend creativity
with functionality. Day-to-day I build responsive mobile and web interfaces
using React Native, React.js and modern JavaScript / TypeScript frameworks,
and I'm equally comfortable dipping into backend services, APIs and
databases when a feature needs it.

## Core strengths
- Mobile: React Native, Expo, native bridging, offline-first apps (Realm).
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion.
- Backend: Node.js, Express, REST APIs, authentication flows.
- Databases: MongoDB, MySQL, PostgreSQL, Redis, Firebase.
- Tooling: Git, Postman, Vercel, low-code platform engineering.
- Design sense: I care about UX, micro-interactions and visual polish.

## Currently learning / exploring
System design at scale, advanced animations, 3D / TouchDesigner-style
visualisations, and AI-assisted developer tooling.

## Featured projects
1. CreditUp — React Native + TypeScript + Node.js + PostgreSQL.
   A credit-card discovery and eligibility app with smart recommendations,
   card comparison, spending profiler, credit booster and OTP auth.
2. Network SuperApp — React Native + TypeScript + Expo + MongoDB.
   A mobile super-app combining multiple networking-focused features.
3. SmartIconsKit — a published icon kit / design-system utility.
4. FeatureDeck — a feature-showcase / pitch tool.
5. HackDefense — a security-focused project.
6. SlayDay (Arilo) — React Native + TypeScript + Firebase.

## Beyond code
- Music fanatic — loves creating new dimensions in music.
- Enjoys designing and experimenting with 3D / visualisation tools like
  TouchDesigner.
- Listens to finance podcasts and audiobooks.
- Driven by flavors, movement, and journeys with meaning.

## How to reach me
- Portfolio: this website.
- Socials (LinkedIn, GitHub, X/Twitter, email) are linked in the Contact
  section at the bottom of the page.
- Twitter handle: @Suyashh49

## Tone
Friendly, curious, pragmatic. Open to collaborations, interesting product
problems, and conversations about design-meets-engineering.
`;

/**
 * Short one-liner shown as a fallback when the model can't answer.
 */
export const FALLBACK_ANSWER =
  "I don't have that info on Suyash's portfolio yet. Try asking about his experience, projects, skills, education, or how to contact him.";

/**
 * Suggested prompts shown under the search bar.
 */
export const SUGGESTED_QUESTIONS: string[] = [
  "What's Suyash's experience?",
  "Which tech stack does he use?",
  "Tell me about his projects",
  "How can I contact him?",
];
