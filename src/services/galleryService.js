import { dummyGallery, galleryFilters } from "../data/gallery";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const galleryService = {
  async getGallery() {
    await delay(200);
    return [...dummyGallery];
  },

  async getFilters() {
    await delay(50);
    return [...galleryFilters];
  }
};
