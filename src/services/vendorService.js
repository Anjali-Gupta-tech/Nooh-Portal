import { dummyVendors } from "../data/vendors";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const vendorService = {
  async getVendors() {
    await delay(300);
    return [...dummyVendors];
  },

  async getVendorById(id) {
    await delay(150);
    const vendor = dummyVendors.find((v) => v.id === id);
    if (!vendor) throw new Error("Vendor not found");
    return { ...vendor };
  },

  async createVendor(vendorData) {
    await delay(300);
    const newVendor = {
      id: `vend-${Date.now()}`,
      ...vendorData
    };
    dummyVendors.unshift(newVendor);
    return newVendor;
  }
};
