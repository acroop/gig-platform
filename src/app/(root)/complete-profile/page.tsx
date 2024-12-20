"use client";

import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { useState } from "react";
import axios from "axios";


type FormData = {
  email: string;
  fullName: string;
  hobby: string;
  [key: string]: string; // Allow dynamic keys
};

export default function ConditionalForm() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    hobby: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // POST data to the API
      const response = await axios.post("/api/profile", {
        
        email: formData.email,
        fullName: formData.fullName,
        hobby: formData.hobby,
        question1: formData.question1 || "",
        question2: formData.question2 || "",
        question3: formData.question3 || "",
        question4: formData.question4 || "",
        question5: formData.question5 || "",
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

      {/* Hobby */}
      <label className="block mb-2 font-medium text-white">Hobby</label>
      <input
        type="text"
        name="hobby"
        value={formData.hobby}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter your hobby"
      />

      {/* Show Questions Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="showQuestions"
          onChange={(e) => setShowQuestions(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="showQuestions" className="font-medium text-white">
          Answer additional questions
        </label>
      </div>

      {/* Conditional Questions */}
      {showQuestions && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <label className="block mb-3 font-medium text-white">
                Question {index + 1}
              </label>
              <input
                type="text"
                name={`question${index + 1}`}
                value={formData[`question${index + 1}`] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder={`Enter your answer for question ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}

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
