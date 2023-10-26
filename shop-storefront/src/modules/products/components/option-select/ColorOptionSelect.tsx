import React from "react";
import { ProductOption } from "@medusajs/medusa";
import clsx from "clsx";
import { onlyUnique } from "@lib/util/only-unique";

type ColorOptionSelectProps = {
    option: ProductOption;
    current: string;
    updateOption: (option: Record<string, string>) => void;
    title: string;
    additionalElement?: React.ReactNode;
};

const colorInfoMap = {
    "Black": ["#262222", "#3a3838"],
    "Dark Gray": ["#A9A9A9", "#c7c4c4"]
};

const ColorOptionSelect: React.FC<ColorOptionSelectProps> = ({
                                                                 option,
                                                                 current,
                                                                 updateOption,
                                                                 title,
                                                                 additionalElement
                                                             }) => {
    const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique);
    const defaultColor = filteredOptions[0];
    const getGradient = (color) => `linear-gradient(${colorInfoMap[color][0]}, ${colorInfoMap[color][1]})`;

    return (
        <div className="flex flex-col gap-y-1">
            <div className="flex justify-between items-center">
                <span className="text-base-semi">Select {title}</span>
                {additionalElement}
            </div>
            <span className="mb-2 text-[0.82rem] font-medium">{current || defaultColor}</span>
            <div className="flex gap-2">
                {filteredOptions.map((v) => {
                    const isSelected = v === current;
                    const colorStyle = {
                        background: getGradient(v),
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        transition: "all 0.3s"
                    };
                    return (
                        <button
                            onClick={() => updateOption({ [option.id]: v })}
                            key={v}
                            className={clsx(
                                "flex-center",
                                "p-0 mx-px mt-px mb-2",
                                "cursor-pointer hover:scale-105 transform rounded-full",
                                {
                                    "border-2  border-transparent": !isSelected,
                                    "border-2 border-black focus:outline-black focus:border-black group-hover:border-black dark:border-black dark:focus:border-sky-7 dark:focus:outline-sky-9 dark:border-cyan-10 dark:hover:border-cyan-10 dark:group-hover:border-cyan-10": isSelected
                                }
                            )}
                        >
                            <div className="m-[3px]" style={colorStyle}></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorOptionSelect;
