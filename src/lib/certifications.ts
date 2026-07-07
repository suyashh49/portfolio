export type Certification = {
  issuer: string;
  title: string;
  validationNumber?: string;
  badge?: "anthropic" | "gcp";
};

export const CERTIFICATIONS: Certification[] = [
  {
    issuer: "Anthropic",
    title: "Building with Claude API",
    badge: "anthropic",
  },
  {
    issuer: "Anthropic",
    title: "Introduction to Agent Skills",
    badge: "anthropic",
  },
  {
    issuer: "Anthropic",
    title: "Introduction to Model Context Protocol",
    badge: "anthropic",
  },
  {
    issuer: "Anthropic",
    title: "Claude Code in Action",
    badge: "anthropic",
  },
  {
    issuer: "Google Cloud",
    title: "GCP Certified Associate Cloud Engineer",
    validationNumber: "3b287785-0e57-4acd-bce7-606e384605bf",
    badge: "gcp",
  },
];
