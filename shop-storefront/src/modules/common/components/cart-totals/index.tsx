import { Cart } from "@medusajs/medusa"
import { formatAmount} from "medusa-react"
import React from "react"
import {getLocaleForRegion} from "@/utils/hooks/localeUtils";

type CartTotalsProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,


  } = cart
  const locale = getLocaleForRegion(cart?.region?.name) || "en-US";
  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      locale: locale
    })
  }

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

  return (
    <div>
      <div className="text-small-regular text-slate-11">
        <div className="flex items-center justify-between text-base-regular text-slate-12 mb-2">
          <span>Subtotal</span>
          <span>{getAmount(subtotal)}</span>

        </div>
        <div className="flex flex-col gap-y-1">
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          {!!gift_card_total && (
            <div className="flex items-center justify-between">
              <span>Gift card</span>
              <span>- {getAmount(gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>{getAmount(shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>{getAmount(tax_total)}</span>
          </div>
        </div>
        <div className="h-px w-full border-b border-gray-200 border-dashed my-4" />
        <div className="flex items-center justify-between text-base-regular text-slate-12 mb-2">
          <span>Total</span>
          <span>{getAmountTotal(total)}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotals
