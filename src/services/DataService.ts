import { IProductService, IPlanService, Product, Plan, CountryData } from './interfaces';
import { products } from '../assets/data/Products';
import { plansData } from '../assets/data/PlansData';

export class ProductService implements IProductService {
  getProducts(): Product[] {
    return products;
  }

  getProductById(id: number): Product | undefined {
    return products.find(product => product.id === id);
  }
}

export class PlanService implements IPlanService {
  getPlansByCountry(country: string): CountryData | undefined {
    return plansData[country];
  }

  getPlansByCity(country: string, city: string): Plan[] | undefined {
    const countryData = this.getPlansByCountry(country);
    return countryData?.plans[city];
  }
}

