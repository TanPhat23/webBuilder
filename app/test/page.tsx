import React from "react";

function App() {
  return (
    <>
      <div className="min-h-[50px] w-full bg-white flex flex-col md:flex-row items-center justify-center md:justify-start p-4 md:px-8 gap-4 md:gap-6">
        <img
          className="w-32 text-sm md:text-base md:text-left text-center text-gray-800 hover:scale-105 transition-transform"
          src=""
        />
        <a
          className="m-0 text-sm md:text-base text-gray-800 flex items-center hover:text-white hover:bg-blue-500 hover:shadow-md hover:scale-105 transition-transform"
          href="/"
        >
          Home
        </a>
        <a
          className="m-0 text-sm md:text-base text-gray-800 flex items-center hover:text-white hover:bg-blue-500 hover:shadow-md hover:scale-105 transition-transform"
          href="/"
        >
          About
        </a>
      </div>
      <div className="w-full flex flex-col items-center py-16 px-5 bg-slate-50">
        <div className="font-bold text-3xl text-slate-800 mb-4 text-center">
          Our Team
        </div>
        <div className="text-lg text-slate-500 mb-10 text-center max-w-2xl">
          Meet the talented people behind our success
        </div>
        <div className="w-full max-w-6xl relative overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide p-2.5 snap-x snap-mandatory gap-6">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow">
              <img
                className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-slate-100"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              />
              <div className="font-bold text-lg text-slate-800 mb-1 text-center">
                Jane Doe
              </div>
              <div className="text-sm text-slate-500 mb-3 text-center">
                CEO & Founder
              </div>
              <div className="text-sm text-slate-500 text-center mb-4">
                Visionary leader with 15+ years of industry experience.
              </div>
              <div className="flex gap-3 justify-center">
                <a
                  className="text-slate-500 text-base p-2 hover:text-slate-800 transition-colors"
                  href="https://www.linkedin.com/"
                >
                  LinkedIn
                </a>
                <a
                  className="text-slate-500 text-base p-2 hover:text-slate-800 transition-colors"
                  href="#twitter"
                >
                  Twitter
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow">
              <img
                className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-slate-100"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              />
              <div className="font-bold text-lg text-slate-800 mb-1 text-center">
                John Smith
              </div>
              <div className="text-sm text-slate-500 mb-3 text-center">CTO</div>
              <div className="text-sm text-slate-500 text-center mb-4">
                Tech expert driving our innovative solutions forward.
              </div>
              <div className="flex gap-3 justify-center">
                <a
                  className="text-slate-500 text-base p-2 hover:text-slate-800 transition-colors"
                  href="#github"
                >
                  GitHub
                </a>
                <a
                  className="text-slate-500 text-base p-2 hover:text-slate-800 transition-colors"
                  href="https://www.linkedin.com/"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow">
              <img
                className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-slate-100"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              />
              <div className="font-bold text-lg text-slate-800 mb-1 text-center">
                Emily Chen
              </div>
              <div className="text-sm text-slate-500 mb-3 text-center">
                Design Director
              </div>
              <div className="text-sm text-slate-500 text-center mb-4">
                Award-winning designer with an eye for detail and creativity.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-auto bg-[#f8f9fa] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8">
        <div className="flex flex-col items-start gap-4">
          <img className="w-20 h-20" src="" />
          <div className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#ff6f61] font-bold">Services</div>
          <a className="text-[#333] hover:underline" href="/">
            Email Marketing
          </a>
          <a className="text-[#333] hover:underline" href="/">
            Campaigns
          </a>
          <a className="text-[#333] hover:underline" href="/">
            Branding
          </a>
          <a className="text-[#333] hover:underline" href="/">
            Offline
          </a>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#ff6f61] font-bold">About</div>
          <a className="text-[#333] hover:underline" href="/">
            Our Story
          </a>
          <a className="text-[#333] hover:underline" href="/">
            Benefits
          </a>
          <a className="text-[#333] hover:underline" href="/">
            Team
          </a>
          <a className="text-[#333] hover:underline" href="/">
            Careers
          </a>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#ff6f61] font-bold">Follow Us</div>
          <a
            className="text-[#333] hover:underline"
            href="https://facebook.com"
          >
            Facebook
          </a>
          <a className="text-[#333] hover:underline" href="https://twitter.com">
            Twitter
          </a>
          <a
            className="text-[#333] hover:underline"
            href="https://instagram.com"
          >
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
