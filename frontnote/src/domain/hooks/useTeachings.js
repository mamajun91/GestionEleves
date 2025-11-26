/**
 * Hook - Enseignements
 * Hook React pour la gestion des enseignements
 * @module domain/hooks/useTeachings
 */

import { useState, useCallback } from 'react';
import { teachingRepository } from '../../infrastructure/repositories/index.js';
import { tokenStorage } from '../../infrastructure/storage/index.js';

/**
 * Hook personnalisé pour les enseignements
 * @returns {Object} Méthodes et état des enseignements
 */
export const useTeachings = () => {
  const [teachings, setTeachings] = useState([]);
  const [currentTeaching, setCurrentTeaching] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Récupérer les enseignements par classe
   * @param {number} classGroupId - ID de la classe
   */
  const fetchByClassGroup = useCallback(async (classGroupId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await teachingRepository.findByClassGroup(classGroupId, token);
      setTeachings(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des enseignements';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer un enseignement par ID
   * @param {number} id - ID de l'enseignement
   */
  const fetchById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await teachingRepository.findById(id, token);
      setCurrentTeaching(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération de l\'enseignement';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer les enseignements par enseignant
   * @param {string} teacherName - Nom de l'enseignant
   */
  const fetchByTeacher = useCallback(async (teacherName) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await teachingRepository.findByTeacher(teacherName, token);
      setTeachings(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des enseignements';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Réinitialiser l'état
   */
  const reset = useCallback(() => {
    setTeachings([]);
    setCurrentTeaching(null);
    setError(null);
  }, []);

  return {
    // État
    teachings,
    currentTeaching,
    isLoading,
    error,

    // Actions
    fetchByClassGroup,
    fetchById,
    fetchByTeacher,
    reset,
  };
};

export default useTeachings;
