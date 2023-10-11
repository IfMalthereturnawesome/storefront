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

const OrderCanceledTemplate = ({ shipping_address, display_id, items, canceled_at }) => {

  return (
      <Html >
        <Tailwind
            config={{
              theme: {
                screens: {
                  sm: {max: '600px'},
                  xs: {max: '425px'},
                },
                extend: {
                  colors: {
                    mask:{
                      black: '#030203',
                    },
                    custom:{
                      white: '#faf7f7',
                    },
                  },
                  spacing: {
                    full: '100%',
                    px: '1px',
                    0: '0',
                    2: '8px',
                  }
                }
              },
            }}
        >
          <Head/>
          <Preview>
            Order Cancellation for Order # {display_id} - {items[0].title}: {items[0].description}
            {items.length > 1 ? ' and more' : ''}
          </Preview>

          <Body style={main} className={"bg-white text-mask-black "}>
            <Container style={container} >
              <Section style={track.container}>
                <Row>
                  <Column>
                    <Text style={global.paragraphWithBold}>Order Number</Text>
                    <Text style={track.number}>{display_id}</Text>
                    <Text className={"text-sm "}>Unfortunately, your order has been canceled. If you have any questions, please contact our support.</Text>
                    <Text className={"text-sm"}>Date of cancellation: {canceled_at}</Text>
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
                <Heading style={global.heading}>Order Cancellation</Heading>
                <Text style={global.text}>
                  Hi {shipping_address.first_name} {shipping_address.last_name},
                  We regret to inform you that your order #{display_id} has been canceled. If you have any questions or concerns, please reach out to us.
                </Text>
              </Section>
              <Hr style={global.hr}/>
              <Section className="px-10 py-6 mx-auto w-full">
                <Text className="m-0 leading-6 font-bold text-xl mb-2 ">Order Details</Text>
                {items.map((item, index) => (
                    <Row key={index}
                         style={{borderBottom: '1px solid #e0e0e0', paddingTop: '10px', paddingBottom: '10px'}}>
                      <Column>
                        <Text
                            className={"text-[16px]"}
                            style={{...paragraph, fontWeight: '500', color: '#2C2C2C', marginBottom: '0px'}}>
                          {item.title}
                        </Text>
                        <Text style={{...paragraph, color: '#7F7F7F'}}>
                          {item.description}
                        </Text>
                      </Column>
                    </Row>
                ))}
              </Section>
              <Hr style={global.hr}/>
              <Section style={paddingY}>
                <Link style={global.button} href="https://www.eightathletics.com" className={"mx-auto"}>
                  Shop Again
                </Link>
              </Section>
              <Hr style={global.hr}/>
              <Section style={menu.container}>
                <Text style={menu.title}>Get Help</Text>
                <Row style={menu.content}>
                  <Column style={{width: '33%'}} colSpan={1}>
                    <Link href={`${baseUrl}/support`} style={menu.text}>
                      Customer Support
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

export default OrderCanceledTemplate;


