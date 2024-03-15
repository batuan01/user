import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const ContactForm = () => {
  const { setBreadcrumb } = useContext(AuthContext);
  useEffect(() => {
    setBreadcrumb("Contact");
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-start gap-16 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391.38226749255!2d105.73490397987686!3d21.053617890911024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1709190409270!5m2!1svi!2s"
          width="600"
          height="450"
          // allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="border-[1px] border-gray boder-solid"
        ></iframe>
        <div>
          <p className="text-2xl font-bold text-black">CONTACT</p>
          <span className="block w-16 mt-2 h-1 bg-slate-700"></span>
          <div>
            <p className="mt-8 text-xl font-semibold">Address</p>
            <p className="mt-2 text-gray-600">
              1234 Street Name, City Name, United States
            </p>
          </div>
          <div>
            <p className="mt-8 text-xl font-semibold">Email</p>
            <p className="mt-2 text-gray-600">admin@admin.com</p>
          </div>
          <div>
            <p className="mt-8 text-xl font-semibold">Phone</p>
            <p className="mt-2 text-gray-600">0123456789</p>
          </div>
          <div>
            <p className="mt-8 text-xl font-semibold">Working Time</p>
            <p className="mt-2 text-gray-600">
              Every day of the week from 8:30 am to 22:00 pm
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
