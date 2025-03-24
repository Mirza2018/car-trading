import { Form, Input, Select } from "antd";
import React from "react";

const FilterSection = () => {
  return (
    <div className="flex justify-between items-center gap-5 mx-2">
      <div className="grid lg:grid-cols-4  grid-cols-2  gap-2 my-12 flex-1">
        <div className="flex flex-col justify-between">
          <h1 className="sm:text-2xl font-bold">Mark</h1>
          <Form.Item name="mark">
            <Select
              placeholder={<span className="text-black text-xl">Brands</span>}
              className="sm:!h-10"
              showSearch
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={carBrands}
            />
          </Form.Item>
        </div>
        <div>
          <h1 className="sm:text-2xl font-bold">Model Year</h1>
          <div className="flex  justify-between gap-5">
            <Form.Item
              label={<span className="sm:font-medium text-base">From</span>}
              name="modelFrom"
              className="flex-1"
            >
              <Input placeholder="Before 1975" />
            </Form.Item>
            <Form.Item
              label={<span className="sm:font-medium text-base">To</span>}
              name="modelTo"
              className="flex-1"
            >
              <Input placeholder="2025" />
            </Form.Item>
          </div>
        </div>
        <div>
          <h1 className="sm:text-2xl font-bold">Driven km</h1>
          <div className="flex  justify-between gap-5">
            <Form.Item
              label={<span className="sm:font-medium text-base">From</span>}
              name="drivenFrom"
              className="flex-1"
            >
              <Input placeholder="0" />
            </Form.Item>
            <Form.Item
              label={<span className="sm:font-medium text-base">To</span>}
              name="drivenTo"
              className="flex-1"
            >
              <Input placeholder="50000+" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="sm:text-2xl font-bold">Fule</h1>
          <Form.Item name="fule">
            <Select
              placeholder={<span className="text-black text-xl">Fule</span>}
              className="sm:!h-10"
              showSearch
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={fules}
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className=" xl:text-3xl lg:text-2xl  md:text-xl  font-medium sm:rounded-2xl rounded-md xl:px-11 lg:px-8 md:px-4 px-2 py-2 md:py-4 bg-highlight-color text-white">
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterSection;

const carBrands = [
  { label: "Acura", value: "acura" },
  { label: "Alfa Romeo", value: "alfa romeo" },
  { label: "Audi", value: "audi" },
  { label: "BMW", value: "bmw" },
  { label: "Buick", value: "buick" },
  { label: "Cadillac", value: "cadillac" },
  { label: "Chevrolet", value: "chevrolet" },
  { label: "Chrysler", value: "chrysler" },
  { label: "Citroën", value: "citroën" },
  { label: "Dacia", value: "dacia" },
  { label: "Dodge", value: "dodge" },
  { label: "Ferrari", value: "ferrari" },
  { label: "Fiat", value: "fiat" },
  { label: "Ford", value: "ford" },
  { label: "GMC", value: "gmc" },
  { label: "Honda", value: "honda" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Infiniti", value: "infiniti" },
  { label: "Jaguar", value: "jaguar" },
  { label: "Jeep", value: "jeep" },
  { label: "Kia", value: "kia" },
  { label: "Lamborghini", value: "lamborghini" },
  { label: "Land Rover", value: "land rover" },
  { label: "Lexus", value: "lexus" },
  { label: "Lincoln", value: "lincoln" },
  { label: "Maserati", value: "maserati" },
  { label: "Mazda", value: "mazda" },
  { label: "McLaren", value: "mclaren" },
  { label: "Mercedes-Benz", value: "mercedes-benz" },
  { label: "Mini", value: "mini" },
  { label: "Mitsubishi", value: "mitsubishi" },
  { label: "Nissan", value: "nissan" },
  { label: "Pagani", value: "pagani" },
  { label: "Peugeot", value: "peugeot" },
  { label: "Porsche", value: "porsche" },
  { label: "Ram", value: "ram" },
  { label: "Renault", value: "renault" },
  { label: "Rolls-Royce", value: "rolls-royce" },
  { label: "Saab", value: "saab" },
  { label: "Subaru", value: "subaru" },
  { label: "Suzuki", value: "suzuki" },
  { label: "Tesla", value: "tesla" },
  { label: "Toyota", value: "toyota" },
  { label: "Volkswagen (VW)", value: "volkswagen (vw)" },
  { label: "Volvo", value: "volvo" },
];
const fules = [
  { label: "Electric Car", value: "electricCar" },
  { label: "Petrol", value: "petrol" },
  { label: "Diesel", value: "diesel" },
  { label: "Hybrid - Gasoline", value: "hybridGasoline" },
  { label: "Hybrid - Diesel", value: "hybridDiesel" },
  { label: "Plug-in - Petrol", value: "pluginPetrol" },
  { label: "Plug-in - Diesel", value: "pluginDiesel" },
];
