import React from "react";


const HorizontalTextScroll: React.FC = () => {
    const text = "Achieve your dreams, one night at a time.";

    return (
        <div className="relative pb-20 md:mt-[-71rem] overflow-hidden">
            {/* Gradient Overlay to fade text at ends */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div
                    className="absolute inset-y-0 left-0 w-24 dark:w-32 bg-gradient-to-r from-[rgba(250,254,254,1)] to-[rgba(250,254,254,0)] dark:from-[rgba(7,25,29,1)] dark:to-[rgba(7,25,29,0)]">
                </div>
                <div
                    className="absolute inset-y-0 right-0 w-24 dark:w-32 bg-gradient-to-l from-[rgba(250,254,254,1)] to-[rgba(250,254,254,0)] dark:from-[rgba(7,25,29,1)] dark:to-[rgba(7,25,29,0)]">
                </div>
            </div>
            {/* Scrolling Text */}
            <div className="horizontal_scrolling_text ">
                <div className="horizontal-text  inline-block text-9xl lg:text-[10rem] font-bold text-slate-12">
                    <span>{text}</span>
                </div>
                <div className="horizontal-text  inline-block text-9xl lg:text-[10rem] font-bold  text-slate-12">
                    <span>{text}</span>
                </div>
            </div>


        </div>
    );
};

export default HorizontalTextScroll;
