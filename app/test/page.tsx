import React from 'react';

const ContactForm = () => {
  return (
    <form
      className="w-full mx-auto rounded-xl shadow-lg bg-white flex flex-col overflow-hidden p-4 md:p-6"
      method="post"
      autoComplete="on"
    >
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
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full sm:w-1/2 mb-3 sm:mb-0 sm:mr-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-1/2 sm:ml-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mt-3 md:mt-0">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Nội dung liên hệ
            </label>
            <div className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[140px]">
              <textarea
                name="message"
                required
                className="w-full h-full border-none outline-none resize-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 font-medium text-sm cursor-pointer border-none w-full rounded-md transition-colors mt-4 md:mt-6"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
