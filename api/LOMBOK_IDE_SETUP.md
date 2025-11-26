# 🔧 Configuration Lombok pour VSCode

## Problème rencontré

Vous voyez cette erreur dans VSCode :
```
variable service not initialized in the default constructor
```

**Cause** : L'annotation processor de Lombok n'est pas activé correctement dans VSCode.

---

## ✅ Solution : 3 étapes simples

### 1. Vérifier que Maven compile correctement

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
./mvnw clean compile
```

**Résultat attendu** : `BUILD SUCCESS` ✅

Si cela fonctionne, votre code est **CORRECT**. Le problème est uniquement dans l'IDE.

---

### 2. Recharger le projet dans VSCode

**Option A : Redémarrer VSCode (recommandé)**
1. Fermez VSCode complètement
2. Rouvrez VSCode
3. Attendez que le Java Language Server recharge le projet (barre de progression en bas)

**Option B : Recharger la fenêtre**
1. Appuyez sur `Ctrl+Shift+P` (ou `Cmd+Shift+P` sur Mac)
2. Tapez "Reload Window"
3. Sélectionnez "Developer: Reload Window"

---

### 3. Nettoyer le workspace Java (si nécessaire)

Si les erreurs persistent après le redémarrage :

1. Ouvrez la palette de commandes : `Ctrl+Shift+P`
2. Tapez et sélectionnez : **"Java: Clean Java Language Server Workspace"**
3. Cliquez sur "Restart and delete"
4. Attendez que VSCode recharge complètement

---

## 🔍 Vérification

Après avoir suivi ces étapes, vérifiez que :

### ✅ Les annotations Lombok fonctionnent

Ouvrez [AppUserController.java](src/main/java/com/gestioneleves/api/controller/AppUserController.java:19)

Vous devriez voir que `@RequiredArgsConstructor` génère automatiquement le constructeur pour :
```java
private final AppUserService service;
private final StudentService studentService;
```

### ✅ Aucune erreur rouge

Il ne devrait plus y avoir d'erreurs de type :
- "variable service not initialized in the default constructor"
- "cannot find symbol"

---

## 📚 Configuration appliquée

J'ai créé [.vscode/settings.json](.vscode/settings.json) avec :

```json
{
  "java.configuration.updateBuildConfiguration": "automatic",
  "java.compile.nullAnalysis.mode": "automatic",
  "maven.view": "hierarchical",
  "java.saveActions.organizeImports": true,
  "java.autobuild.enabled": true,
  "java.completion.enabled": true
}
```

Ces paramètres permettent à VSCode de :
- ✅ Mettre à jour automatiquement la configuration quand `pom.xml` change
- ✅ Compiler automatiquement le code
- ✅ Activer l'autocomplétion Java

---

## 🐛 Problèmes persistants ?

Si les erreurs persistent après avoir suivi TOUTES les étapes ci-dessus :

### 1. Vérifier que l'extension Lombok est installée

```bash
code --list-extensions | grep lombok
```

**Résultat attendu** : `vscjava.vscode-lombok`

Si ce n'est pas installé :
```bash
code --install-extension vscjava.vscode-lombok
```

### 2. Vérifier les logs du Java Language Server

1. Ouvrez la palette : `Ctrl+Shift+P`
2. Tapez : "Java: Open Java Language Server Log File"
3. Cherchez les erreurs liées à Lombok ou aux annotation processors

### 3. Forcer une recompilation complète

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
rm -rf target/
./mvnw clean install
```

Puis redémarrez VSCode.

---

## 💡 Pourquoi cela fonctionne en ligne de commande mais pas dans VSCode ?

Maven utilise les **annotation processors** configurés dans [pom.xml](pom.xml:125-144) :

```xml
<annotationProcessorPaths>
    <!-- Lombok -->
    <path>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>${lombok.version}</version>
    </path>
    <!-- MapStruct -->
    <path>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct-processor</artifactId>
        <version>${mapstruct.version}</version>
    </path>
    <!-- Bridge Lombok ↔ MapStruct -->
    <path>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok-mapstruct-binding</artifactId>
        <version>${lombok.mapstruct.binding.version}</version>
    </path>
</annotationProcessorPaths>
```

VSCode doit être **configuré pour utiliser ces mêmes annotation processors**. C'est ce que fait le Java Language Server après un redémarrage.

---

## ✨ Résultat final

Après avoir suivi ces étapes :
- ✅ Aucune erreur dans VSCode
- ✅ L'autocomplétion fonctionne pour les méthodes générées par Lombok
- ✅ Vous pouvez voir les méthodes générées (getters, setters, constructeurs)
- ✅ Le code compile en ligne de commande ET dans VSCode

---

**Date** : 24 Novembre 2024
**Problème résolu** : Configuration Lombok dans VSCode
