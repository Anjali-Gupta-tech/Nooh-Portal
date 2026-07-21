import axios from "axios";
import { dummyProjects } from "../data/projects";

// Simulated delay helper to mimic API latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectService = {
  async getProjects() {
    await delay(300);
    // Future integration:
    // const response = await axios.get("/api/projects");
    // return response.data;
    return [...dummyProjects];
  },

  async getProjectById(id) {
    await delay(150);
    const proj = dummyProjects.find((p) => p.id === id);
    if (!proj) throw new Error("Project not found");
    return { ...proj };
  },

  async createProject(projectData) {
    await delay(500);
    const newProject = {
      id: `proj-${Date.now()}`,
      progress: 0,
      notes: [],
      documents: [],
      ...projectData
    };
    dummyProjects.unshift(newProject);
    return newProject;
  },

  async updateProject(id, projectData) {
    await delay(500);
    const index = dummyProjects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Project not found");
    dummyProjects[index] = { ...dummyProjects[index], ...projectData };
    return dummyProjects[index];
  },

  async addNote(projectId, noteText) {
    await delay(200);
    const index = dummyProjects.findIndex((p) => p.id === projectId);
    if (index === -1) throw new Error("Project not found");
    const today = new Date().toISOString().split('T')[0];
    const formattedNote = `${today}: ${noteText}`;
    dummyProjects[index].notes.push(formattedNote);
    return dummyProjects[index];
  }
};
