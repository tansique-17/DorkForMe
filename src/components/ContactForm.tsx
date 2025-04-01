import React, { useState } from 'react';
import { Send, CheckCircle, X } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    if (!BOT_TOKEN || !CHAT_ID) {
      alert('Telegram credentials not configured!');
      setIsSubmitting(false);
      return;
    }

    const message = `
New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl relative">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-green-400 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-800 border border-green-500 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-green-400 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-800 border border-green-500 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-green-400 mb-1">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-gray-800 border border-green-500 text-white rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting ? 'animate-pulse' : ''
          } ${showSuccess ? 'bg-green-500 scale-105' : ''}`}
        >
          {isSubmitting ? (
            <Send size={18} className="animate-spin" />
          ) : showSuccess ? (
            <CheckCircle size={18} className="animate-bounce" />
          ) : (
            <Send size={18} />
          )}
          {isSubmitting ? 'Sending...' : showSuccess ? 'Sent!' : 'Send Message'}
        </button>
      </form>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed center-4 left-1/2 transform -translate-x-1/2 bg-white border-l-4 border-green-500 text-black p-4 rounded shadow-lg flex items-center justify-between z-50 toast-enter min-w-[300px]">
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            <span>Message sent successfully!</span>
          </div>
          <button 
            onClick={() => setShowSuccess(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;