import api from "../api";

const resultUploadService = {
  validateUpload: async ({
    file,
    sessionId,
    semesterId,
    departmentId,
    courseId,
    levelId,
    uploadType,
  }) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("sessionId", sessionId);
    formData.append("semesterId", semesterId);
    formData.append("departmentId", departmentId);
    formData.append("courseId", courseId);
    formData.append("levelId", levelId);
    formData.append("uploadType", uploadType);

    return api.postForm("/results/upload/validate", formData);
  },

  uploadValidatedResults: async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await api.post("/results/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // ADD THESE TWO METHODS:
  approveResult: async (id) => {
    const response = await api.patch(`/results/${id}/approve`);
    return response.data;
  },

  deleteResult: async (id) => {
    // Using your existing deactivate endpoint, or change to delete if you add a DELETE route
    const response = await api.patch(`/results/${id}/deactivate`);
    return response.data;
  },

  bulkApproveResults: async (ids) => {
    const response = await api.patch("/results/bulk-approve", { ids });
    return response.data;
  },

  bulkDeleteResults: async (ids) => {
    const response = await api.delete("/results/bulk-delete", {
      data: { ids },
    });
    return response.data;
  },

  deactivateResult: async (id) => {
    return api.patch(`/results/${id}/deactivate`);
  },

  bulkDeactivateResults: async (ids) => {
    return api.patch("/results/bulk-deactivate", { ids });
  },
};

export default resultUploadService;
