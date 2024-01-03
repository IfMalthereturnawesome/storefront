"use client"

import { canBuy } from "@lib/util/can-buy"
import { findCheapestPrice } from "@lib/util/prices"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Variant } from "types/medusa"
import { useStore } from "./store-context"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import useProductPrice from "@lib/hooks/use-product-price";

interface ProductContext {
  formattedPrice: string
  quantity: number
  disabled: boolean
  inStock: boolean
  variant?: Variant
  maxQuantityMet: boolean
  options: Record<string, string>
  updateOptions: (options: Record<string, string>) => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  addToCart: () => void
}

const ProductActionContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
  product: PricedProduct
}

export const ProductProvider = ({
  product,
  children,
}: ProductProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false)
  const [inStock, setInStock] = useState<boolean>(true)

  const { addItem } = useStore()
  const { cart } = useCart()

  const variants = product?.variants ? (product.variants as unknown as Variant[]) : [];

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  const disabled = useMemo(() => {
    return !variant
  }, [variant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region })
    } else if (cart?.region) {
      return findCheapestPrice(variants, cart.region)
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [variant, variants, cart])

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant))
    }
  }, [variant])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  const parsePrice = (priceString) => {
    const numericPart = priceString.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericPart);
  };

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price;

    // Assuming variantPrice and cheapestPrice contain the price string
    const calculatedPrice = variantPrice ? parsePrice(variantPrice.calculated_price) :
        cheapestPrice ? parsePrice(cheapestPrice.calculated_price) :
            0;

    return { ...variantPrice, calculated_price: calculatedPrice };
  }, [price]);

  const addToCart = () => {
    if (variant) {
      addItem({
        variantId: variant.id,
        quantity,
      });

      // Clear the previous ecommerce object in the dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });

      // Find the price for the current region
      const regionCurrency = cart?.region.currency_code || "dkk";
      const variantPrice = variant.prices.find(price => price.currency_code === regionCurrency);
      const unitPrice = variantPrice ? variantPrice.amount / 100 : 0;

      const [colorOption, sizeOption] = variant.title.split('/').map(s => s.trim());


      // Prepare the ecommerce data for the dataLayer
      const ecommerceData = {
        event: "add_to_cart",
        ecommerce: {
          currency: regionCurrency,
          value: selectedPrice.calculated_price * quantity, // Total value for the quantity added
          items: [{
            item_id: variant.id, // Variant ID or product ID
            item_name: product.title, // Product title
            item_category: product.collection?.title,
            item_variant: colorOption, // Extracted color variant
            item_dimension: sizeOption, // Extracted size dimension
            price: selectedPrice.calculated_price, // Unit price
            quantity: quantity, // Quantity added to cart
          }]
        }
      };
      // Push the ecommerce event to the dataLayer
      window.dataLayer.push(ecommerceData);
    }
  };


  const increaseQuantity = () => {
    const maxQuantity = variant?.inventory_quantity || 0

    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1)
    } else {
      setMaxQuantityMet(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (maxQuantityMet) {
        setMaxQuantityMet(false)
      }
    }
  }

  return (
    <ProductActionContext.Provider
      value={{
        quantity,
        maxQuantityMet,
        disabled,
        inStock,
        options,
        variant,
        addToCart,
        updateOptions,
        decreaseQuantity,
        increaseQuantity,
        formattedPrice,
      }}
    >
      {children}
    </ProductActionContext.Provider>
  )
}

export const useProductActions = () => {
  const context = useContext(ProductActionContext)
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return context
}
