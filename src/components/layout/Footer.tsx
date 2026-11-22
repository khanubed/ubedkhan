import React from 'react';
import FooterBlinker from './FooterBlinker';

export default function Footer() {
  return (
    <footer className="bg-transparent" role="contentinfo">
      <section className="w-screen h-auto relative z-10 py-4 rounded-t-[5%] top-0 max-tablet:h-[63vh] bg-black/90 backdrop-blur-md text-white" aria-labelledby="footer-brand">
        <div className="mx-24 max-tablet:mx-5 pt-10 flex justify-between">
          <div className="republica tracking-wider text-7xl flex flex-col max-tablet:text-5xl max-phone:text-4xl">
            <h2 id="footer-brand">UBED KHAN</h2>
          </div>

          <nav className="flex gap-5 max-phone:gap-2" aria-label="Footer navigation">
            <div className="flex h-full justify-between gap-3 text-sm max-tablet:text-xs flex-col max-phone:text-xs">
              <h3 className="text-lg republica max-tablet:text-sm max-phone:text-xs text-gray-200">
                Socials
              </h3>
              <ul className="flex gap-2 flex-col max-tablet:gap-1 text-gray-300" role="list">
                <li>
                  <a
                    href="https://www.instagram.com/not.ur_ubed/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ubed-khan-93220a22a/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/khanubed"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <address className="flex h-full justify-between w-40 text-sm max-tablet:text-xs flex-col not-italic">
              <h3 className="text-lg republica max-tablet:text-sm max-phone:text-xs text-gray-200">
                Contact
              </h3>
              <ul className="flex gap-2 flex-col text-gray-300" role="list">
                <li>
                  <a
                    href="mailto:ubedkhan7529@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    ubedkhan7529@gmail.com
                  </a>
                </li>
                <li>+91 9589547529</li>
                <li>📍 Navlakha, Indore (452001), India</li>
              </ul>
            </address>
          </nav>
        </div>

        <div className="bg-black mt-8" aria-hidden="true">
          <FooterBlinker />
        </div>
      </section>
    </footer>
  );
}
