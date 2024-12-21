"use client";

import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

type FormData = {
  id: any,
  email: string;
  fullName: string;
  highestQualification: string;
  experience: number;
  topSkills: string[];
};

export default function ConditionalForm() {
  const { userId }: any = useAuth()
  const [formData, setFormData] = useState<FormData>({
    id: userId,
    email: "",
    fullName: "",
    highestQualification: "",
    experience: 0,
    topSkills: ["", "", ""], // Predefined array for top 3 skills
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? parseInt(value) : value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.topSkills];
    updatedSkills[index] = value;
    setFormData({ ...formData, topSkills: updatedSkills });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // POST data to the API
      // Ensure topSkills is sent as an array
      const response = await axios.post("/api/profile", {
        id: userId,
        email: formData.email,
        fullName: formData.fullName,
        highestQualification: formData.highestQualification,
        experience: formData.experience,
        topSkills: formData.topSkills, // Should be an array
      });


      setSuccessMessage(response.data.message);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black p-8 rounded-lg shadow-md w-full"
    >
      <h1 className="head-text text-left mb-4 text-white">Complete Your Profile</h1>

      {/* Email */}
      <label className="block mb-2 font-medium text-white">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter your email"
      />

      {/* Full Name */}
      <label className="block mb-2 font-medium text-white">Full Name</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter your full name"
      />

      {/* Highest Qualification */}
      <label className="block mb-2 font-medium text-white">
        Highest Qualification
      </label>
      <input
        type="text"
        name="highestQualification"
        value={formData.highestQualification}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter your highest qualification"
      />

      {/* Experience */}
      <label className="block mb-2 font-medium text-white">Experience (in years)</label>
      <input
        type="number"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter your experience in years"
        min={0}
      />

      {/* Top 3 Skills */}
      <label className="block mb-2 font-medium text-white">Top 3 Skills</label>
      {formData.topSkills.map((skill, index) => (
        <input
          key={index}
          type="text"
          value={skill}
          onChange={(e) => handleSkillChange(index, e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
          placeholder={`Enter skill ${index + 1}`}
        />
      ))}

      {/* Submit Button */}
      <div className="flex justify-center items-center mt-5">
        <InteractiveHoverButton text={loading ? "Submitting..." : "Submit"} />
      </div>

      {/* Success/Error Message */}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </form>
  );
}
