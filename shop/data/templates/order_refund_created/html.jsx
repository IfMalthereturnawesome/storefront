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

const OrderRefundCreatedTemplate = ({
  items = [],
  refund = {},
  display_id = '',
  total = ''
}) => {

  return (
      <Html>
        <Tailwind
            config={{
              theme: {
                screens: {
                  sm: {max: '600px'},
                  xs: {max: '425px'},
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
                  }
                }
              },
            }}
        >
          <Head />
          <Preview>
            Refund Confirmation for Order # {display_id}

          </Preview>

          <Body style={main} className={"bg-white text-mask-black "}>
            <Container style={container}>
              <Section style={track.container}>
                <Row>
                  <Column>
                    <Text style={global.paragraphWithBold}>Refund Number</Text>
                    <Text style={track.number}>{refund.id}</Text>
                    <Text className={"text-sm "}>
                      Amount refunded: {refund.amount} {refund.reason !== "discount" ? `due to ${refund.reason}` : ""}
                    </Text>
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
                    style={{margin: 'auto'}}
                />
                <Heading style={global.heading}>Refund Confirmation</Heading>
                <Text style={global.text}>
                  We regret the inconvenience. We've processed a refund for your order #{display_id}.
                  {refund.note && ` Note: ${refund.note}`}  {total > 0 && `Your new total is ${total}`}
                </Text>
                <Text style={global.text}>
                  If you have any questions, please contact us at
                  <Link href="mailto:support@eightathletics.com" style={global.text}>
                    support@eightathletics.com
                  </Link>
                </Text>

              </Section>
              <Hr style={global.hr} />

              <Section style={paddingY}>
                <Link style={global.button} href="https://www.eightathletics.com" className={"mx-auto"}>
                  Visit our website
                </Link>
              </Section>
              <Hr style={global.hr} />
              <Section style={menu.container}>
                <Text style={menu.title}>Get Help</Text>
                <Row style={menu.content}>
                  <Column style={{width: '33%'}} colSpan={1}>

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
              <Hr style={global.hr} />
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

export default OrderRefundCreatedTemplate;




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

