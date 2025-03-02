import BidCar from "@/components/DashboardComponents/BidCarPage/BidCar";
import React from "react";

const BidCarPage = () => {
  return (
    <div>
      {bidsdetails.map((bids) => (
        <BidCar bids={bids} key={bids.id} />
      ))}
    </div>
  );
};

export default BidCarPage;

const bidsdetails = [
  {
    id: "001",
    car: "Toyota Corolla 2020",
    highestBid: "19500",
    bid: true,
  },
  {
    id: "002",
    car: "Toyota Corolla 2020",
    highestBid: "15500",
    bid: false,
  },
  {
    id: "003",
    car: "Toyota Corolla 2020",
    highestBid: "12500",
    bid: true,
  },
  {
    id: "004",
    car: "Toyota Corolla 2020",
    highestBid: "11500",
    bid: false,
  },
  {
    id: "005",
    car: "Toyota Corolla 2020",
    highestBid: "22500",
    bid: true,
  },
];
