import {Disclosure} from "@headlessui/react"
import {useCheckout} from "@lib/context/checkout-context"
import clsx from "clsx"

type StepContainerProps = {
    index: number
    title: string
    isClosed?: boolean,
    closedState?: React.ReactNode
    children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const StepContainer = ({
                           index,
                           title,
                           isClosed = false,
                           className,
                           closedState,
                           children,
                           ...props
                       }: StepContainerProps) => {
    const {
        editAddresses: {state: editAddressesState},
    } = useCheckout()
    const isStepClosed = editAddressesState || isClosed;
    return (
        <div>
            <div
                className={clsx("bg-cyan-2 border border-slate-5 dark:border-amberA-12", className, {
                    "opacity-50 pointer-events-none select-none": editAddressesState,
                })}
                {...props}
            >
                <div className="text-xl-semi flex items-center gap-x-4 px-6 sm:px-8 pb-6 pt-8">
                    <div
                        className="bg-cyan-12 w-8 h-8 rounded-full text-slate-2 flex justify-center items-center text-sm">
                        {index}
                    </div>
                    <h2 className={"text-slate-12"}>{title}</h2>
                </div>
                <Disclosure>
                    <Disclosure.Panel
                        static
                        className={clsx(
                            "transition-[max-height,opacity] duration-700 ease-in-out overflow-hidden",
                            {
                                "max-h-[9999px] opacity-100": !isStepClosed,
                                "max-h-0 opacity-0": isStepClosed,
                            }
                        )}
                    >
                        {children}
                    </Disclosure.Panel>
                    <Disclosure.Panel
                        static
                        className={clsx(
                            "transition-[max-height,opacity] duration-700 ease-in-out overflow-hidden",
                            {
                                "max-h-[9999px] opacity-100": isStepClosed,
                                "max-h-0 opacity-0": !isStepClosed,
                            }
                        )}
                    >
                        {closedState}
                    </Disclosure.Panel>
                </Disclosure>
            </div>
        </div>
    )
}

export default StepContainer
