import React from "react";
import { motion } from 'framer-motion';
import { useCountry } from "../../contexts/CountryContext";
import { usePricing } from "../../hooks/usePricing";
import { ProductCard } from "../ui/ProductCard";

const Sales: React.FC = () => {
  const { selectedCountry } = useCountry();
  const { products } = usePricing(selectedCountry);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const handleAddToCart = (product: any) => {
    console.log('Producto agregado:', product.name);
  };

  return (
    <motion.section 
      className="sales my-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-2">¡Nuestras ofertas!</h2>
          <p className="text-gray-600">Descubre los mejores precios en tecnología</p>
          <p className="text-sm text-gray-500 mt-2">
            Precios en {products[0]?.currency?.name || 'Peso Uruguayo'} para {selectedCountry}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <ProductCard 
                product={product}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="inline-block font-bold bg-primary text-white py-3 px-8 rounded-lg hover:bg-accent hover:text-black hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver más ofertas
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Sales;
