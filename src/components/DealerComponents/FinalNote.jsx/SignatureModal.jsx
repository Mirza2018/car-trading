"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Modal } from "antd";

const SignatureModal = ({ setIsSignatureModalOpen, isSignatureModalOpen }) => {
  const sigCanvas = useRef(null);
  const [signature, setSignature] = useState(
    localStorage.getItem("signature") || ""
  );
  const saveSignature = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    localStorage.setItem("signature", dataUrl);
    setSignature(dataUrl);
    setIsSignatureModalOpen(false);
    sigCanvas.current.clear();
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  return (
    <Modal
      title={
        <h1 className="text-xl font-bold text-highlight-color mx-10">
          Signature
        </h1>
      }
      open={isSignatureModalOpen}
      onOk={() => setIsSignatureModalOpen(false)}
      onCancel={() => setIsSignatureModalOpen(false)}
      footer={[
        <div key={"footer-button"} className="flex gap-3 justify-end items-center">
          <button
            className=" text-[#808080] text-base  px-5  py-2 rounded-lg"
            onClick={() => setIsSignatureModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="border border-dashed border-highlight-color text-[#808080] text-base  px-5  py-2 rounded-lg"
            onClick={clearSignature}
          >
            Clear
          </button>

          <button
            className="bg-highlight-color text-white text-xl font-bold px-5  py-2 rounded-lg"
            onClick={saveSignature}
          >
            Save Signature
          </button>
        </div>,
      ]}
      width={800}
    >
      <div className="bg-[#e8edf1] drop-shadow-md flex  justify-center items-center">
        {/* <h2>Sign Here</h2> */}
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{ width: 700, height: 400, className: "sigCanvas " }}
        />

      </div>
    </Modal>
  );
};

export default SignatureModal;
