/* eslint-disable react/prop-types */
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";
import { GoEye } from "react-icons/go";

// Function to get unique company names
const getUniqueCompanyNames = (data) => {
  const companyNames = data.map((item) => item.companyName);
  return [...new Set(companyNames)]; // Remove duplicates by converting array to a Set and back to an array
};

const CarListTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "SL.",
      dataIndex: "sl",
      key: "sl",
      responsive: ["md"],
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => (
        <div>
          <p>{record.price}$</p>
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
          <Link href={`total-dealer-car-sell/contract/777`}>
            <Tooltip placement="right" title="View Details">
              <Button className="!bg-highlight-color   !text-white">
                Make contract
              </Button>
            </Tooltip>
          </Link>
          <Link href={`total-dealer-car-sell/order-transport/444`}>
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
      <Table
        columns={columns}
        dataSource={data} // Use the filtered data here based on selected company
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default CarListTable;
