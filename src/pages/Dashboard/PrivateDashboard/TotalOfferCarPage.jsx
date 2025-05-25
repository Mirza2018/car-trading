"use client"
import { useTotalPurchasedCarsQuery } from "@/redux/api/features/dealerDashboard";
import { SearchOutlined } from "@ant-design/icons";
import {
    ConfigProvider,
    Form,
    Input,
    Spin 
} from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import OfferCarAcceptTable from "./OfferCarAcceptTable";
import ViewOfferCarAcceptDetails from "./ViewOfferCarAcceptDetails";
import { useOfferCarListQuery } from "@/redux/api/features/privateDashboard";

const TotalOfferCarPage = () => {
  const {
    data: purchasedCar,
    currentData,
    isLoading,
    isFetching,
    isSuccess,
  } = useOfferCarListQuery();

  const displayedData = purchasedCar ?? currentData;

  console.log("offerCar", purchasedCar);

  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm();

  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/carsData.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item?.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setIsServiceUserViewModalVisible(true);
  };


  const car = {
    buyNowPrice: "7,000 EUR",
    model: "Honda CR-V",
    edition: "PHEV - LUXURY",
    currentBids: 15,
    priceInDKK: "33,000 DKK",
    type: "Hybrid (Benzin)",
    transmission: "Automatgear",
    engineCapacity: "2.0 L",
    horsepower: "151 HK",
    pno: "#4430479",
    status: "Minimum price achieved",
    kilometers: "1,500 km",
    serviceDate: "07/2025",
    postalCode: "8100",
    vehicleType: "SUV",
    makeAnBidPrice: "26,000 kr.",
    link: "View Details",
  };

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
              Car List
            </p>
            <div className="flex gap-4 items-center">
              <ConfigProvider
                theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
              >
                <Input
                  placeholder="Search User Name..."
                  value={searchText}
                  onChange={(e) => onSearch(e.target.value)}
                  className="text-primary-color font-semibold !border-primary-color !bg-transparent py-2 !rounded-full"
                  prefix={
                    <SearchOutlined className="text-primary-color font-bold text-lg mr-2" />
                  }
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div
          className="my-4 text-end me-8
      "
        ></div>

        {/* Table  */}
        <div className="px-10 pb-10">
          <OfferCarAcceptTable
            data={displayedData?.data?.result}
            loading={isLoading}
            showViewServiceUserModal={showViewServiceUserModal}
            pageSize={12}
          />
        </div>

        {/* Modals */}
        {/* 
      <ViewCarTables
        isServiceUserViewModalVisible={isServiceUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      /> */}
        <ViewOfferCarAcceptDetails
          openResponsive={isServiceUserViewModalVisible}
          setOpenResponsive={setIsServiceUserViewModalVisible}
          car={currentRecord}
        />
      </div>
    );
};

export default TotalOfferCarPage;
