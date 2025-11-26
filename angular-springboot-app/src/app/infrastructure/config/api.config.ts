export const API_URL = 'http://localhost:8081/api';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_URL}/login`,
  
  // Parents et enfants
  parentChildren: (guardianId: number) => `${API_URL}/users/${guardianId}/children`,
  childReports: (studentId: number) => `${API_URL}/students/${studentId}/school-reports`,
  schoolReport: (reportId: number) => `${API_URL}/school-reports/${reportId}`,
  childEvaluations: (studentId: number) => `${API_URL}/students/${studentId}/evaluations`,
  
  // Class Groups
  classGroups: `${API_URL}/class-groups`,
  classGroupById: (classGroupId: number) => `${API_URL}/class-groups/${classGroupId}`,
  classGroupByStudent: (studentId: number) => `${API_URL}/registrations/student/${studentId}/class-group/full`,
  classGroupIdByStudent: (studentId: number) => `${API_URL}/registrations/student/${studentId}/class-group`,
  
  // Teachings
  teachings: `${API_URL}/teachings`,
  teachingsByClass: (classGroupId: number) => `${API_URL}/teachings/by-class/${classGroupId}`,
  teachingsById: (id: number) => `${API_URL}/teachings/${id}`,
  teachingsByTeacher: (teacherName: string) => `${API_URL}/teachings/by-teacher/${teacherName}`,
  
  // Evaluations
  evaluationsByTeaching: (teachingId: number) => `${API_URL}/evaluations/by-teaching/${teachingId}`,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const API_ERRORS = {
  UNAUTHORIZED: 'Session expirée. Veuillez vous reconnecter.',
  NETWORK_ERROR: 'Erreur de connexion au serveur.',
  UNKNOWN_ERROR: 'Une erreur inconnue est survenue.',
} as const;