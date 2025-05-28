import Message from "@/components/InboxPage/Message";
import { useConversationQuery } from "@/redux/api/features/conversation";
import { Spin } from "antd";
import React, { useState } from "react";

const InboxPage = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useConversationQuery();
  const conversationData = data ?? currentData;


  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && conversationData)
    return (
    
        <Message conversationData={conversationData?.data} />

    );
};

export default InboxPage;
