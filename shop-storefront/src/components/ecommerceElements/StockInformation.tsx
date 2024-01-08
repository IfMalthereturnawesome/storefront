import React from 'react';

const StockInformation = ({ inStock, message }) => {
    const stockClass = inStock ? "text-slate-12" : "text-red-600";
    const stockIconClass = inStock ? "glowing" : "outofstock";
    const stockStatus = inStock ? "In stock" : "Out of stock";

    return (
        <div className={`flex items-center ${stockClass} mb-2 text-xs xs:text-sm `}>
            <span className={`stock-circle ${stockIconClass}`}></span>
            {message || stockStatus}
        </div>
    );
};

export default StockInformation;
