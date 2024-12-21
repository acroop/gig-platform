"use server";

import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.models"; // Import the User schema
import { connectDb } from "@/lib/validations/mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    // Validate the userId
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Connect to the database
    await connectDb();

    // Find the user's data by their ID
    const user = await User.findOne({ id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
