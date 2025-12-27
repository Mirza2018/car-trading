import { useGetBrandQuery } from "@/redux/api/features/carPrivate";
import { Form, Input, Select, Button } from "antd";
import React from "react";

const { Option } = Select;

const fuelOptions = [
  { label: "Alle brændstoftyper", value: "ALL" }, // Use a clear sentinel value
  { label: "EL", value: "EL" },
  { label: "Benzin", value: "Benzin" },
  { label: "Hybrid Benzin", value: "Hybrid Benzin" },
  { label: "Plug-In Benzin", value: "Plug-In Benzin" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hybrid Diesel", value: "Hybrid Diesel" },
  { label: "Plug-In Diesel", value: "Plug-In Diesel" },
];

const FilterSection = ({ onFinish }) => {
  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandQuery();
  const brands = brandData?.data || [];

  const handleFinish = (values) => {
    const filters = [];

    // Handle Brand: exclude if "ALL" or empty
    if (values.brand && values.brand !== "ALL") {
      filters.push(values.brand);
    }

    // Handle Fuel Type: exclude if "ALL"
    if (values.fuelType && values.fuelType !== "ALL") {
      filters.push(values.fuelType);
    }

    const newFilters = {
      page: 1,
      limit: 3,
      ...(filters.length > 0 && { filter: filters }),
      ...(values.modelYearFrom && { modelYearFrom: values.modelYearFrom }),
      ...(values.modelYearTo && { modelYearTo: values.modelYearTo }),
      ...(values.drivenKmFrom && { drivenKmFrom: values.drivenKmFrom }),
      ...(values.drivenKmTo && { drivenKmTo: values.drivenKmTo }),
    };

    // Only trigger update if something meaningful changed
    onFinish(newFilters);
  };

  return (
    <Form onFinish={handleFinish} layout="vertical">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {/* Brand */}
          <Form.Item
            label={<span className="text-lg font-semibold">Mærke</span>}
            name="brand"
          >
            <Select
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
              {brands.map((brand) => (
                <Option key={brand._id} value={brand.name}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Year Range */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Årgang</h3>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="modelYearFrom" noStyle>
                <Input
                  placeholder="Fra (f.eks. 2010)"
                  size="large"
                  type="number"
                />
              </Form.Item>
              <Form.Item name="modelYearTo" noStyle>
                <Input
                  placeholder="Til (f.eks. 2025)"
                  size="large"
                  type="number"
                />
              </Form.Item>
            </div>
          </div>

          {/* KM Range */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Kilometer</h3>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="drivenKmFrom" noStyle>
                <Input placeholder="Fra" size="large" type="number" />
              </Form.Item>
              <Form.Item name="drivenKmTo" noStyle>
                <Input placeholder="Til" size="large" type="number" />
              </Form.Item>
            </div>
          </div>

          {/* Fuel Type */}
          <Form.Item
            label={<span className="text-lg font-semibold">Brændstof</span>}
            name="fuelType"
          >
            <Select
              placeholder="Vælg brændstof"
              options={fuelOptions}
              size="large"
              className="w-full"
            />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-highlight-color hover:bg-highlight-color/90 text-white font-semibold px-12 py-6 text-xl rounded-2xl shadow-md hover:shadow-lg transition"
          >
            Søg
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default FilterSection;
