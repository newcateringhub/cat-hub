"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageSquare, X, Send, Loader2, User, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false); // ✅ Hydration guard

  const { messages, append, isLoading } = useChat({
    api: "/api/chat",
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Run after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Auto-scroll when messages update
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Handle message submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await append({ role: "user", content: input });
    setInput("");
  };

  // ✅ Prevent SSR mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] max-w-md h-[500px] bg-background-alt 
        rounded-lg shadow-2xl z-[1050] flex flex-col transition-all duration-300
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-background/50 border-b border-white/10 rounded-t-lg">
          <h3 className="font-heading text-lg text-accent">
            Catering Hub Assistant
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-light hover:text-accent"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 p-4 space-y-4 overflow-y-auto"
        >
          {messages.length === 0 && (
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-accent text-background rounded-full flex items-center justify-center">
                <Bot size={20} />
              </span>
              <div className="p-3 bg-background rounded-lg text-text">
                <p>Hello! How can I help you with our HoReCa products today?</p>
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 items-start ${
                m.role === "user" ? "justify-end" : ""
              }`}
            >
              {m.role === "assistant" && (
                <span className="flex-shrink-0 w-8 h-8 bg-accent text-background rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </span>
              )}
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-accent text-background"
                    : "bg-background text-text"
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {typeof m.content === "string" ? m.content : ""}
                </p>
              </div>
              {m.role === "user" && (
                <span className="flex-shrink-0 w-8 h-8 bg-text-light text-background rounded-full flex items-center justify-center">
                  <User size={20} />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-white/10 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our products..."
            className="flex-1 bg-background border border-white/20 rounded-lg p-2.5 text-text focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-11 h-11 bg-accent rounded-lg flex items-center justify-center text-background disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 bg-accent text-background 
        w-16 h-16 rounded-full flex items-center justify-center 
        shadow-xl z-[1049] transition-all duration-300 hover:scale-110"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
      </button>
    </>
  );
}
