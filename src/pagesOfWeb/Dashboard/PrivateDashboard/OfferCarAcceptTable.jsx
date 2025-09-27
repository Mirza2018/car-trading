"use client";
/* eslint-disable react/prop-types */
import { setOfferCarInfo } from "@/redux/slices/offerCarInfoSlice";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoEye } from "react-icons/go";
import { useDispatch } from "react-redux";

// Function to get unique company names
const getUniqueCompanyNames = (data) => {
  const companyNames = data.map((item) => item.companyName);
  return [...new Set(companyNames)]; // Remove duplicates by converting array to a Set and back to an array
};

const OfferCarAcceptTable = ({
  data,
  loading,
  showViewServiceUserModal,
  meta,
  onPageChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const columns = [
    {
      title: "Forhandler",
      dataIndex: "dealerUserProfile",
      key: "dealerUserProfile",
      render: (text) => (
        <p className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </p>
      ),
    },
    {
      title: "Mærke",
      dataIndex: "mark",
      key: "mark",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Farve",
      dataIndex: "color",
      key: "color",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Pris",
      dataIndex: "cashPrice",
      sorter: (a, b) => a.cashPrice - b.cashPrice,
      render: (text) => (
        <div>
          <p className="whitespace-nowrap">{text} .kr</p>
        </div>
      ),
    },

    {
      title: "Status",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="Se detaljer">
            <Button
              onClick={() => showViewServiceUserModal(record)}
              className="border-[#00721E] hover:border-[#34df61]"
            >
              {/* <GoEye style={{ fontSize: "24px" }} /> */}
              Se detaljer
            </Button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Handling",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="">
          {/* View Details Tooltip */}{" "}
          {record?.status == "accept" ? (
            <p>
              <Tooltip placement="right" title="View Contract Details">
                {!record?.signatureAsDealer && !record?.signatureAsOwner && (
                  <Button
                    onClick={() => {
                      dispatch(setOfferCarInfo(record));
                      navigate.push(
                        `private-offer-car-aggrement/contract/${record?._id}`
                      );
                    }}
                    className={`  !text-white !bg-secondary-color`}
                  >
                    {" "}
                    <p>Kontraktudstedelse</p>{" "}
                  </Button>
                )}
                {!record?.signatureAsDealer && record?.signatureAsOwner && (
                  <Button className={`  !text-white !bg-highlight-color !px-5`}>
                    {" "}
                    <p>I afventning af kontrakt</p>{" "}
                  </Button>
                )}
                {record?.signatureAsDealer && record?.signatureAsOwner && (
                  <Button
                    onClick={() => {
                      dispatch(setOfferCarInfo(record));
                      navigate.push(
                        `private-offer-car-aggrement/contract/${record?._id}`
                      );
                    }}
                    className={`  !text-white !bg-green-500 !px-7`}
                  >
                    {" "}
                    <p>Se kontrakt</p>{" "}
                  </Button>
                )}
              </Tooltip>
            </p>
          ) : (
            <Button
              onClick={() => navigate.push(`offer-car`)}
              className="bg-highlight-color text-white cursor-pointer  px-4 whitespace-nowrap py-1 rounded-md"
            >
              Accepter tilbuddet
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <Table
        columns={columns}
        dataSource={data} // Use the filtered data here based on selected company
        loading={loading}
        pagination={{
          current: meta?.page,
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: onPageChange,
          // showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default OfferCarAcceptTable;
