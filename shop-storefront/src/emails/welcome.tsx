import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import {Button} from "@react-email/button";
import * as React from 'react';

interface WelcomeEmailProps {
    fullName: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}`
    : '';


export const WelcomeEmail = ({ fullName }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            We have received your message at Eight Athletics.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/images/Eight-Athletics-black-logo.svg`}
                    width="100"
                    height="33"
                    alt="Eight Athletics"
                    style={logo}
                />
                <Text style={paragraph}>Hi {fullName},</Text>
                <Text style={paragraph}>
                    Thank you for reaching out to Eight Athletics. We have received your message and our team is currently reviewing it. We value your queries and feedback, and we will get back to you as soon as possible.
                </Text>
                <Text style={paragraph}>
                    In the meantime, if you have any urgent concerns or additional information to provide, please do not hesitate to reach out.
                </Text>
                <Section style={btnContainer}>
                    {/* Update the following href to the appropriate link for Eight Athletics */}
                    {/* @ts-ignore*/}
                    <Button pX={12} pY={12} style={button} href="https://www.eightathletics.com">
                        Visit our website
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Warm regards,
                    <br />
                    The Eight Athletics team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>[Eight Athletics ApS - Sofiegade 5, Copenhagen K, Denmark]</Text>

            </Container>
        </Body>
    </Html>
);
export default WelcomeEmail;

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

const logo = {
    margin: '0 auto',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};

const btnContainer = {
    textAlign: 'start' as const,
//     padding button
    padding: '10px 0 15px 0',
};

const button = {
    backgroundColor: '#000',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
};