# 🔧 Corrections appliquées au Backend

## Date : 24 Novembre 2024

---

## ✅ Problème 1 : Erreurs d'initialisation avec Lombok @Builder

### Symptômes
```
cannot find symbol: method builder()
Incompatible types: cannot convert Parent.Builder to Child.Builder
```

### Cause racine
L'utilisation de `@Builder` sur les classes enfants (`Student`, `AppUser`) qui héritent de `Person` causait des conflits. Lombok ne peut pas générer correctement les builders pour les hiérarchies d'héritage avec `@Builder` simple.

### Solution appliquée

**Fichiers modifiés :**
1. `src/main/java/com/gestioneleves/api/entity/Person.java`
2. `src/main/java/com/gestioneleves/api/entity/Student.java`
3. `src/main/java/com/gestioneleves/api/entity/AppUser.java`

**Changements :**

#### Person.java
```java
// AVANT
@Builder
public abstract class Person { ... }

// APRÈS
@SuperBuilder
public abstract class Person { ... }
```

#### Student.java et AppUser.java
```java
// AVANT
@Builder
public class Student extends Person {
    @Builder.Default
    private List<Evaluation> evaluations = new ArrayList<>();
}

// APRÈS
@SuperBuilder
public class Student extends Person {
    @SuperBuilder.Default
    private List<Evaluation> evaluations = new ArrayList<>();
}
```

### Explication
- `@SuperBuilder` est l'annotation Lombok spécifique pour gérer l'héritage
- Elle génère des builders qui respectent correctement la hiérarchie parent-enfant
- Tous les `@Builder.Default` ont été remplacés par `@SuperBuilder.Default`

---

## ✅ Problème 2 : Permissions sur le dossier target/

### Symptômes
```
Failed to delete /path/to/target/generated-sources/...
Permission denied
```

### Cause racine
Docker crée les fichiers avec les permissions root. Maven ne peut pas les supprimer sans sudo.

### Solution appliquée

**Script créé : `rebuild.sh`**

Le script effectue les opérations suivantes :
1. Arrêt des conteneurs Docker
2. Suppression du dossier `target/` avec sudo
3. Nettoyage des volumes Docker
4. Reconstruction complète de l'image Docker (sans cache)
5. Redémarrage des conteneurs
6. Vérification de l'état et affichage des logs

**Utilisation :**
```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
./rebuild.sh
```

---

## 📝 Fichiers de documentation créés

### 1. rebuild.sh
Script automatique pour reconstruire le backend proprement.

### 2. TROUBLESHOOTING.md
Guide complet de résolution des problèmes courants :
- Erreurs de permission
- Problèmes de compilation MapStruct/Lombok
- Erreurs de connexion base de données
- CORS errors
- Commandes Docker utiles

### 3. FIXES_APPLIED.md (ce fichier)
Documentation des corrections appliquées.

---

## 🔍 Vérification des corrections

Pour vérifier que les corrections sont appliquées :

```bash
# 1. Vérifier les annotations @SuperBuilder
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api/src/main/java/com/gestioneleves/api/entity
grep -n "@SuperBuilder" Person.java Student.java AppUser.java

# Résultat attendu :
# Person.java:16:@SuperBuilder
# Student.java:29:@SuperBuilder
# AppUser.java:23:@SuperBuilder
```

---

## 🚀 Étapes suivantes pour tester

### 1. Reconstruire le backend
```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
./rebuild.sh
```

### 2. Vérifier que l'API répond
```bash
curl http://localhost:8081/actuator/health
```

**Réponse attendue :**
```json
{"status":"UP"}
```

### 3. Tester le login depuis le frontend
```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/frontnote
npm run dev
```

Puis aller sur http://localhost:5173 et se connecter avec :
- **Username** : `stesteur`
- **Password** : `password`

---

## 📊 Résumé des corrections

| Problème | Solution | Fichiers affectés |
|----------|----------|-------------------|
| Erreurs Lombok @Builder avec héritage | Remplacement par @SuperBuilder | Person.java, Student.java, AppUser.java |
| Permissions sur target/ | Script rebuild.sh avec sudo | rebuild.sh |
| Documentation manquante | Création de guides | TROUBLESHOOTING.md, FIXES_APPLIED.md |

---

## ⚠️ Notes importantes

1. **Erreurs IDE** : Les erreurs Lombok dans l'IDE (NetBeans/VSCode) sont normales. Maven compilera correctement avec Docker.

2. **@SuperBuilder vs @Builder** : Ne pas revenir à `@Builder` pour les classes avec héritage, cela casserait à nouveau la compilation.

3. **Permissions Docker** : Toujours utiliser `sudo rm -rf target/` avant de recompiler si vous avez des erreurs de permission.

4. **Cache Docker** : Utiliser `--no-cache` lors du build pour éviter les problèmes de cache.

---

## 🆘 En cas de problème

Si le backend ne fonctionne toujours pas après `./rebuild.sh` :

1. Vérifier les logs Docker :
   ```bash
   docker compose logs api --tail=100
   ```

2. Vérifier que PostgreSQL tourne :
   ```bash
   docker compose ps db
   ```

3. Se référer à [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

4. En dernier recours, tout nettoyer :
   ```bash
   docker compose down -v
   sudo rm -rf target/
   docker system prune -a
   docker compose up -d --build
   ```
