// pages/check-payment.tsx
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useStripe} from '@stripe/react-stripe-js'
import {useCart} from "medusa-react";
import {useStore} from "@lib/context/store-context";
import {useCheckout} from "@lib/context/checkout-context";

const CheckPayment: React.FC = () => {
    const router = useRouter()
    const stripe = useStripe()
    const [errorMessage, setErrorMessage] = useState('')
    // const {resetCart, setRegion} = useStore()
    const {push} = useRouter()
    const { onPaymentCompleted } = useCheckout()

    // const {
    //
    //     completeCheckout: {mutate: complete, isLoading: completingCheckout},
    // } = useCart()


    // const onPaymentCompleted = () => {
    //     complete(undefined, {
    //
    //         onSuccess: ({data}) => {
    //             resetCart()
    //             router.push(`/order/confirmed/${data.id}`);
    //             console.log(data.id, "data.id")
    //         },
    //
    //     })
    //     console.log('Payment completed!')
    // }


    console.log("I am in the check-payment page")



    useEffect(() => {
        const handleRedirect = async () => {
            const clientSecret = router.query.payment_intent_client_secret

            if (!stripe || !clientSecret) return

            try {
                const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret as string)

                if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture')) {
                    // Handle success
                    console.log('Payment succeeded!' + paymentIntent.status)
                    onPaymentCompleted()

                } else {
                    // Handle failure
                    setErrorMessage('Payment failed. Please try again or contact support.');
                    console.log('Payment failed!' + paymentIntent.status)
                }
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        }

        handleRedirect()
    }, [router, stripe])

    return (
        <div>
            {errorMessage ? (
                <div>
                    <p>Error: {errorMessage}</p>
                    {/* You can add a retry payment button or link to the cart page here */}
                </div>
            ) : (
                <p>Checking payment status...</p>
            )}
        </div>
    )
}

export default CheckPayment
