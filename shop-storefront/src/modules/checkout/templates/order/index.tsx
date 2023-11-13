'use client';
import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import {useCartOrder} from "medusa-react";
import {useCheckout} from "@lib/context/checkout-context";
import Spinner from "@modules/common/icons/spinner"
import {loadStripe} from "@stripe/stripe-js";

const MAX_RETRY_ATTEMPTS = 5;
const RETRY_INTERVAL_MS = 400; // Retry every 0.5 seconds
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const OrderTemplate = () => {
    const {onPaymentCompleted} = useCheckout();
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [statusMessage, setStatusMessage] = useState("Processing your order...");
    const router = useRouter();
    const searchParams = useSearchParams();
    const cartId = searchParams.get('cart_id');
    const redirectStatus = searchParams.get('redirect_status')
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
    const {order, isLoading, refetch} = useCartOrder(cartId);

    const checkPaymentStatus = async () => {
        if (!payment_intent_client_secret) return;

        const stripe = await stripePromise;
        if (!stripe) return;

        const { paymentIntent, error } = await stripe.retrievePaymentIntent(payment_intent_client_secret);
        if (error) {
            setError(error.message);
            setIsProcessing(false);
            return;
        }
        if (paymentIntent && paymentIntent.status === 'succeeded') {
            await onPaymentCompleted();
        }
    };

    useEffect(() => {
        const processOrder = async () => {
            if (redirectStatus === 'failed') {
                router.push('/checkout');
                return;
            }

            await checkPaymentStatus();

            if (!isLoading && order) {
                router.push(`/order/confirmed/${order.id}`);
            } else if (!isLoading && !order && retryCount < MAX_RETRY_ATTEMPTS) {
                setStatusMessage(`Checking order status... (Attempt ${retryCount + 1} of ${MAX_RETRY_ATTEMPTS})`);
                setRetryCount(retryCount + 1);
                await refetch();
            } else if (retryCount >= MAX_RETRY_ATTEMPTS) {
                setError("Order not found.");
                setIsProcessing(false);
            }
        };

        processOrder();
    }, [isLoading, order, retryCount,  refetch, redirectStatus, cartId, payment_intent_client_secret]);



    if (isProcessing || isLoading) {
        return (
            <div className="min-h-screen bg-cyan-1 flex flex-col items-center justify-center">
                <Spinner size={24}  className={"mb-4"}/>
                <h1 className="text-3xl font-semibold text-slate-12">{statusMessage}</h1>
                <p className="text-slate-11 text-lg mt-4">Please do not leave this page.</p>
                <p className="text-slate-11 mt-4">Please wait, your order is being finalized.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-cyan-1 flex flex-col items-center justify-center">
                <h1 className="text-xl font-semibold text-red-600">Error</h1>
                <p className="text-slate-11 mt-2">{error}</p>
            </div>
        );
    }

    return null;
}

export default OrderTemplate;
