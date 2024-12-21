"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const courses = [
  { id: 1, title: "Course 1", image: "/course1.jpg" },
  { id: 2, title: "Course 2", image: "/course2.jpg" },
  { id: 3, title: "Course 3", image: "/course3.jpg" },
  { id: 4, title: "Course 4", image: "/course4.jpg" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentIndex - 1 + courses.length) % courses.length;
    setNextIndex(newIndex);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = (currentIndex + 1) % courses.length;
    setNextIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change course every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  useEffect(() => {
    if (nextIndex !== null) {
      const timeout = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex(null);
        setIsAnimating(false);
      }, 500); // Matches CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [nextIndex]);

  return (
    <>
      <h1 className="head-text text-left">Our Courses</h1>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden relative h-[450px]">
          {/* Images with transition */}
          <div className="relative w-full h-full">
            {/* Current Image */}
            <div
              className={`absolute w-full h-full flex items-center justify-center transition-transform duration-500 ${
                isAnimating ? "-translate-x-full" : "translate-x-0"
              }`}
              style={{ zIndex: 1 }}
            >
              <Image
                src={courses[currentIndex].image}
                alt={courses[currentIndex].title}
                width={600}
                height={300}
                className="rounded-2xl object-contain w-fit"
                priority
              />
            </div>
            
          </div>
          {/* Titles */}
          <h2 className="mt-2 text-lg font-bold text-black text-center">
            {courses[currentIndex].title}
          </h2>
        </div>
        {/* Left and Right Navigation Buttons */}
        <div
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2  bg-black hover:bg-[#141414] p-3 rounded-full z-10 cursor-pointer"
        >
          <Image 
          src="/larrow.svg"
          alt="left Arrow"
          width={20}
          height={20}
          />
        </div>
        <div
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-[#141414] p-3 rounded-full z-10 cursor-pointer"
        >
          <Image 
          src="/rarrow.svg"
          alt="Right Arrow"
          width={20}
          height={20}
          />
        </div>
      </div>
    </>
  );
}
