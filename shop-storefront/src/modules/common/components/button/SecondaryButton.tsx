import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React from "react"

type ButtonProps = {
    isLoading?: boolean
    variant?: "primary" | "secondary" | "third"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const SecondaryButton = ({
                    children,
                    className,
                    isLoading = false,
                    variant = "primary",
                    ...props
                }: ButtonProps) => {
    return (
        <button
            {...props}
            className={clsx(
                "w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-small-regular border transition-colors duration-200 disabled:opacity-50",
                {
                    "text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white":
                        variant === "primary",
                    "text-gray-900 bg-white dark:bg-black border-gray-920 hover:bg-black":
                        variant === "secondary",
                    "text-sky-2 dark:text-sky-11 bg-sky-8 border-sky-8 hover:bg-sky-8  hover:bg-opacity-40 hover:text-white disabled:hover:bg-sky-8 disabled:hover:text-white bg-opacity-20":
                        variant === "third",
                },
                className
            )}
        >
            {isLoading ? <Spinner /> : children}
        </button>
    )
}

export default SecondaryButton