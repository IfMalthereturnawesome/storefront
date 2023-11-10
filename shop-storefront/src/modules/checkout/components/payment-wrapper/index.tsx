import {PaymentSession} from "@medusajs/medusa"
import {Elements} from "@stripe/react-stripe-js"
import {Appearance, loadStripe, StripeElementsOptions} from "@stripe/stripe-js"


type WrapperProps = {
    paymentSession?: PaymentSession | null
}

const Wrapper: React.FC<WrapperProps> = ({paymentSession, children}) => {


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
    const isDarkMode = document.documentElement.classList.contains('dark');

    const appearance: Appearance = {
        theme: isDarkMode ? 'night' : 'stripe',
        variables: {
            colorPrimaryText: '#262626',
            colorPrimary: isDarkMode ? '#23AFD0' : '#0570de',
        },
        labels: 'floating',
        rules: {
            '.Label': {
                color: isDarkMode ? '#e3dcdc' : '#262626',
            }
        },


    };

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
        <Elements stripe={stripePromise} options={elementsOptions}>
            {children}
        </Elements>
    )
}

export default Wrapper
