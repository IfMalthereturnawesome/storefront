import React from 'react';
import OrderPlacedTemplate from '/../react-email-starter/emails/order-placed';

const OrderPlacedEmail = ({ customerName, orderNumber }) => (

    <OrderPlacedTemplate customerName={customerName} orderNumber={orderNumber} />

);

export default OrderPlacedEmail;
