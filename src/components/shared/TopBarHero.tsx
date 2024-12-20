
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ShinyButton from '../ui/shiny-button';
import InteractiveHoverButton from '../ui/interactive-hover-button';
import { useRouter } from 'next/navigation';

function TopBarHero() {

    const isUserSignedIn = true;
    const router = useRouter()

    return (
        <div>
            <nav className=' topbar'>
                <Link href="/" className=' flex items-center gap-4'>
                    <Image src="/logo.svg" width={28} height={28} alt='Logo' />
                    <p className=' text-heading3-bold text-light-1 max-xs:hidden'>GIGIFY</p>
                </Link>

                <div className=' flex items-center gap-1'>
                    <InteractiveHoverButton onClick={() => router.push("/sign-in")} />
                        
                       
                   

                </div>

            </nav>
        </div>
    )
}

export default TopBarHero
