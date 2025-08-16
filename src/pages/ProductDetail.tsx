
import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { addToWishlist } = useWishlist();
  const { formatCurrency } = useCurrency();
  
  const { data: product, isLoading: productLoading } = useProduct(id || '');
  const { data: similarProducts = [] } = useProducts({ 
    category: product?.categories?.name 
  });

  if (productLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock_quantity <= 0) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images?.[0] || '/placeholder.svg',
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product.id);
  };

  const discount = product.original_price 
    ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100) 
    : 0;

  // Filter out current product from similar products
  const filteredSimilarProducts = similarProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images?.[0] || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-blue-600 font-medium">{product.categories?.name || 'Electronics'}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < 4 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                4.5 (120 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(Number(product.price))}
              </span>
              {product.original_price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatCurrency(Number(product.original_price))}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock_quantity > 0 ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
              {product.stock_quantity > 0 && (
                <span className="text-sm text-gray-500">
                  ({product.stock_quantity} available)
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                disabled={product.stock_quantity <= 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full py-3"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Guarantees */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Free shipping on orders over Ksh 5,000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="h-4 w-4 text-blue-600" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {filteredSimilarProducts.length > 0 && (
          <section className="py-12 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSimilarProducts.map((similarProduct) => (
                <ProductCard 
                  key={similarProduct.id} 
                  id={similarProduct.id}
                  name={similarProduct.name}
                  price={Number(similarProduct.price)}
                  originalPrice={similarProduct.original_price ? Number(similarProduct.original_price) : undefined}
                  image={similarProduct.images?.[0] || '/placeholder.svg'}
                  rating={4.5}
                  reviews={120}
                  inStock={similarProduct.stock_quantity > 0}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
