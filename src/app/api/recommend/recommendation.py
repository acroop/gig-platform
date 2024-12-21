import pandas as pd
import re
import sys
import json

# Load dataset
jobs_df = pd.read_csv(r'./src/app/api/recommend/Jobs_usable.csv')

# Function to clean text
def clean_text(text):
    if isinstance(text, str):
        text = text.lower()  # Convert to lowercase
        text = re.sub(r'[^\w\s]', ' ', text)  # Remove punctuation
        text = ' '.join(text.split())  # Remove extra spaces
        return text
    return ''

# Preprocess experience column
def preprocess_experience(experience):
    if isinstance(experience, str):
        numbers = re.findall(r'\d+', experience)
        if len(numbers) == 2:
            return (float(numbers[0]) + float(numbers[1])) / 2  # Average for ranges like "2 to 10 Years"
        elif len(numbers) == 1:
            return float(numbers[0])
    return 0.0  # Default if no valid number is found

# Apply preprocessing steps
jobs_df['skills'] = jobs_df['skills'].apply(clean_text)
jobs_df['Experience'] = jobs_df['Experience'].apply(preprocess_experience)
jobs_df['Qualifications'] = jobs_df['Qualifications'].apply(clean_text)
jobs_df['Work Type'] = jobs_df['Work Type'].apply(clean_text)
jobs_df['Responsibilities'] = jobs_df['Responsibilities'].apply(clean_text)

# Function to recommend jobs based on user input
def recommend_jobs(qualification, experience, top_skills):
    qualification = clean_text(qualification)
    top_skills = [clean_text(skill) for skill in top_skills]

    recommendations = []

    for _, job in jobs_df.iterrows():
        job_skills = set(job['skills'].split())

        # Calculate skill match scores with weights for top skills
        skill_match_score = (
            (1 if top_skills[0] in job_skills else 0) * 0.5 +
            (1 if top_skills[1] in job_skills else 0) * 0.3 +
            (1 if top_skills[2] in job_skills else 0) * 0.2
        )

        # Check if the qualification matches (normalized)
        qualification_match = qualification in job['Qualifications']

        # Check if the experience requirement is met
        experience_match = experience >= job['Experience']

        # Calculate overall priority
        if skill_match_score > 0:
            overall_score = (
                skill_match_score * 0.7 +
                (1 if qualification_match else 0) * 0.2 +
                (1 if experience_match else 0) * 0.1
            )
            recommendations.append((job['Job Title'], job['Role'], overall_score))

    if recommendations:
        scores = [rec[2] for rec in recommendations]
        min_score, max_score = min(scores), max(scores)

        # Scale and adjust scores to the range 70-100
        adjusted_recommendations = []
        for job_title, role, score in recommendations:
            scaled_score = 70 + (score - min_score) / (max_score - min_score) * 30 if max_score > min_score else 100
            adjusted_recommendations.append((job_title, role, scaled_score))

        adjusted_recommendations = sorted(adjusted_recommendations, key=lambda x: x[2], reverse=True)

        unique_recommendations = []
        seen_jobs = set()
        for job_title, role, scaled_score in adjusted_recommendations:
            if (job_title, role) not in seen_jobs:
                seen_jobs.add((job_title, role))
                unique_recommendations.append((job_title, role, scaled_score))

        return unique_recommendations[:5]

    return []

# Reading inputs from Node.js (from stdin)
qualification = sys.argv[1]
experience = float(sys.argv[2])
top_skills = sys.argv[3:]

# Get job recommendations
recommendations = recommend_jobs(qualification, experience, top_skills)

# Print recommendations as JSON
print(json.dumps(recommendations))
