import { Order } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { useMemo } from "react"
import {getLocaleForRegion} from "@/utils/hooks/localeUtils";
import SecondaryButton from "@modules/common/components/button/SecondaryButton";

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items.length
  }, [order])

    const locale = getLocaleForRegion(order?.region?.name) || "en-US";

  return (
    <div className="flex flex-col">
      <div className="uppercase text-large-semi mb-1 text-slate-10">#{order.display_id}</div>
      <div className="flex items-center divide-x divide-slate-7 text-small-regular text-slate-11">
        <span className="pr-2">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
              locale: locale
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, 3).map((i) => {
            const productHandle = i.title.replace(/\s+/g, '-').toLowerCase();  // Replace spaces with hyphens

          return (
            <div key={i.id} className="flex flex-col gap-y-2">
                <Thumbnail productHandle={productHandle} size="full" />
              <div className="flex items-center text-small-regular text-slate-11">
                <span className="text-slate-12 font-semibold">{i.title}</span>
                <span className="ml-2">x</span>
                <span>{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-small-regular text-slate-11">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-slate-11">more</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Link href={`/order/details/${order.id}`}>
          <SecondaryButton variant="primary" className={"dark:border-slate-10"}>See details</SecondaryButton>
        </Link>
      </div>
    </div>
  )
}

export default OrderCard
