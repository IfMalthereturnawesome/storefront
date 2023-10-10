import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';


const OrderPlacedTemplate = ({ shipping_address, display_id, items, total }) => (
    <Html>
      <Head>
        <title>Order Received</title>
      </Head>
      <Preview>
        Thank you for your order {shipping_address.first_name} {shipping_address.last_name}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
              src={`${baseUrl}/images/eight-athletics-black-logo.png`}
              width="103"
              height="28"
              alt="Eight Atlhetics Logo"
              style={logo}
          />
          <Text style={header}>Order Confirmation</Text>
          <Text style={paragraph}>Hi {shipping_address.first_name} {shipping_address.last_name},</Text>
          <Text style={paragraph}>
            Thank you for your order! We've received your order #{display_id} and will begin processing it shortly.
          </Text>
          <Hr style={hr} />
          <Section style={orderSummary}>
            <Text style={summaryHeader}>Order Summary:</Text>
            <Text style={paragraph}>Order Number: {display_id}</Text>
            <Text style={paragraph}>Shipping Address:</Text>
            <Text style={paragraph}>
              {shipping_address.address_1}, {shipping_address.address_2} {shipping_address.city}, {shipping_address.postal_code} {shipping_address.country_code}
            </Text>
            {items.map((item, index) => (
                <Text key={index} style={paragraph}>
                  Item: {item.title} (Quantity: {item.quantity}) - Price: {item.unit_price / 100} {total.currency_code}
                </Text>
            ))}
            <Text style={paragraph}>
              Total: {total.total / 100} {total.currency_code}
            </Text>
          </Section>
          <Button pX={12} pY={12} style={button} href="https://www.eightathletics.com">
            Visit our website
          </Button>
          <Hr style={hr} />
          <Text style={footer}>Eight Athletics | Sofiegade 5, Copenhagen K, Denmark</Text>
        </Container>
      </Body>
    </Html>
);

export default OrderPlacedTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const header = {
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const orderSummary = {
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '4px',
};

const summaryHeader = {
  fontWeight: 'bold',
  marginBottom: '8px',
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  margin: '0 auto 20px',
  width: '200px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center',
};