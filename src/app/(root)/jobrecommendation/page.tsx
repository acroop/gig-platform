"use client"
import { useState } from 'react';
import axios from 'axios';

const JobRecommendationForm: React.FC = () => {
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState<number | ''>('');
  const [topSkills, setTopSkills] = useState<string[]>(['', '', '']);
  const [recommendations, setRecommendations] = useState<JobRecommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  interface JobRecommendation {
    jobTitle: string;
    role: string;
    matchScore: number;
  }

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...topSkills];
    updatedSkills[index] = value;
    setTopSkills(updatedSkills);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRecommendations(null);

    if (topSkills.some(skill => !skill)) {
      setError('Please fill in all three skills.');
      return;
    }

    try {
      const response = await axios.post('/api/recommend', {
        qualification,
        experience: Number(experience),
        topSkills,
      });
      setRecommendations(response.data.recommendations);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Job Recommendation System</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Qualification:</label>
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Years of Experience:</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Top 3 Skills:</label>
          {topSkills.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Get Recommendations
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {recommendations && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Recommendations:</h2>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="border p-4 rounded">
                <p><strong>Job Title:</strong> {rec.jobTitle}</p>
                <p><strong>Role:</strong> {rec.role}</p>
                <p><strong>Match Score:</strong> {rec.matchScore}%</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobRecommendationForm;