"use client";
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Modal } from "antd";

const SignatureModal = ({
  setIsSignatureModalOpen,
  isSignatureModalOpen,
  onSignatureSave, // Add the callback prop
}) => {
  const sigCanvas = useRef(null);

  const saveSignature = () => {
    try {
      const dataUrl = sigCanvas.current.toDataURL();
      localStorage.setItem("signature", dataUrl);
      onSignatureSave(dataUrl); // Call the callback to update the parent
      setIsSignatureModalOpen(false);
      sigCanvas.current.clear();
    } catch (error) {
      console.error("Error saving signature to localStorage:", error);
    }
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
        <div
          key={"footer-button"}
          className="flex gap-3 justify-end items-center"
        >
          <button
            className="text-[#808080] text-base px-5 py-2 rounded-lg"
            onClick={() => setIsSignatureModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="border border-dashed border-highlight-color text-[#808080] text-base px-5 py-2 rounded-lg"
            onClick={clearSignature}
          >
            Clear
          </button>
          <button
            className="bg-highlight-color text-white text-xl font-bold px-5 py-2 rounded-lg"
            onClick={saveSignature}
          >
            Save Signature
          </button>
        </div>,
      ]}
      width={800}
    >
      <div className="bg-[#e8edf1] drop-shadow-md flex justify-center items-center m-6">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{ width: 700, height: 400, className: "sigCanvas" }}
        />
      </div>
    </Modal>
  );
};

export default SignatureModal;
