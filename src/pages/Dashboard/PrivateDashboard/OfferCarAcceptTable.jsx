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
      title: "Dealer Name",
      dataIndex: "dealerUserProfile",
      key: "dealerUserProfile",
      render: (text) => (
        <p className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </p>
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "mark",
      key: "mark",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Car Model",
      dataIndex: "model",
      key: "model",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "cashPrice",
      sorter: (a, b) => a.cashPrice - b.cashPrice,
      render: (text) => (
        <div>
          <p className="whitespace-nowrap">{text} Dkk</p>
        </div>
      ),
    },

    {
      title: "Status",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <Button
              onClick={() => showViewServiceUserModal(record)}
              className="border-[#00721E] hover:border-[#34df61]"
            >
              {/* <GoEye style={{ fontSize: "24px" }} /> */}
              See Details
            </Button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="border p-2 rounded !border-highlight-color"
        >
          {/* View Details Tooltip */}{" "}
          <p
            onClick={() => {
              dispatch(setOfferCarInfo(record));
              navigate.push(
                `private-offer-car-aggrement/contract/${record?._id}`
              );
            }}
            // href={`private-offer-car-aggrement/contract/${record?._id}`}
          >
            <Tooltip placement="right" title="View Contract Details">
              <Button
                className={`  !text-white ${
                  record.status == "sold"
                    ? "!bg-green-500 "
                    : "!bg-highlight-color"
                }`}
              >
                {record.status == "sold" ? "See Contract " : " Make contract"}
              </Button>
            </Tooltip>
          </p>
          <Link
            href={`total-dealer-car-sell/order-transport/${record?.car?._id}`}
          >
            <Tooltip placement="right" title="View Details">
              <Button className="!border-highlight-color !text-black ">
                {/* <GoEye style={{ fontSize: "24px" }} /> */}
                Order Transport
              </Button>
            </Tooltip>
          </Link>
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
          showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default OfferCarAcceptTable;
