"use client";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";

const AllCarListTable = ({
  data,
  loading,
  showViewServiceUserModal,
  meta,
  onPageChange,
}) => {
  const columns = [
    {
      title: "Brand Name",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.brand}</p>,
    },
    {
      title: "Model Name",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.model}</p>,
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
      render: (text) => (
        <p>
          {text?.color ? <>{text?.color}</> : "Ukendt"}
          {/* {text?.color} {console.log(text)} */}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "expectedPrice",
      sorter: (a, b) => a.expectedPrice - b.expectedPrice,
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

export default AllCarListTable;
