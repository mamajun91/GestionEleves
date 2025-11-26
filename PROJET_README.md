# 🎓 GestionEleves - Système de Gestion Scolaire

Projet complet de gestion d'élèves pour établissement scolaire avec backend Spring Boot et frontend React.

---

## 🚀 Démarrage rapide

### Prérequis
- Docker et Docker Compose
- Node.js 18+ et npm

### 1. Démarrer le Backend

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
./rebuild.sh
```

### 2. Démarrer le Frontend

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/frontnote
npm install
npm run dev
```

**Application disponible sur** : http://localhost:5173

---

## 🔐 Identifiants de test

- **Username** : `stesteur` (parent)
- **Password** : `password`

---

## 📚 Documentation complète

- **Backend** : `api/TROUBLESHOOTING.md` et `api/FIXES_APPLIED.md`
- **Frontend** : `frontnote/ARCHITECTURE.md` et `frontnote/MIGRATION.md`

---

## ✅ Corrections appliquées (24 Nov 2024)

### Backend
- ✅ Remplacement `@Builder` par `@SuperBuilder` pour l'héritage
- ✅ Script `rebuild.sh` pour résoudre les problèmes de permissions
- ✅ Documentation complète de dépannage

### Frontend
- ✅ Migration vers architecture en 3 couches (Core/Infrastructure/Domain)
- ✅ Correction boucle infinie AuthContext
- ✅ Normalisation des rôles utilisateur
- ✅ Hooks React personnalisés (useAuth, useTeachings, etc.)

**Tout fonctionne maintenant ! 🎉**
