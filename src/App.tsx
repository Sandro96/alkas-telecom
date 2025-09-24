import "./App.css";
import { motion } from 'framer-motion';
import Navbar from "./components/Sections/Navbar";
import Hero from "./components/Sections/Hero";
import Sales from "./components/Sections/Sales";
import Plans from "./components/Sections/Plans";
import Footer from "./components/Sections/Footer";
import { SEO } from "./components/seo/SEO";
import { AppWrapper } from "./components/seo/AppWrapper";
import { CountryProvider } from "./contexts/CountryContext";

function App() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AlkasTelecom",
    "description": "Soluciones de telecomunicaciones con las mejores ofertas en telefonía móvil, planes de internet y servicios de telecomunicaciones.",
    "url": "https://alkastelecom.com",
    "logo": "https://alkastelecom.com/svg/icon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+598-XXX-XXXX",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/alkastelecom",
      "https://www.twitter.com/alkastelecom",
      "https://www.instagram.com/alkastelecom",
      "https://www.youtube.com/alkastelecom"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "UYU",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <AppWrapper>
      <CountryProvider>
        <SEO
          title="AlkasTelecom - Soluciones de Telecomunicaciones"
          description="Descubre las mejores ofertas en telefonía móvil, planes de internet y servicios de telecomunicaciones. Samsung, iPhone, Xiaomi y más con los mejores precios."
          keywords={[
            'telecomunicaciones',
            'celulares',
            'planes',
            'internet',
            'Samsung',
            'iPhone',
            'Xiaomi',
            'Uruguay',
            'Argentina',
            'Chile',
            'Perú',
            'Paraguay'
          ]}
          structuredData={structuredData}
        />
        <motion.div
          className="font-sans min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Sales />
            <Plans />
          </main>
          <Footer />
        </motion.div>
      </CountryProvider>
    </AppWrapper>
  );
}

export default App;
