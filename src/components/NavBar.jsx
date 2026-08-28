import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down past threshold -> hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> slide navbar back in
        setVisible(true);
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={visible || isOpen ? 'visible' : 'hidden'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`pointer-events-auto w-full max-w-5xl bg-black/85 backdrop-blur-md border border-white/40 shadow-xl shadow-white/5 transition-all duration-300 ${
          isOpen ? 'rounded-3xl px-6 py-4' : 'rounded-full px-6 py-3'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand / Logo */}
          <a
            href="#hero"
            className="republica sm:text-lg  tracking-widest text-white bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent uppercase hover:opacity-80 transition duration-300 pl-2"
          >
            Ubed Khan
          </a>

          {/* Desktop Links */}
          <div className="hidden tablet:flex items-center space-x-8 text-sm font-semibold pr-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="tablet:hidden text-gray-300 hover:text-white p-1.5 rounded-full focus:outline-none transition duration-200"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="tablet:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-4 pt-4 mt-3 border-t border-white/20 px-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-white text-base font-semibold tracking-wide transition duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavBar;

