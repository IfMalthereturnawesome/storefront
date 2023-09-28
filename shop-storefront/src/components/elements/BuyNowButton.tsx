import React, {useState} from 'react';
import {ArrowLongRightIcon} from "@heroicons/react/24/solid";

function BuyNowButton({
                          onClick = () => {
                          }, message, title
                      }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`buy-now--primary-container ${isActive ? 'active' : ''}`}>
            <div className="buy-now--primary-before"></div>
            <button
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onMouseLeave={() => setIsActive(false)}
                onClick={onClick}
                type="button"
                className="flex justify-between items-center py-0 px-4 m-0 w-full h-full font-poppins text-sm  font-semibold leading-5 text-left uppercase whitespace-nowrap bg-black bg-none rounded-none border-black cursor-pointer text-slate-1 dark:text-slate-12 hover:text-slate-10 dark:hover:text-slate-10"
                data-auto-id="add-to-bag"
                title={title}
                style={{
                    boxShadow: 'none',
                    outline: 'none',
                    letterSpacing: '2px',
                    minHeight: '50px',
                    transition: 'transform 0.3s cubic-bezier(0.3, 0, 0, 1) 0s, color 0.3s cubic-bezier(0.3, 0, 0, 1) 0s',
                    textDecoration: 'none solid rgb(118, 118, 119)',
                    transform: isActive ? 'translate(0px, 0px)' : 'translate(-3px, -3px)',
                }}
            >
                <span
                    className="flex-auto text-sm leading-5 uppercase truncate"
                    style={{letterSpacing: '2px'}}
                >
                    {message}
                </span>
                <ArrowLongRightIcon className={"w-6 h-6 ml-2 "}/>
            </button>
            <div className="buy-now--primary-after"></div>
        </div>
    );
}

export default BuyNowButton;
