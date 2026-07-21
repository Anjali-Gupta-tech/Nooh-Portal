import { dummyStock } from "../data/stock";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const stockService = {
  async getStock() {
    await delay(250);
    return [...dummyStock];
  },

  async updateStockQuantity(id, newQuantity) {
    await delay(300);
    const item = dummyStock.find(s => s.id === id);
    if (!item) throw new Error("Stock item not found");
    item.quantity = Number(newQuantity);
    item.lastUpdated = new Date().toISOString().split('T')[0];
    
    // Recalculate status
    if (item.category === "Stretch Ceiling" || item.category === "Flooring" || item.category === "Artificial Grass") {
      // Area based triggers
      if (item.quantity <= 100) item.status = "Low Stock";
      else if (item.quantity <= 500) item.status = "Medium";
      else item.status = "In Stock";
    } else {
      // Count based triggers
      if (item.quantity <= 10) item.status = "Low Stock";
      else if (item.quantity <= 30) item.status = "Medium";
      else item.status = "In Stock";
    }
    
    return { ...item };
  }
};
