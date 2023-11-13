'use client';
import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import {useCartOrder} from "medusa-react";
import {useCheckout} from "@lib/context/checkout-context";
import Spinner from "@modules/common/icons/spinner"

const MAX_RETRY_ATTEMPTS = 5;
const RETRY_INTERVAL_MS = 400; // Retry every 0.5 seconds

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
    const {order, isLoading, refetch} = useCartOrder(cartId);

    useEffect(() => {
        if (redirectStatus === 'failed') {
            router.push('/checkout');
            return;
        }

        if (!isLoading && order) {
            router.push(`/order/confirmed/${order.id}`);
        } else if (!isLoading && !order && retryCount < MAX_RETRY_ATTEMPTS) {
            setStatusMessage(`Checking order status... (Attempt ${retryCount + 1} of ${MAX_RETRY_ATTEMPTS})`);
            setTimeout(() => {
                refetch();
                onPaymentCompleted();
                setRetryCount(retryCount + 1);
            }, RETRY_INTERVAL_MS);
        } else if (retryCount >= MAX_RETRY_ATTEMPTS) {
            setError("Order not found.");
            setIsProcessing(false);
        }
    }, [isLoading, order, retryCount, onPaymentCompleted, router, refetch, redirectStatus]);


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
