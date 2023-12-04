SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `inventory_management`;
USE `inventory_management`;

-- Table structures and data for `param_types`
CREATE TABLE `param_types` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `range_min` int(10) DEFAULT NULL,
  `range_max` int(10) DEFAULT NULL,
  `param_state` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table structures and data for `params`
CREATE TABLE `params` (
  `id` int(10) UNSIGNED NOT NULL ,
  `paramtype_id` int(10) UNSIGNED  NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `param_foreign` int(10) UNSIGNED DEFAULT NULL,
  `param_state` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paramtype_id` (`paramtype_id`),
  KEY `param_state` (`param_state`),
  KEY `param_foreign` (`param_foreign`),
  CONSTRAINT `params_ibfk_1` FOREIGN KEY (`param_foreign`) REFERENCES `params` (`id`),
  CONSTRAINT `params_ibfk_2` FOREIGN KEY (`param_state`) REFERENCES `params` (`id`),
  CONSTRAINT `params_ibfk_3` FOREIGN KEY (`paramtype_id`) REFERENCES `param_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
-- Table structures and data for `equipments`
CREATE TABLE `equipments` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `office` varchar(50) DEFAULT NULL,
  `serial` varchar(50) DEFAULT NULL,
  `mark` int(11) UNSIGNED DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `equipment_type` int(10) UNSIGNED DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  `ram_type` int(11) UNSIGNED DEFAULT NULL,
  `hard_disk` varchar(50) DEFAULT NULL,
  `hard_type` int(11) UNSIGNED DEFAULT NULL,
  `proccesor` varchar(50) DEFAULT NULL,
  `bought_at` date DEFAULT NULL,
  `deliver_at` date DEFAULT NULL,
  `init_value` varchar(20) DEFAULT NULL,
  `final_value` varchar(20) DEFAULT NULL,
  `sub_value` varchar(20) DEFAULT NULL,
  `system` varchar(50) DEFAULT NULL,
  `location` varchar(44) DEFAULT NULL,
  `antivirus` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` int(11) UNSIGNED  NULL,
  PRIMARY KEY (`id`),
  KEY `equips_ibfk_2` (`equipment_type`),
  KEY `equips_ibfk_3` (`ram_type`),
  KEY `equips_ibfk_4` (`hard_type`),
  KEY `equips_ibfk_6` (`status`),
  KEY `mark` (`mark`,`equipment_type`,`ram_type`,`hard_type`,`status`) USING BTREE,
  CONSTRAINT `equips_ibfk_1` FOREIGN KEY (`mark`) REFERENCES `params` (`id`),
  CONSTRAINT `equips_ibfk_2` FOREIGN KEY (`equipment_type`) REFERENCES `params` (`id`),
  CONSTRAINT `equips_ibfk_3` FOREIGN KEY (`ram_type`) REFERENCES `params` (`id`),
  CONSTRAINT `equips_ibfk_4` FOREIGN KEY (`hard_type`) REFERENCES `params` (`id`),
  CONSTRAINT `equips_ibfk_6` FOREIGN KEY (`status`) REFERENCES `params` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structures and data for `users`
CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` int(10) UNSIGNED NOT NULL,
  `status` int(10) UNSIGNED  NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp  NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol` (`rol`),
  KEY `status` (`status`),
  KEY `email_2` (`email`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `params` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`status`) REFERENCES `params` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structures and data for `events`
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(50)  NULL,
  `event_type` int(10) UNSIGNED  NULL,
  `file` varchar(500) DEFAULT NULL,
  `importance` int(10) UNSIGNED DEFAULT NULL,
  `client` varchar(50)  NULL,
  `status` int(10) UNSIGNED NOT NULL,
  `event_reason` int(10) UNSIGNED NOT NULL,
  `equip` int(11) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED  NULL,
  `created_at` timestamp  NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_type` (`event_type`,`importance`,`status`),
  KEY `importance` (`importance`),
  KEY `status` (`status`),
  KEY `equip` (`equip`),
  KEY `event_reason` (`event_reason`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `FK_EQUIP_EVENT` FOREIGN KEY (`equip`) REFERENCES `equipments` (`id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`event_type`) REFERENCES `params` (`id`),
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`importance`) REFERENCES `params` (`id`),
  CONSTRAINT `events_ibfk_3` FOREIGN KEY (`status`) REFERENCES `params` (`id`),
  CONSTRAINT `events_ibfk_4` FOREIGN KEY (`event_reason`) REFERENCES `params` (`id`),
  CONSTRAINT `events_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structures and data for `files`
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(300) NOT NULL,
  `file_type` varchar(100)  NULL,
  `equipment` int(11) UNSIGNED NOT NULL,
  `original_name` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`equipment`),
  CONSTRAINT `FK_FILE_EQUIP` FOREIGN KEY (`equipment`) REFERENCES `equipments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

- Estructura de tabla para la tabla `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `branch` varchar(45) DEFAULT NULL,
  `occupation` varchar(45) DEFAULT NULL,
  `enroll_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Volcado de datos para la tabla `params`
--

INSERT INTO `params` (`id`, `paramtype_id`, `name`, `param_foreign`, `param_state`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Activo', NULL, 1, '2023-10-20 15:59:25', NULL),
(2, NULL, 'Inactivo', NULL, 1, '2023-10-20 15:59:25', NULL),
(3, NULL, 'Eliminado', NULL, 1, '2023-11-01 16:56:16', NULL),
(200, 200, 'Cambio de disco', NULL, 1, '2023-10-20 16:52:13', NULL),
(201, 200, 'Cambio de ram', NULL, 1, '2023-10-20 16:52:13', NULL),
(202, 200, 'Cambio de teclado', NULL, 1, '2023-10-20 16:53:21', NULL),
(203, 200, 'Cambio de pantalla', NULL, 1, '2023-10-20 16:54:01', NULL),
(204, 200, 'Cambio de responsable', NULL, 1, NULL, NULL),
(205, 200, 'Cambio de tinta', NULL, 1, NULL, NULL),
(206, 201, 'HP', NULL, 1, '2023-10-20 16:56:14', NULL),
(207, 201, 'DELL', NULL, 1, '2023-10-20 16:56:41', NULL),
(208, 201, 'Lenovo', NULL, 1, '2023-10-20 16:56:41', NULL),
(210, 201, 'ThinkPad', NULL, 3, '2023-10-20 16:58:25', NULL),
(211, 201, 'Otra ', NULL, 3, '2023-10-20 16:59:31', NULL),
(212, 201, 'EPSON', NULL, 3, NULL, NULL),
(213, 201, 'Samsung', NULL, 1, '2023-10-20 16:58:00', NULL),
(225, 203, 'SSD', NULL, 1, '2023-10-20 17:00:03', NULL),
(226, 203, 'HDD', NULL, 1, '2023-10-20 17:00:30', NULL),
(227, 203, 'HDD-SSD', NULL, 1, '2023-10-20 17:00:30', NULL),
(232, 204, 'Otro ', NULL, 3, '2023-10-20 17:06:26', NULL),
(235, 205, 'Baja', NULL, 1, '2023-10-20 17:12:14', NULL),
(236, 205, 'Media', NULL, 1, '2023-10-20 17:13:36', NULL),
(237, 205, 'Normal', NULL, 1, '2023-10-20 17:13:36', NULL),
(238, 205, 'Alta', NULL, 1, '2023-10-20 17:13:36', NULL),
(240, 206, 'Incidente', NULL, 1, '2023-10-20 17:15:18', NULL),
(241, 206, 'Requerimiento', 1, NULL, '2023-10-20 17:15:18', NULL),
(242, 206, 'Mantenimiento', NULL, 1, '2023-10-30 14:07:11', NULL),
(243, 206, 'Repotenciamiento', NULL, 1, '2023-10-31 14:23:31', NULL),
(250, 207, 'Si', NULL, 1, '2023-10-20 17:20:05', NULL),
(251, 207, 'No', NULL, 1, NULL, NULL),
(260, 208, 'Laptop', NULL, 1, '2023-10-20 18:31:49', NULL),
(261, 208, 'Desktop', NULL, 3, '2023-10-20 18:31:49', NULL),
(262, 208, 'Otro', NULL, 3, '2023-10-24 14:19:38', NULL),
(263, 208, 'Celular', NULL, 1, NULL, NULL),
(264, 208, 'Impresora', NULL, 3, NULL, NULL),
(265, 208, 'Mouse', NULL, 1, NULL, NULL),
(266, 208, 'PC', NULL, 1, NULL, NULL),
(270, 209, 'Administrador', NULL, 1, '2023-10-20 18:27:02', NULL),
(271, 209, 'Administrador superior', NULL, 1, NULL, NULL),
(272, 209, 'Visitante', NULL, 1, '2023-10-20 18:28:50', NULL),
(273, 209, 'Operador', NULL, 1, '2023-10-20 18:29:35', NULL),
(280, 210, 'Pendiente', NULL, 1, '2023-10-31 14:57:54', NULL),
(281, 210, 'Cancelado', NULL, 1, '2023-10-31 14:57:54', NULL),
(282, 210, 'Realizado', NULL, 1, '2023-10-31 14:59:22', NULL),
(349, 200, 'Cambio general', NULL, 1, NULL, NULL),
(520, 204, 'DDR2', NULL, 1, NULL, NULL);
-- -----------------------------------------------------


INSERT INTO `param_types` (`id`, `name`, `range_min`, `range_max`, `param_state`, `created_at`, `updated_at`) VALUES
(200, 'Cambios', 200, 205, 1, '2023-10-20 16:01:03', NULL),
(201, 'Marcas', 206, 224, 1, '2023-10-20 16:01:45', NULL),
(203, 'Tipo disco duro', 225, 229, 1, '2023-10-20 16:02:32', NULL),
(204, 'Tipo de ram', 230, 234, 1, '2023-10-20 16:03:41', NULL),
(205, 'Importancia', 235, 239, 1, '2023-10-20 16:04:53', NULL),
(206, 'Tipo de evento', 240, 249, 1, '2023-10-20 16:04:53', NULL),
(207, 'Tipo de aceptacion', 250, 259, 1, '2023-10-20 16:07:43', NULL),
(208, 'Tipo de equipo', 260, 269, 1, '2023-10-20 16:25:32', NULL),
(209, 'Roles', 270, 279, 1, '2023-10-20 17:21:53', NULL),
(210, 'Estados de eventos', 280, 284, 1, '2023-10-31 14:56:58', NULL);



ALTER TABLE `workers` MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT
-- Set AUTO_INCREMENT values for tables
--ALTER TABLE `equipments` MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--ALTER TABLE `events` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--ALTER TABLE `files` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--ALTER TABLE `param_types` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;
--ALTER TABLE `users` MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--ALTER TABLE `workers` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

COMMIT;
