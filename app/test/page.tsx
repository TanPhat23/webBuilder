import React from "react";

function LandingPageTemplate() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Navbar Section */}
      <div className="w-full py-4 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between bg-white shadow-sm sticky top-0 z-10 gap-4 md:gap-0">
        <img
          src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HCKptMnIgjFeO6T0qwPoYECN4Id5c3XlWuAyGZ"
          alt="Logo"
          className="h-[50px]"
        />
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5">
          <a
            href="/"
            className="text-gray-800 font-medium hover:text-sky-500 transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-800 font-medium hover:text-sky-500 transition-colors"
          >
            Features
          </a>
          <a
            href="/pricing"
            className="text-gray-800 font-medium hover:text-sky-500 transition-colors"
          >
            Pricing
          </a>
          <a
            href="/about"
            className="text-gray-800 font-medium hover:text-sky-500 transition-colors"
          >
            About
          </a>
          <button className="bg-sky-500 text-white font-medium px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full min-h-[600px] bg-sky-50 flex items-center justify-center py-16 px-4 md:px-8">
        <div className="flex flex-row items-center justify-between gap-10 md:gap-16 w-full max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Hero"
            className="w-1/2 max-w-[500px] rounded-xl shadow-xl"
          />
          <div className="flex flex-col gap-4 text-left w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Build your website visually without code
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-2">
              Our drag-and-drop web builder makes creating professional websites
              easy and enjoyable. Get started in minutes, no coding required.
            </p>
            <button className="bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors text-base md:text-lg mt-4 md:mt-6 self-start">
              Start Building Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="text-center mb-10">
            <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mt-4">
              Our platform offers everything you need to build beautiful,
              functional websites with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-sky-500 text-2xl font-bold">✓</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Drag & Drop Builder
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Build your website visually with our intuitive drag and drop
                interface. No coding required.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-sky-500 text-2xl font-bold">✓</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Ready-made Templates
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Start with professionally designed templates or build from
                scratch - the choice is yours.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-sky-500 text-2xl font-bold">✓</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Responsive Design
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                All websites are fully responsive, ensuring they look great on
                any device, from desktop to mobile.
              </p>
            </div>
            {/* Feature Card 4 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-sky-500 text-2xl font-bold">✓</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Ready-made Templates
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Start with professionally designed templates or build from
                scratch - the choice is yours.
              </p>
            </div>
            {/* Feature Card 5 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-sky-500 text-2xl font-bold">✓</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Ready-made Templates
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Start with professionally designed templates or build from
                scratch - the choice is yours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="text-center mb-14">
            <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Meet the Team Behind the Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              We're a passionate team of designers, developers, and innovators
              dedicated to making website creation accessible to everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Sarah Johnson"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Sarah Johnson
              </h3>
              <div className="text-sky-500 font-medium">CEO & Founder</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                10+ years of experience in web development and product
                management.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="David Chen"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                David Chen
              </h3>
              <div className="text-sky-500 font-medium">Lead Developer</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Expert in frontend frameworks with a passion for creating
                intuitive user experiences.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                alt="Michelle Taylor"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Michelle Taylor
              </h3>
              <div className="text-sky-500 font-medium">UI/UX Designer</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Creates beautiful, functional designs that make our platform a
                joy to use.
              </p>
            </div>
            {/* Team Member 4 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Robert Wilson"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Robert Wilson
              </h3>
              <div className="text-sky-500 font-medium">Customer Success</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Dedicated to ensuring our customers get the most out of our
                platform.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-16 bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900">Our Story</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              WebBuilder was founded in 2020 with a simple mission: to make web
              development accessible to everyone. We believe that creating a
              professional online presence shouldn't require technical expertise
              or a large budget.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              What started as a small project has grown into a full-featured
              platform used by thousands of individuals and businesses
              worldwide. Our team has expanded, but our mission remains the
              same: empowering people to bring their ideas to life on the web.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl md:text-3xl font-bold text-sky-500">
                  10,000+
                </div>
                <div className="text-sm text-gray-500">Websites Built</div>
              </div>
              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl md:text-3xl font-bold text-sky-500">
                  5,000+
                </div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl md:text-3xl font-bold text-sky-500">
                  15
                </div>
                <div className="text-sm text-gray-500">Team Members</div>
              </div>
              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl md:text-3xl font-bold text-sky-500">
                  24/7
                </div>
                <div className="text-sm text-gray-500">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-sky-500 py-20 px-4 md:px-8 text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Build Your Website?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mt-2 text-sky-50">
            Start your free trial today and see how easy it is to create a
            professional website with our platform.
          </p>
          <button className="bg-white text-sky-500 font-semibold px-7 py-3.5 rounded-lg hover:bg-sky-50 transition-colors text-lg mt-6">
            Start Free Trial
          </button>
          <p className="text-sm mt-3 text-sky-100">
            No credit card required. Free for 14 days.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full mx-auto rounded-xl shadow-lg bg-white flex flex-col overflow-hidden p-4 md:p-6">
        <div className="w-full mb-3 md:mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 py-2 md:py-3 text-center w-full">
            Thông tin liên hệ
          </h2>
        </div>
        <div className="w-full flex flex-col md:flex-row px-2 md:px-5 gap-5 md:gap-6">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt="Contact"
            className="w-full md:w-2/5 h-56 md:h-auto object-cover rounded-lg mb-5 md:mb-0"
          />
          <div className="w-full md:w-3/5 flex flex-col gap-4 md:gap-5">
            <div className="flex flex-col gap-2 w-full mb-3 md:mb-0">
              <label className="text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2 mb-3 sm:mb-0 sm:mr-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/2 sm:ml-2">
                <label className="text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full mt-3 md:mt-0">
              <label className="text-sm font-medium text-gray-700">
                Nội dung liên hệ
              </label>
              <div className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[140px]">
                <textarea className="w-full h-full border-none outline-none resize-none bg-transparent" />
              </div>
            </div>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 font-medium text-sm cursor-pointer border-none w-full rounded-md transition-colors mt-4 md:mt-6">
          Submit
        </button>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-white text-gray-800 py-14 px-4 md:px-8 mt-auto shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="flex flex-col gap-4">
              <div className="w-24 h-10 object-contain flex items-center justify-center">
                {/* Replace with your logo image */}
                <img src="" alt="Logo" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Create beautiful websites easily with our drag-and-drop website
                builder.
              </p>
            </div>
            {/* Product Links */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                PRODUCT
              </h4>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Templates
              </a>
            </div>
            {/* Company Links */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                COMPANY
              </h4>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Careers
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Blog
              </a>
            </div>
            {/* Support Links */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                SUPPORT
              </h4>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 gap-4">
            <p className="text-sm text-gray-400">
              © 2025 WebBuilder. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-sky-500 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPageTemplate;
