import { ContactForm } from "../../components/organisms/ContactForm";

export const metadata = {
  title: "Technology",
  description: "Generated by create next app",
};
const ContactPage = () => {
  return (
    <>
      <div className="container mx-auto py-10">
        <ContactForm />
      </div>
    </>
  );
};
export default ContactPage;
