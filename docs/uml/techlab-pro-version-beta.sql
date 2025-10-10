-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: techlab-pro-version-beta
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'H2O','2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Charles Darwin','2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Loi de Newton','2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'35','2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Mycobacterium tuberculosis','2025-09-26 19:23:02','2025-09-26 19:23:02'),(6,'NaCl','2025-09-26 19:23:02','2025-09-26 19:23:02'),(7,'Galileo Galilei','2025-09-26 19:23:02','2025-09-26 19:23:02'),(8,'Loi de la gravitation universelle','2025-09-26 19:23:03','2025-09-26 19:23:03'),(9,'40','2025-09-26 19:23:03','2025-09-26 19:23:03'),(10,'E. coli','2025-09-26 19:23:03','2025-09-26 19:23:03');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `technique_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assignments_user_id_foreign` (`user_id`),
  KEY `assignments_technique_id_foreign` (`technique_id`),
  CONSTRAINT `assignments_technique_id_foreign` FOREIGN KEY (`technique_id`) REFERENCES `techniques` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,2,1,'2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Analyse Chimique','Tests en laboratoire pour analyser des substances chimiques.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Microbiologie','Étude des micro-organismes en laboratoire.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Biotechnologie','Techniques combinant biologie et technologie en laboratoire.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Expériences de Physique','Travaux de laboratoire sur des principes et phénomènes physiques.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Tests Environnementaux','Analyse d’échantillons environnementaux en laboratoire.','2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratories`
--

DROP TABLE IF EXISTS `laboratories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laboratories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratories`
--

LOCK TABLES `laboratories` WRITE;
/*!40000 ALTER TABLE `laboratories` DISABLE KEYS */;
INSERT INTO `laboratories` VALUES (1,'Chemistry Lab','chemistry_lab.jpg','Chemical reactions and experiments with safety.','2025-09-26 19:22:59','2025-09-26 19:22:59'),(2,'Biology Lab','biology_lab.jpg','Study of living organisms and biological processes.','2025-09-26 19:22:59','2025-09-26 19:22:59'),(3,'Physics Lab','physics_lab.jpg','Experiments in mechanics, optics, and electromagnetism.','2025-09-26 19:22:59','2025-09-26 19:22:59');
/*!40000 ALTER TABLE `laboratories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question_id` bigint unsigned NOT NULL,
  `answer_id` bigint unsigned NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `options_question_id_foreign` (`question_id`),
  KEY `options_answer_id_foreign` (`answer_id`),
  CONSTRAINT `options_answer_id_foreign` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisite_technique`
--

DROP TABLE IF EXISTS `prerequisite_technique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prerequisite_technique` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `prerequisite_id` bigint unsigned NOT NULL,
  `technique_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prerequisite_technique_prerequisite_id_foreign` (`prerequisite_id`),
  KEY `prerequisite_technique_technique_id_foreign` (`technique_id`),
  CONSTRAINT `prerequisite_technique_prerequisite_id_foreign` FOREIGN KEY (`prerequisite_id`) REFERENCES `prerequisites` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prerequisite_technique_technique_id_foreign` FOREIGN KEY (`technique_id`) REFERENCES `techniques` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisite_technique`
--

LOCK TABLES `prerequisite_technique` WRITE;
/*!40000 ALTER TABLE `prerequisite_technique` DISABLE KEYS */;
INSERT INTO `prerequisite_technique` VALUES (1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `prerequisite_technique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisites`
--

DROP TABLE IF EXISTS `prerequisites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prerequisites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisites`
--

LOCK TABLES `prerequisites` WRITE;
/*!40000 ALTER TABLE `prerequisites` DISABLE KEYS */;
INSERT INTO `prerequisites` VALUES (1,'Formation en Sécurité','Avoir suivi une formation sur les règles de sécurité en laboratoire.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Connaissances en Chimie','Maîtriser les bases de la chimie générale et organique.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Utilisation du Matériel de Laboratoire','Savoir manipuler les instruments de mesure et d’analyse.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Notions de Microbiologie','Comprendre les principes de manipulation des micro-organismes.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Respect des Protocoles','Être capable de suivre rigoureusement les procédures expérimentales.','2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `prerequisites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quiz_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_quiz_id_foreign` (`quiz_id`),
  CONSTRAINT `questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Quelle est la formule chimique de l\'eau ?',1,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Qui est le père de la théorie de l\'évolution ?',2,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Quelle loi physique décrit la relation entre la force et l\'accélération ?',3,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Quel est le produit de 5 x 7 ?',4,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Quel est le nom du micro-organisme responsable de la tuberculose ?',5,'2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,'Test de Chimie - Niveaux 1','Un test sur les concepts de base de la chimie.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Évaluation en Biologie','Un quiz sur les bases de la biologie et la classification des organismes.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Test de Physique - Mécanique','Examen sur les lois de la mécanique et des forces.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Révision sur les Mathématiques','Un quiz pour réviser les concepts de base en mathématiques.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Quiz sur la Microbiologie','Évaluation sur la compréhension des microorganismes et de leurs processus.','2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `step_technique`
--

DROP TABLE IF EXISTS `step_technique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step_technique` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `step_id` bigint unsigned NOT NULL,
  `technique_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `step_technique_step_id_foreign` (`step_id`),
  KEY `step_technique_technique_id_foreign` (`technique_id`),
  CONSTRAINT `step_technique_step_id_foreign` FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`) ON DELETE CASCADE,
  CONSTRAINT `step_technique_technique_id_foreign` FOREIGN KEY (`technique_id`) REFERENCES `techniques` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step_technique`
--

LOCK TABLES `step_technique` WRITE;
/*!40000 ALTER TABLE `step_technique` DISABLE KEYS */;
INSERT INTO `step_technique` VALUES (1,1,1,NULL,NULL),(2,2,1,NULL,NULL),(3,3,1,NULL,NULL),(4,4,1,NULL,NULL),(5,5,1,NULL,NULL);
/*!40000 ALTER TABLE `step_technique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `step_tip`
--

DROP TABLE IF EXISTS `step_tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step_tip` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `step_id` bigint unsigned NOT NULL,
  `tip_id` bigint unsigned NOT NULL,
  `duration` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `step_tip_step_id_foreign` (`step_id`),
  KEY `step_tip_tip_id_foreign` (`tip_id`),
  CONSTRAINT `step_tip_step_id_foreign` FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`) ON DELETE CASCADE,
  CONSTRAINT `step_tip_tip_id_foreign` FOREIGN KEY (`tip_id`) REFERENCES `tips` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step_tip`
--

LOCK TABLES `step_tip` WRITE;
/*!40000 ALTER TABLE `step_tip` DISABLE KEYS */;
INSERT INTO `step_tip` VALUES (1,1,1,5,NULL,NULL),(2,1,2,3,NULL,NULL),(3,1,3,7,NULL,NULL),(4,2,2,3,NULL,NULL),(5,2,3,3,NULL,NULL),(6,2,4,4,NULL,NULL),(7,3,1,1,NULL,NULL),(8,3,4,2,NULL,NULL),(9,3,3,3,NULL,NULL),(10,4,2,1,NULL,NULL),(11,4,5,1,NULL,NULL),(12,4,3,2,NULL,NULL),(13,5,5,1,NULL,NULL),(14,5,2,1,NULL,NULL),(15,5,4,2,NULL,NULL);
/*!40000 ALTER TABLE `step_tip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `steps`
--

DROP TABLE IF EXISTS `steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `steps` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reactive` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `steps`
--

LOCK TABLES `steps` WRITE;
/*!40000 ALTER TABLE `steps` DISABLE KEYS */;
INSERT INTO `steps` VALUES (1,'Préparation des échantillons','Solution saline',15,'Préparer les échantillons à analyser en utilisant une solution saline stérile.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Mélange des réactifs','Réactif X',10,'Mélanger soigneusement le réactif X avec les échantillons préparés.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Incubation','Aucun',8,'Laisser les échantillons incuber à 37°C pendant 30 minutes.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Ajout de l’indicateur','Indicateur de pH',5,'Ajouter quelques gouttes d’indicateur de pH pour observer les changements.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Analyse des résultats','Aucun',4,'Observer et noter les résultats obtenus après l’ajout de l’indicateur.','2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `techniques`
--

DROP TABLE IF EXISTS `techniques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `techniques` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `laboratory_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `techniques_laboratory_id_foreign` (`laboratory_id`),
  KEY `techniques_category_id_foreign` (`category_id`),
  CONSTRAINT `techniques_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `techniques_laboratory_id_foreign` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `techniques`
--

LOCK TABLES `techniques` WRITE;
/*!40000 ALTER TABLE `techniques` DISABLE KEYS */;
INSERT INTO `techniques` VALUES (1,'Analyse Chimique de l\'eau','https://images.pexels.com/photos/9629678/pexels-photo-9629678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','Analyse de la composition chimique de l\'eau en laboratoire.',1,2,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Culture de Bactéries','https://images.pexels.com/photos/4031440/pexels-photo-4031440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','Étude de la culture de bactéries en milieu contrôlé.',1,3,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Test de Résistance des Matériaux','http://images.pexels.com/photos/9629715/pexels-photo-9629715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','Test de résistance des matériaux sous différentes conditions.',1,5,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Analyse du Sol','https://images.pexels.com/photos/4031370/pexels-photo-4031370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','Étude de la composition du sol et de ses propriétés physiques.',1,1,'2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Observation Microscopique','https://images.pexels.com/photos/8539945/pexels-photo-8539945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','Observation de microorganismes au microscope.',1,4,'2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `techniques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tips`
--

DROP TABLE IF EXISTS `tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tips` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tips`
--

LOCK TABLES `tips` WRITE;
/*!40000 ALTER TABLE `tips` DISABLE KEYS */;
INSERT INTO `tips` VALUES (1,'Porter des équipements de protection','Toujours utiliser des gants, une blouse et des lunettes de protection avant toute manipulation.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(2,'Étiqueter les produits','Indiquer clairement le contenu et la date de préparation sur chaque récipient.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(3,'Travailler en milieu ventilé','Effectuer les expériences dans une hotte pour éviter l’inhalation de produits dangereux.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(4,'Ne jamais pipeter à la bouche','Utiliser toujours un dispositif mécanique pour pipeter des liquides.','2025-09-26 19:23:02','2025-09-26 19:23:02'),(5,'Éliminer correctement les déchets','Séparer les déchets chimiques, biologiques et tranchants selon les procédures en vigueur.','2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `tips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `laboratory_id` bigint unsigned NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_laboratory_id_foreign` (`laboratory_id`),
  CONSTRAINT `users_laboratory_id_foreign` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Zakaria Azizi','zeko@azizi.com',NULL,'$2y$12$24ZE3FoSC4yhf4HwOMV9ieQbmbexnCypJazPOotypucp/KW7tC8GC',1,NULL,'2025-09-26 19:23:01','2025-09-26 19:23:01'),(2,'Zakaria Azizi','azizi.zakaria.solicode@gmail.com',NULL,'$2y$12$qlUT8nyDMYzVqhfFAGoiOeb5WDCqQzVMct96O.w4rtgsOI6r1l/Pa',1,NULL,'2025-09-26 19:23:02','2025-09-26 19:23:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-07 20:59:06
