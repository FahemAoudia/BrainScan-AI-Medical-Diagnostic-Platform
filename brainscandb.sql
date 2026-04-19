-- MySQL dump 10.13  Distrib 8.4.8, for Linux (x86_64)
--
-- Host: localhost    Database: brainscandb
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(100) NOT NULL,
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `message` text NOT NULL,
  `message_type` enum('text','image','video') DEFAULT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `sender` enum('doctor','patient') NOT NULL,
  `status` enum('sent','delivered','read') DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `patient_id` (`patient_id`),
  KEY `ix_chats_id` (`id`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (13,'9_1',9,1,'bonjour','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (14,'9_3',9,3,'bonjour','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (15,'12_4',12,4,'neurologie check','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (16,'13_5',13,5,'cardio message','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (17,'15_6',15,6,'suivi','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (18,'34_8',34,8,'bonjour','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (19,'35_11',35,11,'test chat','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (20,'36_14',36,14,'suivi patient','text',NULL,'doctor','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (21,'1_9',9,1,'reply patient','text',NULL,'patient','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (22,'3_9',9,3,'ok doctor','text',NULL,'patient','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (23,'4_12',12,4,'merci','text',NULL,'patient','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (24,'5_13',13,5,'thanks','text',NULL,'patient','sent','2026-04-15 23:42:01');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (25,'66_65',66,65,'bonjour ','text',NULL,'patient','sent','2026-04-15 20:43:51');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (26,'66_65',65,66,'salut','text',NULL,'doctor','sent','2026-04-15 20:44:27');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (27,'67_65',67,65,'salut','text',NULL,'patient','sent','2026-04-16 02:31:31');
INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `message_type`, `media_url`, `sender`, `status`, `timestamp`) VALUES (28,'67_65',65,67,'hola','text',NULL,'doctor','sent','2026-04-16 02:31:58');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_calendar`
--

DROP TABLE IF EXISTS `doctor_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `ix_doctor_calendar_id` (`id`),
  CONSTRAINT `doctor_calendar_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doctor_calendar_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_calendar`
--

LOCK TABLES `doctor_calendar` WRITE;
/*!40000 ALTER TABLE `doctor_calendar` DISABLE KEYS */;
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (9,1,13,'2025-02-18','09:00:00','booked',NULL,'2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (10,3,13,'2025-02-19','10:30:00','booked','checkup','2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (11,4,12,'2025-02-20','11:00:00','booked',NULL,'2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (12,5,15,'2025-02-21','14:00:00','booked','consultation','2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (13,6,34,'2025-02-22','09:00:00','booked',NULL,'2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (14,8,35,'2025-02-23','16:00:00','booked',NULL,'2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (15,11,36,'2025-02-24','10:00:00','booked',NULL,'2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (16,14,13,'2025-02-25','09:00:00','booked','follow-up','2026-04-15','2026-04-15');
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (17,66,65,'2026-04-16','09:00:00','booked','Nouvelle réservation de rendez-vous','2026-04-16',NULL);
INSERT INTO `doctor_calendar` (`id`, `patient_id`, `doctor_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES (18,67,65,'2026-04-20','10:00:00','booked','Nouvelle réservation de rendez-vous','2026-04-16',NULL);
/*!40000 ALTER TABLE `doctor_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `specialty` varchar(255) DEFAULT NULL,
  `doctor_code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctor_code` (`doctor_code`),
  KEY `user_id` (`user_id`),
  KEY `ix_doctors_id` (`id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (16,13,'Cardiologue','6666');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (17,12,'Neurologue','2233');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (19,15,'Gnraliste','4455');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (22,34,'tata','123456');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (23,35,'yiyi','123321');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (24,36,'medcin','1999');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (50,65,'chico','2027');
INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES (51,NULL,'big','2028');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `ix_patients_id` (`id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (31,1,'0667503086');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (32,3,'0667503086');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (33,4,'43383661196');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (34,5,'5828645');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (35,6,'4383661196');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (36,8,'46323565');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (37,11,'1230321');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (38,14,'4383661196');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (39,66,'4363661196');
INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES (40,67,'438366119000');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `report_url` varchar(255) NOT NULL,
  `scan_image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `confidence` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `ix_reports_id` (`id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` (`id`, `patient_id`, `doctor_id`, `diagnosis`, `report_url`, `scan_image_url`, `created_at`, `confidence`) VALUES (10,66,65,'glioma','/static/reports/report_aoudia.pdf','static/scans/Te-gl_0250.jpg','2026-04-16 00:42:48',99.98);
INSERT INTO `reports` (`id`, `patient_id`, `doctor_id`, `diagnosis`, `report_url`, `scan_image_url`, `created_at`, `confidence`) VALUES (11,67,65,'meningioma','/static/reports/report_patient.pdf','static/scans/Te-gl_0251.jpg','2026-04-16 06:30:42',51.2);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `doctor_code` varchar(50) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (1,'patient','patient@gmail.com','$2b$12$TAKmni7/lpeYe0JyO2x/gurCv29OW7ZAZD/y2mGDKN.H1PCYrRpDW','patient',NULL,'active','2026-04-15',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (2,'fahim','fahim@gmail.com','$2b$12$TAKmni7/lpeYe0JyO2x/gurCv29OW7ZAZD/y2mGDKN.H1PCYrRpDW','admin',NULL,'active',NULL,NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (3,'aoudia','aoudiaf104@gmail.com','$2b$12$5EHQTqyNnh/8Cago4FZ.ve7cbdN1KzWGT2M/bt/OJ9/Pi5nV1iTMy','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (4,'aoudia','dzdz@gmail.com','$2b$12$JEF36I9WaB8aXP2giw9fJOWjXHWS1HNtp5FTpmwFbuROFxlTqJ6rm','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (5,'dzea','aou4@gmail.com','$2b$12$zKbx/JCk92Zw9UKvZxWpROvzgQ/CFymiKedrr9yF.5Xdv26OoeOhC','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (6,'said','said@gmail.com','$2b$12$7W4.Q.P1tmkMqhhFYO5l9uAVipowSelguduc6yJyfC8RSZwxf5O5y','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (8,'zizo','zizo@gmail.com','$2b$12$tmF83GmG31H4v8k3styL5urywZMwUx36lM85WCWLvCZcVxr4eq7qC','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (9,'dzea','zemzem@gmail.com','$2b$12$h/xys3u0r0ToyONtuoWSiu3dRYzqbHAxHp6UFVliCDraWRhT4zJDm','doctor',NULL,'active','2025-02-13','2025-03-10');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (11,'1999','amine@gmail.com','$2b$12$2uIvJN6mG1OCXuNSxRJLqucEWsRDhpOkapy2yODRkR1PL8vxnl7GC','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (12,'amine','amin@gmail.com','$2b$12$DxOEUm3oG8Efgt5YRjTvSuIwixYHXsalIb4S8YFfMbZoDXxEmqVh.','doctor',NULL,'pending','2025-02-13','2026-04-16');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (13,'chaima','chaima@dz.com','$2b$12$PJfYcQ2ZyraRtlySyKNMk.z00yt4LxCS4/Hi9hhFtImEQ1MVXzlQK','doctor','1999','active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (14,'frer','frer@gma.com','$2b$12$rFgLlo6EuDcKbMC68XeLfeRWsjmkPAE9f8qEcO.Sm1GHz.O7kALIi','patient',NULL,'active','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (15,'didou','didou@gma.com','$2b$12$vWbZcKNLE9HlXIpPTm2t4.9RTl3DL68F/j43UhAb/42NjmGV7wYM.','doctor',NULL,'pending','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (34,'chachou','aa@gmail0com','$2b$12$T3hwLhbQ6kxgIzibDQUyMe.eaTqQsvAW.l0Jnf2W9oehsfu2G/Qd6','doctor',NULL,'pending','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (35,'chachou','aaa@gmail0com','$2b$12$Y6zdhq/KJLHIstA2L4rV4uafMNwnpQk8EUx6zn0a15opLht91OpGC','doctor',NULL,'pending','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (36,'aoudia','aoudiaf1s04@gmail.com','$2b$12$iwo5wMtF6gZ1e.oTE6bnT.uPIjlnqVh33qzlBC3EWVk4XJm8qkh8W','doctor',NULL,'pending','2025-02-13',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (61,'aoudia','dsqdq@gmail.coms','$2b$12$kO6OlCXWKbkHTN5Uj8egoOsj2h4hUjZNdu1eJKtPRK8Dqj44LBCDG','doctor','19999','pending','2025-02-14',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (63,'chou','chou@gmail.com','$2b$12$6bnHDlkbzw6r.lz8FA82zegDVGmgSUn8M/5Exzlp9h8AXaT2guaci','doctor','1000','active','2025-02-14',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (65,'chec','chec@gmail.com','$2b$12$ZhamV37OHewUR6uisfCZOe5AIPwCb87bUwhq60pkwAAzKJWgPfBEq','doctor','2027','active','2026-04-16',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (66,'aoudia','aoudia@gmail.com','$2b$12$1KCrgBXG3AHabB94/aYXmetWGxYnpCPlWRljlCM062cjZgRA8W/w6','patient',NULL,'active','2026-04-16',NULL);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES (67,'patient','patiente@gmail.com','$2b$12$LNk6E0LwUqXa/98nMfREEOnViyEfXJvGkIf3jQX/ChmX3benJ9GWi','patient',NULL,'active','2026-04-16',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'brainscandb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-19 19:40:13
