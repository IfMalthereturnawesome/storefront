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
        <div className="flex items-center py-2 w-full">
            <div className="flex-grow flex items-center">
                <div className="flex text-2xl">
                    {generateStars(rating)}
                </div>
                <span className="text-md 2xs:text-lg ml-2">
                    {rating.toFixed(1)} based on {reviewCount} reviews
                </span>
            </div>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="24" width="24" className={"fill-slate-12 hover:fill-slate-11"}>
                <path d="m19.129 11.25-8.19-8.19L12 2l10 10-10 10-1.06-1.06 8.189-8.19H2v-1.5h17.129Z"></path>
            </svg>
        </div>
    );
};

export default ReviewsComponent;
