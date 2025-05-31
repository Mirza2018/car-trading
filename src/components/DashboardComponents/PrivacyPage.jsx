"use client";
import { useStaticContentQuery } from "@/redux/api/features/myProfile";
import { Button, Spin } from "antd";
import { toast } from "sonner";


const PrivacyPage = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useStaticContentQuery("privacy-policy");

  const displayedData = data ?? currentData;
  console.log(displayedData?.data?.content);
  

  const handleOnSave = () => {
    toast.success("Privacy Policy Accepted successfully");
  };
  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div className="">
        <div className="bg-secondary-color w-full flex items-center p-5 mb-10 rounded-tl-xl rounded-tr-xl">
          <p className="text-2xl text-primary-color font-semibold">
            Privacy Policy
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full lg:w-[90%]">

            <div
              className="text-xl font-medium mb-10 text-justify"
              dangerouslySetInnerHTML={{ __html: displayedData?.data?.content }}
            />

            <Button
              onClick={handleOnSave}
              className=" py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl "
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    );
};

export default PrivacyPage;
