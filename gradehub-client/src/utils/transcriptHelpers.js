import { transcript } from "../constants/transcript";
import { getCurrentStudent, getStudentById } from "./studentHelpers";


export function getTranscriptByStudentId(studentId) {
  return (
    transcript.find((record) => record.studentId === studentId) ?? {
      studentId,
      sessions: [],
      cgpa: 0,
      totalCredits: 0,
      academicStanding: "",
    }
  );
}


export function getCurrentStudentTranscript() {
  const student = getCurrentStudent();

  if (!student) return null;

  return getTranscriptByStudentId(student.id);
}


export function getCurrentStudentProfile() {
  const student = getCurrentStudent();

  if (!student) return null;

  return {
    ...student,
    transcript: getTranscriptByStudentId(student.id),
  };
}


export function getStudentProfileById(studentId) {
  const student = getStudentById(studentId);

  if (!student) return null;

  return {
    ...student,
    transcript: getTranscriptByStudentId(studentId),
  };
}
