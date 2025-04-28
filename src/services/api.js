// This is a simulated API service that mimics HTTP requests to a backend
import { sampleData } from './sampleData.js'; // Import sample data

// Simulate network delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// ---------- Intern API ----------

// Get all interns
export const getInterns = async () => {
  await delay(800); // Simulate network request
  return [...sampleData.interns];
};

// Get intern by id
export const getInternById = async (id) => {
  await delay(500);
  const intern = sampleData.interns.find(intern => intern.id === id);
  if (!intern) throw new Error('Intern not found');
  return {...intern};
};

// Create new intern
export const createIntern = async (internData) => {
  await delay(1000);
  const newIntern = {
    ...internData,
    id: Date.now().toString(),
  };
  sampleData.interns.push(newIntern);
  return {...newIntern};
};

// ---------- Project API ----------

// Get all projects
export const getProjects = async () => {
  await delay(800);
  return [...sampleData.projects];
};

// Assign intern to project
export const assignInternToProject = async (projectId, internId) => {
  await delay(700);
  const project = sampleData.projects.find(p => p.id === projectId);
  if (!project) throw new Error('Project not found');
  
  if (!project.assignedInterns.includes(internId)) {
    project.assignedInterns.push(internId);
  }
  
  return {...project};
};

// ---------- Tech Votes API ----------

// Submit tech vote
export const submitTechVote = async (internId, technologies) => {
  await delay(800);
  const newVote = {
    id: Date.now().toString(),
    internId,
    technologies,
    timestamp: new Date().toISOString()
  };
  
  // Remove any existing vote by this intern
  sampleData.techVotes = sampleData.techVotes.filter(vote => vote.internId !== internId);
  
  // Add the new vote
  sampleData.techVotes.push(newVote);
  return {...newVote};
};

// Get tech vote stats
export const getTechVoteStats = async () => {
  await delay(600);
  
  const stats = {};
  sampleData.techVotes.forEach(vote => {
    vote.technologies.forEach(tech => {
      if (!stats[tech]) stats[tech] = 0;
      stats[tech]++;
    });
  });
  
  return Object.entries(stats).map(([name, count]) => ({
    name,
    count,
    percentage: sampleData.techVotes.length > 0 
      ? Math.round((count / sampleData.techVotes.length) * 100) 
      : 0
  }));
};

export default {
  getInterns,
  getInternById,
  createIntern,
  getProjects,
  assignInternToProject,
  submitTechVote,
  getTechVoteStats,
};