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
      title: "Mærke",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.brand}</p>,
    },
    {
      title: "Model",
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
      title: "Farve",
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
      title: "Pris",
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
          // showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AllCarListTable;
