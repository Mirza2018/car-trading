// "use client"
import { Button, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const BuyNowBtn = ({ price, carId, buyCar }) => {
  const [isBuy, setIsBuy] = useState(false);
  const [isCongrat, setIsCongrat] = useState(false);
  const navigate = useRouter();

  const buyCarHandle = async () => {
    const toastId = toast.loading("Du køber en bil…");
    const data = {
      carId: carId,
    };
    console.log(data);

    try {
      const res = await buyCar(data).unwrap();
      console.log(res);
      toast.success("Du har købt en bil succesfuldt", {
        id: toastId,
        duration: 2000,
      });

      setIsCongrat(true);
      setIsBuy(false);
      Swal.fire({
        title: "Tillykke med dit køb!",
        text: "Din bil er blevet købt succesfuldt. Tak for handlen!! Du kan finde din bil på Mine købte biler.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Gå til Køb Bil",
        cancelButtonText: "Annullere",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate.push("/dashboard/total-dealer-car-sell");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at købe bilen, prøv venligst senere", {
        id: toastId,
        duration: 2000,
      });
    }



  };
  // console.log(isCongrat);

  return (
    <React.Fragment>
      <button
        onClick={() => setIsBuy(true)}
        style={{ fontSize: "clamp(12px, 2vw + 1rem ,15px)" }}
        className="bg-highlight-color text-white  font-semibold py-1  rounded-lg  cursor-pointer  hover:animate-pulse flex flex-col  items-center md:w-44 w-36"
      >
        <div className="text-start">
          <p className="text-[10px] text-start">Køb nu:</p>
          <p>{price} .kr</p>
        </div>
      </button>

      <Modal open={isBuy} onCancel={() => setIsBuy(false)} footer={[]}>
        <h1 className="text-center text-2xl  font-medium mt-5 mb-5">
          Er du sikker på at du vil købe denne bil?
        </h1>
        <section className="flex justify-center items-center ">
          <Button
            className="text-xl py-5 px-8 !text-black !bg-base-color border border-secondary-color"
            type="primary"
            onClick={() => setIsBuy(false)}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Nej
          </Button>

          <Button
            onClick={buyCarHandle}
            className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
            type="primary"
          >
            ja
          </Button>
        </section>
      </Modal>

      <Modal open={isCongrat} onCancel={() => setIsCongrat(false)} footer={[]}>
        <h1 className="text-center text-2xl  font-medium mt-5 mb-5">
          Tillykke med dit køb!
        </h1>
        <p className="font-medium text-center mx-20 mb-5">
          Din bil er blevet købt. Tak for handlen!! Du kan finde din bil i
          “Total Køb Bil”
        </p>
        <section className="flex justify-center items-center ">
          <Button
            className="text-xl py-5 px-8 !text-black !bg-base-color border border-secondary-color"
            type="primary"
            onClick={() => setIsCongrat(false)}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Ingen
          </Button>
          <Link href={`/dashboard/total-dealer-car-sell`}>
            <Button
              // onClick={deleteSingleCategory}
              className={`text-xl py-5 px-8 bg-highlight-color !hover:bg-red-600 `}
              type="primary"
            >
              Gå til Køb bil
            </Button>
          </Link>
        </section>
      </Modal>
    </React.Fragment>
  );
};

export default BuyNowBtn;
