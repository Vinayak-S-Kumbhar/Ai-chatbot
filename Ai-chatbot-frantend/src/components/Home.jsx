import React, { useState, useRef, useEffect } from "react";
import geminiLogo from "../assets/gemini-color-icon.png";
import {
  HiOutlinePencilSquare,
  HiOutlineMicrophone,
  HiOutlinePlus,
  HiOutlineHandThumbUp,
  HiOutlineHandThumbDown,
  HiOutlineClipboard,
  HiOutlineArrowPath,
  HiOutlineEllipsisHorizontal,
  HiSparkles,
} from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [messages, setMessages] = useState([]); // { id, role: 'user' | 'model', text }
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const hasStarted = messages.length > 0;

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];

    if (navigation?.type === "reload") {
      sessionStorage.clear();
    }
  }, []);

  async function handleSend() {
    let chatId = sessionStorage.getItem("chatId");
    if (!chatId) {
      chatId = crypto.randomUUID();
      sessionStorage.setItem("chatId", chatId);
    }

    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    console.log(chatId);

    try {
      setIsThinking(true);
      const response = await fetch(
        `http://localhost:8080/public/chat?q=${trimmed}`,
        {
          method: "POST",
          headers: {
            chatId: chatId,
          },
        },
      );
      const data = await response.text();

      console.log(data);
      const reply = {
        id: Date.now() + 1,
        role: "model",
        text: data,
      };
      setMessages((prev) => [...prev, reply]); // Save API response
    } catch (error) {
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fc]">
      {/* Sidebar */}
      <Sidebar setMessages={setMessages} />

      {/* Main */}
      <main className="relative flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-end pt-2 pr-2">
          <button
            className="z-10 w-30 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Sign Up
          </button>
        </div>
        {/* Background (ONLY inside main) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main blue glow */}
          <div className="absolute left-1/2 top-[58%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cfe4ff]/90 blur-[170px]" />

          {/* Top white glow */}
          <div className="absolute left-1/2 top-[-180px] h-[700px] w-[1400px] -translate-x-1/2 rounded-full bg-white/90 blur-[140px]" />

          {/* Left glow */}
          <div className="absolute left-[-250px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-white/70 blur-[170px]" />

          {/* Right glow */}
          <div className="absolute right-[-250px] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-white/70 blur-[170px]" />

          {/* Bottom glow */}
          <div className="absolute bottom-[-300px] left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-[#d9eaff]/80 blur-[200px]" />
        </div>
        {/* Empty state */}
        {!hasStarted && (
          <div className="z-10 flex-1 flex flex-col items-center justify-center px-6 animate-fade-in">
            <h1 className="text-4xl font-normal text-gray-700 mb-8 text-center">
              What should we focus on?
            </h1>
            <div className="w-full max-w-2xl">
              <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:shadow-md focus-within:shadow-md rounded-full px-3 py-2.5 transition-shadow duration-200">
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 shrink-0">
                  <HiOutlinePlus size={18} />
                </button>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Gemini"
                  className="flex-1 outline-none text-base placeholder-gray-500 bg-transparent"
                />

                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 shrink-0">
                  <HiOutlineMicrophone size={18} />
                </button>

                {input.trim() && (
                  <button
                    onClick={handleSend}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 shrink-0 animate-pop-in"
                  >
                    <HiSparkles size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Chat state */}
        {hasStarted && (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="max-w-3xl mx-auto py-6 flex flex-col gap-8">
                {messages.map((msg) =>
                  msg.role === "user" ? (
                    <div
                      key={msg.id}
                      className="flex justify-end animate-slide-up z-10"
                    >
                      <div className="bg-gray-100 rounded-3xl px-5 py-3 max-w-lg text-[15px] leading-relaxed z-10">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={msg.id}
                      className="flex flex-col gap-2 animate-slide-up z-10"
                    >
                      <div className="prose prose-slate max-w-none dark:prose-invert">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ className, children }) {
                              const match = /language-(\w+)/.exec(
                                className || "",
                              );

                              return match ? (
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className}>{children}</code>
                              );
                            },
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-90">
                          <HiOutlineHandThumbUp size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-90">
                          <HiOutlineHandThumbDown size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-90">
                          <HiOutlineArrowPath size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-90">
                          <HiOutlineClipboard size={16} />
                        </button>
                      </div>
                    </div>
                  ),
                )}

                {isThinking && (
                  <div className="flex items-center gap-1.5 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            <div className="z-10 px-6 pb-2 shrink-0">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:shadow-md focus-within:shadow-md rounded-full px-3 py-2.5 transition-shadow duration-200">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 shrink-0">
                    <HiOutlinePlus size={18} />
                  </button>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Gemini"
                    className="flex-1 outline-none text-base placeholder-gray-500 bg-transparent"
                  />

                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 shrink-0">
                    <HiOutlineMicrophone size={18} />
                  </button>

                  {input.trim() && (
                    <button
                      onClick={handleSend}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 shrink-0 animate-pop-in"
                    >
                      <HiSparkles size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <p className="text-center text-xs text-gray-500 py-3 shrink-0">
          Gemini is AI and can make mistakes.
        </p>
      </main>
    </div>
  );
}
