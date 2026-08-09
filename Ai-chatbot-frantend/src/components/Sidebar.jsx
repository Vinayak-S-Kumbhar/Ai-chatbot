import { useState } from "react";
import { FiMenu, FiSearch, FiPlus, FiSettings } from "react-icons/fi";
import { RiCompassDiscoverLine, RiBookOpenLine } from "react-icons/ri";
import { BsChatLeftText } from "react-icons/bs";
import Geminilogo from "../assets/gemini-color-icon.png";
import { IoChevronBack } from "react-icons/io5";

const recents = [
  "Debugging String Substring Search",
  "Debugging Minimum Window Substring",
  "Debugging Minimum Window Substring...",
  "Debugging Sliding Window Substring",
  "Debugging Anagrams With Sliding...",
  "Spring AI ChatClient Configuration Error",
  "Greeting and Offer of Assistance",
  "Fixing Palindrome Validation Logic",
  "Free Gemini, MariaDB Vector Setup",
  "Sliding Window Odd Subarray Fix",
  "Greeting and Project Inquiry",
  "Correcting Sliding Window Subarray",
  "Three Sum Closest Integer Overflow Fix",
  "Food Order System Project Report",
];

export default function Sidebar({ setMessages }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`h-screen bg-white transition-all duration-300 flex flex-col ${
        collapsed ? "w-18" : "w-80"
      }`}
    >
      {/* Header */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={Geminilogo}
              className="w-8 h-8"
              onClick={() => setCollapsed(!collapsed)}
            />
            {!collapsed && (
              <h1 className="font-semibold text-3xl">Ai Chatbot</h1>
            )}
          </div>

          {!collapsed && (
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              <IoChevronBack size={22} />
            </button>
          )}
        </div>

        <div
          className="mt-8 space-y-2"
          onClick={() => {
            console.log("cliked...");
            sessionStorage.removeItem("chatId");
            setMessages([]);
          }}
        >
          {/* New Chat */}
          <button className="flex items-center gap-4 w-full px-2 py-1.5 rounded-full bg-gray-100 transition">
            <BsChatLeftText />
            {!collapsed && <span className="text-[16px]">New chat</span>}
          </button>
        </div>
      </div>

      {/* Recent */}
      {!collapsed ? (
        <div className="flex-1 overflow-auto mt-6 px-5">
          <p className="text-gray-500 text-sm mb-3">Recents</p>

          <div className="space-y-1">
            {recents.map((item, i) => (
              <div
                key={i}
                className="truncate rounded-xl px-3 py-2 hover:bg-gray-100 cursor-pointer text-[15px]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 mt-6 flex flex-col items-center gap-6"></div>
      )}

      {/* Footer */}
      <div className="p-4">
        <div
          className={`flex ${
            collapsed ? "justify-center" : "justify-between"
          } items-center`}
        >
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  V
                </div>

                <span className="font-medium">Vinayak Kumbhar</span>
              </div>

              <button className="p-2 rounded-full hover:bg-gray-100">
                <FiSettings />
              </button>
            </>
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
              V
            </div>
          )}
        </div>

        {collapsed && (
          <div className="flex justify-center mt-5">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiSettings />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-500"></span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
