import { useCheckout } from "@lib/context/checkout-context"
import { PaymentSession } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useCart } from "medusa-react"
import React, { useEffect, useState } from "react"
import BuyNowButton from "@/components/elements/BuyNowButton";
import cart from "@modules/common/icons/cart";


type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const { cart } = useCart()
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setNotReady(true);

    console.log(cart.shipping_address)
    if (!cart) {
      setErrorMessage("Cart is not available.");
      return;
    }

    if (!cart.shipping_address) {
      setErrorMessage("Shipping address is required.");
      return;
    }

    if (!cart.email) {
      setErrorMessage("Email is required.");
      return;
    }

    if (cart.shipping_methods.length < 1) {
      setErrorMessage("Shipping method is required.");
      return;
    }

    setNotReady(false);
    setErrorMessage(null);
  }, [cart]);


  return (
      <div>
        {errorMessage && (
            <div className="text-red-500 text-small-regular mt-2">
              {errorMessage}
            </div>
        )}

        {/* existing switch case logic for rendering the payment buttons */}
        {(() => {
          switch (paymentSession?.provider_id) {
            case "stripe":
              return (
                  <StripePaymentButton session={paymentSession} notReady={notReady} />
              );

          }
        })()}
      </div>
  );
}

const StripePaymentButton = ({
                               session,
                               notReady,
                             }: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
      undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const stripe = useStripe()
  const elements = useElements()


  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [stripe, elements])

  const handlePayment = async (e) => {
      e.preventDefault()
    setSubmitting(true)

      if (!stripe || !elements  || !cart ) {
          setSubmitting(false)
          return
      }

      const return_url = `${window.location.origin}/order-processing?cart_id=${cart.id}`;


      const result = await stripe.confirmPayment({
          elements,
            confirmParams: {
                return_url: return_url,
            },


      });

      if (result.error) {

          setErrorMessage(result.error.message);
      } else {

      }

      setSubmitting(false);
  }




    return (

      <>
        <BuyNowButton
            message={"Place Order"}
            disabled={submitting || disabled || notReady}
            // @ts-ignore
            onClick={handlePayment}
            title="Place Order"
            className={"truncate"}
        >
          {submitting ? <Spinner /> : "Checkout"}
        </BuyNowButton>
        {errorMessage && (
            <div className="text-red-500 text-small-regular mt-2">
              {errorMessage}
            </div>
        )}
      </>
  )
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

const PayPalPaymentButton = ({
                               session,
                               notReady,
                             }: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
      undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const handlePayment = async (
      _data: OnApproveData,
      actions: OnApproveActions
  ) => {
    actions?.order
        ?.authorize()
        .then((authorization) => {
          if (authorization.status !== "COMPLETED") {
            setErrorMessage(`An error occurred, status: ${authorization.status}`)
            return
          }
          onPaymentCompleted()
        })
        .catch(() => {
          setErrorMessage(`An unknown error occurred, please try again.`)
        })
        .finally(() => {
          setSubmitting(false)
        })
  }
  return (
      <PayPalScriptProvider
          options={{
            "client-id": PAYPAL_CLIENT_ID,
            currency: cart?.region.currency_code.toUpperCase(),
            intent: "authorize",
          }}
      >
        {errorMessage && (
            <span className="text-rose-500 mt-4">{errorMessage}</span>
        )}
        <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={async () => session.data.id as string}
            onApprove={handlePayment}
            disabled={notReady || submitting}
        />
      </PayPalScriptProvider>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted } = useCheckout()

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()

    setSubmitting(false)
  }

  return (
      <Button disabled={submitting || notReady} onClick={handlePayment}>
        {submitting ? <Spinner /> : "Checkout"}
      </Button>
  )
}

export default PaymentButton
