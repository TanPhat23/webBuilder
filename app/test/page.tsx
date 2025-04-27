
import React from 'react';

function Footer() {
  return (
    <div className='w-screen h-screen bg-white flex'>
      <footer className="w-full mt-auto bg-[#f8f9fa] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8">
        <div className="flex flex-col items-start gap-4">
          <img src="" alt="Logo" className="w-20 h-20" />
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="text-[#ff6f61] font-bold">Services</p>
          <a href="/" className="text-[#333] hover:underline">
            Email Marketing
          </a>
          <a href="/" className="text-[#333] hover:underline">
            Campaigns
          </a>
          <a href="/" className="text-[#333] hover:underline">
            Branding
          </a>
          <a href="/" className="text-[#333] hover:underline">
            Offline
          </a>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="text-[#ff6f61] font-bold">About</p>
          <a href="/" className="text-[#333] hover:underline">
            Our Story
          </a>
          <a href="/" className="text-[#333] hover:underline">
            Benefits
          </a>
          <a href="/" className="text-[#333] hover:underline">
            Team
          </a>
          <a href="/" className="text-[#333] hover:underline">
            Careers
          </a>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="text-[#ff6f61] font-bold">Follow Us</p>
          <a
            href="https://facebook.com"
            className="text-[#333] hover:underline"
          >
            Facebook
          </a>
          <a href="https://twitter.com" className="text-[#333] hover:underline">
            Twitter
          </a>
          <a
            href="https://instagram.com"
            className="text-[#333] hover:underline"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;