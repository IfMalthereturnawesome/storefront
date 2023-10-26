"use client"

import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import DiscountCode from "@modules/checkout/components/discount-code"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import {useCart, useMeCustomer} from "medusa-react"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"
import Link from "next/link";
import ChevronDown from "@modules/common/icons/chevron-down";
import Image from "next/image";
import React from "react";
import {useRouter} from 'next/navigation';


const CartTemplate = () => {
    const {cart} = useCart()
    const {customer, isLoading} = useMeCustomer()
    const items = useEnrichedLineItems()
    const router = useRouter();


    if (!cart || !cart?.id?.length || isLoading) {
        return <SkeletonCartPage/>
    }

    return (
        <div className="bg-cyan-1 py-12">
            <nav className="flex items-center h-full justify-between content-container">
                <Link href={"/"} className="text-small-semi text-slate-11 flex items-center gap-x-2 uppercase"
                >
                    <>
                        <ChevronDown className="rotate-90" size={16}/>
                        <span
                            className="mt-px hidden small:block text-slate-11 hover:text-blue-600 dark:hover:text-cgreen transition-colors duration-200">
                            Back to Shop
                </span>
                    </>
                </Link>
                <div className="flex-1 basis-0"/>
            </nav>
            <div className="content-container">
                {cart.items.length ? (
                    <div className="grid grid-cols-1  small:grid-cols-[1fr_360px] gap-x-8">
                        <div className="flex flex-col  p-6 gap-y-6">
                            {!customer && <SignInPrompt/>}
                            <ItemsTemplate region={cart?.region} items={items}/>
                        </div>
                        <div className="relative">
                            <div className="flex flex-col gap-y-8 sticky top-12">
                                {cart && cart.region && (
                                    <>
                                        <div className="p-6 bg-cyan-2 border border-slate-3">
                                            <Summary cart={cart}/>
                                        </div>

                                        <DiscountCode cart={cart}/>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {!customer && <SignInPrompt/>}
                        <EmptyCartMessage/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartTemplate
