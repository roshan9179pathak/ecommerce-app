"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuTrigger,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showListed, setShowListed] = useState(false);
  const storedDbProducts = useSelector((state: any) => state.product.isAdded);

  useEffect(() => {
    if (storedDbProducts === true) setShowListed(true);
  }, [storedDbProducts]);

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center items-center space-x-10 font-bold">
          <Link href="/" className="navbar_link relative hover:text-gray-700">
            Home
          </Link>

          {/* <NavigationMenu className="navbar_link relative">
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-gray-700">
                  Shop-By-Category
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link href="" className="block p-2">
                    Link
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}

          <div className="flex space-x-6">
            <Link href="/listProduct" className="hover:text-gray-700">
              List-Your-Own-Product
            </Link>

            {showListed && (
              <Link href="/viewProducts" className="hover:text-gray-700">
                View-Listed-Products
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
