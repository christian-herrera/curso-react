USE `dev`;

CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `rol` enum('admin','user') DEFAULT 'user',
  `email` varchar(120) NOT NULL,
  `clave_hash` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


INSERT INTO `usuarios` (`id`,`nombre`,`apellido`,`rol`,`email`,`clave_hash`) VALUES (1,'Christian','Herrera','admin','admin@admin','$2y$10$/K5fEqxTBhYejwqSTvJlVOlGzVqzWVEV03.TiVmZXkFWUvocjAcra');
INSERT INTO `usuarios` (`id`,`nombre`,`apellido`,`rol`,`email`,`clave_hash`) VALUES (2,'Pedro','Gonzales','user','user@user','$2y$10$1b2.C5qug5ji8QJ6I8OVruWrDDuFOzkmAqT/HDCm4.9YtRWasrCEi');
