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
            fontFamily: 'Sohne, system-ui, sans-serif',
            fontWeightNormal: '500',
            borderRadius: '8px',

        },
        labels: 'floating',
        rules: {
            '.Label': {
                color: isDarkMode ? '#e3dcdc' : '#262626',
            },
            '.Input, .Block ': {
                backgroundColor: isDarkMode ? '#0B161A' : 'inherit',
                border: isDarkMode ? '1.5px solid var(--colorPrimary)' : '1px solid  var(--colorPrimary)',
            }
        },


    };


    const elementsOptions: StripeElementsOptions = {
        clientSecret: paymentSession!.data.client_secret as string | undefined,
        appearance: appearance,
    };


    return (
        <Elements stripe={stripePromise} options={elementsOptions}>
            {children}
        </Elements>
    )
}

export default Wrapper
