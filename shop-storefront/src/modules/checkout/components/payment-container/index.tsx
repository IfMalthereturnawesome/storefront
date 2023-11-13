import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"
import {PaymentElement} from '@stripe/react-stripe-js'
import {StripePaymentElementOptions} from "@stripe/stripe-js";


type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}


const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  const title = "Stripe";
  const description = "Secure payment with Stripe";

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
        className={"grid grid-cols-[12px_1fr] gap-x-4 py-4 px-3 lg:pt-4 lg:pb-12 sm:px-8"}
        onClick={setSelected}
        disabled={disabled}
      >
        <Radio checked={selected} />
        <div className="flex flex-col text-left">
          <h3 className="text-base-semi leading-none text-slate-12">
            {title}
          </h3>
          <span className="text-slate-11 text-small-regular mt-2">
            {description}
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


  const paymentElementOptions:StripePaymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  }

      return (
        <div className="pt-8 pr-2 sm:pr-7">
          <PaymentElement id="payment-element" options={paymentElementOptions} />

        </div>
      )

}

export default PaymentContainer
