"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

type UserProfile = {
  email: string;
  name: string;
  highestQualification: string;
  experience: number;
  topSkills: string[];
};

function Profile() {
  const { userId } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.post("/api/profile-info", { userId });
        setUserProfile(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };
  
    const timer = setTimeout(() => {
      fetchUserProfile();
    }, 3000); // 5 seconds delay
  
    // Cleanup the timer on component unmount or userId change
    return () => clearTimeout(timer);
  
  }, [userId]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full relative p-8 bg-[#121212] text-white rounded-lg shadow-md">
      <h1 className="head-text text-left mb-6">Profile</h1>
      <div className="w-full flex flex-col gap-4">
        {userProfile && (
          <div className="w-full">
            {/* Top Row: Profile Picture, Name, and Email */}
            <div className="flex flex-row justify-between items-center">
              {/* Left Side: Profile Picture and Name */}
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/profile-circle.svg"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                />
                <div>
                  <p className="text-[25px] font-bold head-text p-2">
                    {userProfile.name}
                  </p>
                </div>
              </div>

              {/* Right Side: Email */}
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/email.svg"
                  width={50}
                  height={50}
                  alt="Email icon"
                />
                <p className="text-[20px] p-2">{userProfile.email}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mt-4">
              {/* Highest Qualification and Experience */}
              <div className="flex flex-row justify-between">
                <p className="text-[20px]">
                  <span className="font-bold">Highest Qualification: </span>
                  {userProfile.highestQualification}
                </p>
                <p className="text-[20px]">
                  <span className="font-bold">Experience: </span>
                  {userProfile.experience === 0 ? 'Fresher' : `${userProfile.experience} years`}
                </p>

              </div>

              {/* Top Skills */}
              <div className="flex flex-row gap-4 mt-4">
                {userProfile.topSkills.slice(0, 3).map((skill, index) => (
                  <p
                    key={index}
                    className="flex-grow text-[20px] bg-[#1e1e1e] p-2 rounded-lg shadow-md text-center"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
