"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function BottomBar() {

  const sidebarLinks = [
    {
      imgURL: "/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/search.svg",
      route: "/search",
      label: "Search",
    },
    
    {
      imgURL: "/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];

  const router = useRouter()
  const pathname = usePathname()

  return (
    <div>
      <section className='fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden'>
        <div className='flex items-center justify-between gap-3 xs:gap-5'>
          {sidebarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

            return (
              <Link href={link.route}
                key={link.label}
                className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${isActive && 'bg-primary-500'}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className='text-subtle-medium text-light-1 max-sm:hidden'>{link.label}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default BottomBar
