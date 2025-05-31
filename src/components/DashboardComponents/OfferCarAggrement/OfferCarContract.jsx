"use client";
import { AllImages } from "@/assets/AllImages";
import { getImageUrl } from "@/helpers/config/envConfig";
// import { AllImages } from "@/assets/AllImages";
// import { getImageUrl } from "@/helpers/config/envConfig";
import { useUpdateOfferContactPaperMutation } from "@/redux/api/features/contract";
import { Checkbox, InputNumber, Radio, Space } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// Dynamically import SignatureModal with SSR disabled
const SignatureModal = dynamic(
  () => import("@/components/DealerComponents/FinalNote.jsx/SignatureModal"),
  { ssr: false }
);

const OfferCarContract = () => {
  const params = useParams();
  const navigate = useRouter();
  // console.log(params);
  const advancedRef = useRef();
  const agrimentRef = useRef();

  const [contractPaper] = useUpdateOfferContactPaperMutation();

  const displayedData = useSelector((state) => state.offerInfo.offerCarInfo);
  console.log(displayedData);
  let carPrice = displayedData?.cashPrice;

  const inspectionDate = new Date(
    displayedData?.data?.car?.inspectionDate
  ).toDateString();
  const [advanceAmount, setAdvanceAmount] = useState(0);
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

    setIsValueIncreased(displayedData?.isMoms);

    if (displayedData?.advancedPayment) {
      setAdvanceAmount(displayedData?.advancedPayment);
    }
    if (displayedData?.reRegistrationDeRegistrationView) {
      setRegistrationValue(
        Number(displayedData?.reRegistrationDeRegistrationView)
      );
    }
  }, [
    signature,
    displayedData?.advancedPayment,
    displayedData?.isMoms,
    displayedData?.reRegistrationDeRegistrationView,
  ]);

  // Callback to update signature when saved in the modal
  const handleSignatureSave = (newSignature) => {
    setSignature(newSignature);
  };
  // console.log(isValueIncressed);

  // const storedSignature = localStorage.getItem("signature");
  const resetSignature = () => {
    localStorage.removeItem("signature");
    setSignature(null);
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Digital Contract is Signing...");
    const data = {
      isMoms: isValueIncressed,
      advancedPayment: advancedRef.current.value,
      isAggrade: agrimentRef.current.input.checked,
      reRegistrationDeRegistrationView: registrationValue,
    };

    if (!data.isAggrade) {
      return toast.error("Please check mark the agreement!", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!data.reRegistrationDeRegistrationView) {
      return toast.error("Please Select Re-registration/de-registration view", {
        id: toastId,
        duration: 2000,
      });
    }
    if (!signature) {
      return toast.error("Give your Signature", {
        id: toastId,
        duration: 2000,
      });
    }

    // return;

    // if (!signature) {
    //   return toast.error("Give your Signature", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }

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
    formData.append("signatureAsOwner", signatureFile); // Append File object

    try {
      const res = await contractPaper({
        ContactPaper: displayedData._id,
        ContactData: formData,
      }).unwrap();
      console.log(res);
      toast.success(
        res?.data?.message || "Digital Contract is Signed Successfully",
        {
          id: toastId,
          duration: 2000,
        }
      );
      navigate.push("/");
      // form.resetFields();
      localStorage.removeItem("signature");
    } catch (error) {
      console.error(error);
      toast.error(
        error.data?.message ||
          "There was a problem signing the Digital Contract",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }

    // console.log("okok", data, signature);
  };

  return (
    <div className="container mx-auto border-2 border-secondary-color rounded-md md:my-20 overflow-x-clip">
      <div className="max-w-[1350px] mx-auto md:my-10 ">
        <h1
          style={{ fontSize: "clamp(20px, 3vw + 1rem ,60px)" }}
          className="font-bold "
        >
          Final note
        </h1>

        <section className="flex flex-col mx-5">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold my-5"
          >
            With
          </h1>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p className="overflow-x-scroll hide-x-scrollbar">
              Model and brand
            </p>
            <p className="overflow-x-scroll hide-x-scrollbar uppercase">
              {displayedData?.mark} {displayedData?.model}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Category</p>
            <p className="overflow-x-scroll hide-x-scrollbar uppercase">
              {displayedData?.carCategory}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Models</p>
            <p className="overflow-x-scroll hide-x-scrollbar uppercase">
              {displayedData?.models}
            </p>
          </div>
          {displayedData?.modelsYear > 0 && (
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Year</p>
              <p>{displayedData?.modelsYear}</p>
            </div>
          )}

          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Kilometer</p>
            <p>{displayedData?.DrivenKm} KM</p>
          </div>
          {displayedData?.carLicensePlateNumber && (
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p className="overflow-x-scroll hide-x-scrollbar">
                License Plate Number
              </p>
              <p>{displayedData?.carLicensePlateNumber}</p>
            </div>
          )}
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p>Fuel</p>
            <p>{displayedData?.fuel}</p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
            <p className="overflow-x-scroll hide-x-scrollbar">
              The condition of the car
            </p>
            <p className="overflow-x-scroll hide-x-scrollbar">
              {displayedData?.carCondition}
            </p>
          </div>
          <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
            <p>Inspection Date</p>
            <p className="overflow-x-scroll hide-x-scrollbar">
              {inspectionDate}
            </p>
          </div>
        </section>

        <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 mx-6 my-10 ">
          <section className="flex flex-col">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold mb-3 mt-7"
            >
              Seller
            </h1>

            {displayedData?.dealerUserProfile?.first_name && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>First name</p>
                <p>{displayedData?.dealerUserProfile?.first_name}</p>
              </div>
            )}

            {displayedData?.dealerUserProfile?.last_name && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>Surname</p>
                <p>{displayedData?.dealerUserProfile?.last_name}</p>
              </div>
            )}
            {displayedData?.data?.company?.companyName && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>Company Name</p>
                <p className="overflow-x-scroll  hide-x-scrollbar">
                  {displayedData?.data?.company?.companyName}
                </p>
              </div>
            )}

            {displayedData?.data?.company?.city && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>City</p>
                <p className="overflow-x-scroll hide-x-scrollbar">
                  {displayedData?.data?.company?.city}
                </p>
              </div>
            )}

            {displayedData?.dealerUser?.email && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>E-mail</p>
                <p className="overflow-x-scroll hide-x-scrollbar">
                  <p>{displayedData?.dealerUser?.email}</p>
                </p>
              </div>
            )}

            {displayedData?.data?.company?.phoneNumber && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
                <p>Telephone</p>
                <p className="overflow-x-scroll  hide-x-scrollbar">
                  {displayedData?.data?.company?.phoneNumber}
                </p>
              </div>
            )}
          </section>
          <section className="flex flex-col">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold my-5"
            >
              Buyer
            </h1>
            {displayedData?.privateUserProfile?.first_name && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>First name</p>
                <p>{displayedData?.privateUserProfile?.first_name}</p>
              </div>
            )}

            {displayedData?.privateUserProfile?.last_name && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>Sur name</p>
                <p>{displayedData?.privateUserProfile?.last_name}</p>
              </div>
            )}
            {displayedData?.privateUser?.email && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
                <p>Email</p>
                <p>{displayedData?.privateUser?.email}</p>
              </div>
            )}
            {displayedData?.submitListing?.city && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>City</p>
                <p>{displayedData?.submitListing?.city}</p>
              </div>
            )}
            {displayedData?.submitListing?.postalCode && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>Postal code</p>
                <p>{displayedData?.submitListing?.postalCode}</p>
              </div>
            )}
            {displayedData?.submitListing?.phoneNumber && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>Phone Number</p>
                <p>{displayedData?.submitListing?.phoneNumber}</p>
              </div>
            )}
          </section>
        </main>
        {/* Price */}
        <section className="flex flex-col mx-5">
          <div
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color font-bold mb-3 py-3"
          >
            Price
          </div>
          <div className="border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
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
                  className={`bg-base-color md:px-8 px-2 py-2 rounded-md flex justify-center items-center gap-2  cursor-pointer ${
                    isValueIncressed ? "" : "border border-secondary-color "
                  }`}
                >
                  inkl
                </p>
                <p
                  onClick={() => setIsValueIncreased(true)}
                  className={`bg-base-color md:px-8 px-2 py-2  rounded-md flex justify-center items-center gap-2 cursor-pointer ${
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
            <div className="flex justify-between items-center w-full gap-5 flex-wrap">
              <h1>
                The deal is signed and completed before inspection. The buyer
                undertakes to pay the agreed amount upon collection of the car,
                provided that the car is as described.{" "}
                {displayedData?.isAggrade ? (
                  <Checkbox
                    checked={displayedData?.isAggrade}
                    ref={agrimentRef}
                  ></Checkbox>
                ) : (
                  <Checkbox ref={agrimentRef}></Checkbox>
                )}
              </h1>
              {/* <div>
                  <FaRegSquareCheck className="text-xl text-highlight-color" />
                </div> */}
            </div>
            <div className="flex justify-between items-start w-full gap-5  flex-wrap">
              <h1 className="flex-1">
                It has been agreed that the buyer pays a deposit to the seller
                as security for the transaction. The remaining amount is paid
                upon handover of the car. The deposit amounts to .kr
              </h1>

              {displayedData?.advancedPayment ? (
                <p className="bg-base-color border border-secondary-color py-1 px-3 rounded-lg">
                  {displayedData?.advancedPayment} .kr
                </p>
              ) : (
                <InputNumber
                  defaultValue={displayedData?.advancedPayment}
                  onChange={(e) => setAdvanceAmount(e)}
                  name="advancedPayment"
                  ref={advancedRef}
                  suffix=".kr"
                  className=" !w-40"
                />
              )}
            </div>
            <div className="flex justify-between items-start w-full gap-5  flex-wrap">
              <h1>
                The remaining amount, which is paid out at the time of transfer,
                is
              </h1>
              <p className="bg-base-color px-2 py-2 border border-secondary-color rounded-md ">
                {carPrice ? (
                  <>
                    {isValueIncressed
                      ? `${carPrice + carPrice * 0.25 - advanceAmount} .kr`
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
            <div className="flex justify-between items-center w-full gap-5">
              <h1>
                *The buyer is obliged to pay the agreed amount at the time of
                transfer.
              </h1>
            </div>
          </div>
        </section>
        {/* Re-registration */}
        <section className="flex flex-col mx-5">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold mb-3 py-3"
          >
            Re-registration/de-registration view
          </h1>
          <div className="border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
            <Radio.Group
              // onChange={onChange}
              onChange={onChange}
              value={registrationValue}
              // value={Number(
              //   displayedData?.data?.reRegistrationDeRegistrationView
              // )}
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
                  Køber omregistrerer/afmelder bilen inden for 4 hverdage*
                </Radio>
                <Radio
                  // className="flex flex-row-reverse justify-between w-full"
                  value={2}
                >
                  Buyer and seller re-register the car together
                </Radio>
                <Radio
                  value={3}
                  // className="flex flex-row-reverse justify-between"
                >
                  The seller deregisters the car and hands over the number
                  plates
                </Radio>
                <Radio
                  value={4}
                  // className="flex flex-row-reverse justify-between"
                >
                  The car is deregistered
                </Radio>
                <Radio
                  value={5}
                  // className="flex flex-row-reverse justify-between"
                >
                  According to Danish legislation, the car must be
                  re-registered/de-registered no later than 4 working days after
                  the transaction
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </section>
        {/* Signature */}

        <section className="border rounded-md font-medium border-secondary-color px-3 py-9 flex md:flex-row flex-col justify-around gap-9 mx-5 my-10">
          {/* <div className="flex flex-col justify-center items-center gap-2">
              <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
              <p className="text-base font-medium">Seller Signature</p>
              <p className="text-base font-medium">Kasper Munch Sørensen</p>
              <p className="text-base font-medium">Date: 2025-01-27 13:12:38</p>
            </div> */}

          {displayedData?.signatureAsOwner ? (
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                <Image
                  src={getImageUrl() + displayedData?.signatureAsOwner}
                  alt="Saved Signature"
                  fill
                  style={{ objectFit: "contain" }}
                  className="absolute"
                />
              </div>
              <p className="text-base font-medium">Private User Signature</p>
              <p className="text-base font-medium">
                {displayedData?.privateUserProfile?.first_name}{" "}
                {displayedData?.privateUserProfile?.last_name}
              </p>
              {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                {signature ? (
                  <Image
                    src={signature}
                    alt="Saved Signature"
                    fill
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                ) : (
                  <p></p>
                )}
              </div>
              <p className="text-base font-medium">Private User Signature</p>
              <p className="text-base font-medium">
                {displayedData?.privateUserProfile?.first_name}{" "}
                {displayedData?.privateUserProfile?.last_name}
              </p>
            </div>
          )}

          {displayedData?.signatureAsDealer ? (
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                <Image
                  src={getImageUrl() + displayedData?.signatureAsDealer}
                  alt="Saved Signature"
                  fill
                  style={{ objectFit: "contain" }}
                  className="absolute"
                />
              </div>
              <p className="text-base font-medium">Dealer Signature</p>
              <p className="text-base font-medium">
                {displayedData?.dealerUserProfile?.first_name}{" "}
                {displayedData?.dealerUserProfile?.last_name}
              </p>
              {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-2 items-center">
              {/* <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                  {signature ? (
                    <Image
                      src={signature}
                      alt="Saved Signature"
                      fill
                      style={{ objectFit: "contain" }}
                      className="absolute"
                    />
                  ) : (
                    <p></p>
                  )}
                </div> */}
              <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
              <p className="text-base font-medium">Dealer Signature</p>
              <p className="text-base font-medium">
                {displayedData?.dealerUserProfile?.first_name}{" "}
                {displayedData?.dealerUserProfile?.last_name}
              </p>
            </div>
          )}

          <div className="!flex !justify-end !items-end">
            <button className="bg-base-color w-fit px-8 py-2 border border-secondary-color rounded-md text-end h-fit whitespace-nowrap">
              {isValueIncressed
                ? `${carPrice + carPrice * 0.25} .kr`
                : `${carPrice} .kr`}
            </button>
          </div>
        </section>

        <section className="flex justify-between mx-5 flex-wrap gap-5">
          {displayedData?.signatureAsOwner ? (
            ""
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
                <button
                  onClick={() => setIsSignatureModalOpen(true)}
                  className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                >
                  Give your Signature
                </button>
                {/* <button
                onClick={handleSubmit}
                className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
              >
                <Image width={0} height={0} src={AllImages.print} alt="cross" />
                Print
              </button> */}
                {/* <button
                  onClick={handleSubmit}
                  className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                >
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.save}
                    alt="cross"
                  />
                  Final The Deal
                </button> */}
                <button
                  onClick={handleSubmit}
                  className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
                >
                  <Image
                    width={0}
                    height={0}
                    src={AllImages.save}
                    alt="cross"
                  />
                  Save and send
                </button>
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
  );
};

export default OfferCarContract;
