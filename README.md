# Suyash Bhagat — Developer Portfolio

Hi! I'm **Suyash Bhagat**, a Software Engineer based in Kanpur, India. This is
the source of my personal portfolio — a single-page site built with Next.js
that showcases my work, experience, and the tools I love building with.

Have a question about me? Just ask. The landing page includes an
**"Ask Suyash"** AI chat — a ChatGPT-style assistant grounded in this portfolio
and powered by Google Gemini. It answers visitors' questions about my
experience, projects, skills and how to reach me.

---

## ✨ Highlights

- Interactive landing page with animated, 3D-tilting hero card
- **AskSuyash** — Gemini-backed AI chat with multi-turn conversations,
  guardrails, rate limiting and prompt-injection protection
- Mac-style "Skills Store" for browsing my stack by category
- Detailed project case studies (CreditUp, Network SuperApp, and more)
- Fully responsive, accessible, and theme-consistent animations throughout

## 🧱 Tech stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion, Lottie
- **AI:** Google Gemini via `@google/generative-ai`
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# then open .env.local and paste your Gemini API key

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Name                  | Required | Description                                                                      |
| --------------------- | -------- | -------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`      | Yes      | Google Gemini API key. Get one at <https://aistudio.google.com/app/apikey>.      |
| `GEMINI_MODEL`        | No       | Override the default model (`gemini-2.0-flash`).                                 |
| `NEXT_PUBLIC_SITE_URL`| No       | Canonical site URL used for SEO / Open Graph metadata.                           |

`.env.local` is gitignored — your key never reaches the client bundle because
the Gemini call lives in a server-only route (`src/app/api/chat/route.ts`).

## 🛡 AskSuyash guardrails

The AI chat is wired defensively:

- Server-side only API key (never shipped to the browser)
- System prompt grounds every answer in a curated profile file
  (`src/lib/aboutMe.ts`) — no hallucinated facts, no off-topic replies
- Gemini safety settings set to `BLOCK_MEDIUM_AND_ABOVE` across all four
  harm categories
- Heuristic prompt-injection filter for jailbreak / role-override attempts
- Per-IP rate limiting (15 requests / minute)
- Hard length caps on questions and history turns
- Plain-text enforcement (no raw markdown bleeding into the UI)

## 📁 Project structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts     # AskSuyash server route (Gemini + guardrails)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AskMe.tsx             # AI chat trigger + modal panel
│   │   ├── sections/             # Landing, About, Projects, Skills, Contact...
│   │   └── ...
│   ├── lib/
│   │   ├── aboutMe.ts            # Knowledge base the AI is grounded in
│   │   ├── colors.ts
│   │   └── skills.tsx
│   └── assets/
├── public/
└── package.json
```

## 🚢 Deployment (Vercel)

1. Push to GitHub → import the repo in Vercel.
2. In **Project → Settings → Environment Variables** add `GEMINI_API_KEY`
   (and optionally `GEMINI_MODEL`, `NEXT_PUBLIC_SITE_URL`) for **Production**,
   **Preview** and **Development**.
3. Redeploy once so the new variables take effect.
4. (Recommended) Lock the Gemini key to your Vercel domain in Google AI
   Studio and set a usage quota.

## 📜 Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack). |
| `npm run build` | Create a production build.        |
| `npm run start` | Serve the production build.       |
| `npm run lint`  | Run ESLint.                       |

## 🙋‍♂️ Get in touch

- Portfolio: <https://suyashbhagat.vercel.app>
- Twitter / X: [@Suyashh49](https://twitter.com/Suyashh49)
- Or use the **Contact** section on the live site.

If this project inspired you or taught you something, a ⭐ on GitHub means a
lot. Thanks for stopping by!
