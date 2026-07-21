import { dummyQuickLinks } from "../data/quickLinks";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const quickLinksService = {
  async getQuickLinks() {
    await delay(100);
    return [...dummyQuickLinks];
  }
};
