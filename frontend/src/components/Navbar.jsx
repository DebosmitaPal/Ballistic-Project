import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar({ user, onLoginClick, onLogout, onAnalyzeClick, onHomeClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Ballistic Tool Logo" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold italic text-cyan-800 font-serif">BallisticsID</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 relative font-serif">
            <button
              onClick={onHomeClick}
              className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-cyan-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              style={{ fontFamily: "Monotype Corsiva, cursive" }}
            >
              Home
            </button>

            <a
              href="#features"
              className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-cyan-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              style={{ fontFamily: "Monotype Corsiva, cursive" }}
            >
              Features
            </a>

            <a
              href="#process"
              className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-cyan-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              style={{ fontFamily: "Monotype Corsiva, cursive" }}
            >
              How It Works
            </a>

            <a
              href="#contact"
              className="relative inline-block text-3xl text-cyan-600 hover:text-cyan-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-cyan-300 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              style={{ fontFamily: "Monotype Corsiva, cursive" }}
            >
              Contact
            </a>

            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="text-3xl text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg"
                  style={{ fontFamily: "Monotype Corsiva, cursive" }}
                >
                  {user.name}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-cyan-100 z-50">
                    <div className="flex items-center px-5 py-4 border-b border-gray-100 gap-3 bg-cyan-50 rounded-t-2xl">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-300 flex items-center justify-center border-4 border-white shadow">
                        <span className="font-bold text-2xl text-white">{user.name?.[0]}</span>
                      </div>
                      <div>
                        <div className="text-[16px] font-bold text-gray-800">{user.name}</div>
                        <div className="text-gray-500 text-sm">{user.email}</div>
                      </div>
                    </div>

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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className={`${mobileMenuOpen ? "hidden" : "block"} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${mobileMenuOpen ? "block" : "hidden"} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-white/20 shadow-lg px-3 pt-4 pb-6 space-y-1 font-serif">
          <button
            onClick={() => {
              onHomeClick();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-cyan-600 text-2xl py-2 hover:bg-cyan-50 rounded"
          >
            Home
          </button>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-600 text-2xl py-2 hover:bg-cyan-50 rounded"
            style={{ fontFamily: "Monotype Corsiva, cursive" }}
          >
            Features
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-600 text-2xl py-2 hover:bg-cyan-50 rounded"
            style={{ fontFamily: "Monotype Corsiva, cursive" }}
          >
            How It Works
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cyan-600 text-2xl py-2 hover:bg-cyan-50 rounded"
            style={{ fontFamily: "Monotype Corsiva, cursive" }}
          >
            Contact
          </a>

          {user ? (
            <>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left text-red-600 py-2 hover:bg-red-50 rounded"
              >
                Log Out
              </button>

              <button
                onClick={() => {
                  onAnalyzeClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-cyan-600 py-2 hover:bg-cyan-50 rounded"
              >
                Analyze
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left text-cyan-600 py-2 hover:bg-cyan-50 rounded"
            >
              Login
            </button>
          )}
        </nav>
      )}
    </motion.header>
  );
}
