import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CountryService, ApiService } from '../services/CountryService';

interface CountryContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  isLoading: boolean;
  error: string | null;
  countries: any[];
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
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
        console.log('CountryProvider - Iniciando detección de país...');
        
        const detectedCountry = await countryService.detectCountry();
        console.log('CountryProvider - País detectado:', detectedCountry);
        
        setSelectedCountry(detectedCountry);
      } catch (err) {
        console.error('CountryProvider - Error en detección de país:', err);
        setError('Error al detectar el país');
        setSelectedCountry('Uruguay');
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, [countryService]);

  const handleCountryChange = (newCountry: string) => {
    console.log('CountryProvider - Cambiando país a:', newCountry);
    setSelectedCountry(newCountry);
  };

  const value = {
    selectedCountry,
    setSelectedCountry: handleCountryChange,
    isLoading,
    error,
    countries: countryService.getCountries()
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

