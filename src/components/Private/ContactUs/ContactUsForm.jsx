"use client";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { BsMailbox } from "react-icons/bs";
import { FaMapPin, FaPhone } from "react-icons/fa";
import { toast } from "sonner";
 
export default function ContactUsFrom() {
  const [form] = useForm();
  const onFinish = (values) => {
    console.log("About us", values);
    toast.success("Besked sendt succesfuldt");
    form.resetFields();
  };

  return (
    <div className="container mx-auto  py-12">
      <div className="grid lg:grid-cols-7 gap-12">
        <div className="col-span-4">
          <h1 className="text-4xl font-bold mb-4"> Kontakt os</h1>

          <Form onFinish={onFinish} form={form} className="space-y-6 mt-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <p className="absolute  left-4  px-1 text-[13px] text-gray-500 z-10">
                  Fornavn*
                </p>
                <Form.Item name="firstName">
                  <Input
                    required
                    type="text"
                    placeholder="Indtast dit fornavn"
                    className="w-full px-5 py-4 rounded-lg border border-gray-200 "
                  />
                </Form.Item>
              </div>

              <div className="relative">
                <p className="absolute  left-4  px-1 text-[13px] text-gray-500 z-10">
                  Efternavn*
                </p>
                <Form.Item name="lastName">
                  <Input
                    required
                    type="text"
                    placeholder="Indtast dit efternavn"
                    className="w-full  px-5 py-4  rounded-lg border border-gray-200 "
                  />
                </Form.Item>
              </div>
            </div>
            <div className="relative">
              <p className="absolute  left-4  px-1 text-[13px] text-gray-500 z-50">
                Email*
              </p>

              <Form.Item name="email">
                <Input
                  required
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full  px-5 py-4  rounded-lg border border-gray-200 "
                />
              </Form.Item>
            </div>
            <div className="relative">
              <p className="absolute  left-4  px-1 text-[13px] text-gray-500 z-50">
                Telefon*
              </p>
              <Form.Item name="phone">
                <Input
                  type="tel"
                  placeholder="+45 12 34 56 78"
                  className="w-full px-5 py-4 rounded-lg border border-gray-200 "
                />
              </Form.Item>
            </div>
            <div className="relative">
              <p className="absolute  left-4  px-1 text-[13px] text-gray-500 z-50">
                Besked
              </p>

              <Form.Item name="message">
                <Input.TextArea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 "
                />
              </Form.Item>
            </div>
            <button
              type="submit"
              className="bg-highlight-color text-white px-8 py-3 rounded-lg transition-colors"
            >
              Send besked
            </button>
          </Form>
        </div>

        <div className="col-span-3 mt-10">
          <div className="bg-blue-100 p-6 rounded-lg mt-8">
            <h3 className="text-lg text-gray-800 font-semibold mb-2">
              Kontaktoplysninger
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Engrobasen ApS
              <br />
              CVR-nr.: 44013142
              <br />
              Ellehammersvej 2A
              <br />
              7100 Vejle
              <br />
              Danmark
              <br />
              E-mail:{" "}
              <a
                href="mailto:kundeservice@engrobasen.dk"
                className="text-blue-600"
              >
                kundeservice@engrobasen.dk
              </a>
            </p>
          </div>
        </div>
      </div>
   
    </div>
  );
}
