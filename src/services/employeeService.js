import { dummyEmployees, dummyDepartments } from "../data/employees";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeService = {
  async getEmployees() {
    await delay(300);
    return [...dummyEmployees];
  },

  async getEmployeeById(id) {
    await delay(150);
    const emp = dummyEmployees.find((e) => e.id === id);
    if (!emp) throw new Error("Employee not found");
    return { ...emp };
  },

  async getDepartments() {
    await delay(100);
    return [...dummyDepartments];
  },

  async updateEmployee(id, employeeData) {
    await delay(300);
    const index = dummyEmployees.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Employee not found");
    dummyEmployees[index] = { ...dummyEmployees[index], ...employeeData };
    return dummyEmployees[index];
  }
};
