import React from "react";
import Image from "next/image";

const MoneyBackGuarantee = () => {

    return (
        <div className="bg-amber-100 rounded-t-xl flex flex-row gap-2 px-3 py-2 sm:px-4 sm:py-4 items-center justify-center">

        <div className="flex-shrink-0 md:pr-2 -ml-3">
                    <Image
                        src="/images/moneyback.png"
                        alt="Money back guarantee"
                        width={50}
                        height={50}
                        className="w-14 h-14 md:w-16 md:h-16"
                    />
                </div>
            <div className="flex flex-col items-stretch">
                <header className="text-slate-800 text-base font-bold leading-8 whitespace-nowrap mr-2">
                    30-day money-back guarantee
                </header>
                <div className="text-zinc-600 text-sm leading-5 mr-2">
                    If you are not satisfied with the product, simply return it and we will refund your money.
                </div>
            </div>
        </div>
    );
}
export default MoneyBackGuarantee;