// Sistema de precios y monedas por país
export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface PriceInfo {
  currency: Currency;
  exchangeRate: number; // Tasa de cambio respecto al USD
}

export interface CountryPricing {
  [countryName: string]: PriceInfo;
}

// Monedas disponibles
export const currencies: { [key: string]: Currency } = {
  UYU: { code: 'UYU', symbol: '$', name: 'Peso Uruguayo' },
  ARS: { code: 'ARS', symbol: '$', name: 'Peso Argentino' },
  CLP: { code: 'CLP', symbol: '$', name: 'Peso Chileno' },
  PEN: { code: 'PEN', symbol: 'S/', name: 'Sol Peruano' },
  PYG: { code: 'PYG', symbol: '₲', name: 'Guaraní Paraguayo' },
  USD: { code: 'USD', symbol: '$', name: 'Dólar Estadounidense' }
};

// Configuración de precios por país (tasas de cambio aproximadas)
export const countryPricing: CountryPricing = {
  Uruguay: {
    currency: currencies.UYU,
    exchangeRate: 40 // 1 USD = 40 UYU (aproximado)
  },
  Argentina: {
    currency: currencies.ARS,
    exchangeRate: 1000 // 1 USD = 1000 ARS (aproximado)
  },
  Chile: {
    currency: currencies.CLP,
    exchangeRate: 900 // 1 USD = 900 CLP (aproximado)
  },
  Perú: {
    currency: currencies.PEN,
    exchangeRate: 3.7 // 1 USD = 3.7 PEN (aproximado)
  },
  Paraguay: {
    currency: currencies.PYG,
    exchangeRate: 7300 // 1 USD = 7300 PYG (aproximado)
  }
};

// Precios base en USD
export interface BaseProduct {
  id: number;
  name: string;
  basePriceUSD: number; // Precio base en USD
  discountPercentage: number; // Descuento aplicado
  image: string;
}

export interface BasePlan {
  name: string;
  basePriceUSD: number; // Precio base en USD
}

// Productos base con precios en USD
export const baseProducts: BaseProduct[] = [
  {
    id: 1,
    name: "Samsung Galaxy S23",
    basePriceUSD: 800,
    discountPercentage: 20,
    image: "img/cel1.webp"
  },
  {
    id: 2,
    name: "iPhone 15",
    basePriceUSD: 1000,
    discountPercentage: 20,
    image: "img/cel2.webp"
  },
  {
    id: 3,
    name: "Xiaomi 13",
    basePriceUSD: 600,
    discountPercentage: 20,
    image: "img/cel3.webp"
  }
];

// Planes base con precios en USD
export const basePlans: BasePlan[] = [
  {
    name: "Plan Básico",
    basePriceUSD: 25
  },
  {
    name: "Plan Estándar",
    basePriceUSD: 40
  },
  {
    name: "Plan Premium",
    basePriceUSD: 60
  }
];

// Función para convertir precios
export const convertPrice = (priceUSD: number, country: string): { price: number; currency: Currency } => {
  const pricing = countryPricing[country];
  
  if (!pricing) {
    // Fallback a Uruguay si no se encuentra el país
    const uruguayPricing = countryPricing.Uruguay;
    return {
      price: Math.round(priceUSD * uruguayPricing.exchangeRate),
      currency: uruguayPricing.currency
    };
  }

  return {
    price: Math.round(priceUSD * pricing.exchangeRate),
    currency: pricing.currency
  };
};

// Función para formatear precios
export const formatPrice = (price: number, currency: Currency): string => {
  return `${currency.symbol} ${price.toLocaleString()}`;
};

// Función para obtener productos con precios localizados
export const getLocalizedProducts = (country: string) => {
  const products = baseProducts.map(product => {
    const originalPrice = convertPrice(product.basePriceUSD, country);
    const discountedPrice = convertPrice(
      product.basePriceUSD * (1 - product.discountPercentage / 100), 
      country
    );
    
    return {
      id: product.id,
      name: product.name,
      img: product.image,
      beforePrice: `6 x ${formatPrice(Math.round(originalPrice.price / 6), originalPrice.currency)}`,
      afterPrice: `6 x ${formatPrice(Math.round(discountedPrice.price / 6), discountedPrice.currency)}`,
      totalPrice: `PTC: ${formatPrice(discountedPrice.price, discountedPrice.currency)}`,
      currency: originalPrice.currency
    };
  });
  
  return products;
};

// Función para obtener planes con precios localizados
export const getLocalizedPlans = (country: string) => {
  const plans = basePlans.map(plan => {
    const price = convertPrice(plan.basePriceUSD, country);
    return {
      name: plan.name,
      price: formatPrice(price.price, price.currency),
      currency: price.currency
    };
  });
  
  return plans;
};

// Función para obtener planes por ciudad con precios localizados
export const getLocalizedPlansByCity = (country: string, city: string) => {
  const basePlansForCity = basePlans.map(plan => {
    const price = convertPrice(plan.basePriceUSD, country);
    return {
      name: plan.name,
      price: formatPrice(price.price, price.currency),
      currency: price.currency
    };
  });
  
  return basePlansForCity;
};
