import { useState, useEffect } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1 from "../assets/image1.jpg"; 
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
const testimonials = [
  {
    img: image1,
    name: "Arindam Chatterjee",
    title: "Forensic Ballistics Expert",
    text: "The BallisticsID tool streamlined our evidence workflow. Matching and identifying spent cartridges became so much more efficient for my team.",
    rating: 5,
  },
  {
    img: image2,
    name: "Anne Ghosh",
    title: "Crime Scene Analyst",
    text: "Superb accuracy—cross-database matching has saved us countless hours. The analysis reporting is clear and trusted in court.",
    rating: 4,
  },
  {
    img: image3,
    name: "Dr. Amrita Mishra",
    title: "Lab Supervisor",
    text: "Setup was quick, and the support team is stellar. BallisticsID continues to advance forensic investigations for our lab.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intv = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(intv);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="bg-cyan-50 min-h-[60vh] flex flex-col items-center justify-center py-12">
      <h2 className="text-3xl font-bold italic text-center mb-3 font-serif">~ Testimonials ~</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
        {/* Card with image */}
        <div className="relative">
          <div className="rounded-4xl overflow-hidden shadow-lg bg-white  h-[400px] flex items-center justify-center">
            <img
              src={t.img}
              alt={t.name}
              className="object-cover w-[520px] h-[400px] rounded-6xl"
            />
          </div>
        </div>
        {/* Description area */}
        <div className="max-w-lg mx-4 p-6 flex flex-col">
          <div className="mb-2">
            <span className="text-xl font-bold italic">{t.name}</span>
            <div className="text-sm italic opacity-70">{t.title}</div>
          </div>
          <p className="italic mb-4 text-lg">{t.text}</p>
          {/* Ratings (stars) */}
          <div className="mb-6 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < t.rating ? "text-yellow-500" : "text-gray-300"} />
            ))}
          </div>
          {/* Navigation */}
          <div className="flex gap-2 justify-start">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-lg transition hover:bg-gray-700"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-lg transition hover:bg-gray-700"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
