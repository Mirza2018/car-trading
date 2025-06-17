"use client";
import AllCarListTable from "@/components/DashboardComponents/TotalPrivateCarSellPage/AllCarListTable";
import PrivateCarSellTable from "@/components/DashboardComponents/TotalPrivateCarSellPage/PrivateCarSellTable";
import ViewDetailsPage from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ViewDetailsPage";
import { useUserCarsDetailsQuery } from "@/redux/api/features/privateDashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TotalListedCars = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo?.userId);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const {
    data: sellCarData,
    currentData,
    isLoading,
  } = useUserCarsDetailsQuery({ filters, id: userInfo?.userId });

  const displayedData = sellCarData ?? currentData;

  console.log("meta", displayedData?.data?.meta);
  console.log(displayedData);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [data, setData] = useState([]);
  const [openCarSee, setOpennCarSee] = useState(false);

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setOpennCarSee(true);
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/privateCarSellList.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(data, "data");

  return (
    <div
      className=" min-h-[90vh]  rounded-xl mx-auto"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            My Listed Cars
          </p>
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>

      <div className="px-10 py-10">
        <AllCarListTable
          data={displayedData?.data?.result}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          meta={displayedData?.data?.meta}
          onPageChange={onPageChange}
        />
        <ViewDetailsPage
          openResponsive={openCarSee}
          setOpenResponsive={setOpennCarSee}
          car={currentRecord}
          sendOffer={false}
          buyNow={false}
        />
      </div>
    </div>
  );
};

export default TotalListedCars;
