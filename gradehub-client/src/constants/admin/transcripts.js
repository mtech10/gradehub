export const transcripts = [
  {
    studentId: 1,

    sessions: [
      {
        session: "2024/2025",

        semesters: [
          {
            name: "First Semester",

            gpa: 4.62,

            totalUnits: 21,

            courses: [
              {
                code: "AGE401",
                title: "Soil Mechanics",
                unit: 3,
                score: 74,
                grade: "A",
                gp: 5,
              },

              {
                code: "AGE403",
                title: "Hydrology",
                unit: 2,
                score: 68,
                grade: "B",
                gp: 4,
              },
            ],
          },

          {
            name: "Second Semester",

            gpa: 4.34,

            totalUnits: 19,

            courses: [
              {
                code: "AGE407",
                title: "Machine Design",
                unit: 3,
                score: 72,
                grade: "A",
                gp: 5,
              },
            ],
          },
        ],
      },
    ],
  },
];
