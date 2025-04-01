import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Contact Us
        </h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;