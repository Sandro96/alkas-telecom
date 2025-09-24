import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import clsx from "clsx";
import plansBanner from "../../assets/img/banner-plans.webp";
import { Plan, CountryData } from "../../assets/data/PlansData";
import { useCountry } from "../../contexts/CountryContext";
import { usePlans } from "../../hooks/useServices";
import { usePricing } from "../../hooks/usePricing";
import { Button } from "../ui/Button";

const Plans: React.FC = () => {
  const { selectedCountry } = useCountry();
  const { getPlansByCountry } = usePlans();
  const { getPlansByCity } = usePricing(selectedCountry);
  
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reiniciar planes cuando cambie el país
  useEffect(() => {
    setSelectedCity(null);
    setSelectedPlan(null);
  }, [selectedCountry]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedPlan(null);
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plans = selectedCity ? getPlansByCity(selectedCity) : [];
    const plan = plans.find((plan: Plan) => plan.name === e.target.value);
    setSelectedPlan(plan || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCity || !selectedPlan) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    console.log('Plan seleccionado:', { selectedCountry, selectedCity, selectedPlan });
  };

  const currentCountry: CountryData | undefined = getPlansByCountry(selectedCountry);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.section 
      className="plans my-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row justify-around items-center mx-auto container px-4">
        <motion.form 
          className="flex flex-col justify-between h-[400px] w-full max-w-md"
          variants={itemVariants}
          onSubmit={handleSubmit}
        >
          <motion.h2 
            className="text-3xl font-bold text-center text-primary mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Nuestros Planes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País seleccionado: <span className="font-bold text-primary">{selectedCountry}</span>
            </label>
            <select
              className={clsx(
                "w-full h-[50px] rounded-lg shadow-md px-4 text-lg border-2 transition-all duration-300",
                "focus:ring-2 focus:ring-primary focus:border-transparent",
                currentCountry 
                  ? "bg-white border-gray-300 hover:border-gray-500" 
                  : "bg-gray-300 cursor-not-allowed border-gray-300"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan disponible
            </label>
            <select
              className={clsx(
                "w-full h-[50px] rounded-lg shadow-md px-4 text-lg border-2",
                "focus:ring-2 focus:ring-primary focus:border-transparent",
                selectedCity
                  ? "bg-white border-gray-300 hover:border-gray-500 transition-all duration-300"
                  : "bg-gray-300 cursor-not-allowed border-gray-300"
              )}
              value={selectedPlan?.name || ""}
              onChange={handlePlanChange}
              disabled={!selectedCity}
            >
              <option value="" disabled>
                Selecciona tu plan
              </option>
              {selectedCity &&
                getPlansByCity(selectedCity).map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name} - {plan.price}
                  </option>
                ))}
            </select>
          </motion.div>

          <div className="mt-8">
            {(!selectedCity || !selectedPlan) ? (
              <button
                type="button"
                disabled
                className="w-full h-12 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
              >
                Contratar Plan
              </button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Procesando...' : 'Contratar Plan'}
              </Button>
            )}
          </div>

          {selectedPlan && (
            <motion.div
              className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="font-bold text-primary mb-2">Plan Seleccionado:</h3>
              <p className="text-gray-700">
                <span className="font-semibold">{selectedPlan.name}</span> - {selectedPlan.price}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Ciudad: {selectedCity}
              </p>
            </motion.div>
          )}
        </motion.form>

        <div
          className="w-[360px] h-[450px] bg-cover bg-center shadow-md mt-8 md:mt-0 md:ml-8"
          style={{ backgroundImage: `url(${plansBanner})` }}
        ></div>
      </div>
    </motion.section>
  );
};

export default Plans;
