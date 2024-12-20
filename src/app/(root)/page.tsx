import { UserButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default function Home() {
 

  return (
    <>
      <h1 className=" head-text text-left">Home</h1>
      {/* <UserButton/> */}
    </>
  );
}
