import React from 'react';

const OrderPlacedTemplate = ({ customerName, orderNumber }) => (
    <table>
      <tbody>
      <tr>
        <td>
          <h1>Thank you for your order, {customerName}!</h1>
          <p>Your order number is: {orderNumber}</p>
          <p>We'll notify you once it's shipped.</p>
        </td>
      </tr>
      </tbody>
    </table>
);

export default OrderPlacedTemplate;