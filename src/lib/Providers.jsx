"use client";
import { persistor, store } from "@/redux/store";
import { SocketProvider } from "@/utils/SocketContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


 
const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider> {children}</SocketProvider>
       
      </PersistGate>
    </Provider>
  );
};

export default Providers;
