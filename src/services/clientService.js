import axios from "axios";
import { dummyClients } from "../data/clients";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const clientService = {
  async getClients() {
    await delay(300);
    // Future integration:
    // const response = await axios.get("/api/clients");
    // return response.data;
    return [...dummyClients];
  },

  async getClientById(id) {
    await delay(150);
    const client = dummyClients.find((c) => c.id === id);
    if (!client) throw new Error("Client not found");
    return { ...client };
  },

  async createClient(clientData) {
    await delay(400);
    const newClient = {
      id: `client-${Date.now()}`,
      ...clientData
    };
    dummyClients.unshift(newClient);
    return newClient;
  },

  async updateClient(id, clientData) {
    await delay(400);
    const index = dummyClients.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Client not found");
    dummyClients[index] = { ...dummyClients[index], ...clientData };
    return dummyClients[index];
  },

  async deleteClient(id) {
    await delay(300);
    const index = dummyClients.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Client not found");
    dummyClients.splice(index, 1);
    return true;
  }
};
