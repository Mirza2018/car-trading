"use client";
import {
  useGetAllnotificationCountQuery,
  useGetAllnotificationQuery,
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

  // const [trigger, { data: allNotification }] = useLazyGetAllnotificationQuery();
  const { data: allNotification, refetch } = useGetAllnotificationQuery();
  const { count } = useContext(SocketContext);
  const [notificationRead] = useNotificationActionMutation();
  const [newNotificationCount, setIsNewNotificationCount] = useState(
    allNotificationCount?.data
  );
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useRouter();
  // Sync socket and RTK Query data

  // console.log("Socket count1:", count);

  // console.log("New count1", allNotificationCount?.data);

  useEffect(() => {
    // console.log("Socket count:", count);
    refetchCount();
    // console.log("New count", allNotificationCount?.data);

    setIsNewNotificationCount(allNotificationCount?.data);

    // if (allNotificationCount?.data?.count !== undefined) {

    //   setIsNewNotificationCount(allNotificationCount.data.count);
    // } else if (count !== undefined ) {
    //   // console.log("Setting count from socket:", count);
    //   setIsNewNotificationCount(count);
    //   refetchCount();
    //   refetch();
    // }
  }, [allNotificationCount?.data]);

  const handleNotificationRead = () => {
    setIsNewNotificationCount(0);
    // notificationRead();
    navigate.push("/dashboard/bid-car");
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      {allNotification?.data?.result?.length == 0 && <div>No notification</div>}
      {allNotification?.data?.result?.slice(0, 5).map((notification) => (
        <div className="text-start" key={notification?._id}>
          <div className="flex gap-2">
            {/* {console.log(notification)} */}
            <BellFilled style={{ color: "#839F9F" }} />
            <div className="flex flex-col items-start">
              <p>{notification?.message}</p>
              <div className="text-gray-400 flex justify-between gap-8">
                <p>{notification?.createdAt?.split("T")[0]}</p>
                <p>{notification?.createdAt?.split("T")[1].slice(0,8)}</p>

                {notification?.link && (
                  <>
                    <Link href={notification?.link}>
                      <button className="bg-secondary-color text-white px-2 rounded-md">
                        Go
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {userInfo?.role === "private_user" ? (
        <p
          onClick={handleNotificationRead}
          // href={`/dashboard/bid-car`}
          className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1 cursor-pointer"
        >
          See all
        </p>
      ) : (
        ""
      )} */}
    </div>
  );

  return (
    <div>
      <Dropdown
        onMouseEnter={() => {
          notificationRead();
          refetchCount();
        }}
        // trigger={["hover"]}
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
