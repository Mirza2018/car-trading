"use client";
import {
  useGetAllnotificationCountQuery,
  useLazyGetAllnotificationQuery,
  useNotificationActionMutation,
} from "@/redux/api/features/notificationApi";
import { SocketContext } from "@/utils/SocketContext";
import { BellFilled } from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { data: allNotificationCount, refetch: refetchCount } =
    useGetAllnotificationCountQuery();
  const [newNotificationCount, setIsNewNotificationCount] = useState(0);
  const [trigger, { data: allNotification }] = useLazyGetAllnotificationQuery();
  const { count } = useContext(SocketContext);
  const [notificationRead] = useNotificationActionMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useRouter();
  // Sync socket and RTK Query data
  useEffect(() => {
    // console.log("Socket count:", count);
    // console.log("RTK Query data:", allNotificationCount);
    if (allNotificationCount?.data?.count !== undefined) {
      console.log(
        "Setting count from RTK Query:",
        allNotificationCount.data.count
      );
      setIsNewNotificationCount(allNotificationCount.data.count);
    } else if (count !== undefined && count > 0) {
      console.log("Setting count from socket:", count);
      setIsNewNotificationCount(count);
      refetchCount();
    }
  }, [count, allNotificationCount, refetchCount]);

  const handleNotificationRead = async () => {
    try {
      const response = await notificationRead({
        action: "markAllAsRead",
      }).unwrap();
      console.log("notificationRead response:", response);
      setIsNewNotificationCount(0);
      refetchCount();
      navigate.push("/dashboard/bid-car");
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      {allNotification?.data?.result?.slice(0, 5).map((notification) => (
        <div className="text-start" key={notification?._id}>
          <div className="flex gap-2">
            <BellFilled style={{ color: "#839F9F" }} />
            <div className="flex flex-col items-start">
              <p>{notification?.message}</p>
              <p className="text-gray-400">
                {notification?.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
      {userInfo?.role === "private_user" ? (
        <p
          onClick={handleNotificationRead}
          // href={`/dashboard/bid-car`}
          className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1 cursor-pointer"
        >
          See all
        </p>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div>
      <Dropdown
        onMouseEnter={() => trigger()}
        trigger={["hover"]}
        overlay={notificationMenu}
        placement="bottomRight"
        className="cursor-pointer"
      >
        <Badge
          style={{ backgroundColor: "#839f9f" }}
          count={newNotificationCount}
          overflowCount={999}
          size="default"
        >
          <BellFilled className="bg-highlight-color text-white font-bold text-xl rounded-full border w-11 aspect-square p-1 flex justify-center items-center" />
        </Badge>
      </Dropdown>
    </div>
  );
};

export default Notification;
