import React, {useEffect} from "react";
import {ProductOption} from "@medusajs/medusa";
import clsx from "clsx";
import {onlyUnique} from "@lib/util/only-unique";

type ColorOptionSelectProps = {
    option: ProductOption;
    current: string;
    updateOption: (option: Record<string, string>) => void;
    onColorChange: (color: string) => void;
    title: string;
    additionalElement?: React.ReactNode;
    stockLevels: Record<string, number>;
};

const colorInfoMap = {
    "Dark Gray": {
        gradient:
            "linear-gradient(180deg, rgba(105,91,91,1) 0%, rgba(98,97,97,1) 25%, rgba(87,84,84,1) 50%, rgba(10,52,65,1) 50%, rgba(11,61,77,1) 75%, rgba(1,70,91,1) 100%)",
    },
    "Silver": {
        gradient:
            "linear-gradient(180deg, rgba(182,175,175,1) 0%, rgba(180,173,173,1) 25%, rgba(172,166,166,1) 50%, rgba(10,52,65,1) 50%, rgba(11,61,77,1) 75%, rgba(1,70,91,1) 100%)",
    },
    "Black": {
        gradient:
            "linear-gradient(180deg, rgba(25,24,24,1) 0%, rgba(25,23,23,1) 25%, rgba(22,21,21,1) 50%, rgba(10,52,65,1) 50%, rgba(11,61,77,1) 75%, rgba(1,70,91,1) 100%)",
    },

};

const ColorOptionSelect: React.FC<ColorOptionSelectProps> = ({
                                                                 option,
                                                                 current,
                                                                 updateOption,
                                                                 onColorChange,
                                                                 title,
                                                                 additionalElement,
                                                                 stockLevels,
                                                             }) => {
    const uniqueOptions = option.values.map((v) => v.value).filter(onlyUnique);
    const orderedOptions = ["Silver", "Dark Gray", "Black"].filter(color => uniqueOptions.includes(color));

    const defaultColor = orderedOptions[0];


    useEffect(() => {
        if (!current) {
            updateOption({[option.id]: defaultColor});
        }

    }, [current, defaultColor, option.id, updateOption]);

    const handleColorSelect = (value) => {
        // Check if any size is available for this color
        const isAnySizeAvailable = Object.values(stockLevels[value] || {}).some(quantity => quantity > 0);
        if (isAnySizeAvailable) {
            updateOption({ [option.id]: value });
            onColorChange(value);
        }
    };



    return (
        <div className="flex flex-col gap-y-1">
            <div className="flex justify-between items-center">
                <span className="text-base-semi">Select {title}</span>
                {additionalElement}
            </div>
            <span className="mb-2 text-sm font-medium">
        {current || defaultColor}
      </span>
            <div className="flex gap-2 select-none focus:outline-none">
                {orderedOptions.map((v) => {
                    const isSelected = v === current;
                    const isAnySizeAvailable = Object.values(stockLevels[v] || {}).some(quantity => quantity > 0);
                    console.log(isAnySizeAvailable);
                    console.log(stockLevels[v], v);
                    return (
                        <button
                            onClick={() => handleColorSelect(v)}
                            key={v}
                            disabled={!isAnySizeAvailable}
                            className={clsx(
                                "flex-center p-0 mx-px mt-px mb-2 relative select-none focus:outline-none focus:ring-0 active:bg-transparent focus:bg-transparent",
                                "cursor-pointer hover:scale-105 transform rounded-full",
                                "border-2 border-black",
                                {
                                    "border-transparent focus:border-transparent ": !isSelected && v !== current,
                                    "focus:border-black group-hover:border-black select-none focus:outline-none dark:focus:border-sky-7 dark:focus:outline-sky-9 dark:border-cyan-10 dark:hover:border-cyan-10":
                                        isSelected || v === current,
                                }
                            )}
                        >

                            <div
                                className="border border-black dark:border-slate-10 select-none focus:outline-none focus:ring-0 active:bg-transparent focus:bg-transparent"
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    userSelect: "none",
                                    top: "0",
                                    left: "0",
                                    zIndex: 1,
                                }}
                            ></div>
                            <div
                                className={clsx(
                                    "m-[3px]",
                                    {
                                        "border border-black select-none focus:outline-none focus:ring-0 active:bg-transparent focus:bg-transparent dark:border-slate-10 ": isSelected || v === current,
                                        "border-transparent": !isSelected && v !== current,
                                    }
                                )}
                                style={{
                                    background: colorInfoMap[v].gradient,
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "50%",
                                    transition: "all 0.3s",
                                    userSelect: "none",
                                    zIndex: 2,
                                }}
                            ></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorOptionSelect;
