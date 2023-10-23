import { Cart } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Link from "next/link"
import BuyNowButton from "@/components/elements/BuyNowButton";

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  }

const Summary = ({ cart }: SummaryProps) => {
    console.log("Cart Data before CartTotals:", cart);
  return (

    <div className="grid grid-cols-1 gap-y-6">

      <CartTotals cart={cart} />


      <Link href="/checkout">
        <BuyNowButton title={"Go to checkout"} message={"Go to checkout"}></BuyNowButton>
      </Link>
    </div>
  )
}

export default Summary
