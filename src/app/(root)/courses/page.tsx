"use client"
import React, { useState } from "react";
import axios from "axios";

const ScriptRunner = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/nlp-route");
      setResults(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Run Python Scripts</h1>
      <button
        onClick={callApi}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Running Scripts..." : "Run Scripts"}
      </button>
      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          <strong>Error:</strong> {error}
        </p>
      )}
      {results && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Results:</h2>
          <ul className="list-disc list-inside text-gray-600">
            {Object.entries(results).map(([key, value]: any) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScriptRunner;
