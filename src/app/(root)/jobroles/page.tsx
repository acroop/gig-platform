"use client"
import { useState } from 'react';
import axios from 'axios';

const JobSearch = () => {
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    setJobs([]);

    try {
      const response = await axios.post('/api/jobroles', {
        skills: skills.split(',').map((skill) => skill.trim()),
      });
      setJobs(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while fetching job recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Finder</h1>
      <div className="mb-4">
        <label htmlFor="skills" className="block text-lg font-medium mb-2">
          Enter your skills (comma-separated):
        </label>
        <input
          type="text"
          id="skills"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g., C++, Python, Java"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={fetchJobs}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Find Jobs'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Recommended Jobs:</h2>
        {jobs.length === 0 && !loading && !error && (
          <p className="text-gray-600">No jobs to display. Enter skills and click "Find Jobs".</p>
        )}
        <ul className="space-y-4">
          {jobs.map((job, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-md">
              <h3 className="text-lg font-bold">{job.jobTitle}</h3>
              <p className="text-gray-600">Company: {job.companyName}</p>
              <p className="text-gray-600">Location: {job.location}</p>
              <p className="text-gray-600">Skills Required: {job.skillsRequired}</p>
              <p className="text-gray-600">Posted Date: {job.postedDate}</p>
              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Job
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobSearch;
