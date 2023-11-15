import { Order } from "@medusajs/medusa"

type OrderDetailsProps = {
    order: Order
    showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
    const items = order.items.reduce((acc, i) => acc + i.quantity, 0)

    const formatStatus = (str: string) => {
        const formatted = str.split("_").join(" ")
        return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
    }

    return (
        <div className="p-10 border-b border-slate-5">
      <span className="text-slate-12 text-small-regular uppercase">
        Thank you, your order was successfully placed 🎉
      </span>
            <p className="text-slate-11 text-sm mt-2">
                A confirmation email has been sent to your email address at <strong>{order.email}</strong>.
            </p>
            <p className={"text-slate-11 text-sm mt-2"}>If you don&apos;t see it in your inbox, please also check your spam folder.</p>

            <h1 className="mt-2 uppercase text-2xl-semi text-slate-11">#{order.display_id}</h1>
            <span className={"text-xs break-words"}>{order.id.split("order_")[1]}</span>

            <div className="flex items-center text-slate-11 text-small-regular gap-x-4 mt-4">
                <span>{new Date(order.created_at).toDateString()}</span>
                <span>{`${items} ${items !== 1 ? "items" : "item"}`}</span>
                {showStatus && (
                    <>
                        <span>{formatStatus(order.fulfillment_status)}</span>
                        <span>{formatStatus(order.payment_status)}</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderDetails
