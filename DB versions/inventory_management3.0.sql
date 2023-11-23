-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2023 a las 22:57:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventory_management`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipments`
--

CREATE TABLE `equipments` (
  `id` int(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `office` varchar(50) DEFAULT NULL,
  `serial` varchar(50) DEFAULT NULL,
  `mark` int(11) UNSIGNED DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `equipment_type` int(10) UNSIGNED DEFAULT NULL,
  `user` int(10) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  `ram_type` int(11) UNSIGNED DEFAULT NULL,
  `hard_disk` varchar(50) DEFAULT NULL,
  `hard_type` int(11) UNSIGNED DEFAULT NULL,
  `proccesor` varchar(50) DEFAULT NULL,
  `bought_at` date NOT NULL,
  `deliver_at` date NOT NULL,
  `init_value` int(20) NOT NULL,
  `final_value` int(20) NOT NULL,
  `sub_value` varchar(20) NOT NULL,
  `system` varchar(50) DEFAULT NULL,
  `antivirus` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `event_type` int(10) UNSIGNED NOT NULL,
  `file` varchar(500) DEFAULT NULL,
  `importance` int(10) UNSIGNED DEFAULT NULL,
  `client` varchar(50) NOT NULL,
  `status` int(10) UNSIGNED NOT NULL,
  `event_reason` int(10) UNSIGNED NOT NULL,
  `equip` int(20) DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `file_name` varchar(45) NOT NULL,
  `file_type` varchar(40) NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `params`
--

CREATE TABLE `params` (
  `id` int(10) UNSIGNED NOT NULL,
  `paramtype_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `param_foreign` int(10) UNSIGNED DEFAULT NULL,
  `param_state` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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
(210, 201, 'ThinkPad', NULL, 1, '2023-10-20 16:58:25', NULL),
(211, 201, 'Otra ', NULL, 1, '2023-10-20 16:59:31', NULL),
(212, 201, 'EPSON', NULL, 1, NULL, NULL),
(213, 201, 'Samsung', NULL, 1, '2023-10-20 16:58:00', NULL),
(225, 203, 'SSD', NULL, 1, '2023-10-20 17:00:03', NULL),
(226, 203, 'HDD', NULL, 1, '2023-10-20 17:00:30', NULL),
(227, 203, 'HDD-SSD', NULL, 1, '2023-10-20 17:00:30', NULL),
(232, 204, 'Otro ', NULL, 1, '2023-10-20 17:06:26', NULL),
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
(261, 208, 'Desktop', NULL, 1, '2023-10-20 18:31:49', NULL),
(262, 208, 'Otro ', NULL, 1, '2023-10-24 14:19:38', NULL),
(263, 208, 'Celular', NULL, 1, NULL, NULL),
(264, 208, 'Impresora', NULL, 1, NULL, NULL),
(265, 208, 'Mouse', NULL, 1, NULL, NULL),
(266, 208, 'PC', NULL, 1, NULL, NULL),
(270, 209, 'Administrador', NULL, 1, '2023-10-20 18:27:02', NULL),
(271, 209, 'Administrador superior', NULL, 1, NULL, NULL),
(272, 209, 'Visitante', NULL, 1, '2023-10-20 18:28:50', NULL),
(273, 209, 'Operador', NULL, 1, '2023-10-20 18:29:35', NULL),
(280, 210, 'Pendiente', NULL, 1, '2023-10-31 14:57:54', NULL),
(281, 210, 'Cancelado', NULL, 1, '2023-10-31 14:57:54', NULL),
(282, 210, 'Realizado', NULL, 1, '2023-10-31 14:59:22', NULL),
(376, 204, 'DDR4', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `param_types`
--

CREATE TABLE `param_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `range_min` int(10) DEFAULT NULL,
  `range_max` int(10) DEFAULT NULL,
  `param_state` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `param_types`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` int(10) UNSIGNED NOT NULL,
  `status` int(10) UNSIGNED NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `rol`, `status`, `created_at`, `updated_at`) VALUES
(75, 'test@gmail.com', 'user', '$2b$10$qgd4WSvrI2Vz.8sJAr10M.HeH1o6jvFqoDVrCO4.iIQ2iNHMx5tI2', 271, 1, '2023-11-21', '0000-00-00'),
(76, 'test404@gmail.com', 'test404', '$2b$10$FEQS9Kn0JVMOEX/1yhX6Y.X1e8Dbi1cBTZQuKR9OqdOZ7YhlVacMO', 270, 1, '2023-11-22', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `branch` varchar(45) DEFAULT NULL,
  `enroll_date` date DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `workers`
--

INSERT INTO `workers` (`id`, `dni`, `name`, `email`, `area`, `status`, `branch`, `enroll_date`, `created_at`, `updated_at`) VALUES
(10, '11114747', 'usuarioworker', 'worker@52gmail.com', 'Mercadeo', 1, 'CALI', '2023-11-22', '2023-11-22', '2023-11-23'),
(18, '1111111', 'Nuevo usuario', 'nuevo@gmail.com', 'IT', 1, 'Bogota', '2023-08-09', '2023-11-23', '2023-11-23'),
(29, '540687329', 'Nisse Doggerell', NULL, NULL, 1, NULL, '2023-02-11', '2023-11-23', NULL),
(30, '231365133', 'Beau Lacroux', NULL, NULL, 1, NULL, '2023-09-26', '2023-11-23', NULL),
(31, '386716822', 'Lavena Thor', NULL, NULL, 1, NULL, '2023-05-12', '2023-11-23', NULL),
(32, '226645896', 'Everard Speers', NULL, NULL, 1, NULL, '2023-04-20', '2023-11-23', NULL),
(33, '452345607', 'Aldridge Dunks', NULL, NULL, 1, NULL, '2023-08-28', '2023-11-23', NULL),
(34, '146450180', 'Donnamarie Chilcott', NULL, NULL, 1, NULL, '2023-07-29', '2023-11-23', NULL),
(35, '801121782', 'Babs Nozzolinii', NULL, NULL, 1, NULL, '2022-12-02', '2023-11-23', NULL),
(36, '612626216', 'Gena Dybell', NULL, NULL, 1, NULL, '2023-03-22', '2023-11-23', NULL),
(37, '11452713', 'Clemmy Bernadot', NULL, NULL, 1, NULL, '2023-09-05', '2023-11-23', NULL),
(38, '283453252', 'Auroora Coltart', NULL, NULL, 1, NULL, '2023-01-08', '2023-11-23', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equips_ibfk_2` (`equipment_type`),
  ADD KEY `equips_ibfk_3` (`ram_type`),
  ADD KEY `equips_ibfk_4` (`hard_type`),
  ADD KEY `equips_ibfk_6` (`status`),
  ADD KEY `mark` (`mark`,`equipment_type`,`ram_type`,`hard_type`,`status`) USING BTREE;

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_type` (`event_type`,`importance`,`status`),
  ADD KEY `importance` (`importance`),
  ADD KEY `status` (`status`),
  ADD KEY `equip` (`equip`),
  ADD KEY `event_reason` (`event_reason`),
  ADD KEY `created_by` (`created_by`);

--
-- Indices de la tabla `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indices de la tabla `params`
--
ALTER TABLE `params`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paramtype_id` (`paramtype_id`),
  ADD KEY `param_state` (`param_state`),
  ADD KEY `param_foreign` (`param_foreign`);

--
-- Indices de la tabla `param_types`
--
ALTER TABLE `param_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `param_state` (`param_state`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol` (`rol`),
  ADD KEY `status` (`status`);

--
-- Indices de la tabla `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nit_2` (`dni`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `nit` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `param_types`
--
ALTER TABLE `param_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipments`
--
ALTER TABLE `equipments`
  ADD CONSTRAINT `equips_ibfk_1` FOREIGN KEY (`mark`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `equips_ibfk_2` FOREIGN KEY (`equipment_type`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `equips_ibfk_3` FOREIGN KEY (`ram_type`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `equips_ibfk_4` FOREIGN KEY (`hard_type`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `equips_ibfk_6` FOREIGN KEY (`status`) REFERENCES `params` (`id`);

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `FK_EQUIP_EVENT` FOREIGN KEY (`equip`) REFERENCES `equipments` (`id`),
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`event_type`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`importance`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`status`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `events_ibfk_4` FOREIGN KEY (`event_reason`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `events_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `params`
--
ALTER TABLE `params`
  ADD CONSTRAINT `params_ibfk_1` FOREIGN KEY (`param_foreign`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `params_ibfk_2` FOREIGN KEY (`param_state`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `params_ibfk_3` FOREIGN KEY (`paramtype_id`) REFERENCES `param_types` (`id`);

--
-- Filtros para la tabla `param_types`
--
ALTER TABLE `param_types`
  ADD CONSTRAINT `param_types_ibfk_1` FOREIGN KEY (`param_state`) REFERENCES `params` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`status`) REFERENCES `params` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
