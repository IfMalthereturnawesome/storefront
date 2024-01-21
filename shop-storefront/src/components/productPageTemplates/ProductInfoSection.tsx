"use client"

import { useIntersection } from "@lib/hooks/use-in-view"
import ProductTabs from "@modules/products/components/product-tabs"

import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef, useEffect, useState } from "react"
import MobileActions from "../../modules/products/components/mobile-actions"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ZoomableImageGallery from "@modules/products/components/image-gallary/ZoomableImageGallery"
import ProductFAQ from "@modules/products/components/product-faqs"
import MobileImageGallery from "@modules/products/components/image-gallary/MobileImageGallery"
import useBetterMediaQuery from "@/utils/useBetterMediaQuery"
import PaymentOptionsIcons from "@/components/ecommerceElements/PaymentOptionsIcons"
import MoneyBackGuarantee from "@/components/ecommerceElements/MoneyBackGuarantee"
import { TestimonialsBannerSmall } from "@/components/reviews/TestimonialsBanner"

type ProductTemplateProps = {
  product: PricedProduct
  productFAQ: { question: string; answer: string }[]
  shippingFAQ: { question: string; answer: string }[]
  returnFAQ: { question: string; answer: string }[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  productFAQ,
  shippingFAQ,
  returnFAQ,
}) => {
  const info = useRef<HTMLDivElement>(null)

  const isDesktop = useBetterMediaQuery("(min-width: 1024px)")


  const inView = useIntersection(info, "0px")
  const productHandle = product?.handle || "sleep-mask-one"
  const [selectedColor, setSelectedColor] = useState("Warm Grey")
  const productImageDirectory = `/images/products/${productHandle}/`
  const [imagePaths, setImagePaths] = useState([])

  const handleColorChange = (color) => {
    setSelectedColor(color)
  }

  useEffect(() => {
    if (selectedColor) {
      const basePath = `${productImageDirectory}${selectedColor}/`
      const updatedPaths = Array(4)
        .fill(null)
        .map((_, idx) => `${basePath}image${idx + 1}.jpg`)

      setImagePaths(updatedPaths)
    }
  }, [selectedColor, productImageDirectory])

  return (
    <>
      <div
        className={
          "relative z-[0] lg:z-[1] bg-gradient-to-r from-cyan-2 to-cyan-1 dark:from-cyan-3 dark:to-cyan-1 "
        }
        ref={info}
      >
        <div className="content-container__big flex flex-col lg:flex-row " >
          {/* Left side - Image Gallery */}
          <div className="flex-1">
            {/* Desktop Image Gallery */}
           <div className={"hidden xsmall:block"}>
              <ZoomableImageGallery key={selectedColor} images={imagePaths} />
           </div>

            {/* Mobile Image Gallery */}
            <div className={"block xsmall:hidden"}>
           <MobileImageGallery images={imagePaths} />
            </div>
          </div>

          {/* Right side - Sticky Sidebar */}
          <div className="w-full lg:max-w-[364px] xl:max-w-[440px] 2xl:max-w-[470px] 3xl:max-w-[510px]">
            <div
              style={{ minHeight: "calc(100vh - 64px)" }}
              className="sticky top-0"
            >
              <div className="py-0 sm:py-4 px-4 lg:pb-0 lg:pt-6 lg:px-8">
                <ProductInfo
                  product={product}
                  onColorChange={handleColorChange}
                />
                <PaymentOptionsIcons />
                <MoneyBackGuarantee />
                <TestimonialsBannerSmall />
              </div>
            </div>
          </div>
        </div>
        <div className={"py-2 lg:py-6"}></div>

        {/* Additional sections */}
        <ProductTabs product={product} />
        <ProductFAQ
          productFAQ={productFAQ}
          shippingFAQ={shippingFAQ}
          returnFAQ={returnFAQ}
        />
      </div>

        <MobileActions
          product={product}
          show={inView}
          onColorChange={handleColorChange}
        />

    </>
  )
}

export default ProductTemplate
