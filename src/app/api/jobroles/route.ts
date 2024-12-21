import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

type Job = {
  jobTitle: string;
  companyName: string;
  location: string;
  skillsRequired: string;
  postedDate: string;
  jobLink: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { skills }: { skills: string[] } = body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide an array of skills.' },
        { status: 400 }
      );
    }

    const pythonOutput = await runPythonScript(skills.join(','));
    if (!pythonOutput) {
      return NextResponse.json(
        { error: 'Failed to fetch job recommendations from Python script.' },
        { status: 500 }
      );
    }

    const jobs: Job[] = parsePythonOutput(pythonOutput);
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

async function runPythonScript(skills: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = spawn('python3', ['./src/app/api/jobroles/webscrapedjobsuggestion.py']);
    let output = '';

    process.stdin.write(`${skills}\n`);
    process.stdin.end();

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });
  });
}

function parsePythonOutput(output: string): Job[] {
  const jobs: Job[] = [];
  const lines = output.split('\n');
  let currentJob: Partial<Job> = {};

  for (const line of lines) {
    if (line.startsWith('Job Title:')) {
      currentJob.jobTitle = line.replace('Job Title:', '').trim();
    } else if (line.startsWith('Company Name:')) {
      currentJob.companyName = line.replace('Company Name:', '').trim();
    } else if (line.startsWith('Location:')) {
      currentJob.location = line.replace('Location:', '').trim();
    } else if (line.startsWith('Skills Required:')) {
      currentJob.skillsRequired = line.replace('Skills Required:', '').trim();
    } else if (line.startsWith('Posted Date:')) {
      currentJob.postedDate = line.replace('Posted Date:', '').trim();
    } else if (line.startsWith('Job Link:')) {
      currentJob.jobLink = line.replace('Job Link:', '').trim();
      jobs.push(currentJob as Job);
      currentJob = {};
    }
  }

  return jobs;
}
