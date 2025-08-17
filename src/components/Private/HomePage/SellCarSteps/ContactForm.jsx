"use client";

import { Form, Input, Button } from "antd";

export default function ContactForm({ current, setCurrent }) {
  const onFinish = (values) => {
    // console.log("Success:", values);
    const field1 = JSON.parse(localStorage.getItem("car-field1"));
    const field2 = JSON.parse(localStorage.getItem("car-field2"));
    let data = {...field1, ...field2, ...values};
    console.log(data);

    
    // localStorage.setItem("car-field3", JSON.stringify(values));
    // setCurrent(current + 1);
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-start text-black">
      <h1 className="text-2xl font-bold mb-2">Kontaktinformation</h1>
      <p className=" leading-7 my-6">
        For at give dig det bedste tilbud på din bil, anbefaler vi, at du
        uploader et par billeder af den. Her kan du finde eksempler på de
        vinkler, vi gerne vil have.
      </p>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="font-medium">Fornavn*</span>}
            name="firstName"
            rules={[
              { required: true, message: "Venligst indtast dit fornavn!" },
            ]}
          >
            <Input placeholder="Fornavn" className="bg-gray-50" />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">Efternavn*</span>}
            name="lastName"
            rules={[
              { required: true, message: "Venligst indtast dit efternavn!" },
            ]}
          >
            <Input placeholder="Efternavn" className="bg-gray-50" />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-medium">E-mail adresse*</span>}
          name="email"
          rules={[
            { required: true, message: "Venligst indtast din e-mai" },
            { type: "email", message: "Venligst indtast en gyldig e-mail!" },
          ]}
        >
          <Input placeholder="Nummerplade-nummer" className="bg-gray-50" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            label={<span className="font-medium">Postnummer*</span>}
            name="postalCode"
            rules={[
              { required: true, message: "Venligst indtast dit postnummer!" },
            ]}
          >
            <Input placeholder="Postnummer" className="bg-gray-50" />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">By*</span>}
            name="city"
            className="md:col-span-2"
            rules={[{ required: true, message: "Venligst indtast din by!" }]}
          >
            <Input placeholder="By" className="bg-gray-50" />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="font-medium">Telefonnummer*</span>}
          name="phoneNumber"
          rules={[
            { required: true, message: "enligst indtast dit telefonnummer.!" },
          ]}
        >
          <Input placeholder="Telefonnummer" className="bg-gray-50" />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 border-none h-12 text-base font-medium"
          >
            Opret annoncering
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
