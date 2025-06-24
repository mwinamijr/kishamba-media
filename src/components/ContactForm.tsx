import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your backend submission logic here
  };

  // Simple SVG icon components for reuse
  const MapMarkerIcon = () => (
    <svg
      className="w-5 h-5 text-primary mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );

  const EnvelopeIcon = () => (
    <svg
      className="w-5 h-5 text-primary mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      className="w-5 h-5 text-primary mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1c-9.39 0-17-7.61-17-17a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
    </svg>
  );

  return (
    <>
      <div className="mb-0">
        <h4 className="m-0 uppercase font-bold text-lg">
          Wasiliana nasi kwa maswali yeyote
        </h4>
      </div>
      <div className="bg-white border border-t-0 p-6 mb-6 rounded-md shadow-sm">
        <div className="mb-6">
          <h6 className="uppercase font-bold mb-4 text-base">
            Taarifa za mawasiliano
          </h6>
          <p className="mb-6 text-gray-700">
            Kwa mawasiliano zaidi tumia aina hizi za mawasiliano kutufikia kwa
            mambo mbalimbali kama taarifa, matangazo au habari yeyote kutoka
            kwetu. Pia unaweza kuwasiliana nasi kutuletea habari mbalimbali nasi
            hatutasita kukusaidia. KARIBU.
          </p>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <MapMarkerIcon />
              <h6 className="font-bold mb-0">Ofisi zetu</h6>
            </div>
            <p className="m-0 text-gray-800">
              Kinondoni Mwanamboka, Dar es salaam, Plot No 12, Block no 31
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <EnvelopeIcon />
              <h6 className="font-bold mb-0">Barua pepe</h6>
            </div>
            <p className="m-0 text-gray-800">kishambamedia2023@gmail.com</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <PhoneIcon />
              <h6 className="font-bold mb-0">Tupigie simu</h6>
            </div>
            <p className="m-0 text-gray-800">+255 754 675 410</p>
          </div>
        </div>

        <h6 className="uppercase font-bold mb-4 text-base">Wasiliana nasi</h6>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Jina lako"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Barua"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div>
            <button
              type="submit"
              className="bg-primary text-white font-semibold px-6 h-[50px] rounded-md hover:bg-orange-600 transition"
            >
              Tuma Ujumbe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
