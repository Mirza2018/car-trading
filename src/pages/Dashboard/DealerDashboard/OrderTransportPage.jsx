"use client";
import { useCreateOrderTransportMutation } from "@/redux/api/features/orderTransport";
import { Form, Input } from "antd";
import { toast } from "sonner";

const OrderTransportPage = () => {
  const [transportData] = useCreateOrderTransportMutation();

  const [form] = Form.useForm();

  const onFinishFailed = ({ errorFields }) => {
    console.log(errorFields[0].errors[0]);

    toast.error(errorFields[0].errors[0], {
      id: "error_fields",
      duration: 2000,
    });
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Order transport is Registering..");
    console.log("Success:", values);
    //   {
    //     "companyName": "Rasel Company",
    //     "address": "Reasel Viper",
    //     "contactPerson": "01236987541",
    //     "phone": "039696255",
    //     "email": "raselViper@gmail.com",
    //     "additional": "hello",
    //     "cvr": "1236654"
    // }
    // return;
    try {
      const res = await transportData(values).unwrap();
      console.log(res);
      toast.success(
        res?.data?.message || "Order transport created successfully",
        {
          id: toastId,
          duration: 2000,
        }
      );
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an issue to register Order transoport",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">Order transport</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
          <Form.Item
            className="block"
            label="Company Name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please input your Company Name!",
              },
            ]}
          >
            <Input className="py-2 px-3 text-xl border !border-input-color" />
          </Form.Item>
          <Form.Item
            className=""
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input className="py-2 px-3 text-xl border !border-input-color" />
          </Form.Item>
          <Form.Item
            className=""
            label="Contact Person"
            name="contactPerson"
            rules={[
              {
                required: true,
                message: "Please input your Contact Person!",
              },
            ]}
          >
            <Input className="py-2 px-3 text-xl border !border-input-color" />
          </Form.Item>
          <Form.Item
            className=""
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone number!",
              },
            ]}
          >
            <Input className="py-2 px-3 text-xl border !border-input-color" />
          </Form.Item>
        </div>

        <div className="flex justify-between flex-wrap gap-5">
          <Form.Item
            className="flex-1"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input className="py-2 px-3 text-xl border !border-input-color" />
          </Form.Item>
          <Form.Item className="flex-1" label="Additional" name="additional">
            <Input className="py-2 px-3 text-xl border !border-input-color" />
          </Form.Item>
        </div>
        <Form.Item
          label="CVR"
          name="cvr"
          rules={[
            {
              required: true,
              message: "Please input your CVR!",
            },
          ]}
        >
          <Input className="py-2 px-3 text-xl border !border-input-color" />
        </Form.Item>

        <Form.Item label={null} className="flex justify-end">
          <button
            className="bg-highlight-color text-white font-medium text-xl px-3 py-2 rounded-md"
            htmlType="submit"
          >
            Register
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderTransportPage;
