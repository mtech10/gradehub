import { transcript } from "../constants/transcript";



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
