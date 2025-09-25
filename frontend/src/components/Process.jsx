import { motion } from "framer-motion";
import { FaUpload, FaCog, FaSearch } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload className="text-4xl text-cyan-600 mb-4 mx-auto" />,
    title: " Upload Evidence",
    text: "Easily upload high-resolution images or scans of ballistic evidence.",
  },
  {
    icon: <FaCog className="text-4xl text-cyan-600 mb-4 mx-auto" />,
    title: " Automated Analysis",
    text: "BallisticsID automatically extracts and analyzes key markings.",
  },
  {
    icon: <FaSearch className="text-4xl text-cyan-600 mb-4 mx-auto" />,
    title: " Database Matching",
    text: "Compares evidence against your database for potential matches.",
  },
];

export default function Process() {
  return (
    <section className="py-35 px-8">
      <h3 className="text-3xl font-bold text-center mb-5 text-teal-800 font-serif">~ How it works ~</h3>
      <h5 className="text-xl font-bold text-center mb-12 text-cyan-700">
        Simple Process, Powerful Results
      </h5>
      <div className="relative max-w-6xl mx-auto">
        {/* Straight dashed line */}
        <div className="absolute left-0 right-0 top-20 border-t-4 border-cyan-400 border-dotted z-0" />
        {/* Bold dots (left, center 3, right) */}
        <div className="absolute top-[76px] w-full h-0 z-10 pointer-events-none">
          {/* Left End Dot */}
          <span className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-3 border-cyan-600 bg-transparent"></span>
          {/* Center of 1st card (left third) */}
          <span className="absolute left-[15.66%] -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-600 ring-9 ring-white text-center text-2xl text-white">1.</span>
          {/* Center of middle card (center) */}
          <span className="absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-600 ring-9 ring-white text-center text-2xl text-white">2.</span>
          {/* Center of 3rd card (right third) */}
          <span className="absolute left-[84.33%] -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-600 ring-9 ring-white text-center text-2xl text-white">3.</span>
          {/* Right End Dot */}
          <span className="absolute right-0 translate-x-1/2 w-4 h-4 rounded-full border-3 border-cyan-600 bg-transparent"></span>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative z-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`bg-cyan-50 p-8 rounded-2xl shadow hover:shadow-lg transition text-center relative z-10 ${
                i % 2 === 0 ? "translate-y-[-130px]" : "translate-y-[120px]"
              }`}
            >
              {s.icon}
              <h4 className="text-xl font-semibold mb-2">{s.title}</h4>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
