"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AllImages } from "@/assets/AllImages";

// Review data
const reviews = [
  {
    id: 1,
    name: "Ali TUFAN",
    role: "Designer",
    rating: 5.0,
    image:
      "",
    text: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Developer",
    rating: 4.8,
    image: "/placeholder.svg?height=600&width=400",
    text: "The attention to detail and customer service was exceptional. I couldn't be happier with my experience working with this team.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Manager",
    rating: 5.0,
    image: "/placeholder.svg?height=600&width=400",
    text: "What impressed me most was their ability to understand exactly what I needed. They delivered beyond my expectations.",
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Marketing Director",
    rating: 4.9,
    image: "/placeholder.svg?height=600&width=400",
    text: "Their innovative approach and professional attitude made the entire process smooth and enjoyable. Highly recommended!",
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Entrepreneur",
    rating: 5.0,
    image: "/placeholder.svg?height=600&width=400",
    text: "Outstanding service from start to finish. They truly understand the importance of customer satisfaction.",
  },
];

export default function CustomerReviews() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const previousReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-12">What our customers say</h2>

      <div className="relative">
        <div className="flex items-center gap-12">
          {/* Navigation Button - Previous */}
          <button
            onClick={previousReview}
            className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous review"
          >
            <IoIosArrowBack className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Image */}
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                <Image
                  src={reviews[currentReview].image || AllImages.profile}
                  alt={reviews[currentReview].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(reviews[currentReview].rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                  {reviews[currentReview].rating.toFixed(1)}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-1">
                {reviews[currentReview].name}
              </h3>
              <p className="text-gray-600 mb-6">
                {reviews[currentReview].role}
              </p>

              <p className="text-gray-700 text-lg leading-relaxed">
                {reviews[currentReview].text}
              </p>
            </div>
          </div>

          {/* Navigation Button - Next */}
          <button
            onClick={nextReview}
            className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next review"
          >
            <IoIosArrowForward className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentReview === index ? "bg-gray-800" : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
