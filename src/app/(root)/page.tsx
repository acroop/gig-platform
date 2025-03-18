
"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

const courses = [
  { id: 1, title: "Course 1", image: "/course1.jpg" },
  { id: 2, title: "Course 2", image: "/course2.jpg" },
  { id: 3, title: "Course 3", image: "/course3.jpg" },
  { id: 4, title: "Course 4", image: "/course4.jpg" },
];

const recom_courses = [
  {
    courses: [
      {
        course_name: "Python Programming",
        link: "https://youtube.com/playlist?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0&feature=shared",
        image: "/python.jpg",
      },
      {
        course_name: "Introduction to Machine Learning",
        link: "https://youtube.com/playlist?list=PLYwpaL_SFmcBhOEPwf5cFwqo5B-cP9G4P&feature=shared",
        image: "/machine-learning.jpg",
      },
      {
        course_name: "AWS Cloud Practitioner",
        link: "https://www.udemy.com/course/aws-certified-cloud-practitioner/",
        image: "/aws.jpg",
      },
      {
        course_name: "Cybersecurity Fundamentals",
        link: "https://nptel.ac.in/courses/106/105/106105217/",
        image: "/cybersecurity.jpg",
      },
      {
        course_name: "Data Science with Python",
        link: "https://youtu.be/mkv5mxYu0Wk?feature=shared",
        image: "/data-science.jpg",
      },
      {
        course_name: "Data Analysis for Beginners",
        link: "https://youtube.com/playlist?list=PLEiEAq2VkUUKgEFXH1tBbHwq38oWYDScU&feature=shared",
        image: "/data-analysis.jpg",
      },
      {
        course_name: "Kaggle Competitions for Beginners",
        link: "https://youtu.be/mSusDGZhkVU?feature=shared",
        image: "/kaggle.jpg",
      },
      
      {
        course_name: "Entrepreneurship Essentials",
        link: "https://www.udemy.com/course/entrepreneurship-essentials/",
        image: "/preneurship.jpg",
      },
    ],
  },
];

export default function Home() {
  const [currentIndexCourses, setCurrentIndexCourses] = useState(0);
  const [nextIndexCourses, setNextIndexCourses] = useState<number | null>(null);
  const [isAnimatingCourses, setIsAnimatingCourses] = useState(false);

  const [currentIndexRecom, setCurrentIndexRecom] = useState(0);
  const [nextIndexRecom, setNextIndexRecom] = useState<number | null>(null);
  const [isAnimatingRecom, setIsAnimatingRecom] = useState(false);

  // Courses carousel navigation
  const handlePrevCourses = () => {
    if (isAnimatingCourses) return;
    setIsAnimatingCourses(true);
    const newIndex = (currentIndexCourses - 1 + courses.length) % courses.length;
    setNextIndexCourses(newIndex);
  };

  const handleNextCourses = () => {
    if (isAnimatingCourses) return;
    setIsAnimatingCourses(true);
    const newIndex = (currentIndexCourses + 1) % courses.length;
    setNextIndexCourses(newIndex);
  };

  // Recommended courses carousel navigation
  const handlePrevRecom = () => {
    if (isAnimatingRecom) return;
    setIsAnimatingRecom(true);
    const newIndex = (currentIndexRecom - 1 + recom_courses[0].courses.length) % recom_courses[0].courses.length;
    setNextIndexRecom(newIndex);
  };

  const handleNextRecom = () => {
    if (isAnimatingRecom) return;
    setIsAnimatingRecom(true);
    const newIndex = (currentIndexRecom + 1) % recom_courses[0].courses.length;
    setNextIndexRecom(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextCourses();
    }, 5000); // Change course every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndexCourses]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextRecom();
    }, 5000); // Change recommended course every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndexRecom]);

  // Transitioning for Courses carousel
  useEffect(() => {
    if (nextIndexCourses !== null) {
      const timeout = setTimeout(() => {
        setCurrentIndexCourses(nextIndexCourses);
        setNextIndexCourses(null);
        setIsAnimatingCourses(false);
      }, 500); // Matches CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [nextIndexCourses]);

  // Transitioning for Recommended Courses carousel
  useEffect(() => {
    if (nextIndexRecom !== null) {
      const timeout = setTimeout(() => {
        setCurrentIndexRecom(nextIndexRecom);
        setNextIndexRecom(null);
        setIsAnimatingRecom(false);
      }, 500); // Matches CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [nextIndexRecom]);

  return (
    <>
      <h1 className="head-text text-left">Our Courses</h1>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden relative h-[450px]">
          {/* Courses Images with Transition */}
          <div className="relative w-full h-full">
            <div
              className={`absolute w-full h-full flex items-center justify-center transition-transform duration-500 ${
                isAnimatingCourses ? "-translate-x-full" : "translate-x-0"
              }`}
              style={{ zIndex: 1 }}
            >
              <Image
                src={courses[currentIndexCourses].image}
                alt={courses[currentIndexCourses].title}
                width={600}
                height={300}
                className="rounded-2xl object-contain w-fit"
                priority
              />
            </div>
          </div>
          {/* Courses Titles */}
          <h2 className="mt-2 text-lg font-bold text-black text-center">
            {courses[currentIndexCourses].title}
          </h2>
        </div>
        {/* Left and Right Navigation Buttons for Courses */}
        <div
          onClick={handlePrevCourses}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-[#141414] p-3 rounded-full z-10 cursor-pointer"
        >
          <Image src="/larrow.svg" alt="left Arrow" width={20} height={20} />
        </div>
        <div
          onClick={handleNextCourses}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-[#141414] p-3 rounded-full z-10 cursor-pointer"
        >
          <Image src="/rarrow.svg" alt="Right Arrow" width={20} height={20} />
        </div>
      </div>

      <h1 className="head-text text-left mt-10">Recommended Courses</h1>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden relative h-[450px]">
          {/* Recommended Courses Images with Transition */}
          <div className="relative w-full h-full">
            <Link
              href={recom_courses[0].courses[currentIndexRecom].link}
              target="_blank"
              className="absolute w-full h-full"
            >
              <div
                className={`absolute w-full h-full flex items-center justify-center transition-transform duration-500 ${
                  isAnimatingRecom ? "-translate-x-full" : "translate-x-0"
                }`}
                style={{ zIndex: 1 }}
              >
                <Image
                  src={recom_courses[0].courses[currentIndexRecom].image}
                  alt={recom_courses[0].courses[currentIndexRecom].course_name}
                  width={600}
                  height={300}
                  className="rounded-[40px] object-contain w-full"
                  priority
                />
              </div>
            </Link>
          </div>
          {/* Recommended Courses Titles */}
          <h2 className="mt-2 text-lg font-bold text-white text-center">
            {recom_courses[0].courses[currentIndexRecom].course_name}
          </h2>
        </div>
        {/* Left and Right Navigation Buttons for Recommended Courses */}
        <div
          onClick={handlePrevRecom}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-[#141414] p-3 rounded-full z-10 cursor-pointer"
        >
          <Image src="/larrow.svg" alt="left Arrow" width={20} height={20} />
        </div>
        <div
          onClick={handleNextRecom}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black hover:bg-[#141414] p-3 rounded-full z-10 cursor-pointer"
        >
          <Image src="/rarrow.svg" alt="Right Arrow" width={20} height={20} />
        </div>
      </div>
    </>
  );
}
