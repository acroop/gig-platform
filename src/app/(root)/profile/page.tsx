"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

type UserProfile = {
  email: string;
  name: string;
  highestQualification: string;
  experience: number;
  topSkills: string[];
};

function Profile() {
  const { userId } = useAuth(); // Get userId from Clerk
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

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 bg-black text-white rounded-lg shadow-md">
      <h1 className="head-text text-left mb-6">Profile</h1>
      {userProfile && (
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Highest Qualification:</strong> {userProfile.highestQualification}
          </p>
          <p>
            <strong>Experience:</strong> {userProfile.experience} years
          </p>
          <div>
            <strong>Top 3 Skills:</strong>
            <ul className="list-disc ml-5">
              {userProfile.topSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
