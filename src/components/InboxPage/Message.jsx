"use client";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Avatar, Badge } from "antd";
import { SendOutlined, EllipsisOutlined } from "@ant-design/icons";
import { BsCheck2All } from "react-icons/bs";
import { getImageUrl } from "@/helpers/config/envConfig";
import { useLazySingleConversationQuery } from "@/redux/api/features/conversation";
import RelativeTime from "@/utils/RelativeTime";
import { SocketContext } from "@/utils/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

// Lazy-load EmojiPicker — prevents ShadowPortal unmount crash in Next.js
import dynamic from "next/dynamic";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => null,
});

// ─────────────────────────────────────────────
// UserAvatar
// ─────────────────────────────────────────────
const UserAvatar = ({ profile, size = 40, color = "#3b82f6" }) => {
  if (profile?.profileImage) {
    return <Avatar src={getImageUrl() + profile.profileImage} size={size} />;
  }
  return (
    <Avatar
      size={size}
      style={{
        backgroundColor: color,
        color: "#fff",
        fontWeight: 600,
        fontSize: size * 0.4,
      }}
    >
      {profile?.first_name?.charAt(0) ?? "?"}
    </Avatar>
  );
};

// ─────────────────────────────────────────────
// ChatList
// ─────────────────────────────────────────────
const ChatList = ({ conversationData, activeChat, onSelectChat }) => (
  <div className="flex-1 overflow-y-auto">
    {conversationData.map((chat) => (
      <div
        key={chat._id}
        onClick={() => onSelectChat(chat)}
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 border-l-4 ${
          activeChat?._id === chat._id
            ? "bg-blue-50 border-blue-500"
            : "border-transparent"
        }`}
      >
        <Badge dot={!!chat?.online} offset={[-4, 4]}>
          <UserAvatar profile={chat?.otherUser?.profile} size={44} />
        </Badge>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <span className="font-semibold text-gray-800 text-sm truncate">
              {chat?.otherUser?.profile?.first_name}{" "}
              {chat?.otherUser?.profile?.last_name}
            </span>
            {chat?.lastMessageTime && (
              <span className="text-xs text-gray-400 ml-2 shrink-0">
                {chat.lastMessageTime}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {chat?.lastMessage?.message || "Ingen beskeder endnu"}
          </p>
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// ChatWindow
// ─────────────────────────────────────────────
const ChatWindow = ({
  chat,
  cahtMessage,
  conversationData,
  isMobileView,
  onBack,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  // isMounted guard prevents EmojiPicker rendering during unmount → fixes ShadowPortal crash
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setMessages(Array.isArray(cahtMessage) ? [...cahtMessage] : []);
  }, [cahtMessage]);

  // Smooth scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Instant jump when switching conversations
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    setEmojiOpen(false);
  }, [chat?._id]);

  // Socket listener
  useEffect(() => {
    if (!socket || !chat?._id) return;
    const handler = (msg) =>
      setMessages((prev) => [
        ...prev,
        { ...msg, createdAt: new Date().toISOString() },
      ]);
    socket.on(`receive_message::${chat._id}`, handler);
    return () => socket.off(`receive_message::${chat._id}`, handler);
  }, [socket, chat?._id]);

  const selfId = conversationData?.[0]?.self?._id;

  const handleSend = useCallback(() => {
    if (!newMessage?.trim() || !chat?._id) return;
    const messageData = {
      conversationId: chat._id,
      message: newMessage,
      senderId: selfId,
    };
    try {
      socket?.emit("send_message", messageData);
      setMessages((prev) => [
        ...prev,
        {
          ...messageData,
          _id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ]);
      dispatch(baseApi.util.invalidateTags([tagTypes.message]));
      setNewMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  }, [newMessage, chat?._id, selfId, socket, dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 bg-gray-50">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <SendOutlined className="text-2xl text-gray-300" />
        </div>
        <p className="text-sm">Vælg en chat for at komme i gang</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-white shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          {isMobileView && (
            <button
              onClick={onBack}
              aria-label="Tilbage"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 text-xl leading-none"
            >
              ←
            </button>
          )}
          <UserAvatar profile={chat?.otherUser?.profile} size={36} />
          <span className="font-semibold text-gray-800 text-sm">
            {chat?.otherUser?.profile?.first_name}{" "}
            {chat?.otherUser?.profile?.last_name}
          </span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
          <EllipsisOutlined />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-gray-50 min-h-0">
        {messages.length === 0 && (
          <div className="flex justify-center pt-8">
            <span className="text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full shadow-sm">
              Ingen beskeder endnu — sig hej! 👋
            </span>
          </div>
        )}
        {messages.map((msg, idx) => {
          const isSelf = msg?.senderId === selfId;
          return (
            <div
              key={msg._id ?? idx}
              className={`flex items-end gap-2 ${isSelf ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="shrink-0">
                <UserAvatar
                  profile={
                    isSelf ? chat?.self?.profile : chat?.otherUser?.profile
                  }
                  size={26}
                  color={isSelf ? "#3b82f6" : "#6b7280"}
                />
              </div>
              <div
                className={`flex flex-col max-w-[70%] ${isSelf ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm break-words ${
                    isSelf
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg?.message}
                </div>
                <div className="flex items-center gap-1 mt-0.5 px-1">
                  <RelativeTime timestamp={msg?.createdAt} />
                  {isSelf && <BsCheck2All className="text-blue-400 text-xs" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className="px-3 py-2 border-t bg-white shrink-0 relative">
        {/* Only render EmojiPicker after mount and when open — prevents ShadowPortal crash */}
        {isMounted && emojiOpen && (
          <div className="absolute bottom-full right-3 mb-2 z-50 shadow-xl rounded-xl overflow-hidden">
            <EmojiPicker
              onEmojiClick={(obj) => {
                setNewMessage((prev) => prev + obj.emoji);
                setEmojiOpen(false);
              }}
              height={350}
              width={isMobileView ? 280 : 320}
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEmojiOpen((v) => !v)}
            aria-label="Emoji"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-lg"
          >
            😊
          </button>
          <input
            value={newMessage ?? ""}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Skriv en besked…"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage?.trim()}
            aria-label="Send"
            className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              newMessage?.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <SendOutlined className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export default function Message({ conversationData }) {
  const [activeChat, setActiveChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showList, setShowList] = useState(true);

  const displayedData = useSelector((state) => state.carowner.carOwnerInfo);
  const [trigger, { data, currentData }] = useLazySingleConversationQuery();
  const cahtMessage = data ?? currentData;

  // Auto-select conversation coming from a car listing page
  useEffect(() => {
    if (!displayedData || !conversationData?.length) return;
    const matched = conversationData.find(
      (c) =>
        c?.otherUser?._id === displayedData || c?.self?._id === displayedData,
    );
    if (matched) {
      setActiveChat(matched);
      setShowList(false);
    }
  }, [displayedData, conversationData]);

  // Fetch messages on conversation change
  useEffect(() => {
    if (activeChat?._id) trigger(activeChat._id);
  }, [activeChat, trigger]);

  // Responsive breakpoint
  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    setShowList(false);
  };

  return (
    /**
     * height = full viewport minus 64px website header
     * On desktop: flex row — sidebar + window side by side (no absolute positioning needed)
     * On mobile:  both panels are absolute inside this container and slide in/out with translateX
     *             The container itself is position:relative so they stay within the header-offset area
     */
    <div
      className="relative flex overflow-hidden bg-gray-100"
      style={{ height: "calc(100dvh - 64px)" }}
    >
      {/* ── Sidebar ── */}
      <div
        className={`
          flex flex-col bg-white border-r shrink-0 transition-transform duration-300
          ${
            isMobileView
              ? `absolute inset-0 z-20 w-full ${showList ? "translate-x-0" : "-translate-x-full"}`
              : "w-80"
          }
        `}
      >
        <div className="px-5 py-4 border-b shrink-0">
          <h1 className="text-lg font-bold text-gray-800">Beskeder</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {conversationData?.length ?? 0} samtaler
          </p>
        </div>
        <ChatList
          conversationData={conversationData}
          activeChat={activeChat}
          onSelectChat={handleChatSelect}
        />
      </div>

      {/* ── Chat window ── */}
      <div
        className={`
          flex flex-col bg-white transition-transform duration-300
          ${
            isMobileView
              ? `absolute inset-0 z-10 w-full ${!showList ? "translate-x-0" : "translate-x-full"}`
              : "flex-1"
          }
        `}
      >
        <ChatWindow
          conversationData={conversationData}
          chat={activeChat}
          cahtMessage={cahtMessage?.data}
          isMobileView={isMobileView}
          onBack={() => setShowList(true)}
        />
      </div>
    </div>
  );
}
