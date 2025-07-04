
import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { useProductReviews } from '@/hooks/useProducts';
import { formatDistanceToNow } from 'date-fns';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { data: reviews = [], isLoading } = useProductReviews(productId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews ({reviews.length})</h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < review.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                {review.verified_purchase && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </span>
            </div>
            
            {review.title && (
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            )}
            
            {review.comment && (
              <p className="text-gray-700 mb-3">{review.comment}</p>
            )}
            
            {review.helpful_count > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ThumbsUp className="h-4 w-4" />
                <span>{review.helpful_count} people found this helpful</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
