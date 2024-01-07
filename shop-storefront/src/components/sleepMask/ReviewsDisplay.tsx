import React from 'react';

const ReviewsComponent = ({ rating, reviewCount }) => {
    // Generate stars based on the rating
    const generateStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            // Calculate width of the yellow part for each star
            const width = rating > i ? Math.min(100, (rating - i) * 100) : 0;
            stars.push(
                <div key={i} className="relative text-gray-300 text-2xl">
                    ★ {/* This is the empty star */}
                    <div
                        className="absolute top-0 left-0 text-yellow-500 overflow-hidden"
                        style={{ width: `${width}%` }}
                    >
                        ★ {/* This is the filled star */}
                    </div>
                </div>
            );
        }
        return stars;
    };
    return (
        <div className="flex items-center py-2">
            <div className="flex text-2xl">
                {generateStars(rating)}
            </div>
            <span className="text-lg ml-2">
        {rating.toFixed(1)} based on {reviewCount} reviews
      </span>
        </div>
    );
};

export default ReviewsComponent;
