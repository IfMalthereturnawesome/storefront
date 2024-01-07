import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import {formatAmount,  useCart, useRegions} from "medusa-react"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import SizeGuideModal from "@modules/products/components/size-guide/SizeGuide"
import Image from "next/image"
import SplitType from "split-type"
import NativeSelect from "@modules/common/components/native-select"
import SizeOptionSelect from "../option-select/SizeOptionSelect"
import ColorOptionSelect from "@modules/products/components/option-select/ColorOptionSelect"
import SizeGuideMobile from "@modules/products/components/size-guide/SizeGuideMobile"
import AddToCartButton from "@/components/elements/AddToCart"
import VisiterCounter from "@/components/sleepMask/VisiterCounter";

import { useStore } from "@lib/context/store-context"

type ProductActionsProps = {
  product: PricedProduct
  onColorChange: (color: string) => void
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  onColorChange,
}) => {
  const {
    updateOptions,
    addToCart,
    options,
    inStock,
    variant,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    disabled

  } = useProductActions()
  const { cart } = useCart()
  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const colorOptionId = product.options.find(
    (opt) => opt.title.toLowerCase() === "color"
  )?.id
  const sizeOptionId = product.options.find(
    (opt) => opt.title.toLowerCase() === "size"
  )?.id

  const { countryCode } = useStore()
  const { regions } = useRegions()


  const regionCurrency = (cart && cart.region) ? cart.region.currency_code : "dkk";
  const initialUnitPrice = useMemo(() => {
    const anyVariantPrice = product.variants[0].prices.find(price => price.currency_code === regionCurrency);
    if (anyVariantPrice && cart?.region) {
      return formatAmount({
        amount: anyVariantPrice.amount,
        region: cart.region,
        includeTaxes: false,

      });
    }
    return "0"; // Default value if price or region is not available
  }, [product.variants, regionCurrency, cart?.region]);



  const getCountryLabel = () => {
    if (!countryCode || !regions) {
      return "EU"
    }

    const countryOptions = regions
      .map((r) =>
        r.countries.map((c) => ({
          country: c.iso_2,
          label: c.display_name,
        }))
      )
      .flat()

    const option = countryOptions.find((o) => o.country === countryCode)
    return option ? option.label : "EU"
  }

  // Get the label for the selected country when the country code or regions change and save in a variable
  const [countryLabel, setCountryLabel] = useState(getCountryLabel())
  useEffect(() => {
    setCountryLabel(getCountryLabel())
    getCountryLabel()

  }, [countryCode, regions])

  const isColorSelected = !!options[colorOptionId]
  const isSizeSelected = !!options[sizeOptionId]
  const isBothSelected = isColorSelected && isSizeSelected
  const [isModalOpen, setModalOpen] = useState(false)

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const parsePrice = (priceString) => {
    const numericPart = priceString.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericPart);
  };


    const percentageDiff = useMemo(() => {
        if (!selectedPrice) {
            return null
        }
        const calculatedPrice = parsePrice(selectedPrice.calculated_price)
        const unitPrice = parsePrice(initialUnitPrice)
        const percentageDiff = ((unitPrice - calculatedPrice) / unitPrice) * 100
        return Math.round(percentageDiff)
        }, [selectedPrice, initialUnitPrice])




  useEffect(() => {
    if (!countryCode || !regions) {

      return
    }
    getCountryLabel()

    let ctx = gsap.context(() => {
      const split = new SplitType(".shipping-text", {
        types: "lines,words,chars",
      })
      gsap.set(split.chars, { opacity: 0 }) // Initially hide the second part of the text

      gsap.from(split.chars, {
        opacity: 0,
        x: -10,
        stagger: 0.03,
        ease: "power2.inOut",

        scrollTrigger: {
          trigger: ".triggerMe",
          start: "top 80%",
          end: "top 50%",
          onEnter: () => {
            gsap.to(".truck-icon", {
              x: "145px",
              ease: "none",
            })
            gsap.to(split.chars, { opacity: 1, x: 0, stagger: 0.03 }) // Reveal the second part of the text
          },
        },
      })
    })

    return () => ctx.revert()
  }, [countryCode, regions])

  // const maxQuantity = variant?.inventory_quantity || 0
  const handleQuantityChange = (event) => {
    const selectedQuantity = parseInt(event.target.value, 10)
    if (selectedQuantity !== quantity) {
      // Using the logic in the context to handle quantity changes
      if (selectedQuantity > quantity) {
        for (let i = 0; i < selectedQuantity - quantity; i++) {
          increaseQuantity()
        }
      } else {
        for (let i = 0; i < quantity - selectedQuantity; i++) {
          decreaseQuantity()
        }
      }
    }
  }

  const handleQuantityChangeMobile = (change) => {
    const newQuantity = quantity + change
    if (
      newQuantity !== quantity &&
      newQuantity >= 1 &&
      newQuantity <= maxDisplayQuantity
    ) {
      change > 0 ? increaseQuantity() : decreaseQuantity()
    }
  }

  const maxDisplayQuantity =
    variant && variant.inventory_quantity > 0 ? variant.inventory_quantity : 10

  const handleColorSelect = (color) => {
    updateOptions({ [colorOptionId]: color })
    onColorChange(color)
  }

  const stockLevels = useMemo(() => {
    return product.variants.reduce((acc, variant) => {
      const color = variant.options.find((o) => o.option_id === colorOptionId)
        ?.value
      const size = variant.options.find((o) => o.option_id === sizeOptionId)
        ?.value
      if (!acc[color]) acc[color] = {}
      acc[color][size] = variant.inventory_quantity
      return acc
    }, {})
  }, [product.variants, colorOptionId, sizeOptionId])


  return (
    <div className="flex flex-col  gap-y-2 ">
      <div className="order-1 lg:order-1">
        <VisiterCounter />
        {product.collection && (
            <p className="text-small-regular w-fit mb-1 text-slate-11">
              {product.collection.title}
            </p>

          // <Link
          //     href={`/collections/${product.collection.handle}`}
          //     className="text-small-regular w-fit mb-1 text-slate-11"
          // >
          //     {product.collection.title}
          // </Link>
        )}
        <h2 className="text-3xl inline header-bg-clip my-2 lg:my-2 font-bold ">
          {product.title} {" "}
        </h2>
        <h2 className="text-3xl inline text-slate-12 my-2 lg:my-2 font-bold ">
          {"stays comfortable the whole night"}
        </h2>

        <p className="text-base-regular text-slate-12 mb-3 lg:mb-0 ">
          {product.description}
        </p>
      </div>
      <div className=" order-1 lg:order-2">
        {product.variants.length > 1 && (
          <div className="mt-6 mb-4 2xs:mt-8 2xs:mb-5 md:my-8 2xl:mt-8 2xl:mb-6 flex flex-col-reverse gap-y-6 text-slate-12  ">
            {(product.options || []).map((option) => {
              const additionalElem =
                option.title.toLowerCase() === "size" ? (
                  <button
                    className={
                      "p-0 m-0 leading-5 text-center  underline underline-offset-2 bg-transparent cursor-pointer transition duration-150 text-sm text-slate-12 hover:text-black dark:text-amberA-12 dark:hover:text-amber-11"
                    }
                    onClick={() => setModalOpen(true)}
                  >
                    Size Guide
                  </button>
                ) : null

              return (
                <div key={option.id}>
                  {option.title.toLowerCase() === "color" && (
                    <ColorOptionSelect
                      option={option}
                      current={options[option.id]}
                      onColorChange={onColorChange}
                      updateOption={updateOptions}
                      title={option.title}
                      additionalElement={additionalElem}
                      stockLevels={stockLevels}
                    />
                  )}

                  {option.title.toLowerCase() === "size" && (
                    <>
                      <SizeOptionSelect
                        option={option}
                        current={options[option.id]}
                        updateOption={updateOptions}
                        title={option.title}
                        additionalElement={additionalElem}
                        stockLevels={stockLevels[options[colorOptionId]] || {}}
                      />
                      <SizeGuideModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                      />
                      <SizeGuideMobile
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                      />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className={"order-3 lg:order-3"}>
        {selectedPrice && (
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              {/* Sale Price (if applicable) */}
              {selectedPrice.price_type === "sale" && (
                <span className="text-lg text-gray-800 dark:text-gray-300">
                  Was <span className="line-through"> {initialUnitPrice}</span>
                </span>
              )}

              {/* Discount Label */}
              {selectedPrice.price_type === "sale" && (
                <span className="bg-red-10 text-red-100 text-sm font-semibold px-2 py-1 rounded">
                  {percentageDiff + 1}% OFF
                </span>
              )}
            </div>

            {/* Current Price */}
            <div className="flex items-center justify-between">
              <span
                className={clsx("font-bold text-2xl lg:text-3xl", {
                  "text-red-10": selectedPrice.price_type === "sale",
                  "text-slate-12": selectedPrice.price_type === "default",
                })}
              >
                {/* "Now" prefix if the product is on sale */}
                {selectedPrice.price_type === "sale" && (
                  <span className={"font-normal"}>Sale </span>
                )}
                {selectedPrice.calculated_price}
              </span>
              <span className="bg-green-200 text-green-800 text-sm font-semibold px-2 py-1 mb-4 rounded">
                Free Shipping
              </span>
            </div>

            {isBothSelected && (
              <>
                {/*<div className="items-center gap-x-2 text-base-semi hidden lg:flex">*/}
                {/*    <label htmlFor="quantity" className="mr-2">Quantity:</label>*/}
                {/*    <NativeSelect*/}
                {/*        value={quantity}*/}
                {/*        onChange={handleQuantityChange}*/}
                {/*        placeholder={"Select quantity"}*/}
                {/*        className="max-h-[45px] w-fit"*/}
                {/*        disabled={disabled || !inStock}*/}
                {/*    >*/}
                {/*        {Array.from({length: maxDisplayQuantity}).map((_, i) => {*/}
                {/*            const value = i + 1;*/}
                {/*            return (*/}
                {/*                <option value={value} key={i}>*/}
                {/*                    {value}*/}
                {/*                </option>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </NativeSelect>*/}
                {/*</div>*/}

                <div className="flex sm:flex-row items-center py-4 gap-x-2 text-base-semi">
                  <label
                    htmlFor="quantity"
                    className="mr-1 my-2 sm:mb-0 items-center"
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChangeMobile(-1)}
                      disabled={quantity <= 1}
                      className={`px-4 py-2 bg-cyan-3 hover:bg-cyan-4 text-slate-12 focus:outline-none ${
                        quantity <= 1 ? "text-slate-12/25" : ""
                      }`}
                    >
                      -
                    </button>

                    <span className="px-4 py-2 border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChangeMobile(1)}
                      disabled={quantity >= maxDisplayQuantity}
                      className="px-4 py-2 bg-cyan-3 hover:bg-cyan-4 text-slate-12 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mb-3 mt-4 lg:mt-5 lg:mb-2 flex triggerMe items-center text-slate-12 text-sm">
          <span className="free-shipping-text inline-block">Free</span>
          <div className="truck-icon ml-[0.4rem]">
            <Image
              src={"/images/free-shipping-icon.svg"}
              alt={"Free shipping icon"}
              width={22}
              height={22}
              className={"dark:invert"}
            />
          </div>

          <span className="shipping-text inline-block -ml-6">
            shipping to {countryLabel}
          </span>
        </div>
        <AddToCartButton
          title={
            !inStock
              ? "Out of stock"
              : isBothSelected
                ? "Add to cart"
                : "Choose options"
          }
          onClick={addToCart}
          disabled={!isBothSelected || !inStock}
          className={"truncate"}
        />
      </div>
    </div>
  )
}

export default ProductActions
