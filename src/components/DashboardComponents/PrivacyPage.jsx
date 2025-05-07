"use client";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const JoditEditor = dynamic(
  () => import("jodit-react").then((mod) => mod.default),
  {
    ssr: false,
  }
);

const PrivacyPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const handleOnSave = () => {
    console.log("Saved Privacy Policy");
  };

  return (
    <div className="">
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10 rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Privacy Policy
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-[90%]">
          {/* <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div> */}
          <p className="text-xl font-medium mb-10 text-justify">
            At Boxcar, we value your privacy and are committed to
            protecting the personal information you share with us. When you use
            our website to browse or list vehicles, we may collect data such as
            your name, contact details, car listing information, and browsing
            behavior. This information is used solely to provide you with a
            better user experience, facilitate transactions, improve our
            services, and ensure the security of our platform. We do not sell
            your data to third parties. However, we may share your information
            with trusted service providers (such as payment processors or
            hosting services) or authorities when required by law. We use
            cookies to personalize your experience and analyze site traffic, and
            you may manage your cookie preferences through your browser
            settings. By using our website, you consent to our collection and
            use of your information as described in this policy.
          </p>

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
