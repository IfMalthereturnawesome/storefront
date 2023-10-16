import ContactForm from "@/components/emails/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import FAQPage from "@/app/(main)/(other)/faq/page";

export const metadata = {
  title: 'Contact us - Eight Athletics',
  description: 'Contact us through our contact form or by email. We will get back to you as soon as possible.',
}



export default function Contact() {
  return (
    <>



      <ContactForm />
        <FAQPage />
      <ContactDetails />


    </>
  )
}