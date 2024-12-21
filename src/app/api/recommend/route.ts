"use server";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

// Define types for the body request (Input from user)
interface RequestBody {
  qualification: string;
  experience: number;
  topSkills: string[];
}

interface JobRecommendation {
  jobTitle: string;
  role: string;
  matchScore: number;
}

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const { qualification, experience, topSkills }: RequestBody = await req.json();

    // Validate inputs
    if (!qualification || !experience || !topSkills || topSkills.length !== 3) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    // Construct the path to the Python script
    const pythonScriptPath = path.resolve("./src/app/api/recommend/recommendation.py");

    // Prepare the command to execute the Python script
    const command = `python ${pythonScriptPath} "${qualification}" ${experience} "${topSkills[0]}" "${topSkills[1]}" "${topSkills[2]}"`;

    // Execute the Python script using exec
    const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`exec error: ${error}`);
        }
        resolve({ stdout, stderr });
      });
    });

    // Check for errors in stderr
    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    // Parse the JSON output from Python and transform it into the desired format
    try {
      const rawRecommendations: [string, string, number][] = JSON.parse(stdout);
      const recommendations: JobRecommendation[] = rawRecommendations.map(([jobTitle, role, matchScore]) => ({
        jobTitle,
        role,
        matchScore,
      }));
      return NextResponse.json({ recommendations });
    } catch (e) {
      return NextResponse.json({ error: "Error parsing Python script output" }, { status: 500 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
