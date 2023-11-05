import React, {useEffect, useRef, useState} from 'react';
import {ArrowLongRightIcon} from "@heroicons/react/24/solid";
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/navigation"

import {usePathname} from 'next/navigation'

function AddToCartButton({
                          onClick = () => {
                          },  title, disabled = false, className = '',
                      }) {
    const [isActive, setIsActive] = useState(false);
    const [isAdding, setIsAdding] = useState(false);  // New state to manage adding text
    const isMounted = useRef(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {

        return () => {
            isMounted.current = false;
        };
    }, []);


    const handleClick = async () => {
        if (!disabled) {
            setIsAdding(true);
            onClick();
            router.prefetch('/cart');
            // set timeout to allow the cart to update before redirecting
            await new Promise((r) => setTimeout(r, 400));
            pathname !== '/cart' && router.push('/cart');
            if (isMounted.current) {

                setIsAdding(false);

            }
        }
    };

    return (
        <div className={`buy-now--primary-container ${isActive ? 'active' : ''} `}>
            <div className="buy-now--primary-before"></div>
            <button
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onMouseLeave={() => setIsActive(false)}
                onClick={handleClick}
                disabled={disabled}
                type="button"
                className={`flex justify-between items-center py-0 px-4 m-0 w-full h-full font-poppins text-sm 
                font-semibold leading-5 text-left uppercase whitespace-nowrap bg-black dark:bg-white rounded-none border-black 
                cursor-pointer text-slate-1  hover:text-slate-10 
                ${disabled ? 'opacity-50 cursor-normal' : ''}`}
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
                    className={` ${className} flex-auto text-sm leading-5 uppercase  `}
                    style={{letterSpacing: '2px'}}
                >
                    {isAdding ? "ADDING" : title}
                </span>
                {isAdding ? <Spinner /> : <ArrowLongRightIcon className={"w-6 h-6 ml-2 "}/>}
            </button>
            <div className="buy-now--primary-after"></div>
        </div>
    );
}

export default AddToCartButton;
