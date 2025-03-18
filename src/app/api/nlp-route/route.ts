import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";

// Helper to run a Python script
const runPythonScript = (scriptName: string, args: string[] = []): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Correctly resolve the path to the script in 'src/app/api/nlp-route/scripts/'
    const scriptPath = path.join(process.cwd(), "src", "app", "api", "nlp-route", "scripts", scriptName);
    console.log("Running script:", scriptPath);  // Log the script path
    execFile("python", [scriptPath, ...args], (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", error);
        console.error("stderr:", stderr);
        reject(stderr || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    // Run the scripts in the required chronological order
    const googleApiOutput = await runPythonScript("googleapi.py");
    console.log("Google API Output:", googleApiOutput);

    const testFunctionOutput = await runPythonScript("testfunction.py");
    console.log("Test Function Output:", testFunctionOutput);

    const emailFuncOutput = await runPythonScript("readingemailfunc.py");
    console.log("Reading Email Func Output:", emailFuncOutput);

    const emailOutput = await runPythonScript("readingemails.py");
    console.log("Reading Email Output:", emailOutput);

    const preprocessEmailOutput = await runPythonScript("preprocess_email.py");
    console.log("Preprocess Email Output:", preprocessEmailOutput);

    const testPreprocessEmailOutput = await runPythonScript("test_preprocess_email.py");
    console.log("Test Preprocess Email Output:", testPreprocessEmailOutput);

    const coursesFromEmailDataOutput = await runPythonScript("courses_from_email_data.py");
    console.log("Courses From Email Data Output:", coursesFromEmailDataOutput);

    // Combine and return results in chronological order
    return NextResponse.json({
      googleApi: googleApiOutput,
      testFunction: testFunctionOutput,
      emailFunc: emailFuncOutput,
      email: emailOutput,
      preprocessEmail: preprocessEmailOutput,
      testPreprocessEmail: testPreprocessEmailOutput,
      coursesFromEmailData: coursesFromEmailDataOutput,
    });
  } catch (error) {
    console.error("Error running scripts:", error);
    return NextResponse.json({ error: `Error running scripts: ${error}` }, { status: 500 });
  }
}
