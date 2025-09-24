// Interfaces para servicios siguiendo principios SOLID
import { Country } from '../assets/data/Countries';
import { Product } from '../assets/data/Products';
import { Plan, CountryData } from '../assets/data/PlansData';

// Re-exportar los tipos para que puedan ser importados
export type { Country, Product, Plan, CountryData };

export interface ICountryService {
  detectCountry(): Promise<string>;
  getCountries(): Country[];
}

export interface IProductService {
  getProducts(): Product[];
  getProductById(id: number): Product | undefined;
}

export interface IPlanService {
  getPlansByCountry(country: string): CountryData | undefined;
  getPlansByCity(country: string, city: string): Plan[] | undefined;
}

export interface IApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}
