/**
 * Builds a contextual "chain of reasoning" shown while the chatbot prepares
 * an answer. Steps are derived from the user's question — no extra LLM call.
 */

const BASE_STEPS = [
  "Understanding your question",
  "Searching Suyash's portfolio profile",
] as const;

const TOPIC_PATTERNS: { pattern: RegExp; step: string }[] = [
  {
    pattern: /\b(ai|llm|gemini|langgraph|agent|mcp|claude|machine learning)\b/i,
    step: "Extracting AI & LLM experience",
  },
  {
    pattern: /\b(backend|api|node|distributed|mongo|pub\/sub|microservice|devops|docker|ci\/?cd|gcp|cloud)\b/i,
    step: "Extracting backend & cloud experience",
  },
  {
    pattern: /\b(mobile|react native|expo|ios|android|fastlane|eas)\b/i,
    step: "Extracting mobile engineering experience",
  },
  {
    pattern: /\b(frontend|react|next\.?js|ui|ux|web|tailwind|mui)\b/i,
    step: "Extracting frontend experience",
  },
  {
    pattern: /\b(security|auth|jwt|okta|sso|oauth|recaptcha)\b/i,
    step: "Extracting security & identity experience",
  },
  {
    pattern: /\b(certif|gcp certified|anthropic|credential)\b/i,
    step: "Extracting certifications",
  },
  {
    pattern: /\b(project|creditup|superapp|portfolio|built|app)\b/i,
    step: "Reviewing featured projects",
  },
  {
    pattern: /\b(experience|work|job|career|searce|employ|role|intern)\b/i,
    step: "Reviewing work experience",
  },
  {
    pattern: /\b(skill|tech stack|stack|technolog|tooling)\b/i,
    step: "Mapping skills & technologies",
  },
  {
    pattern: /\b(educat|degree|college|daiict|b\.?tech)\b/i,
    step: "Reviewing education background",
  },
  {
    pattern: /\b(contact|reach|email|linkedin|hire|connect)\b/i,
    step: "Finding contact details",
  },
];

export function buildReasoningChain(question: string): string[] {
  const steps: string[] = [...BASE_STEPS];

  for (const { pattern, step } of TOPIC_PATTERNS) {
    if (pattern.test(question) && !steps.includes(step)) {
      steps.push(step);
    }
  }

  steps.push("Cross-checking facts against profile");
  steps.push("Composing answer");

  return steps;
}
