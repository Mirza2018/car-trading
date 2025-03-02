"use client";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";

const PrivateCarSellTable = ({
  data,
  loading,
  setOpennCarSee,
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
      title: "Dealer Name",
      dataIndex: "dealerName",
      key: "dealerName",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Contract Paper",
      key: "contractPaper",
      key: "action",
      render: (_, record) => (
        <Link href={`/dashboard/total-private-car-sell/${record.sl}`}>
          <Tooltip placement="right" title="View Details">
            {record.contractPaper}
          </Tooltip>
        </Link>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      title: "Service Charge",
      dataIndex: "serviceCharge",
      sorter: (a, b) => a.serviceCharge - b.serviceCharge,
      render: (_, record) => (
        <div>
          <p>{record.serviceCharge}$</p>
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
              onClick={() => setOpennCarSee(true)}
              className="border-[#00721E] hover:border-[#34df61]"
            >
              {/* <GoEye style={{ fontSize: "24px" }} /> */}
              See Details
            </Button>
          </Tooltip>
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

export default PrivateCarSellTable;
