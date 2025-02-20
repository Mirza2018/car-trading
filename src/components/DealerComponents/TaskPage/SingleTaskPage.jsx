import TextArea from "antd/es/input/TextArea";
import { MdAttachFile } from "react-icons/md";
import React from "react";

const SingleTaskPage = () => {
  return (
    <div className="container mx-auto my-20 flex justify-between gap-32">
      <section className="border border-secondary-color rounded-md flex flex-col gap-3 p-10 flex-1 h-fit">
        <h1 className="text-xl font-bold">Task Title</h1>
        <p>
          Description:<span className="font-medium">Unanswered Questions</span>
        </p>
        <p>
          Due Date:
          <span className="font-medium"> 2024-12-31</span>
        </p>
        <p>
          Category:
          <span className="font-medium"> Administrative Issues</span>
        </p>
      </section>
      <section className="flex-1 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Task Solve Screen</h1>
        <p className="">
          Once you successfully complete this task, your profile will be
          unlocked, granting you access to additional features and
          opportunities. Ensure that all task requirements are met before
          submission to proceed smoothly.
        </p>
        <TextArea rows={5} />
        <button className="rounded-md px-2 py-2 border border-text-light-color w-fit flex gap-1 items-center">
          <MdAttachFile />
          Choose File
        </button>
        <div className="flex gap-3 justify-end">
          <button className="rounded-md px-2 py-2 text-text-light-color w-fit flex gap-1 items-center">
            Cancel
          </button>
          <button className="rounded-md px-2 py-2  text-white bg-highlight-color w-fit flex gap-1 items-center">
            Submit Solution
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleTaskPage;
