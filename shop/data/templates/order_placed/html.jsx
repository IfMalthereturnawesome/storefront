import React from 'react';
import OrderPlacedTemplate from '@email/emails/order-placed.tsx';



const OrderPlacedEmail = ({ customerName, orderNumber }) => (

    <OrderPlacedTemplate customerName={customerName} orderNumber={orderNumber} />

);

export default OrderPlacedEmail;
