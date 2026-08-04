import { transcript } from "../constants/transcript";
import { getCurrentStudent, getStudentById } from "./studentHelpers";

/**
 * Returns the transcript for a student.
 */
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

/**
 * Returns the current student's transcript.
 */
export function getCurrentStudentTranscript() {
  const student = getCurrentStudent();

  if (!student) return null;

  return getTranscriptByStudentId(student.id);
}

/**
 * Returns the current student's complete profile.
 */
export function getCurrentStudentProfile() {
  const student = getCurrentStudent();

  if (!student) return null;

  return {
    ...student,
    transcript: getTranscriptByStudentId(student.id),
  };
}

/**
 * Returns any student's complete profile.
 */
export function getStudentProfileById(studentId) {
  const student = getStudentById(studentId);

  if (!student) return null;

  return {
    ...student,
    transcript: getTranscriptByStudentId(studentId),
  };
}
