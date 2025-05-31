"use client";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";

const PrivateCarSellTable = ({
  data,
  loading,
  showViewServiceUserModal,
  meta,
  onPageChange,
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
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <p className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </p>
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.brand}</p>,
    },
    {
      title: "Contract Paper",
      key: "action",
      render: (_, record) => (
        <Link
          href={`/dashboard/total-private-car-sell/contract/${record?.car?._id}`}
        >
          <Tooltip placement="right" title="View Details">
            {/* {record.contractPaper} */}See paper
          </Tooltip>
        </Link>
      ),
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Color",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.color}</p>,
    },
    {
      title: "Price",
      dataIndex: "car",
      sorter: (a, b) => a.car.expectedPrice - b.car.expectedPrice,
      render: (text) => (
        <div>
          <p className="whitespace-nowrap">
            {text?.isBid ? text.bidPrice : text.expectedPrice}Dkk
          </p>
        </div>
      ),
    },
    {
      title: "Service Charge",
      dataIndex: "car",
      sorter: (a, b) => a.car.expectedPrice - b.car.expectedPrice,
      render: (text) => (
        <div>
          <p className="whitespace-nowrap">
            {/* {text?.expectedPrice * 0.25} */}
            {text.isBid ? text.bidPrice * 0.25 : text.expectedPrice * 0.25} DKK
          </p>
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
  ];

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 5)}</pre> */}
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

export default PrivateCarSellTable;
