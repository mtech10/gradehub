import { transcript } from "../constants/transcript";
import { getCurrentStudent, getStudentById } from "./studentHelpers";

/**
 * Gets the transcript belonging to the current student.
 */
export function getCurrentStudentTranscript() {
  const student = getCurrentStudent();

  if (!student) return null;

  return transcript.find((record) => record.studentId === student.id) || null;
}

/**
 * Returns the complete student profile
 * merged with transcript information.
 */
export function getCurrentStudentProfile() {
  const student = getCurrentStudent();

  if (!student) return null;

  const record = getCurrentStudentTranscript();

  return {
    ...student,
    transcript: record,
  };
}

/**
 * Gets transcript by student ID.
 */
export function getTranscriptByStudentId(studentId) {
  return transcript.find((record) => record.studentId === studentId) || null;
}

/**
 * Gets student + transcript together.
 */
export function getStudentProfileById(studentId) {
  const student = getStudentById(studentId);

  if (!student) return null;

  return {
    ...student,
    transcript: getTranscriptByStudentId(studentId),
  };
}
