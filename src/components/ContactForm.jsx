import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [status, setStatus] = useState({ msg: '', type: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ msg: 'Sending…', type: 'pending' });

    const formData = new FormData(event.target);
    formData.append('access_key', import.meta.env.VITE_WEB3_API_KEY);

    const json = JSON.stringify(Object.fromEntries(formData));

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: json,
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ msg: '🎉 Sent successfully!', type: 'success' });
        event.target.reset();
      } else {
        setStatus({ msg: data.message || 'Failed to send.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ msg: 'Network error. Please try again.', type: 'error' });
    }
  };

  const getRandomRepel = () => {
    const angle = Math.random() * 2 * Math.PI;
    const dist = 10 + Math.random() * 10;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg space-y-1 ">

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        required
        className="w-full border-b p-2 focus:outline-none"
      />

      
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="flex-1 w-[46%] border-b p-2 focus:outline-none"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          required
          className="flex-1 ml-[8%] w-[46%] border-b p-2 focus:outline-none"
        />
      

      <textarea
        name="message"
        rows="3"
        placeholder="Message"
        required
        className="w-full border-b p-2 focus:outline-none resize-none"
      />

      <motion.button
        type="submit"
        whileHover={() => {
          const { x, y } = getRandomRepel();
          return {
            x,
            y,
            rotate: (Math.random() - 0.5) * 6,
            scale: 1.03,
            transition: { type: 'spring', stiffness: 160, damping: 14 },
          };
        }}
        className="w-full py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
      >
        Send Message
      </motion.button>

      {/* Status message */}
      {status.msg && (
        <div
          className={`
            mt-2 text-center font-medium
            ${status.type === 'success' ? 'text-green-600' : ''}
            ${status.type === 'error' ? 'text-red-600' : ''}
            ${status.type === 'pending' ? 'text-indigo-500' : ''}
          `}
        >
          {status.msg}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
