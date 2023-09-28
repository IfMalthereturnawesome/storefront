import { MoneyAmount } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import { Region, Variant } from "types/medusa"
import {getLocaleForRegion} from "@/utils/hooks/localeUtils";

export const findCheapestRegionPrice = (variants: Variant[], regionId: string) => {
  const regionPrices = variants.reduce((acc, v) => {
    const price = v.prices.find((p) => p.region_id === regionId)
    if (price) {
      acc.push(price)
    }

    return acc
  }, [] as MoneyAmount[])

  if (!regionPrices.length) {
    return undefined
  }

  //find the price with the lowest amount in regionPrices
  const cheapestPrice = regionPrices.reduce((acc, p) => {
    if (acc.amount > p.amount) {
      return p
    }

    return acc
  })

  return cheapestPrice
}

export const findCheapestCurrencyPrice = (
  variants: Variant[],
  currencyCode: string
) => {
  const currencyPrices = variants.reduce((acc, v) => {
    const price = v.prices.find((p) => p.currency_code === currencyCode)
    if (price) {
      acc.push(price)
    }

    return acc
  }, [] as MoneyAmount[])

  if (!currencyPrices.length) {
    return undefined
  }

  //find the price with the lowest amount in currencyPrices
  const cheapestPrice = currencyPrices.reduce((acc, p) => {
    if (acc.amount > p.amount) {
      return p
    }

    return acc
  })

  return cheapestPrice
}

export const findCheapestPrice = (variants: Variant[], region: Region) => {
  const { id, currency_code } = region
  const locale = getLocaleForRegion(region.name) || "en-US";
  let cheapestPrice = findCheapestRegionPrice(variants, id)

      if (!cheapestPrice) {
        cheapestPrice = findCheapestCurrencyPrice(
          variants,
          currency_code
        )
      }

      if (cheapestPrice) {
        return formatAmount({
          amount: cheapestPrice.amount,
          region: region,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
          locale: locale
        })
      }

      // if we can't find any price that matches the current region,
      // either by id or currency, then the product is not available in
      // the current region
      return "Not available in your region"
}
