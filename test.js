import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getSocketUrl } from "@/helpers/config/envConfig";

const SocketContext = createContext();

export function SocketProvider({ children, setIsNewNotificationCount }) {
  const token = useSelector((state) => state.auth.accessToken);
  const socketUrl = getSocketUrl();
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.current = io(socketUrl, {
      transports: ["websocket"],
      auth: token,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.current.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
      console.log("Message received", message);
    });

    socket.current.on("notification", (data) => {
      console.log("Notification received", data?.unreadCount);
      if (setIsNewNotificationCount)
        setIsNewNotificationCount(data?.unreadCount);
    });

    socket.current.onAny((eventName, ...args) => {
      console.log("Event Received", eventName, args);
    });

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [token, socketUrl, setIsNewNotificationCount]); // Reconnect if token or URL changes

  const sendMessage = (messageData) => {
    if (socket.current && socket.current.connected) {
      socket.current.emit("send_message", messageData); // Adjust event name as per server
    } else {
      console.log("Socket is not connected");
    }
  };

  return (
    <SocketContext.Provider value={{ messages, sendMessage, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
