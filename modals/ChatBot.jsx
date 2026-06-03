import { useState, useRef, useEffect } from "react";

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-3.5 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 bg-cyan-400/40"
          style={{ animation: `td 1s step-end infinite ${i * 0.2}s` }}
        />
      ))}
      <style>{`@keyframes td{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
    </div>
  );
}

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: "sys", text: "Connection established. How can I help you?" },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  async function send() {
    const v = input.trim();

    if (!v || typing) return;

    setInput("");

    setMessages((m) => [
      ...m,
      {
        role: "you",
        text: v,
      },
    ]);

    setTyping(true);

    try {
      const res = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: v,
        }),
      });

      const data = await res.json();

      setTyping(false);

      setMessages((m) => [
        ...m,
        {
          role: "sys",
          text: data.reply || "Unable to generate response.",
        },
      ]);
    } catch (error) {
      console.log(error);

      setTyping(false);

      setMessages((m) => [
        ...m,
        {
          role: "sys",
          text: "System error. Please try again.",
        },
      ]);
    }
  }

  return (
    <div className="bg-[#080c0e] border border-cyan-400/[0.12] rounded-2xl overflow-hidden font-mono max-w-xl mx-auto">
      {/* header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.05]">
        <span
          className="w-1.5 h-1.5 bg-cyan-400"
          style={{
            animation: "blink 2s step-end infinite",
          }}
        />

        <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}`}</style>

        <span className="flex-1 text-[11px] tracking-[0.2em] text-cyan-400/60">
          assistant
        </span>

        <span className="text-[10px] tracking-widest text-white/20">
          online
        </span>
      </div>

      {/* messages */}
      <div className="h-80 overflow-y-auto px-5 py-5 flex flex-col gap-4 scrollbar-none">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 ${
              m.role === "you" ? "items-end" : "items-start"
            }`}
          >
            <span className="text-[10px] tracking-[0.12em] text-white/[0.18] px-1">
              {m.role}
            </span>

            <div
              className={
                m.role === "you"
                  ? "max-w-[75%] px-3.5 py-2.5 text-[12.5px] leading-relaxed tracking-[0.02em] text-cyan-400/75 bg-cyan-400/[0.04] border border-cyan-400/[0.12] rounded-[10px_2px_10px_10px]"
                  : "max-w-[75%] px-3.5 py-2.5 text-[12.5px] leading-relaxed tracking-[0.02em] text-white/70 bg-white/[0.03] border border-white/[0.07] rounded-[2px_10px_10px_10px]"
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex flex-col gap-1 items-start">
            <span className="text-[10px] tracking-[0.12em] text-white/[0.18] px-1">
              sys
            </span>

            <div className="bg-white/[0.03] border border-white/[0.07] rounded-[2px_10px_10px_10px]">
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="border-t border-white/[0.05] px-4 py-3 flex gap-2.5 items-center bg-black/40">
        <input
          className="flex-1 bg-transparent border-b border-white/[0.08] focus:border-cyan-400/35 text-white/70 font-mono text-[12.5px] tracking-[0.03em] px-1 py-2 outline-none placeholder:text-white/[0.18] transition-colors caret-cyan-400"
          placeholder="send a message"
          value={input}
          maxLength={200}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button
          onClick={send}
          aria-label="Send"
          className="w-8 h-8 border border-cyan-400/20 rounded hover:border-cyan-400/50 hover:bg-cyan-400/[0.05] transition-all flex items-center justify-center flex-shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(34,211,238,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />

            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
