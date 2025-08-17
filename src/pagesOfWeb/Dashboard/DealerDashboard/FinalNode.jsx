"use client";
import { AllImages } from "@/assets/AllImages";
import { getImageUrl } from "@/helpers/config/envConfig";
import { 
  useContactPaperQuery,
  useUpdateContactPaperMutation,
} from "@/redux/api/features/contract";
import { Checkbox, InputNumber, Radio, Space, Spin } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { PiPrinterThin } from "react-icons/pi";
import { toast } from "sonner";

// Dynamically import SignatureModal with SSR disabled
const SignatureModal = dynamic(
  () => import("@/components/DealerComponents/FinalNote.jsx/SignatureModal"),
  { ssr: false }
);

const FinalNode = () => {
  const params = useParams();
  const navigate = useRouter();

  // console.log(params);
  const advancedRef = useRef();
  const agrimentRef = useRef();

  const contractRef = useRef();

  const { data, currentData, isLoading, isFetching, isSuccess } =
    useContactPaperQuery(params.id);

  const [contractPaper] = useUpdateContactPaperMutation();

  const displayedData = data ?? currentData;

  let carPrice;
  if (displayedData?.data?.car?.isBid) {
    carPrice = displayedData?.data?.car?.bidPrice;
  } else {
    carPrice = displayedData?.data?.expectedPrice;
  }

  const handlePrint = async () => {
    if (!contractRef.current) return;

    try {
      const canvas = await html2canvas(contractRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: contractRef.current.scrollWidth,
        height: contractRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Contract_SLUTSEDDEL.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  // console.log(displayedData?.data);

  const inspectionDate = new Date(
    displayedData?.data?.car?.inspectionDate
  ).toDateString();
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [iserror, setIsError] = useState({
    errorAgri: false,
    errorRegistration: false,
    errorSignature: false,
  });
  useEffect(() => {
    if (carPrice) {
      setAdvanceAmount(displayedData?.data?.advancedPayment);
    }
  }, [displayedData?.data?.advancedPayment, carPrice]);
  // console.log(advanceAmount, carPrice);

  const [registrationValue, setRegistrationValue] = useState(null);

  const onChange = (e) => {
    setRegistrationValue(e.target.value);
  };

  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [signature, setSignature] = useState(null);
  const [isValueIncressed, setIsValueIncreased] = useState(false);

  // Access localStorage only on the client side for initial load
  useEffect(() => {
    const storedSignature = localStorage.getItem("signature");
    setSignature(storedSignature);
    if (displayedData?.data?.isMoms) {
      setIsValueIncreased(displayedData?.data?.isMoms);
    }
  }, [signature, displayedData?.data?.isMoms]);
  // Callback to update signature when saved in the modal
  const handleSignatureSave = (newSignature) => {
    setSignature(newSignature);
  };
  // console.log(isValueIncressed);

  // const storedSignature = localStorage.getItem("signature");
  const resetSignature = () => {
    // setIsValueIncreased(false);
    // setRegistrationValue(null);
    localStorage.removeItem("signature");
    setSignature(null);
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Digital kontrakt underskrives…");
    const data = {
      isMoms: isValueIncressed,
      advancedPayment: advancedRef.current.value,
      isAggrade: agrimentRef.current.input.checked,
      reRegistrationDeRegistrationView: registrationValue,
    };

    if (!data.isAggrade) {
      setIsError((prev) => ({ ...prev, errorAgri: true }));
    }
    if (!data.reRegistrationDeRegistrationView) {
      setIsError((prev) => ({ ...prev, errorRegistration: true }));
    }
    if (!signature) {
      setIsError((prev) => ({ ...prev, errorSignature: true }));
    }

    if (!data.isAggrade) {
      return toast.error("Marker venligst kommentarerne!", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!data.reRegistrationDeRegistrationView) {
      return toast.error("Vælg venligst OMREGISTRERING/AFMELDING", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!signature) {
      return toast.error("Giv din underskrift", {
        id: toastId,
        duration: 2000,
      });
    }
    console.log(data);

    // Convert Base64 signature to File object
    const base64String = signature.replace(/^data:image\/png;base64,/, ""); // Remove prefix
    const byteCharacters = atob(base64String); // Decode Base64 to binary
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    const signatureFile = new File([blob], "signature.png", {
      type: "image/png",
    });

    // Create FormData and append data
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("signatureAsDealer", signatureFile); // Append File object

    try {
      const res = await contractPaper({
        ContactPaper: displayedData.data._id,
        ContactData: formData,
      }).unwrap();
      console.log(res);
      toast.success("Digital kontrakt underskrevet succesfuldt", {
        id: toastId,
        duration: 2000,
      });
      navigate.push("/");
      // form.resetFields();
      localStorage.removeItem("signature");
    } catch (error) {
      console.error(error);
      toast.error(
        "Der opstod et problem med at underskrive den digitale kontrakt",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }

    console.log("okok", data, signature);
  };

  // console.log(iserror);

  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div
        className=" min-h-[90vh]  rounded-xl"
        style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      >
        {/* Header  */}
        <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" w-[95%] mx-auto  flex items-center justify-between">
            <p className="text-3xl text-primary-color font-semibold">
              Kontraktpapir
            </p>
          </div>
        </div>

        <div className="container mx-auto border-2 border-secondary-color rounded-md md:my-20 overflow-x-clip">
          <div ref={contractRef} className="max-w-[1350px] mx-auto md:my-10 ">
            {/* <pre>{JSON.stringify(displayedData, null, 2)}</pre> */}
            <h1
              style={{ fontSize: "clamp(20px, 3vw + 1rem ,60px)" }}
              className="font-bold "
            >
              SLUTSEDDEL
            </h1>
            {/* <pre>{JSON.stringify(displayedData.data, null, 4)}</pre> */}
            <section className="mx-6 my-10 ">
              <h1
                style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
                className="text-highlight-color  font-bold mb-3 mt-7"
              >
                SÆLGER & KØBER
              </h1>
              <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 ">
                <section className="flex flex-col">
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="text-xl font-bold">Sælger</p>
                    <p></p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Fornavn</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.company?.first_name &&
                        displayedData?.data?.company?.first_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Efternavn</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.company?.last_name &&
                        displayedData?.data?.company?.last_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Address</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.company?.street}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Postnr.</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.company?.postCode &&
                        displayedData?.data?.company?.postCode}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">By</p>
                    <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                      {displayedData?.data?.company?.city}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Telefon</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.company?.phoneNumber}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Privatperson / Virksomhed CVR </p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.company?.cvrNumber
                        ? displayedData?.data?.company?.cvrNumber
                        : "Private "}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                    <p className="ps-2">Email</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.privateUser?.email}
                    </p>
                  </div>
                </section>

                {/* Buyer */}
                <section className="flex flex-col">
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="text-xl font-bold ms-2">KØBER</p>
                    <p></p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Fornavn</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.first_name &&
                        displayedData?.data?.dealer?.first_name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Efternavn</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.last_name &&
                        displayedData?.data?.dealer?.last_name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Address</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.street}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Postnr.</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.zip}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">By</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.city}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Telefon</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.phoneNumber}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Privatperson / Virksomhed CVR </p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.cvrNumber}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                    <p className="ps-2">E-mail</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {displayedData?.data?.dealer?.email}
                    </p>
                  </div>
                </section>
              </main>
            </section>

            <section className="mx-6 my-10 ">
              <h1
                style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
                className="text-highlight-color  font-bold mb-3 mt-7"
              >
                BILEN
              </h1>
              <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 ">
                <section className="flex flex-col">
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Mærke & model</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.carModel?.brand +
                        " " +
                        displayedData?.data?.carModel?.model}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Biltype</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.car?.carCategory}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Kilometer</p>
                    <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                      {displayedData?.data?.car?.noOfKmDriven} KM
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                    <p className="ps-2">Brændstof</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.carModel?.fuelType}
                    </p>
                  </div>
                </section>

                {/* Buyer */}
                <section className="flex flex-col">
                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Chassisnummer</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.car?.chassisNumber}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">År</p>
                    <p className="border-s border-secondary-color ps-2 overflow-x-scroll  hide-x-scrollbar">
                      {displayedData?.data?.carModel?.modelYear > 0 &&
                        displayedData?.data?.carModel?.modelYear}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                    <p className="ps-2">Registreringsnummer</p>
                    <p className="border-s border-secondary-color ps-2">
                      {displayedData?.data?.car?.registrationNumber}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                    <p className="ps-2">Syns dato</p>
                    <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                      {inspectionDate}
                    </p>
                  </div>
                </section>
              </main>
            </section>

            <section className="flex flex-col mx-5">
              <h1
                style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
                className="text-highlight-color  font-bold mb-3 py-3"
              >
                OMREGISTRERING/AFMELDING
              </h1>

              <div
                style={{
                  border: iserror.errorRegistration ? "2px solid red" : "",
                  padding: "5px",
                }}
                className=" rounded-md font-medium  px-3 py-9 flex flex-col gap-9  "
              >
                <Radio.Group
                  // onChange={onChange}
                  onChange={onChange}
                  // value={registrationValue}
                  defaultValue={Number(
                    displayedData?.data?.reRegistrationDeRegistrationView
                  )}
                  name="registration"
                  style={{ width: "100%" }}
                >
                  <Space
                    // className="flex  items-start justify-between  w-full"
                    direction="vertical"
                  >
                    <Radio
                      // className="flex flex-row-reverse justify-between w-full"
                      value={1}
                    >
                      Køber omregistrerer/afmelder bilen inden for 4 hverdage
                    </Radio>
                    <Radio
                      // className="flex flex-row-reverse justify-between w-full"
                      value={2}
                    >
                      Køber og sælger omregistrerer sammen bilen
                    </Radio>
                    <Radio
                      value={3}
                      // className="flex flex-row-reverse justify-between"
                    >
                      Sælger afmelder bilen og afleverer nummerplader plates
                    </Radio>
                    <Radio
                      value={4}
                      // className="flex flex-row-reverse justify-between"
                    >
                      Bilen er allerede afmeldt
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
            </section>

            {/* Price */}
            <section className="flex flex-col mx-5">
              <div className=" rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
                <div className="flex justify-between items-center w-full gap-5 flex-wrap">
                  <div className="bg-base-color py-2 border border-highlight-color rounded-md flex items-center gap-5 px-5 flex-wrap">
                    <h1
                      style={{ fontSize: "clamp(12px, 3vw + 1rem ,18px)" }}
                      className="text-xl font-bold"
                    >
                      Purchase amount*
                    </h1>
                    <p
                      onClick={() => setIsValueIncreased(false)}
                      className={`bg-base-color md:px-8 px-2 py-2 rounded-md flex justify-center items-center gap-2 ${
                        isValueIncressed ? "" : "border border-secondary-color "
                      }`}
                    >
                      inkl
                    </p>
                    <p
                      onClick={() => setIsValueIncreased(true)}
                      className={`bg-base-color md:px-8 px-2 py-2  rounded-md flex justify-center items-center gap-2 ${
                        isValueIncressed ? "border border-secondary-color" : ""
                      }`}
                    >
                      moms
                    </p>
                  </div>
                  <p className="bg-base-color px-8 py-2 border border-secondary-color rounded-md">
                    {isValueIncressed
                      ? `${carPrice + carPrice * 0.25} .kr`
                      : `${carPrice} .kr`}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full gap-5  flex-wrap border py-2 px-1 border-secondary-color rounded-lg">
                  <h1 className="flex-1">Afslag ved hurtig handel (DKK)</h1>

                  {displayedData?.data?.advancedPayment ? (
                    <p className="bg-base-color border border-secondary-color py-1 px-3 rounded-lg">
                      {displayedData?.data?.advancedPayment} .kr
                    </p>
                  ) : (
                    <InputNumber
                      defaultValue={displayedData?.data?.advancedPayment}
                      onChange={(e) => setAdvanceAmount(e)}
                      name="advancedPayment"
                      ref={advancedRef}
                      suffix=".kr"
                      className=" !w-40"
                    />
                  )}
                  {/* <InputNumber
                  defaultValue={displayedData?.data?.advancedPayment}
                  onChange={(e) => setAdvanceAmount(e)}
                  name="advancedPayment"
                  ref={advancedRef}
                  suffix="DKK"
                  className=" !w-40"
                /> */}
                </div>
                <h1
                  style={{ fontSize: "clamp(24px, 3vw + 1rem ,32px)" }}
                  className="text-highlight-color  font-bold  "
                >
                  HANDEL
                </h1>
                <div className="flex justify-between items-center w-full gap-5  flex-wrap border py-2 px-1 border-secondary-color rounded-lg">
                  <h1>Samlet købesum (DKK)</h1>
                  <p className="bg-base-color px-2 py-2 border border-secondary-color rounded-md ">
                    {advanceAmount ? (
                      <>
                        {" "}
                        {isValueIncressed
                          ? `${
                              carPrice +
                              carPrice * 0.25 -
                              (advanceAmount + advanceAmount * 0.25)
                            } .kr`
                          : `${carPrice - advanceAmount} .kr`}{" "}
                      </>
                    ) : (
                      <>
                        {isValueIncressed
                          ? `${carPrice + carPrice * 0.25} .kr`
                          : `${carPrice} .kr`}
                      </>
                    )}
                  </p>
                </div>

                <section className="flex flex-col">
                  <h1
                    style={{ fontSize: "clamp(24px, 3vw + 1rem ,32px)" }}
                    className="text-highlight-color  font-bold mb-3 py-3"
                  >
                    Kommentarer
                  </h1>
                  <div
                    style={{
                      border: iserror.errorAgri ? "2px solid red" : "",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                    className="flex justify-between gap-5 "
                  >
                    <h1>
                      Køber bekræfter at have gennemgået bilen og accepterer
                      dens stand. Handlen gennemføres som beset.
                    </h1>
                    <Checkbox
                      defaultChecked={displayedData?.data?.isAggrade}
                      ref={agrimentRef}
                    ></Checkbox>
                  </div>
                </section>

                <div className="flex justify-between items-center w-full gap-5">
                  <h1>
                    *The buyer is obliged to pay the agreed amount at the time
                    of transfer.
                  </h1>
                </div>
              </div>
            </section>
            {/* Re-registration */}
            <section className="flex flex-col mx-10">
              <section className="flex flex-col">
                <h1
                  style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
                  className="text-highlight-color  font-bold mb-3 py-3"
                >
                  Underskrifter
                </h1>
              </section>
              <div className="flex flex-col gap-5">
                <h1>
                  Så snart denne kontrakt er underskrevet, er handlen bindende
                  for begge parter.
                </h1>

                <h1>
                  Bilen sælges af privatperson, og handlen er derfor ikke
                  momspligtig. Købsprisen er momsfri.
                </h1>
                <h1>
                  Hvis der er moms i bilen, skal sælger udstede en faktura, hvor
                  momsen fremgår særskilt.
                </h1>
              </div>
            </section>
            {/* Signature */}

            <section className=" rounded-md font-medium border-secondary-color px-3 py-9 flex md:flex-row flex-col justify-around gap-9 mx-5 my-10">
              {displayedData?.data?.signatureAsOwner ? (
                <div className="flex flex-col justify-center gap-2 items-center">
                  <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                    <Image
                      src={
                        getImageUrl() + displayedData?.data?.signatureAsOwner
                      }
                      alt="Saved Signature"
                      fill
                      style={{ objectFit: "contain" }}
                      className="absolute"
                    />
                  </div>
                  <p className="text-base font-medium">
                    Private User underskrift
                  </p>
                  <p className="text-base font-medium">
                    {displayedData?.data?.privateUser?.first_name}{" "}
                    {displayedData?.data?.privateUser?.last_name}
                  </p>
                  {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
                </div>
              ) : (
                <div className="flex flex-col justify-center gap-2 items-center">
                  <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
                  <p className="text-base font-medium">
                    Private User underskrift
                  </p>
                  <p className="text-base font-medium">
                    {displayedData?.data?.privateUser?.first_name}{" "}
                    {displayedData?.data?.privateUser?.last_name}
                  </p>
                </div>
              )}

              {displayedData?.data?.signatureAsDealer ? (
                <div className="flex flex-col justify-center gap-2 items-center">
                  <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                    <Image
                      src={
                        getImageUrl() + displayedData?.data?.signatureAsDealer
                      }
                      alt="Saved Signature"
                      fill
                      style={{ objectFit: "contain" }}
                      className="absolute"
                    />
                  </div>
                  <p className="text-base font-medium">Dealer underskrift</p>
                  <p className="text-base font-medium">
                    {displayedData?.data?.dealer?.first_name}{" "}
                    {displayedData?.data?.dealer?.last_name}
                  </p>
                  {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
                </div>
              ) : (
                <div className="flex flex-col justify-center gap-2 items-center">
                  <div
                    style={{
                      border: iserror.errorSignature ? "2px solid red" : "",
                      padding: "5px",
                    }}
                    className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative"
                  >
                    {signature ? (
                      <Image
                        src={signature}
                        alt="Saved Signature"
                        fill
                        style={{ objectFit: "contain" }}
                        className="absolute"
                      />
                    ) : (
                      <button
                        onClick={() => setIsSignatureModalOpen(true)}
                        className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center px-6"
                      >
                        Sign
                      </button>
                    )}
                  </div>
                  <p className="text-base font-medium">Dealer underskrift</p>
                  <p className="text-base font-medium">
                    {displayedData?.data?.dealer?.first_name}{" "}
                    {displayedData?.data?.dealer?.last_name}
                  </p>
                </div>
              )}

              <div className="!flex !justify-end !items-end">
                <button className="bg-base-color w-fit px-8 py-2 border border-secondary-color rounded-md text-end h-fit">
                  {advanceAmount ? (
                    <>
                      {" "}
                      {isValueIncressed
                        ? `${
                            carPrice +
                            carPrice * 0.25 -
                            (advanceAmount + advanceAmount * 0.25)
                          } .kr`
                        : `${carPrice - advanceAmount} .kr`}{" "}
                    </>
                  ) : (
                    <>
                      {isValueIncressed
                        ? `${carPrice + carPrice * 0.25} .kr`
                        : `${carPrice} .kr`}
                    </>
                  )}
                </button>
              </div>
            </section>

            <h1 className="mx-10 mb-10">
              Så længe der ikke står noget i feltet &#39;Bemærkninger&#39;,
              anses bilen for at være med fuld dansk registreringsafgift og
              gældfri. Hvis der er gæld, betaler køber direkte til sælgers bank.
            </h1>

            <section className="flex justify-between mx-5 flex-wrap gap-5">
              {displayedData?.data?.signatureAsDealer ? (
                <>
                  <div></div>
                  <div className="text-end">
                    <button
                      onClick={handlePrint}
                      className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                    >
                      <PiPrinterThin className="text-xl" />
                      Print
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center gap-2 ">
                    <button className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2">
                      <LiaQuestionCircleSolid className="text-xl" />
                      Guide
                    </button>
                    <button
                      onClick={resetSignature}
                      className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                    >
                      <Image
                        width={0}
                        height={0}
                        src={AllImages.cross}
                        alt="cross"
                      />
                      Reset
                    </button>
                  </div>
                  <div className="flex md:justify-center gap-2 flex-wrap">
                    {/* <button
                      onClick={() => setIsSignatureModalOpen(true)}
                      className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                    >
                      Give your Signature
                    </button> */}
                    {/* <button
                onClick={handleSubmit}
                className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
              >
                <Image width={0} height={0} src={AllImages.print} alt="cross" />
                Print
              </button> */}
                    <button
                      onClick={handleSubmit}
                      className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                    >
                      <Image
                        width={0}
                        height={0}
                        src={AllImages.signature}
                        alt="cross"
                      />
                      Send for signature
                    </button>
                    {/* <button
                onClick={handleSubmit}
                className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
              >
                <Image width={0} height={0} src={AllImages.save} alt="cross" />
                Save and send
              </button> */}
                  </div>
                </>
              )}

              <SignatureModal
                isSignatureModalOpen={isSignatureModalOpen}
                setIsSignatureModalOpen={setIsSignatureModalOpen}
                onSignatureSave={handleSignatureSave} // Pass the callback
              />
            </section>
          </div>
        </div>
      </div>
    );
};

export default FinalNode;
