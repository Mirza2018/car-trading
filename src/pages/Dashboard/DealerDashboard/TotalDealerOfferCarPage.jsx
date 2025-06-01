"use client";
import { useOfferCarListQuery } from "@/redux/api/features/privateDashboard";
import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Form, Input, Spin } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import OfferDealerCarAcceptTable from "./OfferDealerCarAcceptTable";
import ViewOfferDealerCarAcceptDetails from "./ViewOfferDealerCarAcceptDetails";

const TotalDealerOfferCarPage = () => {
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
    data: purchasedCar,
    currentData,
    isLoading,
    isFetching,
    isSuccess,
  } = useOfferCarListQuery(filters);

  const displayedData = purchasedCar ?? currentData;

  // console.log("meta", displayedData?.data?.meta);

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
              Offer cars
            </p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>
      

        {/* Table  */}
        <div className="px-10 py-10">
          <OfferDealerCarAcceptTable
            data={displayedData?.data?.result}
            loading={isLoading}
            showViewServiceUserModal={showViewServiceUserModal}
            meta={displayedData?.data?.meta}
            onPageChange={onPageChange}
          />
        </div>

        {/* Modals */}
        {/* 
      <ViewCarTables
        isServiceUserViewModalVisible={isServiceUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      /> */}
        <ViewOfferDealerCarAcceptDetails
          openResponsive={isServiceUserViewModalVisible}
          setOpenResponsive={setIsServiceUserViewModalVisible}
          car={currentRecord}
        />
      </div>
    );
};

export default TotalDealerOfferCarPage;
