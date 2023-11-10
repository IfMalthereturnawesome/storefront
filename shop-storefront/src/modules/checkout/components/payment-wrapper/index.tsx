import { PaymentSession } from "@medusajs/medusa"
import { Elements } from "@stripe/react-stripe-js"
import {Appearance, loadStripe, StripeElementsOptions} from "@stripe/stripe-js"
import React from "react"

type WrapperProps = {
  paymentSession?: PaymentSession | null
}

const Wrapper: React.FC<WrapperProps> = ({ paymentSession, children }) => {


  if (!paymentSession) {
    return <div>{children}</div>
  }

  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <StripeWrapper paymentSession={paymentSession}>
          {children}
        </StripeWrapper>
      )

    default:
      return <div>{children}</div>
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "")

const StripeWrapper: React.FC<WrapperProps> = ({
  paymentSession,
  children,
}) => {

  const appearance: Appearance = {
    theme: "flat",
    variables: {
      colorPrimaryText: '#262626',
          },
    labels: 'floating',
    rules: {
      '.Label': {
        color: '#30313d',
      }
    },


  };

  // update the appearance .Label color to match if dark mode is enabled with the update method



  const options = {
    appearance,
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  };

  const elementsOptions: StripeElementsOptions = {
    clientSecret: paymentSession!.data.client_secret as string | undefined,
    ...options,
  };


  return (
    <Elements stripe={stripePromise} options={elementsOptions} >
      {children}
    </Elements>
  )
}

export default Wrapper
