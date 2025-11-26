#!/bin/bash

# Script pour reconstruire le backend avec nettoyage COMPLET du cache Docker
# RÉSOUT LE PROBLÈME : Docker utilise une ancienne version en cache
# Ce script nécessite sudo pour les commandes Docker

set -e  # Arrêter en cas d'erreur

echo "================================================"
echo "🔧 NETTOYAGE COMPLET + RECONSTRUCTION"
echo "================================================"
echo ""
echo "⚠️  Ce script va :"
echo "   - Supprimer TOUTES les images Docker du projet"
echo "   - Nettoyer le cache de build Docker"
echo "   - Forcer un rebuild complet sans cache"
echo ""
read -p "Continuer ? (o/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Oo]$ ]]
then
    echo "❌ Annulé"
    exit 1
fi

echo ""
echo "1️⃣  Arrêt des conteneurs..."
sudo docker compose down 2>/dev/null || true

echo ""
echo "2️⃣  Nettoyage des fichiers générés locaux..."
rm -rf target/
echo "   ✓ Dossier target/ supprimé"

echo ""
echo "3️⃣  Suppression COMPLÈTE des images et volumes du projet..."
sudo docker compose down -v --rmi all 2>/dev/null || true
echo "   ✓ Images et volumes supprimés"

echo ""
echo "4️⃣  Nettoyage du cache de build Docker (force rebuild)..."
sudo docker builder prune -f
echo "   ✓ Cache de build nettoyé"

echo ""
echo "5️⃣  Reconstruction COMPLÈTE (téléchargement des images de base)..."
sudo docker compose build --no-cache --pull

echo ""
echo "6️⃣  Démarrage des conteneurs..."
sudo docker compose up -d

echo ""
echo "7️⃣  Vérification de l'état..."
sleep 5
sudo docker compose ps

echo ""
echo "8️⃣  Attente du démarrage de l'API (30 secondes)..."
for i in {1..30}; do
    echo -n "."
    sleep 1
done
echo ""

echo ""
echo "📋 Logs de compilation (vérification des erreurs)..."
echo "================================================"
sudo docker compose logs api --tail=100 | grep -A 5 -B 5 "ERROR\|BUILD SUCCESS\|BUILD FAILURE" || echo "Pas d'erreur détectée dans les logs"

echo ""
echo "================================================"
echo "✅ Reconstruction terminée !"
echo "================================================"
echo ""
echo "🔍 Vérification finale..."
echo ""

# Test de santé
echo -n "   - Test de l'API : "
if curl -s http://localhost:8081/actuator/health | grep -q "UP"; then
    echo "✅ OK"
else
    echo "❌ ERREUR - Voir les logs avec : sudo docker compose logs api"
fi

echo ""
echo "🌐 URLs disponibles:"
echo "   - API: http://localhost:8081"
echo "   - Health Check: http://localhost:8081/actuator/health"
echo ""
echo "📝 Commandes utiles:"
echo "   - Voir les logs en direct: sudo docker compose logs -f api"
echo "   - Arrêter: sudo docker compose down"
echo "   - Redémarrer: sudo docker compose restart api"
echo ""
