import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parentAPI } from "../../services/api";
import authService from "../../services/auth";

function AcceuilParent() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  const parentId = authService.getUser()?.id;

useEffect(() => {
  let isMounted = true;

  async function load() {
    try {
      if (!parentId) {
        console.log(" Pas de parentId");
        return;
      }

      console.log(" Appel API avec parentId:", parentId);
      const data = await parentAPI.getChildren(parentId);

      if (!isMounted) return; // Ne pas mettre à jour si le composant est démonté

      console.log(" Données reçues:", data);
      console.log(" Nombre d'enfants:", data?.length);
      setChildren(data);
    } catch (err) {
      if (!isMounted) return;
      console.error(" Erreur fetch enfants:", err);
      console.error(" Stack:", err.stack);
    }
  }

  load();

  return () => {
    isMounted = false; // Cleanup function
  };
}, [parentId]);


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Enfants</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children.map(student => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            {/* Photo de l'élève */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              {student.photoUrl ? (
                <img
                  src={student.photoUrl}
                  alt={`${student.firstname} ${student.lastname}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-6xl font-bold">
                  {student.firstname?.[0]}{student.lastname?.[0]}
                </div>
              )}
            </div>

            {/* Informations de l'élève */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {student.firstname} {student.lastname}
              </h3>

              {student.birthday && (
                <p className="text-sm text-gray-600 mb-4">
                  Né(e) le {new Date(student.birthday).toLocaleDateString('fr-FR')}
                </p>
              )}

              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                onClick={() => navigate(`/classes/${student.id}`)}
              >
                Voir le détail
              </button>
            </div>
          </div>
        ))}
      </div>

      {children.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-xl">Aucun enfant enregistré</p>
        </div>
      )}
    </div>
  );
}

export default AcceuilParent;
