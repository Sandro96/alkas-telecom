import React, { useState, useContext } from "react";
import clsx from "clsx";
import plansBanner from "../../assets/img/banner-plans.webp";
import { plansData, Plan, CountryData } from "../../assets/data/PlansData";
import { CountryContext } from "./Navbar";

const Plans: React.FC = () => {
  const { selectedCountry } = useContext(CountryContext);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedPlan(null);
  };

  const currentCountry: CountryData | undefined = plansData[selectedCountry];

  return (
    <div className="plans my-10">
      <div className="flex flex-col md:flex-row justify-around items-center mx-auto container">
        <form className="flex flex-col justify-between h-[300px]">
          <h2 className="text-2xl font-bold text-center">Planes</h2>

          <select
            className={clsx(
              "w-[360px] h-[50px] rounded shadow-md px-4 text-lg bg-white border-gray-300",
              currentCountry ? "hover:border-gray-500" : "bg-gray-300 cursor-not-allowed"
            )}
            value={selectedCity || ""}
            onChange={handleCityChange}
            disabled={!currentCountry}
          >
            <option value="" disabled>
              Selecciona tu ciudad
            </option>
            {currentCountry?.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            className={clsx(
              "w-[360px] h-[50px] rounded shadow-md px-4 text-lg",
              selectedCity
                ? "bg-white border-gray-300 hover:border-gray-500"
                : "bg-gray-300 cursor-not-allowed"
            )}
            value={selectedPlan?.name || ""}
            onChange={(e) =>
              setSelectedPlan(
                currentCountry?.plans[selectedCity!].find((plan) => plan.name === e.target.value) || null
              )
            }
            disabled={!selectedCity}
          >
            <option value="" disabled>
              Selecciona tu plan
            </option>
            {selectedCity &&
              currentCountry?.plans[selectedCity]?.map((plan) => (
                <option key={plan.name} value={plan.name}>
                  {plan.name} - {plan.price}
                </option>
              ))}
          </select>

          <button
            type="button"
            disabled={!selectedCity || !selectedPlan}
            className={clsx(
              "w-[150px] h-[50px] rounded font-bold",
              selectedCity && selectedPlan
                ?"inline-block font-bold bg-primary text-white py-2 px-6 rounded hover:bg-accent hover:text-black hover:scale-105 transition duration-300 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            Lo quiero
          </button>
        </form>

        <div
          className="w-[360px] h-[450px] bg-cover bg-center shadow-md mt-8 md:mt-0 md:ml-8"
          style={{ backgroundImage: `url(${plansBanner})` }}
        ></div>
      </div>
    </div>
  );
};

export default Plans;
