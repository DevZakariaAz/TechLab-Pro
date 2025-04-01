# 📌 Architecture du projet LaboChrono

## 🏗 Structure MVC  
L’architecture du projet suit un modèle **Backend (Laravel) / Frontend (Kotlin)** :

### 🔹 **Backend Laravel (API REST)**
📂 `app/Http/Controllers/` → Gère les requêtes API  
📂 `app/Models/` → Définit les modèles (Protocoles, Utilisateurs…)  
📂 `app/Services/` → Contient la logique métier  
📂 `routes/api.php` → Définit les routes API  

### 🔹 **Frontend Kotlin (Android)**
📂 `ui/` → Gestion des écrans et interface utilisateur  
📂 `data/` → Gestion des données (Modèles, Base de données Room)  
📂 `network/` → Communication avec l’API Laravel via Retrofit  

### 🔹 **Base de Données**
- **Protocoles** : Stockage des procédures de coloration  
- **Utilisateurs** : Gestion des comptes et préférences  
- **Historique** : Suivi des protocoles réalisés  

## 🌐 Communication API  
Le frontend Kotlin communique avec Laravel via **API REST** :  
- `GET /api/protocols` → Liste des protocoles  
- `POST /api/protocols` → Création d’un protocole  
- `PUT /api/protocols/{id}` → Modification d’un protocole  
- `DELETE /api/protocols/{id}` → Suppression d’un protocole  
