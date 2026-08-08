import api from "../api"; // Adjust the relative path to your api.js file if needed

export const studentService = {
  // Fetch paginated list of students
  async getStudents(params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/students?${queryString}`);
    return response; // Assumes backend returns { success: true, data: [...], pagination: {...} }
  },

  // Fetch student statistics
  async getStudentStats() {
    const response = await api.get("/students/stats");
    return response;
  },

  // Fetch a single student by ID
  async getStudentById(id) {
    const response = await api.get(`/students/${id}`);
    // If your api.js already returns `data`, just return response.
    // If api.js returns the full JSON object { success: true, data: {...} }, return response.data
    return response.data || response;
  },

  // Create a new student
  async createStudent(studentData) {
    const response = await api.post("/students", studentData);
    return response;
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
