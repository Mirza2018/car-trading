"use client";

import { useGetBrandQuery } from "@/redux/api/features/carPrivate";
import { Select, Button, Slider, DatePicker } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

const fuelOptions = [
  { label: "Alle brændstoftyper", value: "ALL" },
  { label: "EL", value: "EL" },
  { label: "Benzin", value: "Benzin" },
  { label: "Hybrid Benzin", value: "Hybrid Benzin" },
  { label: "Plug-In Benzin", value: "Plug-In Benzin" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hybrid Diesel", value: "Hybrid Diesel" },
  { label: "Plug-In Diesel", value: "Plug-In Diesel" },
];

const SubmitListingFilterSection = ({ onFinishPrivate }) => {
  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandQuery();
  const brands = brandData?.data || [];

  // All filter states
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [modelYearRange, setModelYearRange] = useState([null, null]);
  const [kmRange, setKmRange] = useState([0, 50000]);

  const handleFinish = () => {
    const filters = {};

    if (brand && brand !== "ALL") filters.mark = brand;
    if (fuelType && fuelType !== "ALL") filters.fuel = fuelType;

    if (modelYearRange[0] && modelYearRange[1]) {
      filters.modelsFrom = modelYearRange[0].year();
      filters.modelsTo = modelYearRange[1].year();
    }

    filters.drivenKmFrom = kmRange[0];
    filters.drivenKmTo = kmRange[1];

    onFinishPrivate(filters);
  };

  // 🔥 PERFECT RESET - CLEARS EVERYTHING
  const handleReset = () => {
    setBrand("");
    setFuelType("");
    setModelYearRange([null, null]);
    setKmRange([0, 50000]);
    onFinishPrivate({}); // This clears parent queryParams
  };

  const formatKm = (value) => `${value.toLocaleString()} km`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {/* Brand */}
        <div>
          <label className="text-lg font-semibold block mb-3">Mærke</label>
          <Select
            value={brand}
            onChange={setBrand}
            placeholder="Vælg mærke"
            loading={isLoadingBrand}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            className="w-full"
            size="large"
            allowClear
          >
            <Option value="ALL">Alle mærker</Option>
            {brands.map((brandItem) => (
              <Option key={brandItem._id} value={brandItem.name}>
                {brandItem.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Year Range */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Årgang</h3>
          <RangePicker
            value={modelYearRange}
            onChange={setModelYearRange}
            picker="year"
            size="large"
            className="w-full"
            placeholder={["Fra år", "Til år"]}
            format="YYYY"
          />
        </div>

        {/* KM Range */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Kilometer</h3>
          <div className="space-y-3">
            <Slider
              range
              value={kmRange}
              onChange={setKmRange}
              min={0}
              max={500000}
              step={1000}
              tipFormatter={formatKm}
              tooltipPlacement="top"
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatKm(kmRange[0])}</span>
              <span>{formatKm(kmRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-lg font-semibold block mb-3">Brændstof</label>
          <Select
            value={fuelType}
            onChange={setFuelType}
            placeholder="Vælg brændstof"
            options={fuelOptions}
            size="large"
            className="w-full"
            allowClear
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button
          block
          size="large"
          onClick={handleReset}
          className="bg-gray-100 hover:bg-gray-200 border-gray-300 font-semibold px-12 py-6 text-lg rounded-2xl"
        >
          Nulstil
        </Button>
        <Button
          type="primary"
          onClick={handleFinish}
          size="large"
          className="bg-highlight-color hover:bg-highlight-color/90 text-white font-semibold px-12 py-6 text-xl rounded-2xl shadow-md hover:shadow-lg transition flex-1 sm:flex-none"
        >
          Søg
        </Button>
      </div>
    </div>
  );
};

export default SubmitListingFilterSection;
