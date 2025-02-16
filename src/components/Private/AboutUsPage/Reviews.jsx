import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

export default function Reviews() {
  const testimonials = [
    {
      title: "Great Work",
      quote:
        "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
      author: "Leslie Alexander",
      role: "Facebook",
      avatar: "",
    },
    {
      title: "Awesome Design",
      quote:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et.",
      author: "Jenny Wilson",
      role: "UI/UX Designer",
      avatar: "",
    },
    {
      title: "Perfect Quality",
      quote:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.",
      author: "Courtney Henry",
      role: "Software Developer",
      avatar: "",
    },
  ];

  return (
    <div className="container mx-auto  py-16 relative ">
      <h2 className="text-3xl font-bold mb-12">What our customers say</h2>

      {/* Large quote mark decoration */}
      <div className="absolute right-4 text-8xl text-black font-serif">‘‘</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{testimonial.title}</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={AllImages.profile}
                alt={testimonial.author}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
