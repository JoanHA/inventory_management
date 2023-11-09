-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2023 a las 13:48:00
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
  `stock` int(20) DEFAULT NULL,
  `office` varchar(50) DEFAULT NULL,
  `serial` varchar(50) DEFAULT NULL,
  `mark` int(11) UNSIGNED DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `equipment_type` int(10) UNSIGNED DEFAULT NULL,
  `user` varchar(50) DEFAULT NULL,
  `ram` varchar(50) DEFAULT NULL,
  `ram_type` int(11) UNSIGNED DEFAULT NULL,
  `hard_disk` varchar(50) DEFAULT NULL,
  `hard_type` int(11) UNSIGNED DEFAULT NULL,
  `proccesor` varchar(50) DEFAULT NULL,
  `system` varchar(50) DEFAULT NULL,
  `antivirus` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `maintenance` int(1) UNSIGNED DEFAULT NULL,
  `status` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipments`
--

INSERT INTO `equipments` (`id`, `name`, `created_at`, `updated_at`, `stock`, `office`, `serial`, `mark`, `model`, `equipment_type`, `user`, `ram`, `ram_type`, `hard_disk`, `hard_type`, `proccesor`, `system`, `antivirus`, `description`, `maintenance`, `status`) VALUES
(4, 'Desktop', '2023-11-01 17:03:18', NULL, 10, 'Soporte sistemas', '2332423d', 208, 'DELL1233', 263, 'jefe de soporte', '10 GB', 231, '300 GB', 227, 'Intel', 'Windows', 'ESET', 'Cambio de descripcion', 250, 1),
(6, 'Pantalla HP', '2023-11-01 17:28:26', NULL, 1, 'Soporte de sistemas', 'Screen123', 211, 'Pant123', 260, 'Administradores', '20 GB', 231, '20 GB', 225, 'Intel', 'Windows 7', 'ESET', 'Una computadora', NULL, 1),
(7, 'Laptop', '2023-11-07 19:57:46', NULL, 12, 'Cartera', 'HP4501LX', 206, 'HP450', 260, 'Comercio', '12 GB', 230, '10 GB', 225, 'Ryzen', 'Linux', 'ESET', 'Ya revisada', NULL, 1),
(8, 'Impresora ', '2023-10-24 17:02:59', NULL, 5, 'sistemas', 'EPSO01LX2erws', 211, 'EPRSON!2233S', 261, 'Soporte', '0 GB', 232, '0 GB', 226, 'N/A', 'N/A', 'N/A', 'Una impresora ya revisada', NULL, 2),
(15, 'Samsung A14', '2023-11-07 14:42:56', NULL, NULL, 'Logistica', 'E58W81FRAND', 213, 'SM-A145M', 262, 'Logistica', '4 GB', 233, '128 GB', 226, 'SAMRYEZN', 'Android', 'Samsung safe', 'Un celular corporativo', NULL, 1),
(16, 'Azumi 10c', '2023-11-07 14:43:33', NULL, NULL, 'Soporte', '2342wfdwef', 211, 'AZU233dD', 260, 'Test 123', '12 GB', 232, '12 GB', 226, 'Ryzen', 'Android', 'Ninguno', 'Un nuevo celular', NULL, 1),
(21, 'PC-123', '2023-11-07 15:15:05', NULL, NULL, '3A', 'AB1234567', 206, 'HP Pavilion', 261, 'Juan Perez Modelo', '8 GB', 231, '1 TB', 226, ': Intel Core i5', 'Windows 10', 'Norton AntiVirus', 'Office workstation', NULL, 1),
(22, 'PC-124', '2023-11-07 15:15:05', NULL, NULL, '4a', 'AB1234568', 208, 'HP Pavilion', 260, 'Maira', '9 GB', 234, '2 TB', 225, ': Intel Core i6', 'Windows 11', 'Norton AntiVirus', 'Office workstation', NULL, 1),
(28, 'PC-144', '2023-11-07 15:49:21', NULL, NULL, 'Technology', '5bacdecf003c0faf31def63b724813f9f2411ad5', 206, 'Pellentesque.mov', 261, 'Joanne Jaquest', '8 GB', 231, '1 TB', 226, ': Intel Core i5', 'Windows 10', 'Norton AntiVirus', 'Enhanced asynchronous contingency', NULL, 1),
(29, 'PC-128', '2023-11-07 15:49:21', NULL, NULL, 'Public Utilities', '9a75d0800c3781da6615b32fe50064d8cfec8556', 208, 'Sapien.mov', 260, 'Susann Plaistowe', '9 GB', 234, '2 TB', 225, ': Intel Core i6', 'Windows 11', 'Norton AntiVirus', 'Down-sized high-level alliance', NULL, 1),
(30, 'PC-129', '2023-11-07 15:49:21', NULL, NULL, 'Energy', '6df272d8892524b3ffccc8de93c152d161057b9b', 208, 'Porttitor.ppt', 260, 'Tirrell Allmond', '10 GB', 245, '3 TB', 225, ': Intel Core i7', 'Windows 12', 'Norton AntiVirus', 'Synergistic holistic core', NULL, 1),
(31, 'PC-126', '2023-11-07 15:49:22', NULL, NULL, 'Consumer Services', 'd7d20b659c8056c33e208fca7e5d19d8f42926d9', 208, 'TurpisEgetElit.mpeg', 260, 'Anett McKelloch', '11 GB', 256, '4 TB', 225, ': Intel Core i8', 'Windows 13', 'Norton AntiVirus', 'Synergized client-server info-mediaries', NULL, 1),
(32, 'PC-127', '2023-11-07 15:49:22', NULL, NULL, 'Consumer Services', '3dfe414fa9a9aa5c2fdf94dace6a221f0cb71e95', 208, 'PellentesqueAt.mov', 260, 'Lenore Mary', '12 GB', 267, '5 TB', 225, ': Intel Core i9', 'Windows 14', 'Norton AntiVirus', 'Centralized web-enabled firmware', NULL, 1);

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

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `event_type`, `file`, `importance`, `client`, `status`, `event_reason`, `equip`, `created_by`, `created_at`, `updated_at`) VALUES
(22, 'Cambio de ram', 'Se le cambio la ram porque el equipo estaba muy le', 201, '1699030653087-Notes.txt', 237, 'Comercio', 1, 241, 7, 65, '2023-11-03 05:00:00', NULL),
(23, 'cambio de tinta', 'Se cambio la tinta', 205, '1699042399274-grupo-carval-Logo-Bioart.png', 236, 'Soporte', 1, 241, 8, 65, '2023-11-09 05:00:00', NULL),
(24, 'arreglo', 'Arreglos', 202, '1699385020064-ACTIVOS FIJOS 30 SEP 2023.XLSX', 237, 'jefe de soporte', 1, 241, 4, 65, '2023-11-14 05:00:00', NULL);

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
(209, 201, 'Samsung', NULL, 1, '2023-10-20 16:58:00', NULL),
(210, 201, 'ThinkPad', NULL, 1, '2023-10-20 16:58:25', NULL),
(211, 201, 'Otra marca', NULL, 1, '2023-10-20 16:59:31', NULL),
(212, 201, 'EPSON', NULL, 1, NULL, NULL),
(213, 201, 'Samsung', NULL, 2, NULL, NULL),
(214, 201, 'Logitech', NULL, 1, NULL, NULL),
(215, 201, 'carval', NULL, 1, NULL, NULL),
(225, 203, 'SSD', NULL, 1, '2023-10-20 17:00:03', NULL),
(226, 203, 'HDD', NULL, 1, '2023-10-20 17:00:30', NULL),
(227, 203, 'HDD-SSD', NULL, 1, '2023-10-20 17:00:30', NULL),
(230, 204, 'Ddr3', NULL, 1, '2023-10-20 17:01:28', NULL),
(231, 204, 'DDR4', NULL, 1, '2023-10-20 17:04:36', NULL),
(232, 204, 'Otro ', NULL, 1, '2023-10-20 17:06:26', NULL),
(233, 204, 'RAM PLUS', NULL, 1, NULL, NULL),
(234, 204, 'DDR5', NULL, 1, NULL, NULL),
(235, 205, 'Baja', NULL, 1, '2023-10-20 17:12:14', NULL),
(236, 205, 'Media', NULL, 1, '2023-10-20 17:13:36', NULL),
(237, 205, 'Normal', NULL, 1, '2023-10-20 17:13:36', NULL),
(238, 205, 'Alta', NULL, 1, '2023-10-20 17:13:36', NULL),
(240, 206, 'Incidente', NULL, 1, '2023-10-20 17:15:18', NULL),
(241, 206, 'Requerimiento', 1, NULL, '2023-10-20 17:15:18', NULL),
(242, 206, 'Mantenimiento', NULL, 1, '2023-10-30 14:07:11', NULL),
(243, 206, 'Repotenciamiento', NULL, 1, '2023-10-31 14:23:31', NULL),
(245, 204, 'DDR6', NULL, 1, NULL, NULL),
(250, 207, 'Si', NULL, 1, '2023-10-20 17:20:05', NULL),
(251, 207, 'No', NULL, 1, NULL, NULL),
(256, 204, 'DDR7', NULL, 1, NULL, NULL),
(260, 208, 'Laptop', NULL, 1, '2023-10-20 18:31:49', NULL),
(261, 208, 'Desktop', NULL, 1, '2023-10-20 18:31:49', NULL),
(262, 208, 'Otro ', NULL, 1, '2023-10-24 14:19:38', NULL),
(263, 208, 'Celular', NULL, 1, NULL, NULL),
(264, 208, 'Impresora', NULL, 1, NULL, NULL),
(265, 208, 'Mouse', NULL, 1, NULL, NULL),
(266, 208, 'PC', NULL, 1, NULL, NULL),
(267, 204, 'DDR8', NULL, 1, NULL, NULL),
(270, 209, 'Administrador', NULL, 1, '2023-10-20 18:27:02', NULL),
(271, 209, 'Administrador superior', NULL, 1, NULL, NULL),
(272, 209, 'Visitante', NULL, 1, '2023-10-20 18:28:50', NULL),
(273, 209, 'Operador', NULL, 1, '2023-10-20 18:29:35', NULL),
(280, 210, 'Pendiente', NULL, 1, '2023-10-31 14:57:54', NULL),
(281, 210, 'Cancelado', NULL, 1, '2023-10-31 14:57:54', NULL),
(282, 210, 'Realizado', NULL, 1, '2023-10-31 14:59:22', NULL);

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
(57, 'test02@gmail.com', 'test002', '$2b$10$n1hN/ubdZikas9CmZLIcQ.IxGnxYvZdO/A8EfSHcUhluthoHLsCdO', 272, 1, '2023-10-30', '2023-11-03'),
(65, 'test404@gmail.com', 'admin', '$2b$10$sNOAVl1AzCg7jccwvwsYnemz.6O459k7KkD/hg2HZ5p21z8y85ry2', 271, 1, '2023-11-02', '2023-11-07'),
(67, 'test1@gmail.com', 'test1', '$2b$10$oslVL6KH2/AyRM2N6NX9vOamsoYV2C8BZkZ2kQygXvoMdOu8MDT9.', 272, 2, '2023-11-02', '0000-00-00'),
(68, 'tets06@gmail.com', 'test06', '$2b$10$RXwfLNa8fjlPzPkOhZ1W1.Fh/DjzjoyImNr/GmhhAXCdBUc/ujc9.', 272, 1, '2023-11-03', '0000-00-00'),
(69, 'tets07@gmail.com', 'test06', '$2b$10$tyozjDmA6FScyO5HWB2cPeWZF4UubJrIhYMBabI0z8FpwTL1/2O7q', 272, 3, '2023-11-03', '0000-00-00'),
(70, 'tets09@gmail.com', 'test06', '$2b$10$PUz5axvSpV7t0xxeB0jvqu6ATsLLZdfu2UxCuxtdZ0zSKLVDClBTO', 272, 3, '2023-11-03', '0000-00-00'),
(71, 'test00@gmail.com', 'user123', '$2b$10$faEtQbbOx8TuBBh9a.wBr.qCDMOyQzsQZDMXqGlg.rlO4335gmg2W', 272, 3, '2023-11-03', '0000-00-00'),
(72, 'prueba@gmail.com', 'prueba', '$2b$10$FE0L1AqUP4NfseNOYcsI3OWh91qO4KTDClaBgW5We1hlb9ceyQODu', 272, 3, '2023-11-07', '0000-00-00'),
(73, 'prueba2@gmail.com', 'prueba', '$2b$10$.y1tK/cvlzg2HvsQeZ82i.nCJExYDJMQKfZoOKxcBngSaFoaUbSIO', 272, 1, '2023-11-07', '0000-00-00');

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `param_types`
--
ALTER TABLE `param_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

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
  ADD CONSTRAINT `equips_ibfk_5` FOREIGN KEY (`maintenance`) REFERENCES `params` (`id`),
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
