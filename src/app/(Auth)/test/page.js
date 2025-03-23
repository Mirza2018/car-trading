"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Modal from "react-modal";

// Modal.setAppElement("#root"); // For accessibility
 
function MyApp() {
  const sigCanvas = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signature, setSignature] = useState(
    localStorage.getItem("signature") || ""
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveSignature = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    localStorage.setItem("signature", dataUrl);
    setSignature(dataUrl);
    closeModal();
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  return (
    <div>
      <button onClick={openModal}>Open Signature Pad</button>
      {signature && <img src={signature} alt="Saved Signature" />}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Sign Here</h2>
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
        <div>
          <button onClick={saveSignature}>Save</button>
          <button onClick={clearSignature}>Clear</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default MyApp;
