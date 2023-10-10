
import { getWelcomeEmailHtml } from 'shop-storefront/src/emails/renderEmail.js';

const OrderPlacedTemplate = ({ customerName }) => (
    getWelcomeEmailHtml(customerName)
);

export default OrderPlacedTemplate;