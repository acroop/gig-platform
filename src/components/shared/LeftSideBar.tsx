"use client"
import { SignedIn, SignOutButton, useClerk } from '@clerk/nextjs';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

function LeftSideBar() {

  const sidebarLinks = [
    {
      imgURL: "/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/search.svg",
      route: "/jobroles",
      label: "Jobs",
    },

    {
      imgURL: "/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];

  const router = useRouter()
  const pathname = usePathname()
  const { signOut } = useClerk();

  return (
    <section className=' custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-64 flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden'>
      <div className=' flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

          return (
            <Link href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 transition-colors duration-300 ${
                isActive ? 'bg-primary-500' : 'hover:bg-secondary-500'
              }`}
              
            > 
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className=' text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className=' mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutOptions={{redirectUrl: "/sign-in"}} >
            <div className='rounded-lg flex cursor-pointer gap-2 p-4 transition-colors duration-300 hover:bg-secondary-500'>
              <Image
                src="/logout.svg"
                alt='logout'
                width={24}
                height={24}
              />
              <p className=' text-light-2 max-lg:hidden '>LogOut</p>
            </div>
          </SignOutButton>
        </SignedIn>
        
        


      </div>
    </section>
  )
}

export default LeftSideBar
