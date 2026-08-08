import api from "../api";

const mapResult = (result) => ({
  id: result.id,

  studentName:
    result.student?.fullName ??
    `${result.student?.firstName ?? ""} ${result.student?.lastName ?? ""}`.trim() ??
    "Unknown",

  matricNumber: result.student?.matricNumber ?? result.matricNumber ?? "-",

  code: result.course?.code ?? result.code ?? "-",

  course: result.course?.title ?? result.course?.name ?? result.course ?? "-",

  unit: Number(
    result.course?.creditUnit ?? result.creditUnit ?? result.unit ?? 0,
  ),

  caScore: Number(result.caScore ?? 0),

  examScore: Number(result.examScore ?? 0),

  score: Number(result.totalScore ?? result.score ?? 0),

  grade: result.grade ?? "-",

  gradePoint: Number(result.gradePoint ?? 0),

  remark: result.remark ?? "-",

  status:
    result.isApproved === true
      ? "Approved"
      : result.isApproved === false
        ? "Pending"
        : (result.status ?? "Pending"),

  session: result.session?.name ?? result.session ?? "-",

  semester: result.semester?.name ?? result.semester ?? "-",

  createdAt: result.createdAt,

  updatedAt: result.updatedAt,
});

export const getResults = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/results?${query.toString()}`
    : "/results";

  const response = await api.get(endpoint);

  return {
    data: response.data.map(mapResult),
    pagination: response.pagination,
  };
};

export const getResultStatistics = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/results/statistics?${query.toString()}`
    : "/results/statistics";

  const response = await api.get(endpoint);

  return response.data;
};
export const resultService = {
  getResults,
  getResultStatistics,
};

export default resultService;
