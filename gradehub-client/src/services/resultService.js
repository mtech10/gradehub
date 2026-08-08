import api from "./api";

export const mapResultForUI = (result) => ({
  id: result.id,

  code: result.course?.code ?? "-",
  course: result.course?.title ?? "-",
  unit: Number(result.course?.creditUnit ?? 0),

  score: Number(result.totalScore ?? 0),
  grade: result.grade ?? "-",
  gradePoint: Number(result.gradePoint ?? 0),

  session: result.session?.name ?? "-",
  semester: result.semester?.name ?? "-",

  remark: result.remark ?? "-",

  caScore: Number(result.caScore ?? 0),
  examScore: Number(result.examScore ?? 0),

  status: result.isApproved ? "Approved" : "Pending",
});

const calculateStats = (results) => {
  const totalCourses = results.length;

  const totalUnits = results.reduce((sum, result) => sum + result.unit, 0);

  const totalEarnedUnits = results
    .filter((result) => result.gradePoint > 0)
    .reduce((sum, result) => sum + result.unit, 0);

  const scores = results.map((result) => result.score);

  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;

  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

  const averageScore =
    scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;

  const gradeCounts = {};

  results.forEach((result) => {
    if (result.grade && result.grade !== "-") {
      gradeCounts[result.grade] = (gradeCounts[result.grade] || 0) + 1;
    }
  });

  const averageGrade =
    Object.entries(gradeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";

  return {
    totalCourses,
    totalUnits,
    totalEarnedUnits,
    highestScore,
    lowestScore,
    averageScore: Number(averageScore.toFixed(2)),
    averageGrade,
  };
};

export const getMyResults = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/results/my-results?${query.toString()}`
    : "/results/my-results";

  const response = await api.get(endpoint);

  console.log("Student Results API Response:", response);

  const rawResults = response.data || [];

  const results = rawResults.map(mapResultForUI);

  return {
    results,
    stats: calculateStats(results),
    pagination: response.pagination ?? {
      page: 1,
      limit: results.length,
      total: results.length,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    },
  };
};

const resultService = {
  getMyResults,
};

export default resultService;
