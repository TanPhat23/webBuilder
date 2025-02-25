"use client";
import { links, authLinks } from "../../lib/constants";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <NavigationMenu className="flex items-center max-w-full justify-between">
        <div className="flex items-center space-x-10">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" width={180} height={64} />
          </Link>
          <NavigationMenuList className="flex space-x-10">
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
        <div className="flex space-x-8">
          <NavigationMenuList className="flex space-x-8">
            {authLinks.map((link) => (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.path}
                    className={`px-6 py-3 w-auto min-w-[100px] text-center rounded-md transition text-lg font-bold border border-gray-400 ${
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
        </div>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
