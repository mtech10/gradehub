import { transcript } from "../constants/transcript";

// Temporary helper.
// Later this will use the authenticated user's ID.
export function getCurrentStudentTranscript(studentId = 1) {
  return (
    transcript.find((student) => student.studentId === studentId) || {
      studentId,
      cgpa: 0,
      totalCredits: 0,
      academicStanding: "",
      sessions: [],
    }
  );
}
