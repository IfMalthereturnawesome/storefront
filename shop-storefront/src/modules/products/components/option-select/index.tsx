import {onlyUnique} from "@lib/util/only-unique"
import {ProductOption} from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"

type OptionSelectProps = {
    option: ProductOption
    current: string
    updateOption: (option: Record<string, string>) => void
    title: string
    additionalElement?: React.ReactNode;
}

const OptionSelect: React.FC<OptionSelectProps> = ({
                                                       option,
                                                       current,
                                                       updateOption,
                                                       title,
                                                       additionalElement
                                                   }) => {
    const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
                <span className="text-base-semi">Select {title}</span>
                {additionalElement}
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {filteredOptions.map((v) => {
                    return (
                        <button
                            onClick={() => updateOption({[option.id]: v})}
                            key={v}
                            className={clsx(
                                "border-slate-8 border text-xsmall-regular h-[50px] transition-all duration-200 hover:bg-slate-12 hover:text-slate-1",
                                {"border-slate-12 bg-black dark:bg-custom-white text-slate-1 font-bold": v === current}
                            )}
                        >
                            {v}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default OptionSelect
