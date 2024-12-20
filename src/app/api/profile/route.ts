"use server"

import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.models"; // Import the User schema
import { connectDb } from "@/lib/validations/mongoose";
import { auth } from "@clerk/nextjs/server";

// Handle POST requests
export async function POST(request: Request) {
  try {
    // Get the authenticated user's ID
    const { userId }: any = auth();

    // Check if the user is authenticated
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized: User is not authenticated" }, { status: 401 });
    // }

    const body = await request.json();
    const { email, fullName, hobby, question1, question2, question3, question4, question5 } = body;

    // Validate the request body
    if (!email || !fullName || !hobby || !question1 || !question2 || !question3 || !question4 || !question5) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Connect to the database
    await connectDb();

    // Create and save a new user
    const newUser = new User({
      id: userId || new Date().getTime().toString(), // Use userId or fallback to a unique ID
      name: fullName,
      email,
      hobby,
      q1: question1,
      q2: question2,
      q3: question3,
      q4: question4,
      q5: question5,
    });

    await newUser.save();

    return NextResponse.json({ message: "User data saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
