import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

export default function AboutUsIntro() {
  return (
    <main className="container mx-auto">
      {/* Header */}
      <h1
        style={{ fontSize: "clamp(20px, 3vw + 1rem ,40px)" }}
        className=" font-bold text-gray-900 "
      >
        About Us
      </h1>

      {/* Main Content */}

      <div className="grid md:grid-cols-2 mt-12 gap-5">
        <h2
          style={{ fontSize: "clamp(18px, 3vw + 1rem ,38px)" }}
          className=" font-bold text-[#050B20]leading-tight max-w-xl  "
        >
          We Value Our Clients And Want Them To Have A Nice Experience
        </h2>

        <p className="text-[#050B20] leading-relaxed text-[15px] mx-2">
          At Car Trading, our clients are at the heart of everything we do. We
          are committed to ensuring they have a seamless and enjoyable
          experience at every step of their journey with us. From personalized
          attention to exceptional service, we strive to exceed expectations and
          create lasting impressions. Your satisfaction and comfort are our top
          priorities, and we work tirelessly to deliver solutions that meet your
          unique needs. With Car Trading, you're not just a client; you're part
          of our community. Let us make your experience extraordinary.
        </p>
      </div>

      <div class="grid md:grid-cols-10 grid-cols-3 gap-4 my-14">
        {/* <!-- First Column for the text "45 Years in Business" --> */}
        <div class="md:col-span-2 sm:col-span-1 col-span-3 grid grid-rows-2   gap-4">
          <div className="bg-secondary-color flex justify-center items-center flex-col rounded-xl">
            <p className="text-5xl font-medium ">45</p>
            <p className="text-3xl font-bold ">Years in Business</p>
          </div>
          <Image
            src={AllImages.about1}
            alt="Handing car keys"
            class="w-full h-full object-cover  rounded-xl"
          />
        </div>

        {/* <!-- Second Column for the main image of the man in the showroom --> */}
        <div class="md:col-span-4 sm:col-span-2 col-span-3">
          <Image
            src={AllImages.about2}
            alt="Car showroom"
            class="w-full h-full object-cover  rounded-xl"
          />
        </div>

        {/* <!-- Third Column for smaller images --> */}
        <div class="md:col-span-4  col-span-3 grid grid-rows-3 gap-4">
          <div class="row-span-2">
            <Image
              src={AllImages.about3}
              alt="Showroom"
              class="w-full h-full object-cover  rounded-xl"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Image
              src={AllImages.about4}
              alt="Handing car keys"
              class="w-full h-full object-cover  rounded-xl"
            />
            <Image
              src={AllImages.about5}
              alt="Handshake"
              class="w-full h-full object-cover  rounded-xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
