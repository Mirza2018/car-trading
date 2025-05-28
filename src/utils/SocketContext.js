"use client";
import { createContext, useContext, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "sonner";

import Cookies from "universal-cookie";

import { getSocketUrl } from "@/helpers/config/envConfig";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "@/redux/api/baseApi";

const cookies = new Cookies();

export const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const navigate = useRouter();
  const dispatch = useDispatch(); //
  let user;
  const token = cookies.get("car_trading_accessToken");

  if (token) {
    // user = decodedToken(token);
    user = jwtDecode(token);
    if (!user) {
      cookies.remove("car_trading_accessToken");
      navigate.push("/");
      // localStorage.removeItem("persist:ootms_auth");
      // signOut();
      // window.location.href = "/sign-in";
      window.location.reload();
    }
  }

  const socket = useMemo(() => {
    if (!token) {
      return null;
    }

    const socketInstance = io(getSocketUrl(), {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      toast.success("Connected to socket server");
    });

    socketInstance.on("disconnect", (reason) => {
      toast.error("Disconnected from socket server");
    });

    socketInstance.on("connect_error", (error) => {
      toast.error(`Connection error: ${error.message}`);
    });

    return socketInstance;
  }, [token]);

  useEffect(() => {
    socket?.on("message_sent", () => {
      dispatch(baseApi.util.invalidateTags([tagTypes.message]));
      // Note: Cannot call setNewMessage here as it's not available
    });
    return () => socket?.off("message_sent");
  }, [socket, dispatch]);

  useEffect(() => {
    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
