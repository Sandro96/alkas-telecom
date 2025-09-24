import { ICountryService, IApiService, Country } from './interfaces';
import { countries } from '../assets/data/Countries';

export class ApiService implements IApiService {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

export class CountryService implements ICountryService {
  constructor(private apiService: IApiService) {}

  async detectCountry(): Promise<string> {
    try {
      // Intentar múltiples servicios de geolocalización
      const services = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://api.ipify.org?format=json'
      ];

      for (const service of services) {
        try {
          const data = await this.apiService.get<any>(service);
          
          // Manejar diferentes formatos de respuesta
          let countryCode = '';
          if (data.country_code) {
            countryCode = data.country_code;
          } else if (data.countryCode) {
            countryCode = data.countryCode;
          } else if (data.country) {
            // Si solo tenemos el nombre del país, buscar el código
            const country = countries.find(c => 
              c.name.toLowerCase() === data.country.toLowerCase()
            );
            countryCode = country?.code || '';
          }

          if (countryCode) {
            const countryName = countries.find(
              (country) => country.code === countryCode
            )?.name;
            
            if (countryName) {
              console.log(`País detectado: ${countryName} (${countryCode})`);
              return countryName;
            }
          }
        } catch (serviceError) {
          console.warn(`Servicio ${service} falló:`, serviceError);
          continue;
        }
      }
      
      // Si todos los servicios fallan, usar geolocalización del navegador
      if (navigator.geolocation) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                );
                const data = await response.json();
                const countryName = countries.find(
                  (country) => country.code === data.countryCode
                )?.name;
                resolve(countryName || 'Uruguay');
              } catch {
                resolve('Uruguay');
              }
            },
            () => resolve('Uruguay'),
            { timeout: 5000 }
          );
        });
      }
      
      return 'Uruguay';
    } catch (error) {
      console.error('Error al detectar el país:', error);
      return 'Uruguay';
    }
  }

  getCountries(): Country[] {
    return countries;
  }
}
