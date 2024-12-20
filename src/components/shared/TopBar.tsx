
import { OrganizationSwitcher, SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopBar() {

  const isUserSignedIn = true;

  return (
    <div>
      <nav className=' topbar'>
          <Link href="/" className=' flex items-center gap-4'>
          <Image src="/logo.svg" width={28} height={28} alt='Logo' />
          <p className=' text-heading3-bold text-light-1 max-xs:hidden'>GIGIFY</p>
          </Link>

          <div className=' flex items-center gap-1'>
            <div className=' block md:hidden'>
              <SignedIn>
                <SignOutButton>
                  <div className=' flex cursor-pointer'>
                    <Image 
                    src="/logout.svg"
                    alt='logout'
                    width={24}
                    height={24}
                    />
                  </div>
                </SignOutButton>
              </SignedIn>

             
            </div>
            

            <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements:{
                organizationSwitcherTrigger: " py-2 px-4"
              }
            }}
            />
          </div>

      </nav>
    </div>
  )
}

export default TopBar
