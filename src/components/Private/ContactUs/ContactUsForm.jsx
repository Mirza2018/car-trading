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

        <div className="col-span-3">
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
      <div className="container mx-auto p-8 bg-gray-50 rounded-lg ">
        <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
          VILKÅR & HANDELSBETINGELSER FOR ENGROBASEN
        </h1>

        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Disse vilkår og handelsbetingelser gælder for brugen af engrobasen
            og regulerer forholdet mellem private brugere, bilforhandlere og
            engrobasen som formidlende platform. Ved anvendelse af platformen
            accepterer brugeren nedenstående vilkår.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Om engrobasen
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Engrobasen drives af Engrobasen ApS og fungerer som en uafhængig
            digital formidlingsplatform, hvor private kan sælge biler direkte
            til professionelle bilforhandlere. Engrobasen er ikke part i den
            handel, der indgås mellem sælger og bilforhandler.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. Platformens rolle
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Engrobasen stiller alene platformen til rådighed og påtager sig
            intet ansvar for aftalens indhold, gennemførelse, betaling eller
            levering.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Brug af platformen
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Det er gratis for private at oprette og anvende engrobasen.
            Bilforhandlere kan afgive bud og gennemføre handler i henhold til
            gældende vilkår. Engrobasen opkræver udelukkende salær fra
            bilforhandlere, og kun ved gennemført handel.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Bud og accept
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Bilforhandlere kan afgive bud på biler via platformen. Når en sælger
            accepterer et bud, er aftalen bindende mellem sælger og
            bilforhandler.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Betaling
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Betaling sker direkte mellem sælger og bilforhandler. Engrobasen
            håndterer ikke betaling og har intet ansvar for købesummens
            overførsel.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. Overdragelse
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Afhentning og levering aftales direkte mellem parterne. Handlen skal
            som udgangspunkt gennemføres inden for 7 kalenderdage efter accept.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. Oplysninger og ansvar
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sælger er ansvarlig for, at alle oplysninger om bilen er korrekte,
            og at bilen er fri for gæld og hæftelser, medmindre andet er aftalt.
            Hvis bilens stand afviger væsentligt fra det oplyste, kan forhandler
            annullere eller genforhandle handlen.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            8. Ansvarsfraskrivelse
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Engrobasen fraskriver sig ethvert ansvar for:
            <ul className="list-disc ml-6">
              <li>Bilens stand og oplysninger</li>
              <li>Betaling, levering eller afhentning</li>
              <li>Uenigheder mellem parterne</li>
              <li>Direkte eller indirekte tab</li>
            </ul>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            9. Ændringer
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Engrobasen forbeholder sig retten til at ændre vilkårene. Gældende
            vilkår vil altid være tilgængelige på hjemmesiden.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            10. Immaterielle rettigheder
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Alt indhold på platformen tilhører Engrobasen ApS og må ikke
            anvendes uden skriftligt samtykke.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            11. Lovvalg og værneting
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vilkårene er underlagt dansk ret. Eventuelle tvister afgøres ved de
            danske domstole.
          </p>
        </div>
      </div>
    </div>
  );
}
