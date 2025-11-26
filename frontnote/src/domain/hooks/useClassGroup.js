/**
 * Hook - Classes
 * Hook React pour la gestion des classes
 * @module domain/hooks/useClassGroup
 */

import { useState, useCallback } from 'react';
import { classGroupRepository } from '../../infrastructure/repositories/index.js';
import { tokenStorage } from '../../infrastructure/storage/index.js';

/**
 * Hook personnalisé pour les classes
 * @returns {Object} Méthodes et état des classes
 */
export const useClassGroup = () => {
  const [classGroups, setClassGroups] = useState([]);
  const [currentClassGroup, setCurrentClassGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Récupérer toutes les classes
   */
  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await classGroupRepository.findAll(token);
      setClassGroups(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des classes';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer une classe par ID
   * @param {number} classGroupId - ID de la classe
   */
  const fetchById = useCallback(async (classGroupId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await classGroupRepository.findById(classGroupId, token);
      setCurrentClassGroup(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération de la classe';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer la classe d'un étudiant
   * @param {number} studentId - ID de l'étudiant
   */
  const fetchByStudent = useCallback(async (studentId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await classGroupRepository.findByStudent(studentId, token);
      setCurrentClassGroup(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération de la classe de l\'étudiant';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer l'ID de la classe d'un étudiant
   * @param {number} studentId - ID de l'étudiant
   */
  const fetchClassGroupIdByStudent = useCallback(async (studentId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const classGroupId = await classGroupRepository.findClassGroupIdByStudent(studentId, token);
      return classGroupId;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération de l\'ID de classe';
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
    setClassGroups([]);
    setCurrentClassGroup(null);
    setError(null);
  }, []);

  return {
    // État
    classGroups,
    currentClassGroup,
    isLoading,
    error,

    // Actions
    fetchAll,
    fetchById,
    fetchByStudent,
    fetchClassGroupIdByStudent,
    reset,
  };
};

export default useClassGroup;
