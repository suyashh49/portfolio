"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkles, Trash2, X } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  CHAT_STORAGE_KEY,
  MAX_CHAT_TURNS_PER_SESSION,
  sessionTurnLimitMessage,
  SUGGESTED_QUESTIONS,
} from "@/src/lib/aboutMe";
import { buildReasoningChain } from "@/src/lib/chatReasoning";

const MAX_LENGTH = 500;

type Role = "user" | "assistant";
type Message = {
  id: string;
  role: Role;
  content: string;
  streaming?: boolean;
  reasoningSteps?: string[];
  reasoningStep?: number;
};

type StoredMessage = { role: Role; content: string };

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
  const [streaming, setStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (!raw) return;
      const stored = JSON.parse(raw) as StoredMessage[];
      if (!Array.isArray(stored)) return;
      setMessages(
        stored.map((m) => ({
          id: crypto.randomUUID(),
          role: m.role,
          content: m.content,
        }))
      );
    } catch {
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const toStore: StoredMessage[] = messages
      .filter((m) => !m.streaming && m.content.trim())
      .map((m) => ({ role: m.role, content: m.content }));
    if (toStore.length === 0) {
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } else {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (initialDraft) setInput(initialDraft);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, initialDraft]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: streaming ? "auto" : "smooth" });
  }, [messages, pending, streaming]);

  const stopStepTimer = useCallback(() => {
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  }, []);

  const startStepTimer = useCallback(
    (assistantId: string) => {
      stopStepTimer();
      stepTimerRef.current = setInterval(() => {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== assistantId || !m.reasoningSteps?.length || m.content) {
              return m;
            }
            const current = m.reasoningStep ?? 0;
            const next = Math.min(current + 1, m.reasoningSteps.length - 1);
            return { ...m, reasoningStep: next };
          })
        );
      }, 420);
    },
    [stopStepTimer]
  );

  const consumeSseStream = useCallback(
    async (
      body: ReadableStream<Uint8Array>,
      assistantId: string,
      signal: AbortSignal
    ) => {
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let pendingText = "";
      let rafId = 0;

      const flushText = () => {
        rafId = 0;
        if (!pendingText) return;
        const chunk = pendingText;
        pendingText = "";
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== assistantId) return m;
            return {
              ...m,
              content: m.content + chunk,
              reasoningSteps: undefined,
              reasoningStep: undefined,
            };
          })
        );
      };

      const queueText = (text: string) => {
        pendingText += text;
        if (!rafId) {
          rafId = requestAnimationFrame(flushText);
        }
      };

      while (true) {
        if (signal.aborted) {
          if (rafId) cancelAnimationFrame(rafId);
          await reader.cancel();
          return;
        }

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;

          let payload: {
            text?: string;
            done?: boolean;
            error?: string;
            replace?: boolean;
            status?: string;
            step?: number;
            total?: number;
          };
          try {
            payload = JSON.parse(line.slice(5).trim());
          } catch {
            continue;
          }

          if (payload.error) {
            if (rafId) cancelAnimationFrame(rafId);
            setErrorMsg(payload.error);
            setMessages((prev) => prev.filter((m) => m.id !== assistantId));
            return;
          }

          if (payload.status) {
            setMessages((prev) =>
              prev.map((m) => {
                if (m.id !== assistantId || m.content) return m;
                return {
                  ...m,
                  reasoningStep:
                    typeof payload.step === "number"
                      ? payload.step
                      : m.reasoningStep,
                };
              })
            );
          }

          if (payload.text) {
            stopStepTimer();
            if (payload.replace) {
              if (rafId) cancelAnimationFrame(rafId);
              pendingText = "";
              setMessages((prev) =>
                prev.map((m) => {
                  if (m.id !== assistantId) return m;
                  return {
                    ...m,
                    content: payload.text!,
                    reasoningSteps: undefined,
                    reasoningStep: undefined,
                  };
                })
              );
            } else {
              queueText(payload.text);
            }
          }

          if (payload.done) {
            if (rafId) cancelAnimationFrame(rafId);
            flushText();
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      streaming: false,
                      reasoningSteps: undefined,
                      reasoningStep: undefined,
                    }
                  : m
              )
            );
          }
        }
      }

      if (rafId) cancelAnimationFrame(rafId);
      flushText();
    },
    [stopStepTimer]
  );

  const ask = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q || pending || streaming) return;

      const userTurnCount = messages.filter((m) => m.role === "user").length;
      if (userTurnCount >= MAX_CHAT_TURNS_PER_SESSION) {
        setErrorMsg(sessionTurnLimitMessage());
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: q,
      };
      const history = messagesToHistory(messages);
      const reasoningSteps = buildReasoningChain(q);
      const assistantId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          streaming: true,
          reasoningSteps,
          reasoningStep: 0,
        },
      ]);
      setInput("");
      setErrorMsg("");
      setPending(false);
      setStreaming(true);
      startStepTimer(assistantId);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q, history }),
          signal: controller.signal,
        });

        const contentType = res.headers.get("content-type") ?? "";

        if (!res.ok) {
          stopStepTimer();
          const data = (await res.json()) as { error?: string; answer?: string };
          if (data.answer) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      content: data.answer!,
                      streaming: false,
                      reasoningSteps: undefined,
                      reasoningStep: undefined,
                    }
                  : m
              )
            );
          } else {
            setErrorMsg(data.error || "Something went wrong. Please try again.");
            setMessages((prev) =>
              prev.filter((m) => m.id !== assistantId && m.id !== userMsg.id)
            );
          }
          return;
        }

        if (!contentType.includes("text/event-stream") || !res.body) {
          stopStepTimer();
          const data = (await res.json()) as { answer?: string };
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: data.answer || "",
                    streaming: false,
                    reasoningSteps: undefined,
                    reasoningStep: undefined,
                  }
                : m
            )
          );
          return;
        }

        await consumeSseStream(res.body, assistantId, controller.signal);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setErrorMsg("Network error. Please try again.");
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      } finally {
        stopStepTimer();
        setPending(false);
        setStreaming(false);
      }
    },
    [messages, pending, streaming, consumeSseStream, startStepTimer, stopStepTimer]
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
    stopStepTimer();
    setMessages([]);
    setErrorMsg("");
    setInput("");
    setPending(false);
    setStreaming(false);
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const busy = pending || streaming;
  const empty = messages.length === 0 && !busy && !errorMsg;
  const hasContext = messages.length > 0;
  const userTurnCount = messages.filter((m) => m.role === "user").length;
  const turnsRemaining = Math.max(0, MAX_CHAT_TURNS_PER_SESSION - userTurnCount);
  const sessionLimitReached = userTurnCount >= MAX_CHAT_TURNS_PER_SESSION;

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
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative w-full sm:max-w-2xl h-[85vh] sm:h-[78vh] max-h-[780px] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/15 bg-gray-900/95 shadow-2xl"
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex w-2.5 h-2.5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </span>
                <h3 className="text-white font-medium text-sm md:text-base truncate">
                  Ask Suyash
                </h3>
                <span className="text-[11px] text-white/40 hidden sm:inline">
                  · AI assistant
                </span>
                {hasContext && (
                  <span
                    className={`text-[10px] rounded-full px-2 py-0.5 hidden sm:inline border ${
                      sessionLimitReached
                        ? "text-amber-200/90 bg-amber-400/10 border-amber-400/25"
                        : "text-emerald-300/80 bg-emerald-400/10 border-emerald-400/20"
                    }`}
                  >
                    {sessionLimitReached
                      ? "Session limit reached"
                      : `${turnsRemaining} question${turnsRemaining === 1 ? "" : "s"} left`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {hasContext && (
                  <button
                    type="button"
                    onClick={clearChat}
                    disabled={busy}
                    aria-label="Clear chat and conversation context"
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] sm:text-xs text-white/70 hover:text-white hover:bg-red-500/15 border border-transparent hover:border-red-400/25 transition disabled:opacity-40"
                    title="Clear chat"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden />
                    <span className="hidden xs:inline sm:inline">Clear chat</span>
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

            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 scroll-smooth"
            >
              {empty && (
                <EmptyState
                  onPick={(q) => ask(q)}
                  disabled={sessionLimitReached}
                />
              )}

              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {sessionLimitReached && (
                <div className="mx-auto max-w-[90%] text-xs text-amber-100 bg-amber-500/10 border border-amber-400/25 rounded-xl px-3 py-2 text-center">
                  {sessionTurnLimitMessage()}
                </div>
              )}

              {errorMsg && !sessionLimitReached && (
                <div className="mx-auto max-w-[80%] text-xs text-red-200 bg-red-500/10 border border-red-400/20 rounded-xl px-3 py-2 text-center">
                  {errorMsg}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-white/[0.03] px-4 sm:px-6 py-3"
            >
              <div
                className={`flex items-end gap-2 rounded-2xl border px-3 py-2 transition
                  ${
                    busy
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
                  placeholder={
                    sessionLimitReached
                      ? "Session question limit reached"
                      : hasContext
                        ? "Ask a follow-up…"
                        : "Ask about experience, skills, certifications…"
                  }
                  aria-label="Type your question"
                  maxLength={MAX_LENGTH}
                  disabled={busy || sessionLimitReached}
                  className="flex-1 resize-none bg-transparent outline-none text-white placeholder-white/45 text-sm md:text-base leading-6 max-h-36 py-1 disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || busy || sessionLimitReached}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Send question"
                  className="shrink-0 w-9 h-9 rounded-full bg-white text-gray-900 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  {busy ? (
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
                <span>
                  {sessionLimitReached
                    ? "Clear chat to ask more questions"
                    : hasContext
                      ? `${turnsRemaining} of ${MAX_CHAT_TURNS_PER_SESSION} questions left · Enter to send`
                      : "Enter to send · Shift+Enter for newline"}
                </span>
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

const EmptyState: React.FC<{
  onPick: (q: string) => void;
  disabled?: boolean;
}> = ({ onPick, disabled }) => (
  <div className="h-full flex flex-col items-center justify-center text-center py-10">
    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center mb-4">
      <Sparkles className="w-5 h-5 text-white/80" aria-hidden />
    </div>
    <h4 className="text-white text-lg md:text-xl font-heading">
      Ask me anything about Suyash
    </h4>
    <p className="text-white/50 text-sm mt-1 max-w-sm">
      Experience, backend systems, AI work, certifications, projects, or how
      to get in touch. Follow-ups stay in context until you clear the chat.
    </p>
    <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md">
      {SUGGESTED_QUESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          disabled={disabled}
          className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
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

  const showReasoning =
    message.streaming &&
    !message.content &&
    message.reasoningSteps &&
    message.reasoningSteps.length > 0;

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
        {showReasoning ? (
          <ReasoningChain
            steps={message.reasoningSteps!}
            currentStep={message.reasoningStep ?? 0}
          />
        ) : (
          <span className="whitespace-pre-wrap">
            {message.content}
            {message.streaming && message.content && (
              <span
                className="inline-block w-[2px] h-[1em] align-[-0.15em] ml-0.5 bg-white/80 animate-pulse"
                aria-hidden
              />
            )}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const ReasoningChain: React.FC<{
  steps: string[];
  currentStep: number;
}> = ({ steps, currentStep }) => (
  <div className="space-y-2 py-0.5" role="status" aria-live="polite">
    <p className="text-[11px] uppercase tracking-wide text-white/45 mb-2">
      Reasoning
    </p>
    <ul className="space-y-1.5">
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        const pending = i > currentStep;

        return (
          <motion.li
            key={`${i}-${step}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: pending ? 0.35 : 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            className="flex items-center gap-2 text-xs md:text-sm"
          >
            <span
              className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] border
                ${
                  done
                    ? "bg-emerald-400/20 border-emerald-400/50 text-emerald-300"
                    : active
                      ? "bg-indigo-400/20 border-indigo-300/60 text-indigo-200"
                      : "bg-white/5 border-white/15 text-white/40"
                }`}
              aria-hidden
            >
              {done ? "✓" : active ? "…" : "·"}
            </span>
            <span
              className={
                active
                  ? "text-white font-medium"
                  : done
                    ? "text-white/55 line-through decoration-white/20"
                    : "text-white/40"
              }
            >
              {step}
              {active && (
                <motion.span
                  className="inline-block ml-0.5"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  …
                </motion.span>
              )}
            </span>
          </motion.li>
        );
      })}
    </ul>
  </div>
);

function messagesToHistory(
  messages: Message[]
): { role: "user" | "model"; content: string }[] {
  return messages
    .filter((m) => !m.streaming && m.content.trim())
    .map((m) => ({
      role: m.role === "user" ? "user" : "model",
      content: m.content,
    }));
}
