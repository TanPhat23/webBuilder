function SidebarLeft() {
  return (
    <div className="flex flex-col justify-between h-full bg-white shadow-xs border-r border-gray-100 w-full md:w-64 sm:w-20 p-4 sm:p-2 md:p-6 transition-all duration-300">
      <div>
        <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
          <div>
            <div className="text-gray-900 text-lg font-semibold tracking-wide sm:hidden">
              DASHBOARD
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <div>
            <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide uppercase sm:hidden">
              MENU
            </div>
            <a
              href="/"
              className="w-full text-indigo-600 bg-indigo-50 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center gap-3 hover:bg-indigo-100"
            >
              Home
            </a>
            <a
              href="/analytics"
              className="w-full text-gray-600 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center gap-3 hover:bg-gray-50"
            >
              Analytics
            </a>
            <a
              href="/reports"
              className="w-full text-gray-600 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center gap-3 hover:bg-gray-50"
            >
              Reports
            </a>
            <a
              href="/settings"
              className="w-full text-gray-600 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center gap-3 hover:bg-gray-50"
            >
              Settings
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 mt-6">
          <div>
            <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide uppercase sm:hidden">
              WORKSPACE
            </div>
            <a
              href="/projects"
              className="w-full text-gray-600 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center gap-3 hover:bg-gray-50"
            >
              Projects
            </a>
            <a
              href="/team"
              className="w-full text-gray-600 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center gap-3 hover:bg-gray-50"
            >
              Team
            </a>
            <button className="w-full text-gray-600 my-0.5 py-2.5 px-3 rounded-md font-medium flex items-center justify-between gap-3 hover:bg-gray-50">
              More Options
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center p-3 mt-auto rounded-lg gap-3">
        <div>
          <a className="text-black text-sm font-medium ">
            John Doe
          </a>
        </div>
      </div>
    </div>
  );
}

export default SidebarLeft;
