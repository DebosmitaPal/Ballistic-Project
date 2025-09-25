import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar({ user, onLoginClick, onLogout, onAnalyzeClick, onHomeClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center px-10 py-4 bg-white/30 backdrop-blur-md
                  border-b border-white/20
                  shadow-md sticky top-0 z-50"
    >
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Ballistic Tool Logo" className="h-10 w-auto" />
        <h1 className="text-2xl font-bold italic text-cyan-800 font-serif">BallisticsID</h1>
      </div>
      <nav className="space-x-6 relative">
        <button
          onClick={onHomeClick}
          style={{ fontFamily: "Monotype Corsiva, cursive" }}
          className="relative inline-block text-3xl text-cyan-600
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-full after:bg-cyan-300
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300 after:ease-out
                  hover:after:scale-x-100 "
        >
          Home
        </button>

        <a
          href="#features"
          style={{ fontFamily: "Monotype Corsiva, cursive" }}
          className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-600
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-full after:bg-cyan-300
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300 after:ease-out
                  hover:after:scale-x-100 "
        >
          Features
        </a>

        <a
          href="#process"
          style={{ fontFamily: "Monotype Corsiva, cursive" }}
          className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-600
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-full after:bg-cyan-300
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300 after:ease-out
                  hover:after:scale-x-100 "
        >
          How It Works
        </a>

        <a
          href="#contact"
          style={{ fontFamily: "Monotype Corsiva, cursive" }}
          className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-600
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-full after:bg-cyan-300
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300 after:ease-out
                  hover:after:scale-x-100 "
        >
          Contact
        </a>

        {user ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-3xl text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg"
              style={{ fontFamily: "Monotype Corsiva, cursive" }}
            >
              {user.name}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-cyan-100 z-50">
                {/* Profile header */}
                <div className="flex items-center px-5 py-4 border-b border-gray-100 gap-3 bg-cyan-50 rounded-t-2xl">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-300 flex items-center justify-center border-4 border-white shadow">
                    <span className="font-bold text-2xl text-white">{user.name?.[0]}</span>
                  </div>
                  <div>
                    <div className="text-[16px] font-bold text-gray-800">{user.name}</div>
                    <div className="text-gray-500 text-sm">{user.email}</div>
                  </div>
                </div>

                {/* Help Center */}
                <button
                  className="w-full flex items-center px-5 py-3 text-gray-700 hover:bg-cyan-50 transition text-[16px] gap-3"
                  onClick={() => {
                    setDropdownOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17v-4M12 7h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Help center
                </button>

                {/* Logout */}
                <button
                  className="w-full flex items-center px-5 py-3 text-red-600 hover:bg-red-50 transition text-[16px] gap-3 border-t border-gray-100"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 001.85 2h2.3A2 2 0 0020 19v-2M8 9V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Sign out
                </button>
              </div>
            )}
            <button
              onClick={onAnalyzeClick}
              className="text-3xl text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 ml-4 inline-block"
              style={{ fontFamily: "Monotype Corsiva, cursive" }}
            >
              Analyze
            </button>
          </>
        ) : (
          <button
            onClick={onLoginClick}
            className="text-3xl text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50"
            style={{ fontFamily: "Monotype Corsiva, cursive" }}
          >
            Login
          </button>
        )}
      </nav>
    </motion.header>
  );
}
