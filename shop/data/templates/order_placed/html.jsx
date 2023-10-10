import * as React from 'react';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

const baseUrl = 'https://www.eightathletics.com';

const OrderPlacedTemplate = ({ shipping_address, display_id, items, paid_total, region }) => (



    <Html>
      <Head>
        <title>Order Received</title>
      </Head>
      <Preview>Thank you for your order {shipping_address.first_name} {shipping_address.last_name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={track.container}>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{display_id}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            <Img
                src={`${baseUrl}/images/eight-athletics-black-logo.png`}
                width="103"
                height="28"
                alt="Eight Athletics Logo"
                style={{ margin: 'auto' }}
            />
            <Heading style={global.heading}>Order Confirmation</Heading>
            <Text style={global.text}>
              Hi {shipping_address.first_name} {shipping_address.last_name}, Thank you for your order! We've received your order #{display_id} and will begin processing it shortly.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Shipping to: {shipping_address.first_name} {shipping_address.last_name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {shipping_address.address_1}, {shipping_address.address_2} {shipping_address.city}, {shipping_address.postal_code} {shipping_address.country_code}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section
              style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
          >
            {items.map((item, index) => (
                <Row key={index}>
                  <Column>
                    <Text style={{ ...paragraph, fontWeight: '500' }}>
                      Item: {item.title} (Quantity: {item.quantity}) - Price: {item.unit_price / 100} {region.currency_code}
                    </Text>
                  </Column>
                </Row>
            ))}
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
              <Column style={{ width: '170px' }}>
                <Text style={global.paragraphWithBold}>Total</Text>
                <Text style={track.number}>{items.paid_total / 100} {region.currency_code}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Link style={global.button} href="https://www.eightathletics.com">
              Visit our website
            </Link>
          </Section>
          <Hr style={global.hr} />
          <Section style={menu.container}>
            <Text style={menu.title}>Get Help</Text>
            <Row style={menu.content}>
              <Column style={{ width: '33%' }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Shipping Status
                </Link>
              </Column>
              <Column style={{ width: '33%' }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Shipping & Delivery
                </Link>
              </Column>
              <Column style={{ width: '33%' }} colSpan={1}>
                <Link href="/" style={menu.text}>
                  Returns & Exchanges
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Text style={footer.text}>
              Eight Athletics | Sofiegade 5, Copenhagen K, Denmark
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
);

export default OrderPlacedTemplate;

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
};

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px',
};

const paragraph = {
  margin: '0',
  lineHeight: '2',
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
  },
  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500',
  },
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000',
  } ,
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '10px auto',
  width: '600px',
  border: '1px solid #E5E5E5',
};

const track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7',
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F',
    textTransform: 'uppercase',
  },
};

const message = {
  padding: '40px 74px',
  textAlign: 'center',
} ;

const adressTitle = {
  ...paragraph,
  fontSize: '15px',
  fontWeight: 'bold',
};



const menu = {
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    backgroundColor: '#F7F7F7',
  },
  content: {
    ...paddingY,
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  title: {
    paddingLeft: '20px',
    paddingRight: '20px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '13.5px',
    marginTop: 0,
    fontWeight: 500,
    color: '#000',
  },
  tel: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '32px',
    paddingBottom: '22px',
  },
};


const footer = {
  policy: {
    width: '166px',
    margin: 'auto',
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } ,
};