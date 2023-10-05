import ContactForm from "@/components/emails/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import FAQPage from "@/app/(main)/(other)/faq/page";

export const metadata = {
  title: 'Contact us - Open PRO',
  description: 'Page description',
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