import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [status, setStatus] = useState({ msg: '', type: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ msg: 'Sending…', type: 'pending' });

    const formData = new FormData(event.target);
    formData.append('access_key', import.meta.env.VITE_WEB3_API_KEY || '');

    const json = JSON.stringify(Object.fromEntries(formData));

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: json,
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ msg: '🎉 Message sent successfully!', type: 'success' });
        event.target.reset();
      } else {
        setStatus({ msg: data.message || 'Failed to send message.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ msg: 'Network error. Please try again.', type: 'error' });
    }
  };

  // Random Repel Effect using Framer Motion
  const getRandomRepel = () => {
    const angle = Math.random() * 2 * Math.PI;
    const dist = 12 + Math.random() * 12;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-5">
      {/* Full Name */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Your Full Name"
          required
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
        />
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 phone:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            required
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Message
        </label>
        <textarea
          name="message"
          rows="4"
          placeholder="Tell me about your project..."
          required
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none"
        />
      </div>

      {/* Submit Button powered by Framer Motion as requested */}
      <motion.button
        type="submit"
        whileHover={() => {
          const { x, y } = getRandomRepel();
          return {
            x,
            y,
            rotate: (Math.random() - 0.5) * 8,
            scale: 1.04,
            transition: { type: 'spring', stiffness: 180, damping: 12 },
          };
        }}
        whileTap={{ scale: 0.96 }}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transition-colors duration-200 cursor-pointer"
      >
        Send Message
      </motion.button>

      {/* Status Message */}
      {status.msg && (
        <div
          className={`
            mt-3 text-center text-sm font-medium p-2 rounded-lg
            ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : ''}
            ${status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
            ${status.type === 'pending' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : ''}
          `}
        >
          {status.msg}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
