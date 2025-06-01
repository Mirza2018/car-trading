"use client";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";

const PrivateCarSoldTable = ({
  data,
  loading, 
  showViewServiceUserModal,
  meta,
  onPageChange,
}) => {
  const columns = [

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
      render: (text) => <p>{text.brand}</p>,
    },
    // {
    //   title: "Contract Paper",
    //   key: "contractPaper",
    //   key: "action",
    //   render: (_, record) => (
    //     <Link
    //       href={`/dashboard/total-private-car-sell/contract/${record.car._id}`}
    //     >
    //       <Tooltip placement="right" title="View Details">
    //         {/* {record.contractPaper} */}See paper
    //       </Tooltip>
    //     </Link>
    //   ),
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Color",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text.color}</p>,
    },
    {
      title: "Price",
      dataIndex: "car",
      sorter: (a, b) => a.car.expectedPrice - b.car.expectedPrice,
      render: (text) => (
        <div>
          <p className="whitespace-nowrap">
            {text.isBid ? text.bidPrice : text.expectedPrice}
            .kr
          </p>
        </div>
      ),
    },
    // {
    //   title: "Service Charge",
    //   dataIndex: "serviceCharge",
    //   sorter: (a, b) => a.serviceCharge - b.serviceCharge,
    //   render: (_, record) => (
    //     <div>
    //       <p>{record.serviceCharge}$</p>
    //     </div>
    //   ),
    // },

    {
      title: "Status",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* View Details Tooltip */}

          <Tooltip placement="right" title="View Details">
            <Button
              onClick={() => showViewServiceUserModal(record)}
              className="!border-[#00721E] !text-black"
            >
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
        <Space size="middle">
          {/* View Details Tooltip */}
          <Link
            href={`/dashboard/total-private-car-sell/contract/${record?.car?._id}`}
          >
            <Tooltip placement="right" title="View Details">
              {!record?.signatureAsDealer && !record?.signatureAsOwner && (
                <Button className={`  !text-white !bg-secondary-color`}>
                  {" "}
                  <p>Make your contract</p>{" "}
                </Button>
              )}
              {record?.signatureAsDealer && !record?.signatureAsOwner && (
                <Button className={`  !text-white !bg-highlight-color !px-5`}>
                  {" "}
                  <p>Pending contract</p>{" "}
                </Button>
              )}
              {record?.signatureAsDealer && record?.signatureAsOwner && (
                <Button className={`  !text-white !bg-green-500 !px-7`}>
                  {" "}
                  <p>Contract Done</p>{" "}
                </Button>
              )}
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

export default PrivateCarSoldTable;
