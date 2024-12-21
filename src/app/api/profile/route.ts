"use server";

import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.models"; // Import the User schema
import { connectDb } from "@/lib/validations/mongoose";



// Handle POST requests
export async function POST(request: Request) {
  try {
    

    const body = await request.json();
    const { id, email, fullName, highestQualification, experience, topSkills } = body;

    // Validate the request body
    if (
      !email ||
      !fullName ||
      !highestQualification ||
      typeof experience !== "number" ||
      !Array.isArray(topSkills) ||
      topSkills.filter((skill) => skill.trim() !== "").length !== 3
    ) {
      return NextResponse.json(
        { error: "All fields are required, and topSkills must contain exactly 3 non-empty items" },
        { status: 400 }
      );
    }
    

    // Connect to the database
    await connectDb();

    // Create and save a new user
    const newUser = new User({
      id: id , // Use userId or fallback to a unique ID
      name: fullName,
      email,
      highestQualification,
      experience,
      topSkills,
    });

    await newUser.save();

    return NextResponse.json({ message: "Profile completed successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
