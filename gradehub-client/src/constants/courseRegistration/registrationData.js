export const registrationRules = {
  minUnits: 15,
  maxUnits: 24,
  status: "Open",
  deadline: "15 Sept 2026",
};

export const initialRegistrationCourses = [
  {
    code: "AGE401",
    title: "Farm Power & Machinery",
    units: 3,
    semester: 1,
    status: "Available",
  },
  {
    code: "AGE402",
    title: "Soil & Water Engineering",
    units: 2,
    semester: 1,
    status: "Registered",
  }, // Pretend this was previously registered
  {
    code: "AGE403",
    title: "Agricultural Electrification",
    units: 3,
    semester: 1,
    status: "Available",
  },
  {
    code: "AGE404",
    title: "Hydrology",
    units: 3,
    semester: 2,
    status: "Registered",
  },
  {
    code: "AGE405",
    title: "Irrigation Engineering",
    units: 3,
    semester: 2,
    status: "Available",
  },
  {
    code: "AGE407",
    title: "Agricultural Structures",
    units: 3,
    semester: 2,
    status: "Available",
  },
  {
    code: "GST401",
    title: "Industrial Training",
    units: 2,
    semester: 1,
    status: "Registered",
  },
  {
    code: "ENT302",
    title: "Entrepreneurship",
    units: 2,
    semester: 2,
    status: "Available",
  },
];
