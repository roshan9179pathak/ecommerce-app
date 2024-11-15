'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import Image from 'next/image'
import { BiUser } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { getTotalQuantity } from '@/features/cartSlice'

const Header = () => {
  const [currentItems, setCurrentItems] = useState(0);

  const totalItems = useSelector(getTotalQuantity);

  // Save to localStorage when totalItems change
  useEffect(() => {
    if (totalItems !== null) {
      setCurrentItems(totalItems);
      localStorage.setItem('totalItems', JSON.stringify(totalItems));
    }
  }, [totalItems]);

  // Load from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem('totalItems');
    if (storedItems) {
      setCurrentItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <div className='border-b border-gray-500 py-6'>
      <div className='container sm:flex justify-between items-center'>
        <div className='font-bold text-4xl text-center pb-4 sm:pb-4 text-blackish'>
          <Link className='cursor-pointer' href='/'>
         Logo
          </Link>
        </div>

     

        <div className='hidden lg:flex gap-4 text-gray-500 text-[30px]'>
         <Link href='/login'>
         <BiUser aria-label="User Profile" />
         </Link>

          <div className='relative'>
            <Link href='/cart' aria-label="Go to Cart">
              <HiOutlineShoppingBag />
              {currentItems > 0 && (
                <div className='bg-red-500 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 translate-y-1'>
                  {currentItems}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
