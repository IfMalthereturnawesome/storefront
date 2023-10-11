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

interface OrderCanceledTemplateProps {
    shipping_address: {
        first_name?: string;
        last_name?: string;
        address_1?: string;
        address_2?: string;
        city?: string;
        postal_code?: string;
        country_code?: string;
        metadata?: {
            selectedServicePoint?: {
                name?: string;
            };
        };
    };
    display_id?: string;
    total?: number;
    subtotal_ex_tax?: number;
    shipping_total?: number;
    tax_total?: number;
    items: {
        title?: string;
        quantity?: number;
        unit_price?: number;
        tax_total?: number;
        description?: string;
    }[];
    region: {
        currency_code?: string;
    };
    shipping_methods?: {
        shipping_option: {
            name?: string;
        };
    }[];
}


const baseUrl = 'https://www.eightathletics.com';

const OrderCanceledTemplate = ({
                                   shipping_address = {
                                       first_name: 'John',
                                       last_name: 'Doe',
                                       address_1: '123 Main St',
                                       address_2: 'Apt 4B',
                                       city: 'Springfield',
                                       postal_code: '12345',
                                       country_code: 'US',
                                       metadata: {
                                           selectedServicePoint: {
                                               name: 'Default Service Point'
                                           }
                                       }
                                   },
                                   display_id = '123456',

                                   items = [
                                       {
                                           title: 'Sleep Mask One', description: 'M / Black', quantity: 1, unit_price: 1000, tax_total: 25
                                       }
                                   ],

                               }: OrderCanceledTemplateProps) => {

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
                                    <Text className={"text-sm text-red-600 "}>Unfortunately, your order has been canceled. If you have any questions, please contact our support.</Text>
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
    paragraphWithBold: {...paragraph, fontWeight: 'bold'},
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center' as const,
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
        textAlign: 'center' as const,
        fontWeight: 500,
        color: '#000',
    },
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
        textTransform: 'uppercase' as const,
    },
};

const message = {
    padding: '40px 74px',
    textAlign: 'center' as const,
};

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
        textAlign: 'center' as const,
    },
};
