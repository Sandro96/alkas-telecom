import { useMemo } from 'react';
import { getLocalizedProducts, getLocalizedPlans, getLocalizedPlansByCity, convertPrice, formatPrice, Currency } from '../services/PricingService';

// Hook para manejo de precios localizados
export const usePricing = (country: string) => {
  const localizedProducts = useMemo(() => {
    return getLocalizedProducts(country);
  }, [country]);

  const localizedPlans = useMemo(() => {
    return getLocalizedPlans(country);
  }, [country]);

  const convertPriceToLocal = (priceUSD: number) => {
    return convertPrice(priceUSD, country);
  };

  const formatLocalPrice = (price: number, currency: Currency) => {
    return formatPrice(price, currency);
  };

  const getPlansByCity = (city: string) => {
    return getLocalizedPlansByCity(country, city);
  };

  return {
    products: localizedProducts,
    plans: localizedPlans,
    convertPrice: convertPriceToLocal,
    formatPrice: formatLocalPrice,
    getPlansByCity
  };
};
