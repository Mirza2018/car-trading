"use client";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  ConfigProvider, 
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Typography,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import CarListTable from "@/components/DashboardComponents/TotalCarForSellPage/CarListTable";
import ViewCarTables from "@/components/DashboardComponents/TotalCarForSellPage/ViewCarTables";
import ViewDetailsPage from "@/components/DealerComponents/HomePage/CarViewDetailsModal/ViewDetailsPage";
import { useTotalPurchasedCarsQuery } from "@/redux/api/features/dealerDashboard";
import ViewCarDealerPage from "@/components/DashboardComponents/TotalCarForSellPage/ViewCarDealerPage";

const TotalCarForSellPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    sort: "-updatedAt",
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
  } = useTotalPurchasedCarsQuery(filters);

  const displayedData = purchasedCar ?? currentData;

  // console.log("purchasedCar", purchasedCar);

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

  const handleCancel = () => {
    setIsServiceUserViewModalVisible(false);
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
              Billiste
            </p>
          </div>
        </div>

        {/* Table  */}
        <div className="px-10 py-10">
          <CarListTable
            data={displayedData?.data?.result}
            loading={isLoading}
            showViewServiceUserModal={showViewServiceUserModal}
            pageSize={12}
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
        <ViewCarDealerPage
          openResponsive={isServiceUserViewModalVisible}
          setOpenResponsive={setIsServiceUserViewModalVisible}
          car={currentRecord}
        />
      </div>
    );
};

export default TotalCarForSellPage;
