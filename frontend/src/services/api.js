// Simple API wrapper - no fancy libraries needed
const API_BASE = "http://localhost:5000/api";

async function makeRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const chatAPI = {
  sendMessage: (message) =>
    makeRequest("/chat/", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  getSuggestions: (skills) =>
    makeRequest("/chat/suggest-careers", {
      method: "POST",
      body: JSON.stringify({ skills }),
    }),
};

export const jobsAPI = {
  matchJobs: (skills) =>
    makeRequest("/jobs/match", {
      method: "POST",
      body: JSON.stringify({ skills }),
    }),

  checkMatch: (userSkills, jobSkills) =>
    makeRequest("/jobs/single-match", {
      method: "POST",
      body: JSON.stringify({ user_skills: userSkills, job_skills: jobSkills }),
    }),
};

export const learningAPI = {
  getRoadmap: (skill) =>
    makeRequest("/learning/roadmap", {
      method: "POST",
      body: JSON.stringify({ skill }),
    }),

  getQuiz: (skill) =>
    makeRequest("/learning/quiz", {
      method: "POST",
      body: JSON.stringify({ skill }),
    }),
};
