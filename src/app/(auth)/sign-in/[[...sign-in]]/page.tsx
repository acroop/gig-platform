import { SignIn } from "@clerk/nextjs";

import React from 'react'

function Page() {
  return (
    <div className=" flex justify-center items-center mt-12">
      <SignIn/>
    </div>
    
  )
}

export default Page
