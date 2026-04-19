-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 25 avr. 2025 à 04:22
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `brainscandb`
--

-- --------------------------------------------------------

--
-- Structure de la table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `chat_id` varchar(50) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `message_type` enum('text','image','audio') DEFAULT 'text',
  `sender` enum('doctor','patient') NOT NULL,
  `status` enum('sent','delivered','read') DEFAULT 'sent',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chats`
--

INSERT INTO `chats` (`id`, `chat_id`, `doctor_id`, `patient_id`, `message`, `media_url`, `message_type`, `sender`, `status`, `timestamp`) VALUES
(1, '105_69', 105, 69, 'bonjour', NULL, 'text', 'doctor', 'sent', '2025-03-15 01:05:19'),
(2, '105_69', 105, 69, 'bonjour', NULL, 'text', 'doctor', 'sent', '2025-03-15 01:15:42'),
(23, '105_69', 69, 105, 'sdqjkvjqskvf,nlksq', NULL, 'text', 'doctor', 'sent', '2025-03-15 20:53:27'),
(24, '105_69', 69, 105, 'fdskjkgbkzdjigjeriothguize', NULL, 'text', 'doctor', 'sent', '2025-03-15 20:53:38'),
(25, '105_69', 69, 105, 'heloo', NULL, 'text', 'doctor', 'sent', '2025-03-15 20:57:14'),
(26, '105_69', 105, 69, '1020', NULL, 'text', 'doctor', 'sent', '2025-03-15 20:58:42'),
(27, '105_69', 105, 69, '1202', NULL, 'text', 'doctor', 'sent', '2025-03-15 21:05:26'),
(28, '105_69', 69, 105, '202120518586465165', NULL, 'text', 'patient', 'sent', '2025-03-15 21:35:15'),
(29, '105_69', 69, 105, 'heo', NULL, 'text', 'patient', 'sent', '2025-03-15 21:36:17'),
(30, '105_69', 69, 105, 'بسي', NULL, 'text', 'patient', 'sent', '2025-03-15 21:39:04'),
(31, '69_105', 69, 105, 'مرحبا', NULL, 'text', 'doctor', 'sent', '2025-03-15 21:40:28'),
(32, '105_69', 69, 105, 'qsddddddddddd', NULL, 'text', 'doctor', 'sent', '2025-03-15 21:45:06'),
(33, '105_69', 105, 69, 'dqs7', NULL, 'text', 'doctor', 'sent', '2025-03-15 21:45:40'),
(34, '105_69', 105, 69, 'zaq', NULL, 'text', 'doctor', 'sent', '2025-03-15 21:46:24'),
(35, '105_69', 105, 69, 'sq', NULL, 'text', 'patient', 'sent', '2025-03-15 21:50:23'),
(36, '105_69', 69, 105, 'sq', NULL, 'text', 'doctor', 'sent', '2025-03-15 21:50:43'),
(37, '105_69', 105, 69, 'salam', NULL, 'text', 'patient', 'sent', '2025-03-16 23:46:23'),
(38, '105_69', 105, 69, 'saha', NULL, 'text', 'patient', 'sent', '2025-03-16 23:55:21'),
(39, '105_69', 105, 69, 'hola', NULL, 'text', 'patient', 'sent', '2025-03-17 00:06:33'),
(40, '105_69', 69, 105, 'هولا', NULL, 'text', 'doctor', 'sent', '2025-03-17 00:07:07'),
(41, '105_69', 69, 105, 'سالة', NULL, 'text', 'doctor', 'sent', '2025-03-17 00:59:12'),
(42, '105_111', 105, 111, 'salut', NULL, 'text', 'patient', 'sent', '2025-03-17 02:40:48'),
(43, '112_111', 112, 111, 'hello', NULL, 'text', 'patient', 'sent', '2025-03-17 03:00:02'),
(44, '112_111', 111, 112, 'hola', NULL, 'text', 'doctor', 'sent', '2025-03-17 03:01:35'),
(45, '115_113', 113, 115, 'salut', NULL, 'text', 'doctor', 'sent', '2025-04-13 21:38:20'),
(46, '115_113', 115, 113, 'salut', NULL, 'text', 'patient', 'sent', '2025-04-13 21:38:46'),
(47, '117_118', 118, 117, 'salut', NULL, 'text', 'doctor', 'sent', '2025-04-24 16:31:34'),
(48, '117_118', 117, 118, 'hola', NULL, 'text', 'patient', 'sent', '2025-04-24 16:32:45');

-- --------------------------------------------------------

--
-- Structure de la table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `specialty` varchar(255) DEFAULT NULL,
  `doctor_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `specialty`, `doctor_code`) VALUES
(16, 90, 'Cardiologue', '6666'),
(17, 92, 'Neurologue', '2233'),
(19, 101, 'Généraliste', '4455'),
(22, 109, 'tata', '123456'),
(23, 110, 'yiyi', '123321'),
(24, 113, 'medcin', '1999');

-- --------------------------------------------------------

--
-- Structure de la table `doctor_calendar`
--

CREATE TABLE `doctor_calendar` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('available','booked','unavailable') DEFAULT 'unavailable',
  `reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `doctor_calendar`
--

INSERT INTO `doctor_calendar` (`id`, `doctor_id`, `patient_id`, `date`, `time`, `status`, `reason`, `created_at`, `updated_at`) VALUES
(1, 13, 1, '2025-02-18', '09:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(2, 13, 1, '2025-02-27', '10:30:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(3, 13, 1, '2025-02-18', '10:30:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(4, 13, 1, '2025-02-18', '14:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(5, 13, 1, '2025-02-17', '09:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(6, 13, 1, '2025-02-18', '16:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(7, 69, 1, '2025-02-18', '16:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(8, 69, 1, '2025-02-18', '09:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(9, 69, 1, '2025-02-23', '14:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(10, 13, 1, '2025-02-23', '14:00:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(11, 69, 1, '2025-02-18', '10:30:00', 'booked', NULL, '2025-02-17 13:43:06', '2025-02-17 13:43:06'),
(12, 69, 1, '2025-02-06', '14:00:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 10:10:18'),
(13, 69, 1, '2025-02-20', '10:30:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 10:18:27'),
(14, 69, 1, '2025-02-20', '14:00:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 10:20:54'),
(15, 69, 1, '2025-02-27', '10:30:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 10:39:34'),
(18, 69, 1, '2025-02-28', '16:00:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 05:00:00'),
(19, 69, 83, '2025-02-22', '09:00:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 15:30:06'),
(20, 69, 83, '2025-02-23', '09:00:00', 'booked', 'حجز موعد جديد', '2025-02-19 05:00:00', '2025-02-19 05:00:00'),
(25, 69, 83, '2025-02-27', '16:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-19 05:00:00', '2025-02-19 05:00:00'),
(27, 69, NULL, '2025-03-03', '09:00:00', 'unavailable', 'Créneau indisponible', '2025-02-21 05:00:00', '2025-02-21 17:48:30'),
(28, 69, 83, '2025-03-03', '10:30:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 17:49:04'),
(29, 69, NULL, '2025-02-07', '00:00:00', 'unavailable', 'Journée entière indisponible', '2025-02-21 05:00:00', '2025-02-21 18:00:39'),
(34, 69, NULL, '2025-02-21', '00:00:00', 'unavailable', 'Journée entière indisponible', '2025-02-21 05:00:00', '2025-02-21 18:05:35'),
(35, 69, 83, '2025-03-07', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 18:06:38'),
(36, 69, NULL, '2025-03-08', '00:00:00', 'unavailable', 'Journée entière indisponible', '2025-02-21 05:00:00', '2025-02-21 18:07:03'),
(37, 69, 83, '2025-03-08', '14:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 18:07:34'),
(38, 69, 83, '2025-03-04', '10:30:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 18:11:05'),
(39, 69, NULL, '2025-03-10', '00:00:00', 'unavailable', 'Journée entière indisponible', '2025-02-21 05:00:00', '2025-02-21 18:59:53'),
(40, 69, NULL, '2025-03-11', '08:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(41, 69, NULL, '2025-03-11', '09:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(42, 69, NULL, '2025-03-11', '10:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(43, 69, NULL, '2025-03-11', '11:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(44, 69, NULL, '2025-03-11', '12:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(45, 69, NULL, '2025-03-11', '13:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(46, 69, NULL, '2025-03-11', '14:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(47, 69, NULL, '2025-03-11', '15:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(48, 69, NULL, '2025-03-11', '16:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:00:11'),
(49, 69, 83, '2025-03-10', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 19:00:46'),
(51, 69, 83, '2025-03-11', '10:30:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 19:01:38'),
(52, 69, NULL, '2025-03-17', '08:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:05:03'),
(53, 69, NULL, '2025-03-17', '09:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:05:03'),
(54, 69, NULL, '2025-03-17', '10:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:05:03'),
(55, 69, NULL, '2025-03-17', '11:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:05:03'),
(56, 69, NULL, '2025-03-17', '12:00:00', 'unavailable', 'Plage horaire indisponible', '2025-02-21 05:00:00', '2025-02-21 19:05:03'),
(57, 69, 83, '2025-03-17', '14:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 19:05:37'),
(58, 69, 83, '2025-03-31', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 19:34:11'),
(59, 80, 83, '2025-03-30', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-02-21 05:00:00', '2025-02-21 19:34:26'),
(60, 69, 83, '2025-03-04', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-02 05:00:00', '2025-03-02 20:04:17'),
(61, 69, 86, '2025-03-14', '10:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-05 05:00:00', '2025-03-05 20:02:20'),
(62, 69, 83, '2024-10-29', '10:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-07 05:00:00', '2025-03-07 12:37:46'),
(63, 69, 102, '2025-03-26', '14:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-10 04:00:00', '2025-03-10 18:26:39'),
(64, 69, 103, '2025-03-28', '16:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-11 04:00:00', '2025-03-11 04:00:00'),
(65, 69, 83, '2025-03-25', '14:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-11 04:00:00', '2025-03-11 20:49:54'),
(66, 69, 104, '2025-03-12', '16:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-11 04:00:00', '2025-03-11 20:57:19'),
(67, 69, 105, '2025-03-17', '16:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-11 04:00:00', '2025-03-11 21:14:47'),
(68, 69, 83, '2025-03-20', '10:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-14 04:00:00', '2025-03-14 16:54:09'),
(69, 69, 105, '2025-03-24', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-14 04:00:00', '2025-03-14 16:57:07'),
(70, 69, 106, '2025-03-20', '14:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-14 04:00:00', '2025-03-14 18:41:08'),
(72, 111, 112, '2025-03-26', '10:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-03-16 04:00:00', '2025-03-17 02:27:39'),
(103, 69, NULL, '2025-03-27', '00:00:00', 'unavailable', 'Journée entière indisponible', '2025-03-17 04:00:00', '2025-03-17 04:08:39'),
(104, 113, 114, '2025-04-14', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-04-13 04:00:00', '2025-04-13 10:19:19'),
(105, 113, 115, '2025-04-30', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-04-13 04:00:00', '2025-04-13 21:35:57'),
(106, 118, 117, '2025-04-28', '09:00:00', 'booked', 'Nouvelle réservation de rendez-vous', '2025-04-24 04:00:00', '2025-04-24 16:25:33');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`id`, `user_id`, `phone`) VALUES
(1, 1, '0667503086'),
(2, 83, '0667503086'),
(3, 86, '4383661196'),
(4, 102, '43383661196'),
(5, 103, '5828645'),
(6, 104, '4383661196'),
(7, 105, '43386261625'),
(8, 106, '46323565'),
(9, 112, '1230321'),
(10, 114, '4383661196'),
(11, 115, '4356626'),
(12, 117, '4383661196');

-- --------------------------------------------------------

--
-- Structure de la table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `diagnosis` text NOT NULL,
  `report_url` varchar(255) DEFAULT NULL,
  `scan_image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `confidence` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reports`
--

INSERT INTO `reports` (`id`, `patient_id`, `doctor_id`, `diagnosis`, `report_url`, `scan_image_url`, `created_at`, `confidence`) VALUES
(9, 83, 69, 'notumor', 'static/reports/report_naser.pdf', 'blob:http://localhost:3000/39f62228-190b-4009-8620-ab97ca6f52e8', '2025-03-07 11:10:17', 0),
(10, 1, 69, 'notumor', 'static/reports/report_aoudia.pdf', 'blob:http://localhost:3000/c76b655e-f31e-4a2f-93ab-21b1ba4c7cdd', '2025-03-07 11:10:59', 0),
(11, 1, 69, 'notumor', 'static/reports/report_aoudia.pdf', 'blob:http://localhost:3000/c76b655e-f31e-4a2f-93ab-21b1ba4c7cdd', '2025-03-07 11:12:22', 0),
(12, 1, 69, 'notumor', 'static/reports/report_aoudia.pdf', 'blob:http://localhost:3000/c76b655e-f31e-4a2f-93ab-21b1ba4c7cdd', '2025-03-07 11:16:09', 0),
(13, 83, 69, 'glioma', 'static/reports/report_naser.pdf', 'blob:http://localhost:3000/bf7226a7-0447-4135-8d65-bbafd9c0a645', '2025-03-07 11:16:39', 0),
(14, 86, 69, 'glioma', 'static/reports/report_abdo.pdf', 'blob:http://localhost:3000/40c9cf26-eca2-47c5-9140-a15d3b603a46', '2025-03-07 11:20:08', 0),
(15, 102, 69, 'meningioma', '/static/reports/report_pa.pdf', 'static/scans/Tr-me_0017.jpg', '2025-03-10 22:45:10', 99.11),
(16, 102, 69, 'pituitary', '/static/reports/report_pa.pdf', 'static/scans/Tr-pi_0011.jpg', '2025-03-10 22:53:02', 100),
(17, 103, 69, 'meningioma', '/static/reports/report_abd.pdf', 'static/scans/Tr-me_0010.jpg', '2025-03-11 17:38:44', 99.95),
(18, 83, 69, 'pituitary', 'static/reports/report_naser.pdf', 'static/scans/Tr-pi_0015.jpg', '2025-03-12 00:50:46', 100),
(19, 83, 69, 'pituitary', 'static/reports/report_naser.pdf', 'static/scans/Tr-pi_0015.jpg', '2025-03-12 00:51:06', 100),
(20, 83, 69, 'glioma', 'static/reports/report_naser.pdf', 'static/scans/Tr-gl_0010.jpg', '2025-03-12 00:51:21', 100),
(21, 104, 69, 'glioma', 'static/reports/report_mestapha.pdf', 'static/scans/Tr-gl_0015.jpg', '2025-03-12 00:57:59', 100),
(22, 104, 69, 'glioma', 'static/reports/report_mestapha.pdf', 'static/scans/Tr-gl_0012.jpg', '2025-03-12 01:02:50', 100),
(23, 104, 69, 'glioma', 'static/reports/report_mestapha.pdf', 'static/scans/Tr-gl_0012.jpg', '2025-03-12 01:06:16', 100),
(24, 104, 69, 'glioma', 'static/reports/report_mestapha.pdf', 'static/scans/Tr-gl_0017.jpg', '2025-03-12 01:07:46', 100),
(25, 105, 69, 'glioma', 'static/reports/report_helfaoui.pdf', 'static/scans/Tr-gl_0051.jpg', '2025-03-12 01:15:47', 100),
(26, 105, 69, 'notumor', 'static/reports/report_helfaoui.pdf', 'static/scans/Tr-no_0011.jpg', '2025-03-12 01:32:55', 100),
(27, 105, 69, 'notumor', 'static/reports/report_helfaoui.pdf', 'static/scans/Tr-no_0011.jpg', '2025-03-12 01:36:20', 100),
(28, 105, 69, 'notumor', 'static/reports/report_helfaoui.pdf', 'static/scans/Tr-no_0016.jpg', '2025-03-12 01:40:38', 100),
(29, 105, 69, 'notumor', 'static/reports/report_helfaoui.pdf', 'static/scans/Tr-no_0016.jpg', '2025-03-12 01:46:30', 100),
(30, 1, 69, 'notumor', 'static/reports/report_aoudia.pdf', 'static/scans/Tr-no_0019.jpg', '2025-03-12 01:47:52', 100),
(31, 1, 69, 'notumor', 'static/reports/report_aoudia.pdf', 'static/scans/Tr-no_0019.jpg', '2025-03-12 01:48:36', 100),
(32, 1, 69, 'notumor', 'static/reports/report_aoudia.pdf', 'static/scans/Tr-no_0018.jpg', '2025-03-12 01:49:59', 99.84),
(33, 105, 69, 'notumor', 'static/reports/report_helfaoui.pdf', 'static/scans/Tr-no_0018.jpg', '2025-03-12 01:50:56', 99.84),
(34, 105, 69, 'notumor', 'static/reports/report_helfaoui.pdf', 'static/scans/1999.png', '2025-03-14 20:50:07', 100),
(35, 105, 69, 'notumor', '/static/reports/report_helfaoui.pdf', 'static/scans/1999.png', '2025-03-14 20:52:10', 100),
(36, 83, 69, 'meningioma', '/static/reports/report_naser.pdf', 'static/scans/Te-me_0010.jpg', '2025-03-14 20:54:37', 99.82),
(37, 83, 69, 'meningioma', '/static/reports/report_naser.pdf', 'static/scans/Te-me_0017.jpg', '2025-03-14 20:55:31', 97.96),
(38, 105, 69, 'meningioma', 'static/reports/report_helfaoui.pdf', 'static/scans/Te-me_0070.jpg', '2025-03-14 20:57:34', 100),
(39, 105, 69, 'meningioma', '/static/reports/report_helfaoui.pdf', 'static/scans/Te-me_0022.jpg', '2025-03-14 21:00:44', 100),
(40, 106, 69, 'glioma', '/static/reports/report_mohamed.pdf', 'static/scans/Te-gl_0015.jpg', '2025-03-14 22:42:01', 99.99),
(41, 112, 111, 'glioma', '/static/reports/report_lamin.pdf', 'static/scans/Tr-gl_0067.jpg', '2025-03-17 07:01:04', 100),
(42, 112, 111, 'glioma', '/static/reports/report_lamin.pdf', 'static/scans/Tr-gl_0012.jpg', '2025-03-17 07:15:45', 100),
(43, 83, 69, 'glioma', '/static/reports/report_naser.pdf', 'static/scans/Tr-gl_0012.jpg', '2025-04-05 01:04:40', 100),
(44, 105, 69, 'glioma', '/static/reports/report_helfaoui.pdf', 'static/scans/Tr-gl_1316.jpg', '2025-04-12 19:28:49', 100),
(45, 115, 113, 'glioma', '/static/reports/report_barchich.pdf', 'static/scans/Tr-gl_0015.jpg', '2025-04-14 01:37:44', 100),
(46, 115, 113, 'meningioma', '/static/reports/report_barchich.pdf', 'static/scans/Tr-me_0012.jpg', '2025-04-24 18:42:35', 99.79),
(47, 117, 118, 'meningioma', '/static/reports/report_hichame.pdf', 'static/scans/Tr-me_0088.jpg', '2025-04-24 20:26:38', 99.97);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','doctor','patient') NOT NULL,
  `doctor_code` varchar(50) DEFAULT NULL,
  `status` enum('active','pending','banned') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `doctor_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'aoudia', 'dzjob10@gmail.com', '123', 'patient', NULL, 'active', '2025-02-13 19:42:31', NULL),
(3, 'aoudia', 'aoudiaf104@gmail.com', '$2b$12$5EHQTqyNnh/8Cago4FZ.ve7cbdN1KzWGT2M/bt/OJ9/Pi5nV1iTMy', 'patient', NULL, 'active', '2025-02-13 19:54:03', NULL),
(4, 'aoudia', 'dzdz@gmail.com', '$2b$12$JEF36I9WaB8aXP2giw9fJOWjXHWS1HNtp5FTpmwFbuROFxlTqJ6rm', 'patient', NULL, 'active', '2025-02-13 19:59:41', NULL),
(5, 'dzea', 'aou4@gmail.com', '$2b$12$zKbx/JCk92Zw9UKvZxWpROvzgQ/CFymiKedrr9yF.5Xdv26OoeOhC', 'patient', NULL, 'active', '2025-02-13 20:00:12', NULL),
(6, 'said', 'said@gmail.com', '$2b$12$7W4.Q.P1tmkMqhhFYO5l9uAVipowSelguduc6yJyfC8RSZwxf5O5y', 'patient', NULL, 'active', '2025-02-13 22:25:14', NULL),
(8, 'zizo', 'zizo@gmail.com', '$2b$12$tmF83GmG31H4v8k3styL5urywZMwUx36lM85WCWLvCZcVxr4eq7qC', 'patient', NULL, 'active', '2025-02-13 22:46:42', NULL),
(9, 'dzea', 'zemzem@gmail.com', '$2b$12$h/xys3u0r0ToyONtuoWSiu3dRYzqbHAxHp6UFVliCDraWRhT4zJDm', 'doctor', NULL, 'active', '2025-02-13 23:00:10', '2025-03-10'),
(10, 'fahim', 'fahim@gmail.com', '$2b$12$VfJNzBJcbgjPaeTYCeUHtOUCaicqEvIfce0PRgYx9LRpKqqdEiAf2', 'admin', NULL, 'active', '2025-02-13 23:05:56', NULL),
(11, '1999', 'amine@gmail.com', '$2b$12$2uIvJN6mG1OCXuNSxRJLqucEWsRDhpOkapy2yODRkR1PL8vxnl7GC', 'patient', NULL, 'active', '2025-02-13 23:10:55', NULL),
(12, 'amine', 'amin@gmail.com', '$2b$12$DxOEUm3oG8Efgt5YRjTvSuIwixYHXsalIb4S8YFfMbZoDXxEmqVh.', 'doctor', NULL, 'pending', '2025-02-13 23:11:32', '2025-03-10'),
(13, 'chaima', 'chaima@dz.com', '$2b$12$PJfYcQ2ZyraRtlySyKNMk.z00yt4LxCS4/Hi9hhFtImEQ1MVXzlQK', 'doctor', '1999', 'active', '2025-02-13 23:19:27', NULL),
(14, 'frer', 'frer@gma.com', '$2b$12$rFgLlo6EuDcKbMC68XeLfeRWsjmkPAE9f8qEcO.Sm1GHz.O7kALIi', 'patient', NULL, 'active', '2025-02-13 23:32:55', NULL),
(15, 'didou', 'didou@gma.com', '$2b$12$vWbZcKNLE9HlXIpPTm2t4.9RTl3DL68F/j43UhAb/42NjmGV7wYM.', 'doctor', NULL, 'pending', '2025-02-13 23:33:19', NULL),
(34, 'chachou', 'aa@gmail0com', '$2b$12$T3hwLhbQ6kxgIzibDQUyMe.eaTqQsvAW.l0Jnf2W9oehsfu2G/Qd6', 'doctor', NULL, 'pending', '2025-02-13 23:38:44', NULL),
(35, 'chachou', 'aaa@gmail0com', '$2b$12$Y6zdhq/KJLHIstA2L4rV4uafMNwnpQk8EUx6zn0a15opLht91OpGC', 'doctor', NULL, 'pending', '2025-02-13 23:39:09', NULL),
(36, 'aoudia', 'aoudiaf1s04@gmail.com', '$2b$12$iwo5wMtF6gZ1e.oTE6bnT.uPIjlnqVh33qzlBC3EWVk4XJm8qkh8W', 'doctor', NULL, 'pending', '2025-02-13 23:47:15', NULL),
(61, 'aoudia', 'dsqdq@gmail.coms', '$2b$12$kO6OlCXWKbkHTN5Uj8egoOsj2h4hUjZNdu1eJKtPRK8Dqj44LBCDG', 'doctor', '19999', 'pending', '2025-02-14 00:01:37', NULL),
(63, 'chou', 'chou@gmail.com', '$2b$12$6bnHDlkbzw6r.lz8FA82zegDVGmgSUn8M/5Exzlp9h8AXaT2guaci', 'doctor', '1000', 'active', '2025-02-14 00:04:06', NULL),
(64, 'zar', 'zar@gmail.com', '$2b$12$jjn3YTIoM.j3PXiiuKbZ5.IdRO98/Sb9bsAsxhfzVomDjmQh4y3l.', 'doctor', '', 'pending', '2025-02-14 00:20:02', NULL),
(66, 'kzar', 'zarp@gmail.com', '$2b$12$A9eyu1iQVr13iiw0PR67XuS6lSCYg/9xrJmHdlNy8GpkmlNzHjeQO', 'doctor', '1999', 'pending', '2025-02-14 00:26:39', NULL),
(67, 'kza', 'za@gmail.com', '$2b$12$dtq97dUc8Yv5UwIiupO9TuqiBLtZs8w/1graWtkMYGdcJkwhfsnC6', 'doctor', '1000', 'active', '2025-02-14 00:27:20', NULL),
(68, 'ara', 'ara@gmail.com', '$2b$12$cow12P/XYIpIYo8/n1bkUOAFsuZKVA99KQYhJaLfOTPHhjiRwTSwy', 'doctor', '1234', 'active', '2025-02-13 20:54:34', NULL),
(69, 'doks', 'doks@glmao.com', '$2b$12$FTVU0VPZUjF5ksQHNBY0qu9Rmi5g1lAKBWyMvvkpKYRBK2Kc32I1e', 'doctor', 'DOC2', 'active', '2025-02-13 20:58:45', NULL),
(70, 'malad', 'malad@ea.a', '$2b$12$PijM2hjuyg0BMftMnLss0OTnraT2Y3Lk6AufBLTG7wTdTsIb5T3pO', 'patient', NULL, 'active', '2025-02-13 21:04:08', NULL),
(71, 'ain', 'az@gmail.com', '$2b$12$ryetwCU/2aTiA/PFtEmp5.qd6nwDkm9EEFJsN2l/KGidO9h3aEVcu', 'doctor', NULL, 'pending', '2025-02-13 21:05:03', NULL),
(72, 'amina', 'amina@gmail.com', '$2b$12$yhRuOUsMopTDa/oCGx5JneL1mLNLtl2ReXkLW9nrmqD1Dqq3T5u56', 'patient', NULL, 'active', '2025-02-16 11:52:50', NULL),
(73, 'cho', 'cho@gmail.com', '$2b$12$wrYvTVMfpo0iH1Qs3ZxLzOJ.EqNq.382Y8el/FcJIBQqzi.Fz8xa2', 'patient', NULL, 'active', '2025-02-16 12:32:02', NULL),
(74, 'fahem ', 'fahem@gmail.com', '$2b$12$0PuIu1BYhyXvfqlY.SGKxODeLV.thnlAP.QRSJq.MfgvKghHz/x4a', 'patient', NULL, 'active', '2025-02-17 06:05:52', NULL),
(75, 'fares', 'fares@gmail.com', '$2b$12$8LNg6eZzj3Clc4.heg/D4uyRo86EyaM6jqKwoLXENezkbhjsbC9gq', 'doctor', '9999', 'pending', '2025-02-17 07:18:43', '2025-03-10'),
(76, 'Dr. Ali', 'dr.ali@example.com', 'hashed_password_here', 'doctor', NULL, 'active', '2025-02-17 07:31:22', NULL),
(77, 'f', 'f@gmail.com', '$2b$12$qZWRQg1PhpWpVjYIQ6kRbO3BCDfZL1KKG.K2l8VH03crxzE/mkhs6', 'patient', NULL, 'active', '2025-02-17 07:32:53', NULL),
(78, 'a', 'a@a.a', '$2b$12$4qAwSCqCWFWGNI/DO0tcGebSjtl9vgUtqZMCaHKAjDsnyoX1oG0Ti', 'patient', NULL, 'active', '2025-02-17 09:55:32', NULL),
(79, 'm', 'm@m.com', '$2b$12$ia6SxPQpWAgOGDNfwcvHL.ae/0SXJ3VZzjie6qMraLXfOg1GNyJEy', 'doctor', NULL, 'pending', '2025-02-17 09:56:04', NULL),
(80, 'AOUD', 'aoud@gmail.com', '$2b$12$gs8h1/i3gTR0ZZ7BiAh6V.nnky.ajCu2GgaVM50hpzesEUZsJupw2', 'doctor', 'AOUD', 'active', '2025-02-17 09:58:35', NULL),
(81, 'maladi', 'maladi@gmail.com', '$2b$12$Z1iPRqflU9O/aN/ZrAe/t.wiDR2zChYSicvdZ7ZJNSd.vLCevH8ou', 'patient', NULL, 'active', '2025-02-17 05:00:00', NULL),
(82, 'aoudia', 'aoud@g.com', '$2b$12$JIb/Bw7Wv30ntM6VkyWcGuL2Ki9LFn2c/neqJqGTuYSOC.Obi31a6', 'patient', NULL, 'active', '2025-02-19 05:00:00', NULL),
(83, 'naser', 'naser@n.com', '$2b$12$rwBLwUnO6svXHScuGGboNuitZlMq8YuzJKvglrVO3Y0/YxETWl4Ji', 'patient', NULL, 'active', '2025-02-19 05:00:00', NULL),
(84, 'test', 'tes@gmail', '$2b$12$Rhb2o3wrHSmOHrRocM.zFekIAwTEZvJ/PYYqFykUJVKm4fbffIY6O', 'patient', NULL, 'active', '2025-02-21 05:00:00', NULL),
(85, 'rabah', 'rabah@gmail.com', '$2b$12$lYVHDpGR5RNVauEUgMOES.jQEASHtPtrkzQ5JZuCV/djDbIi9dZye', 'patient', NULL, 'active', '2025-02-24 05:00:00', NULL),
(86, 'abdo', 'abdo@gmail.com', '$2b$12$4BhD3h6Wp2sABkPs/U9iBOGjjjuzbuPqfbp836c8/fRP8lI8OfVvK', 'patient', NULL, 'active', '2025-03-05 05:00:00', NULL),
(87, 'hichem', 'hicham@gmail.com', '$2b$12$XP6RZI3MmW1E/Z9TweYt8.4G5uEj3wMTMnrO80qYzewXVOKx3D.mG', 'doctor', NULL, 'active', '2025-03-07 05:00:00', NULL),
(88, 'test', 'test@g.com', '$2b$12$FIUZCA6Z7WqBiRWlddkkEObiEw.VIDPzVnaqo5UYHxsAY2PgXmKFO', 'doctor', NULL, 'active', '2025-03-07 05:00:00', NULL),
(89, 'a', 'a@e', '$2b$12$jAAybrsySsAou7QElwpQx.PBVZLP99CbiZ7AMxGWUIyplmaTbbt0e', 'doctor', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(90, 'd', 'd@d', '$2b$12$XumLJje1Z5razl5CvcMpkORNc7c2bnNNsM21Pne/2A4aPpQ1xHhHS', 'doctor', '6666', 'active', '2025-03-07 05:00:00', NULL),
(91, 't', 't@r', '$2b$12$V2P1VHHzGivDA0.KOPd5WuP/AVBXfkOjYOPDZA4uXMjZlWS5/S4LS', 'doctor', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(92, 'm', 'm@r', '$2b$12$i8NPfdfRvJk7Ifir0YLQuOydLMUo8Qk0k1beS8s3xebLKRZvMVfvW', 'doctor', '2233', 'active', '2025-03-07 05:00:00', NULL),
(94, 'tiko', 't@t', '$2b$12$pvEOHQexDRnlUfrPpSbuCODMx18kwDpwFlL/4jB1qIKUPf07DcmFC', 'doctor', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(95, 'ta', 'ta@t', '$2b$12$7jzEtisZ.4tpeo0L8b6GpORUNSmZeYN9M1gnmRJOYyZgnro/rN8Jy', 'doctor', '3344', 'active', '2025-03-07 05:00:00', NULL),
(96, 'ba', 'ba@b', '$2b$12$vgpOJYVuy89UihL.33IXquWbN8NCgIPK9KrotC88Jmab4E/WIgrTm', 'patient', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(97, 'ara', 'araa@ara', '$2b$12$HbZKch0w8dadea55kYTJ5u/SgKT4eNYI6TGH7fBbBbRuUKzRtdL5i', 'patient', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(98, 'amino', 'am@a', '$2b$12$d9i1vRT1eVoQPcAbV7qPeOYmOlrNUoHxHXOXaVldRwPIFhKJ98t8K', 'patient', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(99, 'zam', 'zam@za', '$2b$12$kG3VN/fUzkwrvoedghfwNOjhtByeQBerT1MoLkcrNlyTHeIYH4iru', 'patient', NULL, 'active', '2025-03-07 05:00:00', NULL),
(100, 'za', 'za@za', '$2b$12$4KZyK6XUamV589xDtakyHOtqayZ8W.eNGhfskIhOydFluN1YDJVu.', 'doctor', NULL, 'pending', '2025-03-07 05:00:00', NULL),
(101, 'zaz', 'zaz@za', '$2b$12$5AaHGbYLvkF5Z4DM8AnP/.qoFi1eoNZ0P6ZZPfpoE9vCX.qOTWypi', 'doctor', '4455', 'active', '2025-03-07 05:00:00', NULL),
(102, 'pa', 'pa@gmail.com', '$2b$12$NG6mXgf9PHsChNGAlL/E2.TS0cBLQlUKYqiJ6ZbCI8euFaFhgYzdG', 'patient', NULL, 'active', '2025-03-10 04:00:00', NULL),
(103, 'abd', 'abd@gmail.com', '$2b$12$HfjGuTxwaLV11w05zta9COKGIaMPVZ5D76Y0o1SnVuVEbUfs9.gzG', 'patient', NULL, 'active', '2025-03-11 04:00:00', NULL),
(104, 'mestapha', 'mestapha@gmail.com', '$2b$12$bNjOtW8A6f2cX.cMnufl/eTrsvn2agCCy8TP4zCDifdLR75toTrd2', 'patient', NULL, 'active', '2025-03-11 04:00:00', NULL),
(105, 'helfaoui', 'helfaoui@g.com', '$2b$12$RBudflnm7hIF73KEdzeDuu7TGKZXdJoLA9BW8set5.ChpLc8CLGqS', 'patient', NULL, 'active', '2025-03-11 04:00:00', NULL),
(106, 'mohamed', 'm@gm.com', '$2b$12$jf2ZY38G.ifOTJXplLOEUeU9mlvgXaBtGBAhoX0JbyMv5925IVLYS', 'patient', NULL, 'active', '2025-03-14 04:00:00', NULL),
(107, 'test1', 'tt@t.com', '$2b$12$3sR5ab5uqicM9JgAMG/adeNEX9ATPZjP9i2yMoXRZZTBfiD5qJjGu', 'patient', NULL, 'active', '2025-03-16 04:00:00', NULL),
(108, 'tart', 'tart@r', '$2b$12$Vm.3amKn45JOirC4NP4nkuj1YDpJM3R0sFTthOckGQcukbQ5w26M.', 'doctor', NULL, 'active', '2025-03-16 04:00:00', '2025-03-16'),
(109, 'toto', '123456@example.com', 'default_password', 'doctor', '123456', 'pending', '2025-03-16 04:00:00', NULL),
(110, 'yam', 'yam@gmail.com', '$2b$12$RzFiaQHJDtXaPeMTZ9hG0.Wg3c62EJZ8YBFoaB35FUbg.iSF/R4vi', 'doctor', '123321', 'active', '2025-03-16 04:00:00', NULL),
(111, 'lamia', 'lamia@gmail.com', '$2b$12$IexcgqZRfwBALVU5l5W4BeMzD9LUMBjNkIcfwjJ59RzN.stF6GO5O', 'doctor', NULL, 'active', '2025-03-16 04:00:00', '2025-03-16'),
(112, 'lamin', 'lamin@gmail.com', '$2b$12$/ilvK9guKiKxJ6ypM5oI0.J7ui39fi9QOsJcozdUEQePRktrBWoLe', 'patient', NULL, 'active', '2025-03-16 04:00:00', NULL),
(113, 'fahem', 'aoudiafahem1@gmail.com', '$2b$12$G1jRjriEf.GULfbBUpmCIuduvtk9SWohMKnY0m33qpIjnuBsD6qF.', 'doctor', '1999', 'active', '2025-04-13 04:00:00', NULL),
(114, 'zouzou ch', 'zouzouch@gmail.com', '$2b$12$Qt9rqRX3dSyzS1KUp.luYOh5Kr.v5xckT0Z45XZjobuOQ/r6PVWiO', 'patient', NULL, 'active', '2025-04-13 04:00:00', NULL),
(115, 'barchich', 'barchich@gmail.com', '$2b$12$99nEFbmb/txhkwoiC2EDauDf2CD5672yc4MyFNhemSJvajJXCR4H2', 'patient', NULL, 'active', '2025-04-13 04:00:00', NULL),
(117, 'hichame', 'hichame@gmail.com', '$2b$12$78m6d5gTtlgJfVVjFMtDJOwCJqxlqxcFHNR3zrv77388WyFYiSS2q', 'patient', NULL, 'active', '2025-04-24 04:00:00', NULL),
(118, 'medcine1', 'medcine1@gmail.com', '$2b$12$iSQtKE02sQpTmmCTmUwh6uiH3s24rRlSWrRj2zS/.YYDMAJAa3qvW', 'doctor', NULL, 'active', '2025-04-24 04:00:00', '2025-04-24');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Index pour la table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`),
  ADD UNIQUE KEY `doctor_code` (`doctor_code`);

--
-- Index pour la table `doctor_calendar`
--
ALTER TABLE `doctor_calendar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_id` (`user_id`);

--
-- Index pour la table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `doctor_calendar`
--
ALTER TABLE `doctor_calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `doctor_calendar`
--
ALTER TABLE `doctor_calendar`
  ADD CONSTRAINT `doctor_calendar_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctor_calendar_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
