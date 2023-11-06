"use client"

import { Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import React, { useEffect, useState } from "react"

type OrderCompletedTemplateProps = {
  order: Order
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
                                                                         order,
                                                                       }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  return (
      <div className="bg-cyan-1 py-6 min-h-[calc(100vh-64px)] ">
        <div className="max-w-[1440px] w-full mx-auto px-2 3xs:px-3 2xs:px-5 xs:px-6 sm:px-8 md:px-10 flex flex-col justify-center items-center">
          {isOnboarding && <OnboardingCta orderId={order.id} />}
          <div className="max-w-4xl h-full bg-cyan-2 border border-sky-5 dark:border-amberA-12 w-full">
            <OrderDetails order={order} />
            <Items
                items={order.items}
                region={order.region}
                cartId={order.cart_id}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 border-b border-slate-5">
              <ShippingDetails
                  shippingMethods={order.shipping_methods}
                  address={order.shipping_address}
              />
              <OrderSummary order={order} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10">
              <Help />
            </div>
          </div>
        </div>
      </div>
  )
}

export default OrderCompletedTemplate