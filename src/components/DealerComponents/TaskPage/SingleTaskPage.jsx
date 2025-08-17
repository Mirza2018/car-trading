"use client";
import TextArea from "antd/es/input/TextArea";
import { MdAttachFile } from "react-icons/md";
import React from "react";
import {
  useTaskListQuery,
  useTaskSolveMutation,
} from "@/redux/api/features/taskApi";
import { useParams, useRouter } from "next/navigation";
import { Form, Spin, Upload } from "antd";
import { toast } from "sonner";

const SingleTaskPage = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useTaskListQuery();
  const [tastSolution] = useTaskSolveMutation();
  const params = useParams();
  const navigate = useRouter();

  const displayedData = data ?? currentData;

  const myTask = displayedData?.data?.find((task) => task?._id == params.id);
  // console.log(myTask);

  if (isLoading && !myTask) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-96"
      ></Spin>
    );
  }

  const onFinish = async (values) => {
    const toastId = toast.loading("Opgaveløsning indsendes…");
    console.log(values);
    const data = {
      taskId: myTask?._id,
      solutionDetails: values?.solutionDetails,
    };

    if (!values?.solutionDetails) {
      return toast.error("Indtast venligst løsningsdetaljer", {
        id: toastId,
        duration: 2000,
      });
    }
    // if (!values.solutionImage) {
    //  return toast.error("Please Upload Solution image", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (values.solutionImage) {
      formData.append(
        "taskFile",
        values.solutionImage.fileList[0].originFileObj
      );
    }
    // formData.append("taskFile", values.solutionImage.fileList[0].originFileObj);

    try {
      const res = await tastSolution(formData).unwrap();
      console.log(res);
      toast.success("Opgaveløsning indsendt succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/");
    } catch (error) {
      toast.error("Der er et problem med at indsende opgaveløsningen", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/");
    }
  };

  return (
    <div className="container mx-auto my-20 flex justify-between gap-32">
      <section className="border border-secondary-color rounded-md flex flex-col gap-3 p-10 flex-1 h-fit">
        <h1 className="text-xl font-bold">{myTask?.taskTitle}</h1>
        <p>
          Beskrivelse:
          <span className="font-medium"> {myTask?.taskDescription}</span>
        </p>
        <p>
          Deadline:
          <span className="font-medium"> {myTask?.deadline.split("T")[0]}</span>
        </p>
        {/* <p>
          Category:
          <span className="font-medium"> Administrative Issues</span>
        </p> */}
      </section>
      <section className="flex-1 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Opgaveløsningsskærm</h1>
        <p className="">
          Når du har fuldført denne opgave succesfuldt, vil din profil blive
          låst op, hvilket giver dig adgang til yderligere funktioner og
          muligheder. Sørg for, at alle opgavekrav er opfyldt, inden du
          indsender, for at kunne fortsætte problemfrit.
        </p>
        <Form onFinish={onFinish}>
          <Form.Item name="solutionDetails">
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item name="solutionImage">
            <Upload>
              <button className="rounded-md px-2 py-2 border border-text-light-color w-fit flex gap-1 items-center">
                <MdAttachFile />
                Vælg fil
              </button>
            </Upload>
          </Form.Item>
          <div className="flex gap-3 justify-end">
            <p
              onClick={() => {
                navigate.push("/");
              }}
              className="rounded-md cursor-pointer px-2 py-2 text-text-light-color w-fit flex gap-1 items-center"
            >
              Annuller
            </p>
            <button className="rounded-md px-2 py-2  text-white bg-highlight-color w-fit flex gap-1 items-center">
              Indsend løsning
            </button>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default SingleTaskPage;
