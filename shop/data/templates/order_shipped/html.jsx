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

const OrderShippedTemplate = ({ shipping_address, display_id, items, total, tracking_number,shipping_methods }) => {
  const trackingLink = `${baseUrl}/track-order?package_number=${tracking_number}`;
  const serviceName = shipping_address.metadata?.selectedServicePoint?.name;
  return (
      <Html>
        <Tailwind
            config={{
              theme: {
                screens: {
                  sm: { max: '600px' },
                  xs: { max: '425px' },
                },
                extend: {
                  colors: {
                    mask: {
                      black: '#030203',
                    },
                    custom: {
                      white: '#faf7f7',
                    },
                  },
                  spacing: {
                    full: '100%',
                    px: '1px',
                    0: '0',
                    2: '8px',
                  },
                },
              },
            }}
        >
          <Head />
          <Preview>
            Your tracking number is {tracking_number} for order {display_id} with {items[0].name}
            {items.length > 1 ? ' and more' : ''}
          </Preview>

          <Body style={main} className={"bg-white text-mask-black "}>
            <Container style={container}>

              {/* Shipping Details */}
              <Section className="px-10 py-6 mx-auto w-full">
                <Text className="m-0 leading-6 font-bold text-xl mb-2 ">Shipping Details</Text>

                {/* Recipient Name */}
                <Text className="m-0 leading-6 font-bold text-base mb-1">Recipient:</Text>
                <Text className="m-0 leading-6 text-sm mb-3">{shipping_address.first_name} {shipping_address.last_name}</Text>

                {/* Address */}
                <Text className="m-0 leading-6 font-bold text-base mb-1">Address:</Text>
                <Text className="m-0 leading-6 text-sm mb-1">{shipping_address.address_1}</Text>
                {shipping_address.address_2 && <Text className="m-0 leading-6 text-sm mb-1">{shipping_address.address_2}</Text>}
                <Text className="m-0 leading-6 text-sm mb-3">{shipping_address.city}, {shipping_address.postal_code} {shipping_address.country_code}</Text>

                {/* Shipping Method */}
                {shipping_methods.map((method, index) => (
                    <div key={index} className="mb-3">
                      <Text className="m-0 leading-6 font-bold text-base mb-1">Shipping Method:</Text>
                      <Text className="m-0 leading-6 text-sm">{method.shipping_option.name}</Text>
                    </div>
                ))}

                {/* Service Point */}
                {serviceName && (
                    <div className="mb-3">
                      <Text className="m-0 leading-6 font-bold text-base mb-1">Service Point:</Text>
                      <Text className="m-0 leading-6 text-sm">{serviceName}</Text>
                    </div>
                )}

                {/* Tracking Details */}
                <Text className="m-0 leading-6 font-bold text-base mb-1">Tracking Number:</Text>
                <Text className="m-0 leading-6 text-sm mb-3">{tracking_number}</Text>
                <Link href={trackingLink} style={{ ...global.button, display: 'block', margin: '20px auto' }}>
                  Track Your Order
                </Link>
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
                    <Link href={`${baseUrl}/track-order`} style={menu.text}>
                      Shipping Status
                    </Link>
                  </Column>
                  <Column style={{width: '33%'}} colSpan={1}>
                    <Link href={`${baseUrl}/terms/shipping-policy`} style={menu.text}>
                      Shipping & Delivery
                    </Link>
                  </Column>
                  <Column style={{width: '33%'}} colSpan={1}>
                    <Link href={`${baseUrl}/terms/returns-policy`} style={menu.text}>
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
export default OrderShippedTemplate;



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
    color: '#000',
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