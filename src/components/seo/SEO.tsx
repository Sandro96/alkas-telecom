import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'AlkasTelecom - Soluciones de Telecomunicaciones',
  description = 'Descubre las mejores ofertas en telefonía móvil, planes de internet y servicios de telecomunicaciones. Samsung, iPhone, Xiaomi y más con los mejores precios.',
  keywords = ['telecomunicaciones', 'celulares', 'planes', 'internet', 'Samsung', 'iPhone', 'Xiaomi', 'Uruguay', 'Argentina', 'Chile'],
  image = '/img/og-image.jpg',
  url = 'https://alkastelecom.com',
  type = 'website',
  structuredData
}) => {
  const fullTitle = title.includes('AlkasTelecom') ? title : `${title} | AlkasTelecom`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="AlkasTelecom" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AlkasTelecom" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#2e4053" />
      <meta name="msapplication-TileColor" content="#2e4053" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

