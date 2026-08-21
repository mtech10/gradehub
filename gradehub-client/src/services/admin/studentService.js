import api from "../api"; 

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

  uploadStudents: async (file, contextData = {}) => {
    const formData = new FormData();
    formData.append("file", file);

    
    if (contextData.departmentId) {
      formData.append(
        "departmentId",
        contextData.contextData?.departmentId || contextData.departmentId,
      );
    }
    if (contextData.levelId) {
      formData.append(
        "levelId",
        contextData.contextData?.levelId || contextData.levelId,
      );
    }

    const response = await api.post("/students/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const payload = response.data ?? response;
    return payload.data ?? payload;
  },
};
