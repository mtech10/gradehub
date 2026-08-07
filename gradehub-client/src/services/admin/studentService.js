import api from "../api"; // Make sure this path points to your Axios/fetch instance

export const studentService = {
  // 1. List View & Pagination
  getStudents: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/students?${queryString}`);
    return response;
  },

  // 2. Dashboard Stats
  getStudentStats: async () => {
    const response = await api.get("/students/stats");
    return response;
  },

  // 3. Add Student (The function that was missing!)
  createStudent: async (studentData) => {
    const response = await api.post("/students", studentData);
    return response;
  },

  // 4. Dynamic Dropdown Options
  getDepartments: async () => {
    const response = await api.get("/departments");
    return response;
  },

  getLevels: async () => {
    const response = await api.get("/levels");
    return response;
  },

  getSessions: async () => {
    const response = await api.get("/sessions");
    return response;
  },
};
