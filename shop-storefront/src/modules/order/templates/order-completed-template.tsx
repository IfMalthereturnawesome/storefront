"use client"

import { Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import React, { useEffect, useState } from "react"
import { loadStripe } from '@stripe/stripe-js';

type OrderCompletedTemplateProps = {
  order: Order
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
                                                                         order,
                                                                       }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)
  const [paymentStatusMessage, setPaymentStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding");
    setIsOnboarding(onboarding === "true");

    // Check Stripe payment status
    stripePromise.then(async (stripe) => {
      if (!stripe) return;

      const url = new URL(window.location.href);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');

      if (clientSecret) {
        const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (error) {
          setPaymentStatusMessage(`Error: ${error.message}`);
        } else if (paymentIntent) {
          setPaymentStatusMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
        }
      }
    });
  }, []);

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
              {paymentStatusMessage && (
                  <div className="text-red-500">
                    {paymentStatusMessage}
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default OrderCompletedTemplate