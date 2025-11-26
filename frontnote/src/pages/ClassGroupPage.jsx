import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Navigation from '../components/layout/Navigation.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';
import Button from '../components/ui/Button.jsx';
import Table from '../components/ui/Table.jsx';
import { useAuth, useTeachings, useClassGroup, useParent } from '../domain/hooks';


/**
 * Page principale Frontnote avec Service API
 * Gestion des enseignements par classe avec évaluations
 */
function ClassGroupPage() {
  // ============================================
  // HOOKS
  // ============================================
  const { studentId } = useParams();
  const { logout, getCurrentUserId } = useAuth();
  const {
    teachings: enseignements,
    isLoading: loadingTeachings,
    error: teachingsError,
    fetchByClassGroup
  } = useTeachings();
  const {
    classGroups: classes,
    currentClassGroup,
    fetchAll: fetchAllClasses,
    fetchByStudent
  } = useClassGroup();
  const { children, fetchChildren } = useParent();

  // ============================================
  // ÉTATS LOCAUX
  // ============================================
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState('accueil');
  const [searchTerm, setSearchTerm] = useState('');
  const [studentClassName, setStudentClassName] = useState("");
  const [studentInfo, setStudentInfo] = useState({ firstName: "", lastName: "" });


  // ============================================
  // EFFECT : Charger les enseignements au changement de classe
  // ============================================
  useEffect(() => {
    if (selectedClass) {
      fetchByClassGroup(selectedClass);
    }
  }, [selectedClass, fetchByClassGroup]);

  // ============================================
  // COLONNES DU TABLEAU
  // ============================================
  const tableColumns = [
    { key: 'subjectName', label: 'Matières' },
    { key: 'teacherName', label: 'Professeur(s)' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row) => (
        <Button
          variant="purple"
          size="sm"
          onClick={() => handleEvaluations(row)}
          className="shadow-lg shadow-purple-300"
        >
          ÉVALUATIONS
        </Button>
      )
    }
  ];

  // ============================================
  // FILTRAGE DES ENSEIGNEMENTS
  // ============================================

  const classMatch = studentClassName
  ?.toLowerCase()
  .includes(searchTerm.toLowerCase());

  const filteredEnseignements = enseignements.filter(item => 
    item.subjectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classMatch
  );

  // ============================================
  // EFFECT : Charger les données initiales
  // ============================================

  // Charger toutes les classes au montage
  useEffect(() => {
    fetchAllClasses();
  }, [fetchAllClasses]);

  // Fetch le nom et l'ID de la classe pour un étudiant donné + infos étudiant
  useEffect(() => {
    async function fetchStudentData() {
      try {
        // Récupérer la classe de l'étudiant
        const classGroup = await fetchByStudent(parseInt(studentId));
        setStudentClassName(classGroup.name);
        setSelectedClass(classGroup.id);

        // Récupérer les infos de l'étudiant via l'API parent
        const guardianId = getCurrentUserId();
        if (guardianId) {
          const childrenData = await fetchChildren(guardianId);
          const currentStudent = childrenData.find(child => child.id === parseInt(studentId));
          if (currentStudent) {
            setStudentInfo({
              firstName: currentStudent.firstName,
              lastName: currentStudent.lastName
            });
          }
        }
      } catch (err) {
        console.error("Erreur récupération données élève:", err);
      }
    }

    if (studentId) fetchStudentData();
  }, [studentId, fetchByStudent, fetchChildren, getCurrentUserId]);



  // ============================================
  // HANDLERS
  // ============================================

  const handleLogout = () => {
    logout();
    console.log('Déconnexion...');
    // Rediriger vers /login
    window.location.href = '/login';
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Onglet changé:', tabId);
  };


  const handleClassSelect = (className) => {
    const classObj = classes.find(c => c.name === className);
    if (classObj) {
      setSelectedClass(classObj.id);
      fetchByClassGroup(classObj.id);
    }
  };

  const handleAjouter = async () => {
    // TODO: Implémenter l'ajout d'enseignement
    alert('Fonctionnalité d\'ajout à implémenter');
  };

  const handleModifier = async () => {
    // TODO: Sélectionner un enseignement d'abord
    alert('Sélectionnez un enseignement à modifier');
  };

  const handleSupprimer = async (id) => {
    // TODO: Implémenter la suppression d'enseignement
    alert('Fonctionnalité de suppression à implémenter');
  };

  const handleEvaluations = (enseignement) => {
    console.log('Voir les évaluations pour:', enseignement);
    // TODO: Naviguer vers la page des évaluations
    // navigate(`/evaluations/${enseignement.id}/${selectedClass}`);
    alert(`Évaluations de ${enseignement.matiere}\nProfesseur: ${enseignement.professeur}\nClasse: ${selectedClass}`);
  };

  const handleRowClick = (row) => {
    console.log('Ligne cliquée:', row);
    // TODO: Afficher les détails ou sélectionner pour modification
  };

  const handleRetry = () => {
    fetchByClassGroup(selectedClass);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Navigation avec barre de recherche */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchBar={
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher une matière ou un professeur..."
            compact={true}
          />
        }
      />

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Barre horizontale des classes */}
        <div className="bg-white border-b-2 border-gray-300 overflow-x-auto">
          <div className="flex">
            {classes.map((classItem) => (
              <button
                key={classItem.id}
                onClick={() => handleClassSelect(classItem.name)}
                className={`px-6 py-4 font-semibold text-lg whitespace-nowrap border-r border-gray-200 transition-colors ${
                  studentClassName === classItem.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {classItem.name}
              </button>
            ))}
          </div>
        </div>

        {/* Zone principale */}
        <main className="flex-1 p-12 overflow-y-auto bg-gray-50">

          {/* Carte étudiant centrée au-dessus */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg min-w-[320px]">
              <p className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90 text-center">
                Élève
              </p>
              <h3 className="text-2xl font-bold mb-1 text-center">
                {studentInfo.firstName} {studentInfo.lastName}
              </h3>
              <p className="text-blue-100 text-sm text-center">
                Classe {studentClassName}
              </p>
            </div>
          </div>

          {/* Titre section */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Enseignements de la classe <span className="text-blue-600">{studentClassName}</span>
            </h2>
          </div>

          {/* Affichage conditionnel : Loading / Error / Table */}
          {loadingTeachings ? (
            // ÉTAT DE CHARGEMENT
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600 font-semibold">Chargement des enseignements...</p>
              </div>
            </div>
          ) : teachingsError ? (
            // ÉTAT D'ERREUR
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Erreur de chargement</h3>
              <p className="text-red-600 text-lg mb-6">{teachingsError}</p>
              <div className="flex gap-4 justify-center">
                <Button variant="danger" size="md" onClick={handleRetry}>
                  🔄 Réessayer
                </Button>
              </div>
            </div>
          ) : (
            // TABLEAU DES ENSEIGNEMENTS (VERSION COMPACTE)
            <Table
              columns={tableColumns}
              data={filteredEnseignements}
              onRowClick={handleRowClick}
              emptyMessage={searchTerm ? 'Aucun résultat trouvé' : 'Aucun enseignement enregistré'}
              compact={true}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default ClassGroupPage;