CREATE DATABASE IF NOT EXISTS cafecito CHARACTER SET utf8mb4;
USE cafecito;

CREATE TABLE IF NOT EXISTS pedidos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  cliente       VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NULL,
  producto      VARCHAR(100) NOT NULL,
  cantidad      INT          NOT NULL,
  tamano        VARCHAR(20)  NOT NULL DEFAULT 'Mediano',
  llevar        TINYINT(1)   NOT NULL DEFAULT 0,
  comentarios   TEXT         NULL,
  creado_en     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
