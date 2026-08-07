import api from "./api";

// Map the complex nested DB object into the simple UI object
export const mapResultForUI = (result) => ({
  id: result.id,
  code: result.course?.code || "N/A",
  course: result.course?.title || "N/A",
  // The payload showed creditUnit as null, fallback to 0 to prevent NaN errors
  unit: result.course?.creditUnit || 0,
  score: result.totalScore || 0,
  grade: result.grade || "N/A",
  gradePoint: result.gradePoint || 0,
  session: result.session?.name || "N/A",
  semester: result.semester?.name || "N/A",
  remark: result.remark || "N/A",
});

const resultService = {
  getStudentResults: async (params = {}) => {
    const response = await api.get("/results", { params });

    // Safely unwrap the envelope
    const payload = response.data || response;
    const resultsData = payload.data || [];

    return {
      results: resultsData.map(mapResultForUI),
      pagination: payload.pagination,
    };
  },
};

export default resultService;
