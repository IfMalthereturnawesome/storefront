import React from 'react';
import { getWelcomeEmailHtml } from 'shop-storefront/src/emails/renderEmail.js';

const OrderPlacedTemplate = ({ customerName, orderNumber }) => (
    getWelcomeEmailHtml(customerName)
);

export default OrderPlacedTemplate;