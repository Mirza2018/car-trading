"use client";
import Listings from "@/components/DealerComponents/ListingsPage/Listings";

const ListingsPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="min-h-screen border-2 border-secondary-color rounded-md md:my-20 my-10 md:mx-10 mx-3 ">
        <Listings />
      </div>
    </div>
  );
};

export default ListingsPage;
