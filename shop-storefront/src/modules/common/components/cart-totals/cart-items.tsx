import { Cart } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import React from "react"
import { getLocaleForRegion } from "@/utils/hooks/localeUtils";

type CartTotalsProps = {
    cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartItems: React.FC<CartTotalsProps> = ({ cart }) => {
    const {
        total,
        items
    } = cart;
    const locale = getLocaleForRegion(cart?.region?.name) || "en-US";
    const getAmountTotal = (amount: number | null | undefined) => {
        return formatAmount({
            amount: amount || 0,
            region: cart.region,
            includeTaxes: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            locale: locale
        })
    }

    // Assuming the count of items should be displayed as "2 items" if there are two items
    const itemCount = items.length === 1 ? '1 item' : `${items.length} items`;

    return (
        <div className="flex justify-between items-center">
            <span className="text-sm xl:text-md text-slate-11">({itemCount})</span>
            <span className="text-sm xl:text-md text-slate-11"> &nbsp;&nbsp;&nbsp; </span>
            <span className="text-sm xl:text-md text-slate-11">{getAmountTotal(total)} </span>
        </div>
    )
}

export default CartItems
