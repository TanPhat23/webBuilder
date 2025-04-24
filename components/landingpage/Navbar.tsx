"use client";
import { useState } from "react";
import { links, authLinks } from "../../lib/constants/constants";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <NavigationMenu className="flex items-center max-w-full justify-between">
        <div className="flex items-center space-x-10">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" width={180} height={64} />
          </Link>
          <NavigationMenuList className="hidden md:flex space-x-10">
            {links.map((link) => (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.path}
                    className="text-black text-xl hover:border-b-2 border-black transition px-4 py-2"
                  >
                    {link.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
        <div className="flex items-center space-x-8">
          <NavigationMenuList className="hidden md:flex space-x-8">
            {isSignedIn ? (
              <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full border-2 border-cyan-500 bg-cyan-100 shadow-md">
                <UserButton />
              </div>
            ) : (
              authLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.path}
                      className={`px-6 py-3 min-w-[100px] text-center rounded-md transition text-lg font-bold border border-gray-400 whitespace-nowrap ${
                        link.title === "Sign Up"
                          ? "bg-cyan-500 text-white hover:bg-cyan-600"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))
            )}
          </NavigationMenuList>
          <Button
            variant="ghost"
            className="md:hidden text-black text-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            onClick={toggleMenu}
          >
            <Menu size={32} />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center absolute top-16 right-0 w-64 bg-white shadow-md rounded-md">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-4 p-4 justify-center items-center">
                {links.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className="text-black text-xl hover:border-b-2 border-black transition px-4 py-2 block"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {!isSignedIn &&
                  authLinks.map((link) => (
                    <NavigationMenuItem key={link.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.path}
                          className={`px-6 py-3 w-auto min-w-[100px] text-center rounded-md transition text-lg font-bold border border-gray-400 block whitespace-nowrap ${
                            link.title === "Sign Up"
                              ? "bg-cyan-500 text-white hover:bg-cyan-600"
                              : "bg-gray-200 text-black hover:bg-gray-300"
                          }`}
                        >
                          {link.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
