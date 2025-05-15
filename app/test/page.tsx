import React from 'react';

function NavBar() {
  return (
    <div className="min-h-[50px] w-full bg-white flex flex-col md:flex-row items-center justify-center md:justify-start p-[15px] md:px-[10px] gap-[15px]">
      <img
        src=""
        alt="Logo"
        className="w-32 text-sm md:text-base md:text-left text-center text-gray-800 hover:scale-105 transition-transform"
        style={{
          color: 'black',
          transition: 'background-color 0.4s ease, color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
        }}
      />
      <a
        href="/"
        className="m-0 text-sm md:text-base text-gray-800 flex items-center hover:text-white hover:bg-blue-500 hover:shadow-md hover:scale-105 transition-transform"
        style={{
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.4s ease, color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        Home
      </a>
      <a
        href="/"
        className="m-0 text-sm md:text-base text-gray-800 flex items-center hover:text-white hover:bg-blue-500 hover:shadow-md hover:scale-105 transition-transform"
        style={{
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.4s ease, color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        About
      </a>
    </div>
  );
}

export default NavBar;
