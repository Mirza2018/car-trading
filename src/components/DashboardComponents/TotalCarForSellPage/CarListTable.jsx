/* eslint-disable react/prop-types */
import { setOfferCarInfo } from "@/redux/slices/offerCarInfoSlice";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const CarListTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize = 0,
  meta,
  onPageChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const columns = [
    // {
    //   title: "SL.",
    //   dataIndex: "sl",
    //   key: "sl",
    //   responsive: ["md"],
    // },
    {
      title: "Brugernavn",
      dataIndex: "carOwner",
      key: "carOwner",
      render: (text) => (
        <p className="whitespace-nowrap">
          {text?.first_name} {text?.last_name}
        </p>
      ),
    },
    {
      title: "Mærkenavn",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.brand}</p>,
    },
    {
      title: "Bilmodel",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.model}</p>,
    },
    {
      title: "Lokation",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <div>{text?.cvrNumber ? <p>{text?.city}</p> : <p>{text?.city}</p>}</div>
      ),
    },
    {
      title: "Farve",
      dataIndex: "carModel",
      key: "carModel",
      render: (text) => <p>{text?.color}</p>,
    },
    {
      title: "Pris",
      dataIndex: "car",
      sorter: (a, b) => a.expectedPrice - b.expectedPrice,
      render: (text) => (
        <div>
          <p className="whitespace-nowrap">
            {text?.isBid ? (
              <div>
                <h1 className="font-medium">
                  {" "}
                  Faktisk pris: {text?.expectedPrice} .kr
                </h1>
                <h1 className="font-medium">Budpris: {text?.bidPrice} .kr</h1>{" "}
              </div>
            ) : (
              <div>
                <h1 className="font-medium">
                  {" "}
                  Faktisk pris: {text?.expectedPrice} .kr
                </h1>
              </div>
            )}{" "}
            {/* {console.log(text?.expectedPrice)} */}
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
        <Space
          size="middle"
          // className="border p-2 rounded !border-highlight-color"
        >
          {/* {console.log(record)} */}
          {/* View Details Tooltip */}{" "}
          <Link href={`total-dealer-car-sell/contract/${record?.car?._id}`}>
            <Tooltip placement="right" title="Se detaljer">
              {!record?.signatureAsDealer && !record?.signatureAsOwner && (
                <Button className={`  !text-white !bg-secondary-color`}>
                  {" "}
                  <p>Opret din kontrakt</p>{" "}
                </Button>
              )}
              {record?.signatureAsDealer && !record?.signatureAsOwner && (
                <Button className={`  !text-white !bg-highlight-color !px-5`}>
                  {" "}
                  <p>Kontrakt afventes</p>{" "}
                </Button>
              )}
              {record?.signatureAsDealer && record?.signatureAsOwner && (
                <Button className={`  !text-white !bg-green-500 !px-7`}>
                  {" "}
                  <p>Kontrakt udført</p>{" "}
                </Button>
              )}
            </Tooltip>
          </Link>
          {record?.signatureAsDealer && record?.signatureAsOwner && (
            <div>
              {record?.isOrderTransport ? (
                <>
                  <Button className="!border !border-green-500 !text-black ">
                    Transport færdig
                  </Button>
                </>
              ) : (
                <p
                  onClick={() => {
                    // dispatch(setOfferCarInfo(record));
                    navigate.push(
                      `total-dealer-car-sell/order-transport/${record?.car?._id}`
                    );
                  }}
                >
                  <Tooltip placement="right" title="Se detaljer">
                    <Button className="!border-highlight-color !text-black ">
                      Bestil transport
                    </Button>
                  </Tooltip>
                </p>
              )}
            </div>
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
        rowKey="id"
        scroll={{ x: true }}
        pagination={{
          current: meta?.page,
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: onPageChange,
          // showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default CarListTable;
