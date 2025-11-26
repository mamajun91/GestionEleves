/**
 * Constantes API
 * @module core/constants/api
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',

  // Teachings
  TEACHINGS: '/teachings',
  TEACHINGS_BY_CLASS: (classGroupId) => `/teachings/by-class/${classGroupId}`,
  TEACHINGS_BY_ID: (id) => `/teachings/${id}`,
  TEACHINGS_BY_TEACHER: (teacherName) => `/teachings/by-teacher/${teacherName}`,

  // Evaluations
  EVALUATIONS_BY_TEACHING: (teachingId) => `/evaluations/by-teaching/${teachingId}`,

  // Class Groups
  CLASS_GROUPS: '/class-groups',
  CLASS_GROUP_BY_ID: (classGroupId) => `/class-groups/${classGroupId}`,
  CLASS_GROUP_BY_STUDENT: (studentId) => `/registrations/student/${studentId}/class-group/full`,
  CLASS_GROUP_ID_BY_STUDENT: (studentId) => `/registrations/student/${studentId}/class-group`,

  // Parents
  PARENT_CHILDREN: (guardianId) => `/users/${guardianId}/children`,
  CHILD_REPORTS: (studentId) => `/students/${studentId}/school-reports`,
  SCHOOL_REPORT: (reportId) => `/school-reports/${reportId}`,
  CHILD_EVALUATIONS: (studentId) => `/students/${studentId}/evaluations`,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const API_ERRORS = {
  UNAUTHORIZED: 'Session expirée. Veuillez vous reconnecter.',
  NETWORK_ERROR: 'Erreur de connexion au serveur.',
  UNKNOWN_ERROR: 'Une erreur inconnue est survenue.',
};
