import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 relative bottom-0 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul>
              <li className="mb-2">
                <Link href="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link href="/services">Services</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Support</h2>
            <ul>
              <li className="mb-2">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link href="/help">Help Center</Link>
              </li>
              <li className="mb-2">
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
            <form>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 mb-4 text-gray-800"
              />
              <button
                type="submit"
                className="w-full bg-[#FF9910] text-white p-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
