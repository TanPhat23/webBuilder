"use client";

import { v4 as uuidv4 } from "uuid";

interface NavLink {
  id: string;
  content: string;
  href: string;
}

interface NavBarProps {
  links: NavLink[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  return (
    <nav
      className="flex flex-row items-center w-full h-[50px] bg-white"
    >
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className="text-black mx-2 hover:text-blue-500 transition-colors"
        >
          {link.content}
        </a>
      ))}
    </nav>
  );
};

const navbarData: NavLink[] = [
  { id: uuidv4(), content: "Home", href: "/" },
  { id: uuidv4(), content: "About", href: "/about" },
  { id: uuidv4(), content: "Contact", href: "/contact" },
];

const App = () => {
  return <NavBar links={navbarData} />;
};

export default App;