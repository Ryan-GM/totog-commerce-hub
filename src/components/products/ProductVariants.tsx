
import React, { useState } from 'react';
import { ProductVariant } from '@/hooks/useProducts';

interface ProductVariantsProps {
  variants: ProductVariant[];
  onVariantChange: (variantType: string, variantValue: string, priceAdjustment: number) => void;
}

const ProductVariants = ({ variants, onVariantChange }: ProductVariantsProps) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // Group variants by type
  const variantsByType = variants.reduce((acc, variant) => {
    if (!acc[variant.variant_type]) {
      acc[variant.variant_type] = [];
    }
    acc[variant.variant_type].push(variant);
    return acc;
  }, {} as Record<string, ProductVariant[]>);

  const handleVariantSelect = (variantType: string, variantValue: string, priceAdjustment: number) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: variantValue
    }));
    onVariantChange(variantType, variantValue, priceAdjustment);
  };

  if (variants.length === 0) return null;

  return (
    <div className="space-y-6">
      {Object.entries(variantsByType).map(([type, typeVariants]) => (
        <div key={type} className="space-y-3">
          <h4 className="font-semibold text-gray-900 capitalize">
            {type}: {selectedVariants[type] && (
              <span className="font-normal text-gray-600">{selectedVariants[type]}</span>
            )}
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {typeVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantSelect(type, variant.variant_value, variant.price_adjustment)}
                className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  selectedVariants[type] === variant.variant_value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                } ${variant.stock_quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={variant.stock_quantity === 0}
              >
                {variant.variant_value}
                {variant.price_adjustment > 0 && (
                  <span className="ml-1 text-xs text-green-600">
                    +KES {variant.price_adjustment.toLocaleString()}
                  </span>
                )}
                {variant.stock_quantity === 0 && (
                  <span className="ml-1 text-xs text-red-600">(Out of Stock)</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
