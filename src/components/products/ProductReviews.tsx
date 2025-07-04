
import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  // Mock reviews data for now until the database functions are available
  const mockReviews = [
    {
      id: '1',
      rating: 5,
      title: 'Excellent product!',
      comment: 'Really satisfied with the quality and performance. Highly recommended!',
      verified_purchase: true,
      helpful_count: 12,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      rating: 4,
      title: 'Good value for money',
      comment: 'Works as expected. Good build quality and fast delivery.',
      verified_purchase: false,
      helpful_count: 8,
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      rating: 5,
      title: 'Perfect!',
      comment: 'Exactly what I was looking for. Great product and service.',
      verified_purchase: true,
      helpful_count: 5,
      created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const formatDistanceToNow = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return '1 week ago';
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews ({mockReviews.length})</h3>
      
      <div className="space-y-4">
        {mockReviews.map((review) => (
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
                {formatDistanceToNow(review.created_at)}
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
