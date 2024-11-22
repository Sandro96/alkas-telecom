import React, { useState, useEffect, createContext, useContext } from "react";
import { FaUser } from "react-icons/fa";
import clsx from "clsx";
import { countries } from "../../assets/data/Countries";

export const CountryContext = createContext<{
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}>({ selectedCountry: "Uruguay", setSelectedCountry: () => {} });

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Uruguay");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryName = countries.find(
          (country) => country.code === data.country_code
        )?.name;

        if (countryName) {
          setSelectedCountry(countryName); 
        } else {
          setSelectedCountry("Uruguay"); 
        }
      } catch (error) {
        console.error("Error al detectar el país:", error);
        setSelectedCountry("Uruguay"); 
      }
    };

    detectCountry();
  }, []);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

const Navbar: React.FC = () => {
  const { selectedCountry, setSelectedCountry } = useContext(CountryContext);

  return (
    <nav className="flex flex-col">
      <div className="h-12 flex justify-between items-center container mx-auto">
        <a className="flex">
          <img
            src="/svg/icon-extender.svg"
            alt="Extender Icon"
            className="h-8 cursor-pointer"
          />
        </a>
        <div className="relative">
          <select
            className={clsx(
              "rounded border border-gray-300 px-4 py-1 cursor-pointer",
              "text-black bg-white hover:border-gray-500 appearance-none pr-12"
            )}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{
              backgroundImage: `url('https://flagcdn.com/w40/${countries.find(
                (country) => country.name === selectedCountry
              )?.code.toLowerCase()}.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "20px 15px",
            }}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-12 bg-primary flex text-lg border-y-2 border-black text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="hidden lg:flex w-80 justify-between">
            <a className="hover:text-accent transition duration-300 hover:scale-105 cursor-pointer">
              Productos
            </a>
            <a className="hover:text-accent transition duration-300 hover:scale-105 cursor-pointer">
              Servicios
            </a>
            <a className="hover:text-accent transition duration-300 hover:scale-105 cursor-pointer">
              Ayuda
            </a>
          </div>
          <div className="flex w-full lg:w-[400px] justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Buscar..."
                className={clsx(
                  "rounded border border-gray-300 px-8 py-1",
                  "text-black bg-white w-full"
                )}
              />
            </div>
            <button className="flex items-center ml-4">
              <FaUser className="h-5 w-5 mr-2" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;