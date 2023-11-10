// pages/check-payment.tsx
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useStripe } from '@stripe/react-stripe-js'

const CheckPayment: React.FC = () => {
    const router = useRouter()
    const stripe = useStripe()

    useEffect(() => {
        const handleRedirect = async () => {
            const clientSecret = router.query.payment_intent_client_secret
            const cartId = router.query.cartId

            if (!stripe || !clientSecret) return

            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret as string)

            if (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture') {
                // Complete the cart here using cartId
                // Navigate to success page or handle accordingly
            } else {
                // Handle failure
            }
        }

        handleRedirect()
    }, [router, stripe])

    return (
        <div>
            {/* Add your loading or processing state UI here */}
            Checking payment status...
        </div>
    )
}

export default CheckPayment
