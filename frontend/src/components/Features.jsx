import { motion } from "framer-motion";
import { FaRobot, FaDatabase, FaBullseye } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-8xl text-cyan-600" />,
    title: "Automated Analysis",
    text: "Rapidly analyze ballistic evidence using automated algorithms."
  },
  {
    icon: <FaDatabase className="text-8xl text-cyan-600" />,
    title: "Comprehensive Database",
    text: "Access and match evidence from an extensive database."
  },
  {
    icon: <FaBullseye className="text-8xl text-cyan-600" />,
    title: "High-Accuracy Matching",
    text: "Ensure reliable results through advanced pattern analysis."
  }
];

export default function Features() {
  return (
    <section  id="features" className="py-20 px-8 bg-gray-50">
      <h3 className="text-3xl font-bold text-center mb-9 text-cyan-800 font-serif">
        ---- Features ----
      </h3>
      <h5 className="text-xl font-bold text-center mb-12 text-cyan-700 font-serif">
        Bridge the Gap in Ballistic Forensics
      </h5>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="group [perspective:1000px]"
          >
            <div className="relative h-64 w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center rounded-2xl shadow-xl backface-hidden">
              <div className="absolute inset-0 rounded-2xl border-4 border-cyan-400 border-dashed pointer-events-none"></div>
              {f.icon}
             <h4 className="text-xl font-semibold mt-4">{f.title}</h4>
            </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-cyan-600 text-white flex flex-col items-center justify-center rounded-2xl shadow-xl [transform:rotateY(180deg)] backface-hidden px-6 text-center">
              <div className="absolute inset-2 rounded-2xl border-4 border-white border-dashed pointer-events-none "></div>
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p>{f.text}</p>
             </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
