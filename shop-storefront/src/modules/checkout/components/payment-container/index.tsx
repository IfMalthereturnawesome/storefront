import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"
import {PaymentElement} from '@stripe/react-stripe-js'

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Stripe",
    description: "Secure payment with Stripe",
  },
  "stripe-ideal": {
    title: "iDEAL",
    description: "Secure payment with iDEAL",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  manual: {
    title: "Test payment",
    description: "Test payment using medusa-payment-manual",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-y-4 border-b border-slate-5 last:border-b-0",
        {
          "bg-cyan-2": selected,
        }
      )}
    >
      <button
        className={"grid grid-cols-[12px_1fr] gap-x-4 py-4 px-3 sm:px-8"}
        onClick={setSelected}
        disabled={disabled}
      >
        <Radio checked={selected} />
        <div className="flex flex-col text-left">
          <h3 className="text-base-semi leading-none text-slate-12">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span className="text-slate-11 text-small-regular mt-2">
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
          {selected && (
            <div className="w-full mt-4">
              <PaymentElements paymentSession={paymentSession} />
            </div>
          )}
        </div>
      </button>
    </div>
  )
}

const PaymentElements = ({
  paymentSession,
}: {
  paymentSession: PaymentSession,
  }) => {






  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pt-8 pr-2 sm:pr-7">
          <PaymentElement id="payment-element" />
        </div>
      )
    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
