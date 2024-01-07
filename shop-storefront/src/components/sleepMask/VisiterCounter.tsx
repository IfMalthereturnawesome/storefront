import React, { useEffect, useState } from 'react';

const VisitorCounter = () => {
    const [visitorCount, setVisitorCount] = useState(null);

    useEffect(() => {

        const getOrInitializeVisitorCount = () => {
            let count = localStorage.getItem('currentVisitors');
            if (count) {

                setVisitorCount(parseInt(count, 10));
            } else {

                const initialCount = Math.floor(Math.random() * 13) + 3;
                setVisitorCount(initialCount);
                localStorage.setItem('currentVisitors', initialCount.toString());


                setTimeout(() => {
                    const incrementedCount = initialCount + 1;
                    setVisitorCount(incrementedCount);
                    localStorage.setItem('currentVisitors', incrementedCount.toString());
                }, 5000);
            }
        };

        getOrInitializeVisitorCount();
    }, []);

    if (visitorCount === null) {
        return null;
    }
    return (
        <div className="flex items-center py-3 space-x-2 text-red-10">
            <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.74805 5.04292C10.3542 4.24577 11.0378 3.45352 11.7943 2.70039C14.4375 5.33145 16.3333 9.63015 16.3333 11.7135C16.3333 16.692 12.6784 20.7266 8.16667 20.7266C3.65495 20.7266 0 16.692 0 11.7135C0 8.9113 2.54297 4.26045 6.125 0.695312C7.51953 2.0842 8.75456 3.57578 9.74805 5.04292ZM8.2687 16.7203C9.29216 16.7203 10.2359 16.3682 11.0068 15.7765C12.7524 14.4267 13.1601 11.8152 12.1898 9.771C12.0701 9.52158 11.9372 9.2575 11.791 8.99342L9.71306 11.6098C9.71306 11.6098 6.45659 7.01768 6.20848 6.70469C4.48941 8.97875 3.62988 10.3089 3.62988 11.8201C3.62988 14.8522 5.71225 16.7203 8.2687 16.7203Z" fill="#CA232C"/>
            </svg>
            <p className="text-sm">
                Currently {visitorCount} people are looking at this product!
            </p>
        </div>
    );
};

export default VisitorCounter;
