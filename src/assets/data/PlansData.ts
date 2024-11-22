export type Plan = {
  name: string;
  price: string;
};

export type CityPlans = {
  [city: string]: Plan[];
};

export type CountryData = {
  cities: string[];
  plans: CityPlans;
};

export const plansData: { [country: string]: CountryData } = {
  Uruguay: {
    cities: ["Montevideo", "Salto", "Paysandú"],
    plans: {
      Montevideo: [
        { name: "Plan Básico", price: "UYU 1.000" },
        { name: "Plan Estándar", price: "UYU 1.500" },
        { name: "Plan Premium", price: "UYU 2.000" },
      ],
      Salto: [
        { name: "Plan Básico", price: "UYU 800" },
        { name: "Plan Estándar", price: "UYU 1.300" },
        { name: "Plan Premium", price: "UYU 1.800" },
      ],
      Paysandú: [
        { name: "Plan Básico", price: "UYU 900" },
        { name: "Plan Estándar", price: "UYU 1.400" },
        { name: "Plan Premium", price: "UYU 1.900" },
      ],
    },
  },
  Argentina: {
    cities: ["Buenos Aires", "Córdoba", "Rosario"],
    plans: {
      "Buenos Aires": [
        { name: "Plan Básico", price: "ARS 3.000" },
        { name: "Plan Estándar", price: "ARS 4.500" },
        { name: "Plan Premium", price: "ARS 6.000" },
      ],
      Córdoba: [
        { name: "Plan Básico", price: "ARS 2.500" },
        { name: "Plan Estándar", price: "ARS 3.800" },
        { name: "Plan Premium", price: "ARS 5.200" },
      ],
      Rosario: [
        { name: "Plan Básico", price: "ARS 2.800" },
        { name: "Plan Estándar", price: "ARS 4.200" },
        { name: "Plan Premium", price: "ARS 5.700" },
      ],
    },
  },
  Chile: {
    cities: ["Santiago", "Valparaíso", "Concepción"],
    plans: {
      Santiago: [
        { name: "Plan Básico", price: "CLP 10.000" },
        { name: "Plan Estándar", price: "CLP 15.000" },
        { name: "Plan Premium", price: "CLP 20.000" },
      ],
      Valparaíso: [
        { name: "Plan Básico", price: "CLP 9.000" },
        { name: "Plan Estándar", price: "CLP 14.000" },
        { name: "Plan Premium", price: "CLP 18.000" },
      ],
      Concepción: [
        { name: "Plan Básico", price: "CLP 11.000" },
        { name: "Plan Estándar", price: "CLP 16.000" },
        { name: "Plan Premium", price: "CLP 21.000" },
      ],
    },
  },
  Perú: {
    cities: ["Lima", "Arequipa", "Cusco"],
    plans: {
      Lima: [
        { name: "Plan Básico", price: "PEN 35" },
        { name: "Plan Estándar", price: "PEN 50" },
        { name: "Plan Premium", price: "PEN 75" },
      ],
      Arequipa: [
        { name: "Plan Básico", price: "PEN 30" },
        { name: "Plan Estándar", price: "PEN 45" },
        { name: "Plan Premium", price: "PEN 70" },
      ],
      Cusco: [
        { name: "Plan Básico", price: "PEN 40" },
        { name: "Plan Estándar", price: "PEN 55" },
        { name: "Plan Premium", price: "PEN 80" },
      ],
    },
  },
  Paraguay: {
    cities: ["Asunción", "Ciudad del Este", "Encarnación"],
    plans: {
      Asunción: [
        { name: "Plan Básico", price: "PYG 100.000" },
        { name: "Plan Estándar", price: "PYG 150.000" },
        { name: "Plan Premium", price: "PYG 200.000" },
      ],
      "Ciudad del Este": [
        { name: "Plan Básico", price: "PYG 90.000" },
        { name: "Plan Estándar", price: "PYG 140.000" },
        { name: "Plan Premium", price: "PYG 190.000" },
      ],
      Encarnación: [
        { name: "Plan Básico", price: "PYG 95.000" },
        { name: "Plan Estándar", price: "PYG 145.000" },
        { name: "Plan Premium", price: "PYG 195.000" },
      ],
    },
  },
};
