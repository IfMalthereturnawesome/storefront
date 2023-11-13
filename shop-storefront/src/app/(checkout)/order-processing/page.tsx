// order-processing/page.tsx
import { Metadata } from "next"
import CheckoutTemplate from "@modules/checkout/templates";

export const metadata: Metadata = {
    title: "Order",
    description: "Checkout for Eight Athletics",
}

export default function Checkout() {
    return <CheckoutTemplate />
}
