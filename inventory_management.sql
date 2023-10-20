-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 23:41:00
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
  `reference` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `stock` int(20) DEFAULT NULL,
  `office` varchar(50) DEFAULT NULL,
  `serial` varchar(100) DEFAULT NULL,
  `mark` int(11) UNSIGNED NOT NULL,
  `model` varchar(100) DEFAULT NULL,
  `equipment_type` int(10) UNSIGNED NOT NULL,
  `user` varchar(100) DEFAULT NULL,
  `ram` varchar(100) NOT NULL,
  `ram_type` int(11) UNSIGNED NOT NULL,
  `hard_disk` varchar(100) NOT NULL,
  `hard_type` int(11) UNSIGNED NOT NULL,
  `proccesor` varchar(100) DEFAULT NULL,
  `system` varchar(100) DEFAULT NULL,
  `antivirus` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `maintenance` tinyint(1) UNSIGNED NOT NULL,
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
  `file` blob NOT NULL,
  `importance` int(10) UNSIGNED NOT NULL,
  `client` varchar(50) NOT NULL,
  `status` int(10) UNSIGNED NOT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
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
(200, 200, 'Cambio de disco', NULL, 1, '2023-10-20 16:52:13', NULL),
(201, 200, 'Cambio de ram', NULL, 1, '2023-10-20 16:52:13', NULL),
(202, 200, 'Cambio de teclado', NULL, 1, '2023-10-20 16:53:21', NULL),
(203, 200, 'Cambio de pantalla', NULL, 1, '2023-10-20 16:54:01', NULL),
(206, 201, 'HP', NULL, 1, '2023-10-20 16:56:14', NULL),
(207, 201, 'DELL', NULL, 1, '2023-10-20 16:56:41', NULL),
(208, 201, 'Lenovo', NULL, 1, '2023-10-20 16:56:41', NULL),
(209, 201, 'Samsung', NULL, 1, '2023-10-20 16:58:00', NULL),
(210, 201, 'thinkPad', NULL, 1, '2023-10-20 16:58:25', NULL),
(211, 201, 'Otra marca', NULL, 1, '2023-10-20 16:59:31', NULL),
(225, 203, 'Solido', NULL, 1, '2023-10-20 17:00:03', NULL),
(226, 203, 'Mecanico', NULL, 1, '2023-10-20 17:00:30', NULL),
(227, 203, 'Mecanico y solido', NULL, 1, '2023-10-20 17:00:30', NULL),
(230, 204, 'DDR3', NULL, 1, '2023-10-20 17:01:28', NULL),
(231, 204, 'DDR3', NULL, 1, '2023-10-20 17:04:36', NULL),
(232, 204, 'Otro ', NULL, 1, '2023-10-20 17:06:26', NULL),
(235, 205, 'Baja', NULL, 1, '2023-10-20 17:12:14', NULL),
(236, 205, 'Media', NULL, 1, '2023-10-20 17:13:36', NULL),
(237, 205, 'Normal', NULL, 1, '2023-10-20 17:13:36', NULL),
(238, 205, 'Alta', NULL, 1, '2023-10-20 17:13:36', NULL),
(240, 206, 'Incidente', NULL, 1, '2023-10-20 17:15:18', NULL),
(241, 206, 'Requerimiento', 1, NULL, '2023-10-20 17:15:18', NULL),
(250, 207, 'Si', NULL, 1, '2023-10-20 17:20:05', NULL),
(251, 207, 'No', NULL, 1, NULL, NULL),
(260, 208, 'Laptop', NULL, 1, '2023-10-20 18:31:49', NULL),
(261, 208, 'Desktop', NULL, 1, '2023-10-20 18:31:49', NULL),
(270, 209, 'Administrador', NULL, 1, '2023-10-20 18:27:02', NULL),
(271, 209, 'Admin de administradores', NULL, 1, NULL, NULL),
(272, 209, 'Visitante', NULL, 1, '2023-10-20 18:28:50', NULL),
(273, 209, 'Operador', NULL, 1, '2023-10-20 18:29:35', NULL);

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
(209, 'Roles', 270, 279, 1, '2023-10-20 17:21:53', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mark` (`mark`,`equipment_type`,`ram_type`,`hard_type`,`maintenance`,`status`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_type` (`event_type`,`importance`,`status`),
  ADD KEY `importance` (`importance`),
  ADD KEY `status` (`status`);

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
  ADD KEY `rol` (`rol`);

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
-- AUTO_INCREMENT de la tabla `params`
--
ALTER TABLE `params`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3288;

--
-- AUTO_INCREMENT de la tabla `param_types`
--
ALTER TABLE `param_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`event_type`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`importance`) REFERENCES `params` (`id`),
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`status`) REFERENCES `params` (`id`);

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
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `params` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
