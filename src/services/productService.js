import axios from "axios";
import { dummyProducts, dummyCategories } from "../data/products";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  async getProducts() {
    await delay(300);
    // Future integration:
    // const response = await axios.get("/api/products");
    // return response.data;
    return [...dummyProducts];
  },

  async getProductById(id) {
    await delay(150);
    const prod = dummyProducts.find((p) => p.id === id);
    if (!prod) throw new Error("Product not found");
    return { ...prod };
  },

  async getCategories() {
    await delay(100);
    return [...dummyCategories];
  },

  async createProduct(productData) {
    await delay(400);
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...productData
    };
    dummyProducts.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id, productData) {
    await delay(400);
    const index = dummyProducts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");
    dummyProducts[index] = { ...dummyProducts[index], ...productData };
    return dummyProducts[index];
  }
};
