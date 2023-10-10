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
  Tailwind,
} from '@react-email/components';


const baseUrl = 'https://www.eightathletics.com';

const OrderPlacedTemplate = ({ shipping_address, display_id, items, region, total, subtotal_ex_tax, shipping_total, tax_total, shipping_methods }) => {
  const serviceName = shipping_address.metadata?.selectedServicePoint?.name;
  const shippingMethodName = shipping_methods?.shipping_option?.name;

  return (
      <Html>
        <Tailwind>
          <Head/>
          <Preview>Thank you for your order {shipping_address.first_name} {shipping_address.last_name}</Preview>
          <Body style={main} className={"bg-white"}>
            <Container style={container}>
              <Section style={track.container}>
                <Row>
                  <Column>
                    <Text style={global.paragraphWithBold}>Order Number</Text>
                    <Text style={track.number}>{display_id}</Text>
                  </Column>
                </Row>
              </Section>
              <Hr style={global.hr}/>
              <Section style={message}>
                <Img
                    src={`${baseUrl}/images/eight-athletics-black-logo.png`}
                    width="103"
                    height="28"
                    alt="Eight Athletics Logo"
                    style={{margin: 'auto'}}
                />
                <Heading style={global.heading}>Order Confirmation</Heading>
                <Text style={global.text}>
                  Hi {shipping_address.first_name} {shipping_address.last_name}, Thank you for your order!
                  We've received your order #{display_id} and will begin processing it shortly.
                </Text>
              </Section>
              <Hr style={global.hr}/>
              <Section style={global.defaultPadding}>
                <Text style={adressTitle}>Shipping
                  to: {shipping_address.first_name} {shipping_address.last_name}</Text>
                <Text style={{...global.text, fontSize: 14}}>
                  {shipping_address.address_1}, {shipping_address.address_2} {shipping_address.city}, {shipping_address.postal_code} {shipping_address.country_code}
                </Text>
                <Text style={adressTitle}>
                  Shipping Method:
                  {shippingMethodName}
                </Text>
                <Text style={adressTitle}>
                  Shipping Method:
                  {serviceName}
                </Text>

              </Section>
              <Hr style={global.hr}/>
              <Section style={{...paddingX, paddingTop: '40px', paddingBottom: '10px'}}>
                <Text style={adressTitle}>Order Summary
                </Text>
                {items.map((item, index) => (
                    <Row key={index}
                         style={{borderBottom: '1px solid #e0e0e0', paddingTop: '10px', paddingBottom: '10px'}}>
                      <Column>
                        <Text
                            style={{...paragraph, fontWeight: '500', color: '#2C2C2C', marginBottom: '0px'}}>
                          {item.title}
                        </Text>
                        <Text style={{...paragraph, color: '#7F7F7F'}}>
                          {item.size} / {item.color}
                        </Text>
                      </Column>
                      <Column>
                        <Text style={{...paragraph, color: '#7F7F7F', textDecoration: 'uppercase'}}>
                          ({item.unit_price / 100} + {item.tax_total}) {region.currency_code}
                        </Text>
                      </Column>
                      <Column>
                        <Text style={{...paragraph, color: '#7F7F7F'}}>
                          x {item.quantity}
                        </Text>
                      </Column>
                      <Column>
                        <Text style={{textAlign: 'right'}}>
                          {total}
                        </Text>
                      </Column>
                    </Row>
                ))}                        </Section>


              <Section style={{...paddingX, paddingBottom: '10px'}}>
                <Row style={{justifyContent: 'space-between'}}>
                  <Column>
                    <Text style={{...paragraph, fontWeight: 'normal', color: '#2C2C2C'}}>Subtotal</Text>
                  </Column>
                  <Column>
                    <Text style={{...paragraph, textAlign: 'right', marginRight: '10px'}}>
                      {subtotal_ex_tax}
                    </Text>
                  </Column>
                </Row>
                <Row style={{justifyContent: 'space-between', marginTop: '10px'}}>
                  <Column>
                    <Text style={{...paragraph, fontWeight: 'normal', color: '#2C2C2C'}}>Shipping</Text>
                  </Column>
                  <Column>
                    <Text style={{...paragraph, textAlign: 'right', marginRight: '10px'}}>
                      {shipping_total}
                    </Text>
                  </Column>
                </Row>
                <Row style={{justifyContent: 'space-between', marginTop: '10px'}}>
                  <Column>
                    <Text style={{...paragraph, fontWeight: 'normal', color: '#2C2C2C'}}>Tax</Text>
                  </Column>
                  <Column>
                    <Text style={{...paragraph, textAlign: 'right', marginRight: '10px'}}>
                      {tax_total}
                    </Text>
                  </Column>
                </Row>
                <Row style={{justifyContent: 'space-between', marginTop: '10px'}}>
                  <Column>
                    <Text style={{...paragraph, fontWeight: 'bold', color: '#2C2C2C'}}>Total</Text>
                  </Column>
                  <Column>
                    <Text
                        style={{...paragraph, fontWeight: 'bold', textAlign: 'right', marginRight: '10px'}}>
                      {total}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Hr style={global.hr}/>
              <Section style={paddingY}>
                <Link style={global.button} href="https://www.eightathletics.com" className={"mx-auto"}>
                  Visit our website
                </Link>
              </Section>
              <Hr style={global.hr}/>
              <Section style={menu.container}>
                <Text style={menu.title}>Get Help</Text>
                <Row style={menu.content}>
                  <Column style={{width: '33%'}} colSpan={1}>
                    <Link href="/" style={menu.text}>
                      Shipping Status
                    </Link>
                  </Column>
                  <Column style={{width: '33%'}} colSpan={1}>
                    <Link href="/" style={menu.text}>
                      Shipping & Delivery
                    </Link>
                  </Column>
                  <Column style={{width: '33%'}} colSpan={1}>
                    <Link href="/" style={menu.text}>
                      Returns & Exchanges
                    </Link>
                  </Column>
                </Row>
              </Section>
              <Hr style={global.hr}/>
              <Section style={paddingY}>
                <Text style={footer.text}>
                  Eight Athletics | Sofiegade 5, Copenhagen K, Denmark
                </Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
  );

};

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
    color: '#000',
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