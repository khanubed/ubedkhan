'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRandomRepel } from '@/lib/utils';

export default function ContactForm() {
  const [status, setStatus] = useState<{ msg: string; type: string }>({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [btnMotion, setBtnMotion] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  const triggerRepel = () => {
    const { x, y } = getRandomRepel(12, 24);
    setBtnMotion({
      x,
      y,
      rotate: (Math.random() - 0.5) * 8,
      scale: 1.04,
    });
  };

  const resetRepel = () => {
    setBtnMotion({ x: 0, y: 0, rotate: 0, scale: 1 });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ msg: 'Sending…', type: 'pending' });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ msg: '🎉 Message sent successfully! I will get back to you soon.', type: 'success' });
        form.reset();
      } else {
        setStatus({ msg: data.message || 'Failed to send message. Please try again.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ msg: 'Network error. Please try again or email directly.', type: 'error' });
    } finally {
      setLoading(false);
    }
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
          rows={4}
          placeholder="Tell me about your project..."
          required
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        animate={btnMotion}
        onHoverStart={triggerRepel}
        onHoverEnd={resetRepel}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 180, damping: 12 }}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transition-colors duration-200 cursor-pointer disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Send Message'}
      </motion.button>

      {/* Status Message */}
      {status.msg && (
        <div
          className={`mt-3 text-center text-sm font-medium p-2 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : status.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
          }`}
        >
          {status.msg}
        </div>
      )}
    </form>
  );
}
