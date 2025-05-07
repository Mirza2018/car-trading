"use client";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(
  () => import("jodit-react").then((mod) => mod.default),
  {
    ssr: false, // Prevents server-side rendering
  }
);

const TermsPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const handleOnSave = () => {
    console.log("Saved PP");
  };

  return (
    <div className="">
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10 rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Terms & Conditions
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
            By accessing and using Boxcar, you agree to be bound by these Terms
            and Conditions. Our platform allows users to list, browse, and
            purchase cars. You are responsible for ensuring that all information
            provided in listings is accurate and that all transactions comply
            with applicable laws. We reserve the right to remove any content
            that we deem misleading, illegal, or harmful. Users must not use the
            site for fraudulent purposes or violate any third-party rights. All
            content on the site, including images, text, and logos, is the
            property of Boxcar and cannot be reused without permission. We are
            not responsible for the actions of buyers or sellers and act only as
            a platform to connect both parties. Use of the website is at your
            own risk, and we make no guarantees regarding the accuracy or
            completeness of listings or the condition of vehicles. We reserve
            the right to update these terms at any time, and continued use of
            the site indicates acceptance of any changes.
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

export default TermsPage;
