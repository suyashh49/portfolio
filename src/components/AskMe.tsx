"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, RefreshCw, Sparkles, X } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { SUGGESTED_QUESTIONS } from "@/src/lib/aboutMe";

const MAX_LENGTH = 500;

type Role = "user" | "assistant";
type Message = { id: string; role: Role; content: string; streaming?: boolean };

const AskMe: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const triggerInputRef = useRef<HTMLInputElement | null>(null);

  const openPanel = useCallback((prefill?: string) => {
    if (prefill !== undefined) setDraft(prefill);
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {/* Trigger bar sitting inside the hero card. Looks & feels like an
          input, but a single click opens the full chat panel. */}
      <div className="mt-6 w-full max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => openPanel()}
          aria-label="Open Ask Suyash chat"
          className="group w-full flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-left hover:border-white/40 hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <Sparkles className="w-5 h-5 text-white/70 shrink-0" aria-hidden />
          <input
            ref={triggerInputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_LENGTH))}
            onFocus={() => openPanel()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                openPanel(draft);
              }
            }}
            placeholder="Ask me anything about Suyash…"
            aria-label="Ask a question about Suyash"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/50 text-sm md:text-base"
          />
          <span className="hidden sm:flex items-center gap-1 text-[11px] text-white/50 border border-white/15 rounded-md px-1.5 py-0.5">
            ⌘K
          </span>
        </button>
        <p className="mt-2 text-[11px] text-white/50 text-center">
          Powered by Gemini · Based on my portfolio
        </p>
      </div>

      <AskMePanel open={open} onClose={closePanel} initialDraft={draft} />

      <CommandKListener onTrigger={() => openPanel()} />
    </>
  );
};

export default AskMe;

// ---------------------------------------------------------------------------
// ⌘K / Ctrl+K global shortcut
// ---------------------------------------------------------------------------

const CommandKListener: React.FC<{ onTrigger: () => void }> = ({
  onTrigger,
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onTrigger();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onTrigger]);
  return null;
};

// ---------------------------------------------------------------------------
// Floating chat panel
// ---------------------------------------------------------------------------

interface PanelProps {
  open: boolean;
  onClose: () => void;
  initialDraft: string;
}

const AskMePanel: React.FC<PanelProps> = ({ open, onClose, initialDraft }) => {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    // Lock page scroll.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus input and pre-fill if the user typed in the trigger.
    if (initialDraft) setInput(initialDraft);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, initialDraft]);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Autoscroll to the newest message.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, pending]);

  const ask = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q || pending) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: q,
      };
      // Build the history we send to the server from the already-persisted
      // messages (not including the one we're about to add — the server
      // receives `history` plus the current `question`).
      const history = messagesToHistory(messages);

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setErrorMsg("");
      setPending(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q, history }),
          signal: controller.signal,
        });
        const data = (await res.json()) as {
          answer?: string;
          error?: string;
        };

        if (!res.ok) {
          setErrorMsg(data.error || "Something went wrong. Please try again.");
          return;
        }

        const reply: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer || "",
          streaming: true,
        };
        setMessages((prev) => [...prev, reply]);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setErrorMsg("Network error. Please try again.");
      } finally {
        setPending(false);
      }
    },
    [messages, pending]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask(input);
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setErrorMsg("");
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const empty = messages.length === 0 && !pending && !errorMsg;

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Ask Suyash chat"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative w-full sm:max-w-2xl h-[85vh] sm:h-[78vh] max-h-[780px] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/15 bg-gray-900/95 shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </span>
                <h3 className="text-white font-medium text-sm md:text-base">
                  Ask Suyash
                </h3>
                <span className="text-[11px] text-white/40">· AI assistant</span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    aria-label="Start a new chat"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
                    title="New chat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close chat"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Scrollable thread */}
            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 scroll-smooth"
            >
              {empty && (
                <EmptyState onPick={(q) => ask(q)} />
              )}

              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {pending && <ThinkingBubble />}

              {errorMsg && (
                <div className="mx-auto max-w-[80%] text-xs text-red-200 bg-red-500/10 border border-red-400/20 rounded-xl px-3 py-2 text-center">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-white/[0.03] px-4 sm:px-6 py-3"
            >
              <div
                className={`flex items-end gap-2 rounded-2xl border px-3 py-2 transition
                  ${
                    pending
                      ? "border-white/40"
                      : "border-white/15 focus-within:border-white/50"
                  }`}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value.slice(0, MAX_LENGTH))
                  }
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask a follow-up…"
                  aria-label="Type your question"
                  maxLength={MAX_LENGTH}
                  className="flex-1 resize-none bg-transparent outline-none text-white placeholder-white/45 text-sm md:text-base leading-6 max-h-36 py-1"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || pending}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Send question"
                  className="shrink-0 w-9 h-9 rounded-full bg-white text-gray-900 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  {pending ? (
                    <span
                      className="w-3.5 h-3.5 border-2 border-gray-900/40 border-t-gray-900 rounded-full animate-spin"
                      aria-hidden
                    />
                  ) : (
                    <ArrowUp className="w-4 h-4" aria-hidden />
                  )}
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] text-white/40">
                <span>Enter to send · Shift+Enter for newline</span>
                <span>
                  {input.length}/{MAX_LENGTH}
                </span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
};

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

const EmptyState: React.FC<{ onPick: (q: string) => void }> = ({ onPick }) => (
  <div className="h-full flex flex-col items-center justify-center text-center py-10">
    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center mb-4">
      <Sparkles className="w-5 h-5 text-white/80" aria-hidden />
    </div>
    <h4 className="text-white text-lg md:text-xl font-heading">
      Ask me anything about Suyash
    </h4>
    <p className="text-white/50 text-sm mt-1 max-w-xs">
      Experience, tech stack, projects, education, or how to get in touch.
    </p>
    <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md">
      {SUGGESTED_QUESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white transition"
        >
          {s}
        </button>
      ))}
    </div>
  </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white text-gray-900 text-sm md:text-base leading-relaxed px-3.5 py-2 shadow-sm">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="flex justify-start gap-2.5"
    >
      <div className="mt-1 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/5 border border-white/10 text-white/90 text-sm md:text-base leading-relaxed px-3.5 py-2">
        {message.streaming ? (
          <Typewriter text={message.content} />
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
      </div>
    </motion.div>
  );
};

const ThinkingBubble = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start gap-2.5"
    role="status"
    aria-label="Thinking"
  >
    <div className="mt-1 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center shrink-0">
      <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden />
    </div>
    <div className="rounded-2xl rounded-bl-sm bg-white/5 border border-white/10 px-3.5 py-2.5 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/70"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
  const [shown, setShown] = useState("");
  const chunk = useMemo(
    () => Math.max(1, Math.ceil((text?.length || 0) / 200)),
    [text]
  );

  useEffect(() => {
    setShown("");
    if (!text) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + chunk);
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [text, chunk]);

  const done = shown.length >= text.length;
  return (
    <span className="whitespace-pre-wrap">
      {shown}
      {!done && (
        <span
          className="inline-block w-[2px] h-[1em] align-[-0.15em] ml-0.5 bg-white/80 animate-pulse"
          aria-hidden
        />
      )}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Converts the UI's message list to the history shape the API expects.
 * Server side roles are `user` / `model` (Gemini convention).
 */
function messagesToHistory(
  messages: Message[]
): { role: "user" | "model"; content: string }[] {
  return messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    content: m.content,
  }));
}
