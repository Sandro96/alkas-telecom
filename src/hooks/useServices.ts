import { useState, useEffect, useMemo } from 'react';
import { CountryService, ApiService } from '../services/CountryService';
import { ProductService } from '../services/DataService';
import { PlanService } from '../services/DataService';

// Hook para manejo de países
export const useCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Uruguay');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const countryService = useMemo(() => {
    const apiService = new ApiService();
    return new CountryService(apiService);
  }, []);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Iniciando detección de país...');
        
        const detectedCountry = await countryService.detectCountry();
        console.log('País detectado:', detectedCountry);
        
        setSelectedCountry(detectedCountry);
      } catch (err) {
        console.error('Error en detección de país:', err);
        setError('Error al detectar el país');
        // Mantener Uruguay como fallback
        setSelectedCountry('Uruguay');
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, [countryService]);

  const handleCountryChange = (newCountry: string) => {
    console.log('Cambiando país a:', newCountry);
    setSelectedCountry(newCountry);
  };

  return {
    selectedCountry,
    setSelectedCountry: handleCountryChange,
    isLoading,
    error,
    countries: countryService.getCountries()
  };
};

// Hook para productos
export const useProducts = () => {
  const productService = useMemo(() => new ProductService(), []);
  
  return {
    products: productService.getProducts(),
    getProductById: productService.getProductById.bind(productService)
  };
};

// Hook para planes
export const usePlans = () => {
  const planService = useMemo(() => new PlanService(), []);
  
  return {
    getPlansByCountry: planService.getPlansByCountry.bind(planService),
    getPlansByCity: planService.getPlansByCity.bind(planService)
  };
};
