import { student } from "../constants/studentInformation";

export function getStudentById(studentId) {
  return student.id === studentId ? student : null;
}

export function getCurrentStudent() {
  return student;
}
