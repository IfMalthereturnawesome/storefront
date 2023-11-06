"use client"


import { useCart } from "medusa-react"
import CartItems from "@modules/common/components/cart-totals/cart-items";


const CheckoutItems = () => {
    const { cart } = useCart()

    if (!cart?.id) {
        return null
    }

    return (
        <div className="content-container flex flex-col items-center justify-center pt-8 2xl:pt-10 2xl:pb-4">
            <h1 className="text-4xl font-semibold 2xl:text-5xl text-center text-slate-12 py-1 lg:py-2">
                Checkout
            </h1>
            <CartItems cart={cart} />

        </div>
    )
}

export default CheckoutItems
