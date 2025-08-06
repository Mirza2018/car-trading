import { useGetBrandQuery } from "@/redux/api/features/carPrivate";
import { Form, Input, Select } from "antd";
import React from "react";
const { Option } = Select;
const FilterSection = ({ onFinish }) => {
  const { data: allBrand, isLoading: isLoadingBrand } = useGetBrandQuery();
  return (
    <Form onFinish={onFinish}>
      <div className="flex md:flex-row flex-col justify-between items-center md:gap-5 mx-2">
        <div className="grid lg:grid-cols-4  grid-cols-2  gap-2 md:my-12 mt-4 flex-1">
          <div className="flex flex-col justify-between">
            <h1 className="sm:text-2xl font-bold">Mark</h1>
            <Form.Item name="brand">
              <Select
                className="sm:!h-10"
                placeholder="Vælg et mærke"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.value.toLowerCase().includes(input.toLowerCase())
                }
              >
                {allBrand?.data?.map((brand) => (
                  <Option key={brand._id} value={brand.name}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{brand.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>
            <h1 className="sm:text-2xl font-bold">Modelår</h1>
            <div className="flex  justify-between gap-5">
              <Form.Item
                label={<span className="sm:font-medium text-base">Fra</span>}
                name="modelYearFrom"
                className="flex-1"
              >
                <Input placeholder="Before 1975" />
              </Form.Item>
              <Form.Item
                label={<span className="sm:font-medium text-base">Til</span>}
                name="modelYearTo"
                className="flex-1"
              >
                <Input placeholder="2025" />
              </Form.Item>
            </div>
          </div>
          <div>
            <h1 className="sm:text-2xl font-bold">Kørte km</h1>
            <div className="flex  justify-between gap-5">
              <Form.Item
                label={<span className="sm:font-medium text-base">Fra</span>}
                name="drivenKmFrom"
                className="flex-1"
              >
                <Input placeholder="0" />
              </Form.Item>
              <Form.Item
                label={<span className="sm:font-medium text-base">Til</span>}
                name="drivenKmTo"
                className="flex-1"
              >
                <Input placeholder="50000+" />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="sm:text-2xl font-bold">Brændstof</h1>
            <Form.Item name="fuelType">
              
              <Select
                placeholder={
                  <span className="text-black text-xl">Brændstof</span>
                }
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
          <button className=" xl:text-3xl lg:text-2xl  md:text-xl  font-medium sm:rounded-2xl rounded-md xl:px-11 lg:px-8 md:px-5 px-2 py-2 md:py-3 bg-highlight-color text-white">
            Søg
          </button>
        </div>
      </div>
    </Form>
  );
};

export default FilterSection;

const carBrands = [
  { label: "Acura", value: "Acura" },
  { label: "Alfa Romeo", value: "Alfa Romeo" },
  { label: "Aston Martin", value: "Aston Martin" },
  { label: "Audi", value: "Audi" },
  { label: "Bentley", value: "Bentley" },
  { label: "BMW", value: "BMW" },
  { label: "Buick", value: "Buick" },
  { label: "Cadillac", value: "Cadillac" },
  { label: "Chevrolet", value: "Chevrolet" },
  { label: "Chrysler", value: "Chrysler" },
  { label: "Citroën", value: "Citroën" },
  { label: "Dacia", value: "Dacia" },
  { label: "Daewoo", value: "Daewoo" },
  { label: "Datsun", value: "Datsun" },
  { label: "Dodge", value: "Dodge" },
  { label: "Ferrari", value: "Ferrari" },
  { label: "Fiat", value: "Fiat" },
  { label: "Ford", value: "Ford" },
  { label: "GMC", value: "GMC" },
  { label: "Genesis", value: "Genesis" },
  { label: "Honda", value: "Honda" },
  { label: "Hummer", value: "Hummer" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Infiniti", value: "Infiniti" },
  { label: "Isuzu", value: "Isuzu" },
  { label: "Jaguar", value: "Jaguar" },
  { label: "Jeep", value: "Jeep" },
  { label: "Kia", value: "Kia" },
  { label: "Lamborghini", value: "Lamborghini" },
  { label: "Land Rover", value: "Land Rover" },
  { label: "Lexus", value: "Lexus" },
  { label: "Lincoln", value: "Lincoln" },
  { label: "Lotus", value: "Lotus" },
  { label: "Maserati", value: "Maserati" },
  { label: "Mazda", value: "Mazda" },
  { label: "McLaren", value: "McLaren" },
  { label: "Mercedes-Benz", value: "Mercedes-Benz" },
  { label: "Mini", value: "Mini" },
  { label: "Mitsubishi", value: "Mitsubishi" },
  { label: "Nissan", value: "Nissan" },
  { label: "Pagani", value: "Pagani" },
  { label: "Peugeot", value: "Peugeot" },
  { label: "Porsche", value: "Porsche" },
  { label: "Ram", value: "Ram" },
  { label: "Renault", value: "Renault" },
  { label: "Rolls-Royce", value: "Rolls-Royce" },
  { label: "Saab", value: "Saab" },
  { label: "Scion", value: "Scion" },
  { label: "Smart", value: "Smart" },
  { label: "Subaru", value: "Subaru" },
  { label: "Suzuki", value: "Suzuki" },
  { label: "Tesla", value: "Tesla" },
  { label: "Toyota", value: "Toyota" },
  { label: "Volkswagen (VW)", value: "Volkswagen (VW)" },
  { label: "Volvo", value: "Volvo" },
  { label: "Zenvo (dansk hyperbil)", value: "Zenvo" },
  { label: "Hydrema (dansk arbejdskøretøj)", value: "Hydrema" },
  { label: "Bugatti", value: "Bugatti" },
  { label: "BYD", value: "BYD" },
  { label: "Chery", value: "Chery" },
  { label: "Koenigsegg", value: "Koenigsegg" },
  { label: "Lada", value: "Lada" },
  { label: "Lucid", value: "Lucid" },
  { label: "MG", value: "MG" },
  { label: "Pininfarina", value: "Pininfarina" },
  { label: "Polestar", value: "Polestar" },
  { label: "Rivian", value: "Rivian" },
  { label: "SsangYong", value: "SsangYong" },
  { label: "Proton (malaysisk mærke)", value: "Proton" },
  { label: "Hindustan Motors (indisk mærke)", value: "Hindustan Motors" },
  { label: "Tata Motors (indisk mærke)", value: "Tata Motors" },
  { label: "Mahindra (indisk mærke)", value: "Mahindra" },
  { label: "Geely (kinesisk mærke)", value: "Geely" },
  { label: "NIO (kinesisk elbil)", value: "NIO" },
  { label: "XPeng (kinesisk elbil)", value: "XPeng" },
  { label: "Li Auto (kinesisk elbil)", value: "Li Auto" },
  { label: "Spyker (hollandsk nichemærke)", value: "Spyker" },
  { label: "Rimac (kroatisk el-hyperbil)", value: "Rimac" },
  { label: "VinFast (vietnamesisk mærke)", value: "VinFast" },
];

const fules = [
  { label: "EL", value: "EL" },
  { label: "Benzin", value: "Benzin" },
  { label: "Hybrid Benzin", value: "Hybrid Benzin" },
  { label: "Plug-In Benzin", value: "Plug-In Benzin" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hybrid Diesel", value: "Hybrid Diesel" },
  { label: "Plug-In Diesel", value: "Plug-In Diesel" },
];
