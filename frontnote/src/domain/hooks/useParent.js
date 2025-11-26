/**
 * Hook - Parents
 * Hook React pour la gestion des parents et de leurs enfants
 * @module domain/hooks/useParent
 */

import { useState, useCallback } from 'react';
import { parentRepository } from '../../infrastructure/repositories/index.js';
import { tokenStorage } from '../../infrastructure/storage/index.js';

/**
 * Hook personnalisé pour les parents
 * @returns {Object} Méthodes et état des parents
 */
export const useParent = () => {
  const [children, setChildren] = useState([]);
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Récupérer les enfants d'un parent
   * @param {number} guardianId - ID du tuteur légal
   */
  const fetchChildren = useCallback(async (guardianId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await parentRepository.findChildren(guardianId, token);
      setChildren(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des enfants';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer les bulletins d'un enfant
   * @param {number} studentId - ID de l'élève
   */
  const fetchChildReports = useCallback(async (studentId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await parentRepository.findChildReports(studentId, token);
      setReports(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des bulletins';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer un bulletin spécifique
   * @param {number} reportId - ID du bulletin
   */
  const fetchReport = useCallback(async (reportId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await parentRepository.findReport(reportId, token);
      setCurrentReport(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération du bulletin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupérer les évaluations d'un enfant
   * @param {number} studentId - ID de l'élève
   */
  const fetchChildEvaluations = useCallback(async (studentId) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = tokenStorage.get();
      const data = await parentRepository.findChildEvaluations(studentId, token);
      setEvaluations(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des évaluations';
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
    setChildren([]);
    setReports([]);
    setCurrentReport(null);
    setEvaluations([]);
    setError(null);
  }, []);

  return {
    // État
    children,
    reports,
    currentReport,
    evaluations,
    isLoading,
    error,

    // Actions
    fetchChildren,
    fetchChildReports,
    fetchReport,
    fetchChildEvaluations,
    reset,
  };
};

export default useParent;
