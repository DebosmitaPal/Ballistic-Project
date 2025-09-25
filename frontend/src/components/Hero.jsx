import { motion } from "framer-motion";
import heroBg from "../assets/bg-hero.png";

export default function Hero() {
  return (
    <section className="bg-white py-18 px-4 mt-3">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative text-white text-center rounded-2xl overflow-hidden shadow-xl max-w-7xl mx-auto py-25
      border border-cyan-200 
          backdrop-blur-md 
          bg-white
          before:content-[''] before:absolute before:inset-0 before:rounded-2xl
          before:border before:border-cyan-200 before:blur-[2px]
          hover:shadow-[0_0_25px_2px_rgba(103,232,249,0.7)]
          transition-shadow duration-300"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Advanced Ballistic Identification, Simplified
        </h2>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Leverage cutting-edge technology to rapidly analyze and match ballistic evidence with unparalleled accuracy.
          Empower your investigations with <span className="font-semibold">BallisticsID</span>.
        </p>
        <div className="space-x-4">
         <button className="border border-white px-6 py-3 rounded-lg hover:bg-white/20"
            onClick={() => {
                const featSection = document.getElementById("features");
                if (featSection) {
                featSection.scrollIntoView({ behavior: "smooth" });
          }
        }}>
        Learn More
        </button>
        </div>
      </div>
    </motion.div>
    </section>
  );
}