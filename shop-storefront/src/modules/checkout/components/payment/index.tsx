import { useCheckout } from "@lib/context/checkout-context"
import Spinner from "@modules/common/icons/spinner"
import React, {useEffect, useState} from "react"
import PaymentContainer from "../payment-container"
import StepContainer from "../step-container"

const Payment = () => {
  const {
    cart,
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: isSame },
    isDeliveryConfirmed,
  } = useCheckout()


  const [paymentInitialized, setPaymentInitialized] = useState(false);





  useEffect(() => {
    // Check if payment sessions are not initialized and shipping address is present
    if (!cart?.shipping_address || cart?.payment_sessions?.length || paymentInitialized) return;



    const timeout = setTimeout(() => {
        initPayment();

      setPaymentInitialized(true); // Mark as initialized to prevent future calls
    }, 5000);

    return () => clearTimeout(timeout);
  }, [cart, paymentInitialized]);

  return (
    <StepContainer
      title="Payment"
      index={isSame ? 3 : 4}
      isClosed={!isDeliveryConfirmed }
      closedState={
        <div className="px-4 sm:px-8 pb-4 sm:pb-8 text-xs sm:text-small-regular text-slate-11">
          <p>Select a delivery method to see available payment options</p>
        </div>
      }
    >

          <div>
        {cart?.payment_sessions?.length ? (
          cart.payment_sessions
            .map((paymentSession) => {
              return (
                <PaymentContainer
                  paymentSession={paymentSession}
                  key={paymentSession.id}
                  selected={
                    cart?.payment_session?.provider_id ===
                    paymentSession.provider_id
                  }
                  setSelected={() =>
                    setPaymentSession(paymentSession.provider_id)
                  }
                />
              )
            })
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-slate-12">
            <Spinner />
          </div>
        )}
      </div>

    </StepContainer>
  )
}

export default Payment
