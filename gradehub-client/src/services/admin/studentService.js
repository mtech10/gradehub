import api from "../api"; // Adjust the relative path to your api.js file if needed

export const studentService = {
  async getStudents(params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/students?${queryString}`);
    return response;
  },

  async getStudentStats() {
    const response = await api.get("/students/stats");
    return response;
  },

  async getStudentById(id) {
    const response = await api.get(`/students/${id}`);
    return response.data || response;
  },

  async createStudent(studentData) {
    const response = await api.post("/students", studentData);
    return response;
  },

  async deleteStudent(id) {
    const response = await api.delete(`/students/${id}`);
    return response.data || response;
  },

  getDepartments: async () => {
    const response = await api.get("/departments");
    return response.data || response;
  },

  getLevels: async () => {
    const response = await api.get("/levels");
    return response.data || response;
  },

  getSessions: async () => {
    const response = await api.get("/sessions");
    return response.data || response;
  },
  updateStudent: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data || response;
  },
};
