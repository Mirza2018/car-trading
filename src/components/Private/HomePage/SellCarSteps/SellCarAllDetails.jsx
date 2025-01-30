
import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
// import WhyChooseUS from "@/components/Private/HomePage/WhyChooseUS";
import CarInfoForm from "./CarInfoForm";
import CarImageForm from "./CarImageForm";
import ContactForm from "./ContactForm";

const SellCarAllDetails = () => {
  const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const steps = [
      {
        title: (
          <div className="">
            <h1 className="text-3xl font-bold">Step1</h1>
            <p className=" font-medium">Car details</p>
          </div>
        ),
        content: <CarInfoForm current={current} setCurrent={setCurrent} />,
      },
      {
        title: (
          <div className="">
            <h1 className="text-3xl font-bold">Step2</h1>
            <p className=" font-medium">Upload pictures of the car</p>
          </div>
        ),
        content: <CarImageForm current={current} setCurrent={setCurrent} />,
      },
      {
        title: (
          <div className="">
            <h1 className="text-3xl font-bold">Step3</h1>
            <p className=" font-medium">Contact information</p>
          </div>
        ),
        content: <ContactForm current={current} setCurrent={setCurrent} />,
      },
    ];
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current]?.content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default SellCarAllDetails;