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
};

export default resultUploadService;
