import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSearch, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { useCountry } from "../../contexts/CountryContext";
import { useState, useEffect, useRef } from "react";

const Navbar: React.FC = () => {
  const { selectedCountry, setSelectedCountry, countries, isLoading } = useCountry();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setIsCountryDropdownOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.nav 
      className="bg-white shadow-lg sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">📞 +598 1234 5678</span>
            <span className="hidden sm:inline">✉️ info@alkastelecom.com</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative" ref={dropdownRef}>
              <motion.button
                className={clsx(
                  "bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-3 py-2 pr-8 text-sm font-medium",
                  "hover:bg-white/30 hover:border-white/50 transition-all duration-300",
                  "focus:ring-2 focus:ring-white/50 focus:border-white/70 focus:outline-none",
                  "shadow-lg hover:shadow-xl flex items-center space-x-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                onClick={toggleCountryDropdown}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={`https://flagcdn.com/w20/${countries.find(
                    (country) => country.name === selectedCountry
                  )?.code.toLowerCase()}.png`}
                  alt={`${selectedCountry} flag`}
                  className="w-5 h-4 rounded-sm"
                />
                <span>{selectedCountry}</span>
                <motion.div
                  animate={{ rotate: isCountryDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="w-3 h-3 text-white/70" />
                </motion.div>
              </motion.button>

              {isLoading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}

              <AnimatePresence>
                {isCountryDropdownOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="pb-2">
                      {countries.map((country, index) => (
                        <motion.button
                          key={country.code}
                          className={clsx(
                            "w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200",
                            "hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg",
                            selectedCountry === country.name 
                              ? "bg-primary text-white hover:bg-primary-dark" 
                              : "text-gray-700"
                          )}
                          onClick={() => handleCountrySelect(country.name)}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -2 }}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                            alt={`${country.name} flag`}
                            className="w-5 h-4 rounded-sm flex-shrink-0"
                          />
                          <span className="font-medium">{country.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/svg/icon-extender.svg"
                alt="AlkasTelecom Logo"
                className="h-8 cursor-pointer"
              />
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Productos', 'Servicios', 'Planes', 'Ayuda'].map((item, index) => (
                <motion.a 
                  key={item}
                  href="#"
                  className="relative text-gray-700 hover:text-primary font-medium transition-colors duration-300 group py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                >
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className={clsx(
                      "w-64 px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full",
                      "focus:ring-2 focus:ring-primary focus:border-transparent",
                      "transition-all duration-300 text-sm"
                    )}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                </motion.div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button 
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShoppingCart className="text-lg" />
                  <span className="text-sm font-medium">Carrito</span>
                </motion.button>

                <motion.button 
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUser className="text-sm" />
                  <span className="text-sm font-medium">Login</span>
                </motion.button>

                <motion.button
                  className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors duration-300"
                  onClick={toggleMobileMenu}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                <motion.div
                  className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <img
                        src="/svg/icon-extender.svg"
                        alt="AlkasTelecom Logo"
                        className="h-8"
                      />
                      <motion.button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTimes className="text-xl" />
                      </motion.button>
                    </div>

                    <div className="mb-6">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Buscar productos..."
                          className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2 flex-1">
                      {['Productos', 'Servicios', 'Planes', 'Ayuda'].map((item, index) => (
                        <motion.a
                          key={item}
                          href="#"
                          className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-300 text-lg font-medium"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item}
                        </motion.a>
                      ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-gray-200">
                      <motion.button 
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 hover:text-primary border border-gray-300 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaShoppingCart />
                        <span>Carrito</span>
                      </motion.button>
                      
                      <motion.button 
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-accent hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser />
                        <span>Login</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;