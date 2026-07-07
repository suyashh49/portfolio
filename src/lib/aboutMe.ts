/**
 * Knowledge base used by the "Ask me anything" AI search bar.
 *
 * This is the ONLY source of truth the LLM is allowed to use when answering
 * questions about Suyash. Keep it factual and concise — every extra line is
 * extra context (and extra tokens) for the model.
 */

export const ABOUT_ME = `
# Suyash Bhagat — Profile

## Snapshot
- Full name: Suyash Bhagat
- Role: Software Engineer (Full-stack, Mobile, Backend, DevOps, AI tooling)
- Current employer: Searce Inc. — Software Engineer (July 2025 – Present)
- Previous role: Software Engineer Intern at Searce Inc. (Jan 2025 – June 2025)
- Experience: 2+ years designing and operating production systems — distributed
  backends, cross-platform clients, DevOps pipelines, and LLM-powered tooling.
- Location: Kanpur, Uttar Pradesh, India (open to remote / relocation).
- Education: B.Tech in Computer Science, DAIICT Gandhinagar (2021 – 2025).
- Resume: https://drive.google.com/file/d/1VV3aaI0PigYiPG0z3xZfEBHy0XFXyQNT/view?usp=sharing

## What I bring
Equally comfortable designing an API contract, tuning a query, wiring
observability, shipping a UI, or orchestrating an LLM agent. Cares about clean
boundaries, durable tests, and operating software in production — not just
shipping it.

## Backend architecture & distributed systems
- Builds services in Node.js and TypeScript on Express with clean-architecture
  boundaries: controllers, services, adapters, domain models.
- Applies design patterns: Strategy, Factory, Adapter, Dependency Inversion —
  to keep business logic testable and infrastructure swappable.
- Data modeling with MongoDB + Mongoose: connection pooling, aggregation
  pipelines, request/response contracts via Yup schemas.
- Service-to-service: REST, Google Cloud Pub/Sub (async messaging), SFTP for
  enterprise integrations.
- Background work: cron-based workers and long-running jobs.
- Resilience: circuit breakers (Opossum), retries with backoff (axios-retry),
  idempotency keys, graceful-degradation under partial failure.

## Security, identity & API hardening
- Auth: JWT, Okta SSO (OIDC), Google SSO, bcrypt password hashing, Google
  reCAPTCHA Enterprise, OTP flows, role/permission models.
- Hardening: secret handling, env-driven config, CORS, input validation, rate
  limiting.
- CI security: Checkmarx SCA, Prisma image scanning.

## Front-end & mobile engineering
- Web: Next.js / React 18, MUI, Redux Toolkit + redux-persist, React Hook
  Form, SCSS/Tailwind, real-time UIs (Socket.IO), Chart.js, Google Maps
  (@vis.gl/react-google-maps).
- Mobile: React Native / Expo, expo-router, background location & task managers,
  camera/media pipelines, encrypted storage, jailbreak/root detection.
- Release automation: Fastlane and EAS.

## DevOps, CI/CD & quality
- Docker containerization; GitLab CI/CD with security scans, Kaniko image builds,
  artifact registries.
- Quality gates: ESLint, Prettier, Husky + lint-staged, SonarQube.
- Testing: Jest, ts-jest, Supertest, mongodb-memory-server, React Testing
  Library — coverage on business-critical paths over vanity metrics.

## Cloud & integrations
- Google Cloud Platform: Pub/Sub, Cloud Storage, reCAPTCHA Enterprise, IAM,
  GKE-targeted pipelines.
- Enterprise integrations: ERP/SAP-style SFTP exchanges, notification
  gateways, Google Maps Distance Matrix — correctness and auditability first.

## AI, LLMs & developer productivity
- Agentic code-generation with Google Gemini and LangGraph.
- Figma plugin tooling, prompt/retrieval pipelines.
- Clean-architecture applied to non-deterministic systems.
- Queueing (Redis/ioredis), persistence (Postgres), evaluation loops for
  reliable generations.

## Core strengths (summary)
- Mobile: React Native, Expo, native bridging, offline-first (Realm).
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion.
- Backend: Node.js, Express, REST APIs, authentication flows.
- Databases: MongoDB, MySQL, PostgreSQL, Redis, Firebase.
- Tooling: Git, Postman, Vercel, low-code platform engineering.
- Design sense: UX, micro-interactions, visual polish.

## Certifications
- Anthropic: Building with Claude API
- Anthropic: Introduction to Agent Skills
- Anthropic: Introduction to Model Context Protocol
- Anthropic: Claude Code in Action
- Google Cloud: GCP Certified Associate Cloud Engineer
  (Validation: 3b287785-0e57-4acd-bce7-606e384605bf)

## Currently learning / exploring
System design at scale, advanced animations, 3D / TouchDesigner-style
visualisations, and AI-assisted developer tooling.

## Featured projects
1. CreditUp — React Native + TypeScript + Node.js + PostgreSQL.
   Credit-card discovery and eligibility app with smart recommendations,
   card comparison, spending profiler, credit booster and OTP auth.
2. Network SuperApp — React Native + TypeScript + Expo + MongoDB.
   Mobile super-app combining multiple networking-focused features.
3. SmartIconsKit — published icon kit / design-system utility.
4. FeatureDeck — feature-showcase / pitch tool.
5. HackDefense — security-focused project.
6. SlayDay (Arilo) — React Native + TypeScript + Firebase.

## Beyond code
- Music fanatic — loves creating new dimensions in music.
- Enjoys designing and experimenting with 3D / visualisation tools like
  TouchDesigner.
- Listens to finance podcasts and audiobooks.
- Driven by flavors, movement, and journeys with meaning.

## How to reach me
- Portfolio: this website.
- Socials (LinkedIn, GitHub, X/Twitter, email) in the Contact section.
- Twitter handle: @Suyashh49

## Tone
Friendly, curious, pragmatic. Open to collaborations, interesting product
problems, and conversations about design-meets-engineering.
`;

export const FALLBACK_ANSWER =
  "I don't have that info on Suyash's portfolio yet. Try asking about his experience, skills, projects, certifications, education, or how to contact him.";

export const SUGGESTED_QUESTIONS: string[] = [
  "What's Suyash's backend experience?",
  "Which certifications does he have?",
  "Tell me about his AI/LLM work",
  "How can I contact him?",
];

/** Session storage key for persisting chat messages within a browser session. */
export const CHAT_STORAGE_KEY = "asksuyash-chat-messages";

/** Max user questions per browser session (client + server enforced). */
export const MAX_CHAT_TURNS_PER_SESSION = 12;

export function sessionTurnLimitMessage(
  max: number = MAX_CHAT_TURNS_PER_SESSION
): string {
  return `You've used all ${max} questions for this session. Tap "Clear chat" to start a new conversation.`;
}
