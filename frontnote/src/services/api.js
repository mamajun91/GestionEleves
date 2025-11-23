/**
 * Service API - Gestion centralisée des appels backend
 * @module services/api
 */
import authService from "./auth.js";
import { jwtService } from "./jwtService.js";

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

/**
 * Fonction utilitaire pour les requêtes fetch
 * @param {string} endpoint - Endpoint de l'API (ex: '/enseignements')
 * @param {Object} options - Options fetch
 * @returns {Promise<any>} Données de la réponse
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Utiliser le service auth pour récupérer le token
  const token = authService.getToken();
  if (!url.includes("/login") && token)  {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);

    // Gérer 401 Unauthorized
    if (response.status === 401) {
      authService.logout();
      window.location.href = '/login';
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// ============================================
// SERVICE ENSEIGNEMENTS
// ============================================
export const enseignementsAPI = {
  /**
   * Récupérer les enseignements par classe
   * GET /teachings/by-class/{classGroupId}
   */
  getByClassGroup: (classGroupId) => {
    return apiRequest(`/teachings/by-class/${classGroupId}`);
  },

  /**
   * Récupérer un enseignement par ID
   * GET /teachings/{id}
   */
  getById: (id) => {
    return apiRequest(`/teachings/${id}`);
  },

  /**
   * Récupérer un enseignement par nom d'enseignant
   * GET /teachings/by-teacher/{teacherName}
   */
  getByTeacher: (teacherName) => {
    return apiRequest(`/teachings/by-teacher/${teacherName}`);
  },
};

// ============================================
// SERVICE ÉVALUATIONS
// ============================================
export const evaluationsAPI = {
  /**
   * Récupérer les évaluations d'un enseignement
   * GET /evaluations/by-teaching/{teachingId}
   */
  getByTeaching: (teachingId) => {
    return apiRequest(`/evaluations/by-teaching/${teachingId}`);
  },
};

// ============================================
// SERVICE CLASS GROUP
// ============================================
export const classGroupAPI = {
  /**
   * Récupérer la classe complète d'un étudiant
   * GET /registrations/student/{studentId}/class-group/full
   */
  getByStudent: (studentId) => {
    return apiRequest(`/registrations/student/${studentId}/class-group/full`);
  },

  /**
   * Récupérer seulement l'ID de la classe d'un étudiant
   * GET /registrations/student/{studentId}/class-group
   */
  getClassGroupIdByStudent: (studentId) => {
    return apiRequest(`/registrations/student/${studentId}/class-group`);
  },

  /**
   * Récupérer un ClassGroup par ID
   * GET /class-groups/{classGroupId}
   */
  getById: (classGroupId) => {
    return apiRequest(`/class-groups/${classGroupId}`);
  },

  getAll: () => {
    return apiRequest('/class-groups');
  },

  /**
   * Récupérer la classe d'un élève (objet complet avec id et name)
   */
  getByStudent(studentId) {
    return apiRequest(`/registrations/student/${studentId}/class-group/full`);
  },
};

// ============================================
// SERVICE PARENT (LEGAL GUARDIAN)
// ============================================
export const parentAPI = {
  /**
   * Récupérer la liste des enfants d'un parent
   * GET /users/{guardianId}/children
   */
  getChildren: (guardianId) => {
    return apiRequest(`/users/${guardianId}/children`);
  },

  /**
   * Récupérer les bulletins d'un enfant
   * GET /students/{studentId}/school-reports
   */
  getChildReports: (studentId) => {
    return apiRequest(`/students/${studentId}/school-reports`);
  },

  /**
   * Récupérer un bulletin spécifique
   * GET /school-reports/{reportId}
   */
  getReport: (reportId) => {
    return apiRequest(`/school-reports/${reportId}`);
  },

  /**
   * Récupérer les évaluations d'un enfant
   * GET /students/{studentId}/evaluations
   */
  getChildEvaluations: (studentId) => {
    return apiRequest(`/students/${studentId}/evaluations`);
  },
};

// ============================================
// SERVICE AUTHENTIFICATION
// ============================================
export const authAPI = {
  /**
   *  LOGIN OPTIMISÉ - Sans appel /api/profil
   * Extrait les infos directement depuis le JWT
   */
  login: async (username, password) => {
    // 1. Appel API login
    const loginData = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (loginData.token) {
      // 2. Sauvegarder le token
      authService.saveToken(loginData.token);
      
      // 3.  Extraire les infos depuis le JWT (SANS appel API)
      const tokenInfo = jwtService.getTokenInfo(loginData.token);
      
      if (tokenInfo) {
        const user = {
          id: tokenInfo.id,
          username: tokenInfo.username,
          role: tokenInfo.role,
        };

        // 4. Sauvegarder l'utilisateur
        authService.saveUser(user);
        
        return { 
          ...loginData, 
          user,
          // Infos debug (optionnel)
          tokenInfo: {
            expiresAt: tokenInfo.expiresAt,
            issuedAt: tokenInfo.issuedAt,
          }
        };
      }
    }
    
    return loginData;
  },

  /**
   * Déconnexion
   */
  logout: () => {
    authService.logout();
  },

  /**
   * Vérifier si authentifié
   */
  isAuthenticated: () => {
    return authService.isAuthenticated();
  },

  /**
   * Récupérer le token
   */
  getToken: () => {
    return authService.getToken();
  },

  /**
   * Récupérer l'utilisateur connecté
   */
  getCurrentUser: () => {
    return authService.getUser();
  },

  /**
   *  NOUVEAU - Récupérer le rôle directement depuis le JWT
   */
  getCurrentRole: () => {
    return authService.getRole();
  },

  /**
   *  NOUVEAU - Récupérer le username directement depuis le JWT
   */
  getCurrentUsername: () => {
    return authService.getUsername();
  },
};

// ============================================
// EXPORT PAR DÉFAUT
// ============================================
export default {
  enseignements: enseignementsAPI,
  evaluations: evaluationsAPI,
  classGroups: classGroupAPI,
  parents: parentAPI,
  auth: authAPI,
};