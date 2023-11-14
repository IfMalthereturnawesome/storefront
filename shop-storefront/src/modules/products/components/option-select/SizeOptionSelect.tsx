import React from "react"
import {ProductOption} from "@medusajs/medusa"
import clsx from "clsx"
import {onlyUnique} from "@lib/util/only-unique";


type SizeOptionSelectProps = {
    option: ProductOption
    current: string
    updateOption: (option: Record<string, string>) => void
    title: string
    additionalElement?: React.ReactNode;
    stockLevels: Record<string, number>;
};

const sizeInfoMap = {
    "XS": "Fits head sizes between 52.0-54.5 cm.",
    "S": "Fits head sizes between 54.0-56.5 cm.",
    "M": "Fits head sizes between 56.0-58.0 cm.",
    "L": "Fits head sizes between 57.5-60.0 cm.",
    "XL": "Fits head sizes between 59.5-62.0 cm."
};

const SizeOptionSelect: React.FC<SizeOptionSelectProps> = ({
                                                               option,
                                                               current,
                                                               updateOption,
                                                               title,
                                                               additionalElement,
                                                               stockLevels


                                                           }) => {
    const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
                <span className="text-base-semi">Select {title}</span>
                {additionalElement}
            </div>
            <div className="flex flex-col gap-1">
                {filteredOptions.map((v) => {
                    const isInStock = stockLevels[v] > 0;
                    return (
                        <button
                            onClick={() => isInStock && updateOption({[option.id]: v})}
                            key={v}
                            disabled={!isInStock}
                            className={clsx(
                                "flex-row justify-between   p-0  mt-px mb-2 w-full h-full ",
                                "text-left rounded-none cursor-pointer rounded-[5px]",
                                "sm:leading-5 sm:tracking-wide flex items-center py-2 px-3 transition-all duration-200",
                                {
                                    "custom-button-neo__dark-black hover:text-slate-12 hover:bg-slate-3 dark:border-1 dark:border-cyan-3": v !== current,
                                    "custom-button-neo-dark hover:bg-black hover:text-slate-1 ": v === current,
                                    "bg-gradient-to-br from-red-400/30 to-transparent dark:from-cyan-5/50 dark:to-red-900/50": !isInStock

                                }
                            )}

                        >
                            <div className={"font-sans"}>
                                <div className="text-sm text-left my-1 mx-1 font-medium ">{v}</div>
                                <div className="text-xs my-1 mx-1">
                                    {isInStock ? sizeInfoMap[v] : "Coming again soon |"}
                                    {!isInStock && (
                                        <span className="text-2xs mx-1">
                                            {sizeInfoMap[v]}
                                        </span>
                                    )}
                                </div>

                            </div>

                        </button>

                    )
                })}
            </div>
        </div>
    )
}

export default SizeOptionSelect
