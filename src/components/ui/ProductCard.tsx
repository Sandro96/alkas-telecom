import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Button } from './Button';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    img: string;
    beforePrice: string;
    afterPrice: string;
    totalPrice: string;
    currency?: any;
  };
  onAddToCart?: (product: any) => void;
  isLoading?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isLoading = false,
  className
}) => {
  return (
    <motion.div 
      className={clsx(
        'p-5 border border-gray-300 rounded-lg shadow-lg text-center',
        'w-[350px] h-[500px] bg-white',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Loading State */}
      {isLoading && (
        <motion.div 
          className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </motion.div>
      )}
      
      {/* Image Container */}
      <div className="mb-4 h-[250px] flex justify-center items-center bg-gray-50 rounded-lg">
        <img
          src={product.img}
          alt={product.name}
          className="object-contain max-h-full max-w-full"
          loading="lazy"
        />
      </div>
      
      {/* Product Name */}
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        {product.name}
      </h3>
      
      {/* Pricing */}
      <div className="mb-6">
        <p className="text-red-300 line-through text-sm mb-1">
          {product.beforePrice}
        </p>
        <p className="font-bold text-[28px] text-primary mb-1">
          {product.afterPrice}
        </p>
        <p className="text-sm text-gray-600">
          {product.totalPrice}
        </p>
      </div>
      
      {/* Action Button */}
      <div className="mt-auto mb-4">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddToCart?.(product)}
          disabled={isLoading}
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Agregando...' : 'Lo quiero'}
        </Button>
      </div>
    </motion.div>
  );
};
