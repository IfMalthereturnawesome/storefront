import {getPercentageDiff} from "@lib/util/get-precentage-diff"
import {LineItem, Region} from "@medusajs/medusa"
import clsx from "clsx"
import {formatAmount} from "medusa-react"
import {CalculatedVariant} from "types/medusa"
import {getLocaleForRegion} from "utils/hooks/localeUtils"

type LineItemPriceProps = {
    item: Omit<LineItem, "beforeInsert">
    region: Region
    style?: "default" | "tight"
}

const LineItemPrice = ({
                           item,
                           region,
                           style = "default",
                       }: LineItemPriceProps) => {
    const originalPrice =
        (item.variant as CalculatedVariant).original_price * item.quantity
    const hasReducedPrice = (item.total || 0) < originalPrice

    const locale = getLocaleForRegion(region.name) || "en-US";


    return (
        <div className="flex flex-col text-slate-12 text-right">
      <span
          className={clsx("text-base-regular", {
              "text-rose-600": hasReducedPrice,
          })}
      >

        {formatAmount({
            amount: item.total || 0,
            region: region,
            includeTaxes: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            locale: locale

        })}
      </span>
            {hasReducedPrice && (
                <>
                    <p>
                        {style === "default" && (
                            <span className="text-gray-500">Original: </span>
                        )}
                        <span className="line-through">
              {formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                  locale: locale

              })}
            </span>
                    </p>
                    {style === "default" && (
                        <span className="text-rose-600">
              -{getPercentageDiff(originalPrice, item.total || 0)}%
            </span>
                    )}
                </>
            )}
        </div>
    )
}

export default LineItemPrice
