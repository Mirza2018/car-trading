import { useState, useRef } from "react";
import { Input, Avatar, Badge, Button, Upload, Modal, message } from "antd";
import {
  SmileOutlined,
  PaperClipOutlined,
  SendOutlined,
  SearchOutlined,
  EllipsisOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { BsCheck2All } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";

const ChatList = ({ chats, activeChat, onSelectChat }) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search messages"
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
              activeChat?.id === chat.id ? "bg-gray-50" : ""
            }`}
          >
            <Badge dot={chat.online} offset={[-6, 6]}>
              <Avatar src={chat.avatar} size={40} />
            </Badge>
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{chat.name}</span>
                <span className="text-xs text-gray-500">
                  {chat.lastMessageTime}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatWindow = ({ chat, messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const messageEndRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleUpload = ({ file, fileList }) => {
    if (file.status === "done") {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[85%]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Badge dot={chat.online} offset={[-6, 6]}>
            <Avatar src={chat.avatar} size={40} />
          </Badge>
          <div className="ml-3">
            <div className="font-medium">{chat.name}</div>
            <div className="text-xs text-gray-500">
              {chat.online ? "Online" : "Offline"}
            </div>
          </div>
        </div>
        <Button type="text" icon={<EllipsisOutlined />} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`message-bubble ${message.sent ? "sent" : "received"}`}
            >
              {message.file && (
                <div className="mb-2">
                  <a
                    href={message.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-2"
                  >
                    <PaperClipOutlined />
                    {message.file.name}
                  </a>
                </div>
              )}
              <p>{message.text}</p>
              <div
                className={`flex justify-end items-center gap-1 text-xs ${
                  message.sent ? "text-white/80" : "text-gray-500"
                }`}
              >
                {message.time}
                {message.sent && <BsCheck2All />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t relative">
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div className="flex gap-2">
          <Upload
            fileList={fileList}
            onChange={handleUpload}
            onPreview={handlePreview}
            multiple
            className="flex-shrink-0"
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            prefix={
              <SmileOutlined
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            }
            suffix={<SendOutlined className="text-primary cursor-pointer" />}
            className="rounded-full"
          />
        </div>
      </div>

      <Modal
        open={previewOpen}
        title="Preview"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image
          alt="preview"
          style={{ width: "100%" }}
          width={0}
          height={0}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default function Home() {
  const [activeChat, setActiveChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);

  const chats = [
    {
      id: 1,
      name: "Larry",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      lastMessage: "Larry is Typing...",
      lastMessageTime: "24m",
      online: true,
    },
    {
      id: 2,
      name: "Max",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      lastMessage: "Hello",
      lastMessageTime: "40m",
      online: true,
    },
    // Add more chats as needed
  ];

  const messages = [
    {
      id: 1,
      text: "omg, this is amazing",
      time: "2 min ago",
      sent: false,
    },
    {
      id: 2,
      text: "perfect! ✅",
      time: "2 min ago",
      sent: false,
    },
    {
      id: 3,
      text: "Wow, this is really epic",
      time: "1 min ago",
      sent: false,
    },
    {
      id: 4,
      text: "woohoooo",
      time: "just now",
      sent: true,
    },
    {
      id: 5,
      text: "Haha oh man",
      time: "just now",
      sent: true,
    },
    {
      id: 6,
      text: "Haha that's terrifying 😅",
      time: "just now",
      sent: true,
      file: {
        name: "document.pdf",
        url: "#",
      },
    },
  ];

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    if (isMobileView) {
      setShowChatList(false);
    }
  };

  // Effect to handle responsive layout
  useState(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Chat List */}
      <div
        className={`${
          isMobileView
            ? `fixed inset-0 z-10 transition-transform duration-300 ${
                showChatList ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-[380px]"
        } border-r bg-white`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold flex items-center">
            Messages
            <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
              12
            </span>
          </h1>
        </div>
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelectChat={handleChatSelect}
        />
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 bg-white ${
          isMobileView && showChatList ? "hidden" : "block"
        }`}
      >
        {isMobileView && activeChat && (
          <Button className="m-2" onClick={() => setShowChatList(true)}>
            Back to Chats
          </Button>
        )}
        <ChatWindow chat={activeChat} messages={messages} />
      </div>
    </div>
  );
}
