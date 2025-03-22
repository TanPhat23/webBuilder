"use client";

import { v4 as uuidv4 } from "uuid";

interface NavLink {
  id: string;
  content: string;
  href: string;
}

interface NavBarProps {
  links: NavLink[];
  logo: string;
}

const NavBarV2: React.FC<NavBarProps> = ({ links, logo }) => {
  return (
    <nav className="flex items-center justify-between w-full h-[60px] px-4 bg-white shadow-md">
      <div className="text-xl font-bold text-blue-600">{logo}</div>

      <div className="flex space-x-6">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="text-black hover:underline transition duration-200"
          >
            {link.content}
          </a>
        ))}
      </div>
    </nav>
  );
};

const navbarData: NavLink[] = [
  { id: uuidv4(), content: "Home", href: "/" },
  { id: uuidv4(), content: "Services", href: "/services" },
  { id: uuidv4(), content: "About", href: "/about" },
  { id: uuidv4(), content: "Contact", href: "/contact" },
];

const App = () => {
  return <NavBarV2 links={navbarData} logo="MySite" />;
};

export default App;