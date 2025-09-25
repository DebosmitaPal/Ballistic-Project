import { FaLinkedin, FaGithub, FaYoutube, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-cyan-200 via-cyan-50 to-cyan-300 min-h-[320px] py-8 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full mx-auto rounded-3xl shadow-2xl bg-cyan-50/95 px-6 py-8 flex flex-col gap-6 md:gap-0 md:flex-row items-start md:justify-between">
        {/* Left Block: Logo, Project Name, Description, Socials */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {/* Logo example (replace as desired) */}
            <img src={logo} alt="Ballistic Tool Logo" className="h-7 w-auto" />
            <span className="text-2xl font-bold italic font-serif text-cyan-800 ml-2">BallisticsID</span>
          </div>
          <p className="italic text-lg text-cyan-600 mb-2 max-w-md">
            BallisticsID streamlines forensic evidence analysis with rapid, accurate ballistic image recognition. Effortless, secure, and laboratory trusted.
          </p>
          <div className="flex gap-4 mt-3">
            <a href="#" aria-label="LinkedIn"><FaLinkedin className="text-4xl text-blue-600 bg-white rounded-lg p-1 hover:scale-110 transition" /></a>
            <a href="#" aria-label="GitHub"><FaGithub className="text-4xl text-black bg-white rounded-lg p-1 hover:scale-110 transition" /></a>
            <a href="#" aria-label="YouTube"><FaYoutube className="text-4xl text-red-600 bg-white rounded-lg p-1 hover:scale-110 transition" /></a>
            <a href="mailto:support@ballisticsid.com" aria-label="Email"><FaEnvelope className="text-4xl text-blue-700 bg-white rounded-lg p-1 hover:scale-110 transition" /></a>
          </div>
        </div>
        {/* Right Block: Navigation Links */}
        <div className="flex flex-col w-full md:w-auto items-end mt-6 md:mt-0">
          <div className="mb-3 flex gap-6 text-xl font-serif italic">
            <a href="#hero" className="text-cyan-600 hover:text-cyan-800 transition">Home</a>
            <a href="#features" className="text-cyan-600 hover:text-cyan-800 transition">Features</a>
            <a href="#process" className="text-cyan-600 hover:text-cyan-800 transition">Process</a>
          </div>
          <div className="text-cyan-600 italic hover:text-cyan-800 transition text-xl">
            Email: support@ballisticid.com
          </div><br/><br/>
          <hr className="my-3 border-violet-200 w-full" />
          <div className="text-cyan-700 italic hover:text-cyan-800 transition text-l">
            © 2025 BallisticsID. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
