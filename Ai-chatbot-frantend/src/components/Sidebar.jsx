import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiPlus, FiSettings } from "react-icons/fi";
import { RiCompassDiscoverLine, RiBookOpenLine } from "react-icons/ri";
import { BsChatLeftText } from "react-icons/bs";
import Geminilogo from "../assets/gemini-color-icon.png";
import { IoChevronBack } from "react-icons/io5";
import userProfile from "../assets/user-default.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [collapsed, setCollapsed] = useState(true); //sidebar is open close
  const [userInfo, setUserInfo] = useState({}); //to store user info
  const [loading, setLoading] = useState(false); //loading state to fetch the user info
  const [loggedin, setLoggedIn] = useState(false); // to check logged in or not
  const [messageHistory, setMessageHistory] = useState([]); //to store message history
  const [messageLoading, setMessageLoading] = useState(false); //loding state to fetch messages
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && accessToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn, userId, accessToken]);

  const fetchUserInfo = async (userId) => {
    if (!userId || !accessToken) {
      return;
    }
    setLoading(true);
    try {
      const responce = await fetch(`http://localhost:8080/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!responce.ok) {
        toast.error("Error to fetch user info!");
        return;
      }
      const data = await responce.json();
      setUserInfo(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserInfo(userId);
    fetchUserMessageHistory(userId);
  }, [userId]);

  const fetchUserMessageHistory = async (userId) => {
    if (!userId || !accessToken) {
      return;
    }
    setLoading(true);
    try {
      const responce = await fetch(`http://localhost:8080/history/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!responce.ok) {
        toast.error("Error to fetch user info!");
        return;
      }
      const data = await responce.json();
      setMessageHistory(data);

      const chatId = sessionStorage.getItem("chatId");
      if (chatId) {
        const chat = data.find((chat) => chat.conversationId == chatId);
        if (chat) setMessages(chat.messages);
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
  };

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
            sessionStorage.removeItem("chatId");
            setMessages([]);
          }}
        >
          {/* New Chat */}
          <button
            className="flex items-center gap-4 w-full px-2 py-1.5 rounded-full bg-gray-100 transition"
            onClick={() => fetchUserMessageHistory(userId)}
          >
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
            {messageHistory.map((item, i) => (
              <div
                key={item.conversationId}
                className="truncate rounded-xl px-3 py-2 hover:bg-gray-100 cursor-pointer text-[15px]"
                onClick={() => {
                  setMessages(item.messages);
                  sessionStorage.setItem("chatId", item.conversationId);
                  fetchUserMessageHistory(userId);
                }}
              >
                {`#${messageHistory.length - i} ${item.title}`}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 mt-6 flex flex-col items-center gap-6"></div>
      )}

      {/* Footer */}
      {loggedin ? (
        <>
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
                      <img src={userProfile} />
                    </div>
                    <div>
                      <h2 className="font-medium">{userInfo?.username}</h2>
                      <p>{userInfo.email}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <img src={userProfile} />
                </div>
              )}
            </div>
          </div>
          {!collapsed && (
            <div className="flex items-center gap-4 pb-3">
              <button
                className="h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6  text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0"
                onClick={() => navigate("/login")}
              >
                + Create New Account
              </button>

              <button
                className="h-10 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-end pt-2 pr-2">
          <button
            className="z-10 w-30 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Sign Up
          </button>
        </div>
      )}
    </aside>
  );
}
