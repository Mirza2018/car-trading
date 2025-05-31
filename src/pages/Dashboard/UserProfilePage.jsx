"use client";

import Profile from "@/components/DashboardComponents/UserProfilePage/Profile";

const UserProfilePage = () => {
  return (
    <div
      className=" min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl ">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Add Profile Picture
          </p>
        </div>
      </div>
      <div className="p-5">
        <Profile />
      </div>
    </div>
  );
};

export default UserProfilePage;
