import { dummyFranchises, dummyFranchiseStats } from "../data/franchise";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const franchiseService = {
  async getFranchises() {
    await delay(300);
    return [...dummyFranchises];
  },

  async getFranchiseById(id) {
    await delay(150);
    const franchise = dummyFranchises.find((f) => f.id === id);
    if (!franchise) throw new Error("Franchise not found");
    return { ...franchise };
  },

  async getFranchiseStats() {
    await delay(100);
    return { ...dummyFranchiseStats };
  }
};
