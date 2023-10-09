import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React from "react"
import {Button as NextUIButton, ButtonProps as NextButtonProps} from '@nextui-org/button';


type MyButtonProps = {
    isLoading?: boolean;
    myVariant?: "primary" | "secondary" | "third";
};

type ButtonProps = MyButtonProps & Omit<NextButtonProps, "variant">;

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           className,
                                           isLoading = false,
                                           myVariant = "primary",
                                           ...props
                                       }) => {
    return (
        <NextUIButton

            {...props}
            className={clsx(
                "w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-small-regular border transition-colors duration-200 disabled:opacity-50",
                {
                    "custom-button-neo-dark disabled:hover:bg-gray-900 disabled:hover:text-white":
                        myVariant === "primary",
                    "text-gray-900 bg-transparent border-gray-920 hover:bg-gray-100":
                        myVariant === "secondary",
                    "text-sky-2 dark:text-sky-11 bg-sky-8 border-sky-8 hover:bg-sky-8  hover:bg-opacity-40 hover:text-white disabled:hover:bg-sky-8 disabled:hover:text-white bg-opacity-20":
                        myVariant === "third",
                },
                className
            )}
        >
            {isLoading ? <Spinner/> : children}
        </NextUIButton>
    );
};

export default Button;
