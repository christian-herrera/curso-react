--
-- Archivo generado con SQLiteStudio v3.4.17 el jue. nov. 27 15:27:34 2025
--
-- Codificación de texto usada: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabla: products
CREATE TABLE IF NOT EXISTS products (
    id          INTEGER      PRIMARY KEY AUTOINCREMENT
                             UNIQUE,
    title       TEXT (50)    NOT NULL ON CONFLICT ABORT,
    subtitle    TEXT (100)   NOT NULL ON CONFLICT ABORT,
    description TEXT (150)   NOT NULL ON CONFLICT ABORT,
    image       TEXT (64)    NOT NULL ON CONFLICT ABORT,
    price       INTEGER (20) NOT NULL ON CONFLICT ABORT
);

INSERT INTO products (id, title, subtitle, description, image, price) VALUES (1, 'USB 2.0 a UART TTL', 'Interfaces', 'Obtiene una interfaz UART TTL con solo conectarlo al puerto USB, soporta Windows 98SE, 2000, XP, Vista, Window7, Mac OS 9, Mac OS X & Linux 2.40.', 'ce0599fb231ad560c18f3de34270747a2e8ae07b4999429ba925e83a4d2719fa.jpg', 567625);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (2, 'Transreceptor LoRa RA-02', 'Transreceptor', 'Transceptor LoRa de bajo consumo para comunicaciones a larga distancia.', 'bbafba23a24a613fd57e4d4452dfc496ed47f2b464e03699fe1744ca1c0d0008.jpg', 1313910);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (3, 'Sensor Touch capacitivo TTP223B', 'Sensor', 'Sensor Touch capacitivo con circuito integrado TTP223B', '2ee56c65563e163054f319200ec37598a16182d0a5b5536ed82cf057ff6d644c.jpg', 156200);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (4, 'Sensor Ultrasonico Ultrasonido Hc-sr04', 'Sensor', 'El sensor ultrasónico HC-SR04 ofrece un rango de medición de 2cm a los 500cm, con una precisión de aproximadamente 3mm.', 'abd798e7fe368e501643d9619fc30550651edff9e8064b50ce7fe11014975f51.jpg', 220400);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (5, 'Sensor de Temperatura DS18B20', 'Sensor', 'Sensor de temperatura DS18B20 impermeabilizado.', '36ae5a52d5da397eaf2de9b609f122075af505a06c3fdaffa53a4ea360dd8385.jpg', 211817);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (6, 'Sensor de proximidad por infrarrojo', 'Sensor', 'El sensor de proximidad por infrarrojo es un módulo que permite detectar objetos cercanos sin contacto fí­sico, utilizando tecnologí­a infrarroja.', '23f52e86050f5899bc48384d3a3a6e7fbed8271abb63a37deaface50e72b5bc8.jpg', 165600);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (7, 'Sensor de humedad y temperatura HTU21D', 'Sensor', 'El sensor de humedad HTU21 es ideal para la detección del medio ambiente y del registro de datos, permite realizar toma de datos directamente con la interfaz deseada', 'b11339fa4804f1bd83992af743d9f99219e5d2369626f070dee837cb234ae3f6.jpg', 332100);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (8, 'Sensor de humedad de suelo con conector gravity 3 pines', 'Sensor', 'El sensor capacitivo de humedad de suelo V2.0 ofrece una medición precisa y duradera sin riesgo de corrosión. Ideal para riego inteligente, agricultura de precisión y proyectos con Arduino, ESP32 o Raspberry Pi.', '0990ea6f2f80f5b87ec962c1754ca958a77d2397e6fd5cd0c09a105dcc895b63.jpg', 276500);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (9, 'Sensor De Humedad Y Temperatura DHT22 Arduino', 'Sensor', 'El DHT22 es un sensor de temperatura y humedad que se utiliza para medir la temperatura y la humedad relativa del ambiente en el que se encuentra. ', 'a2dbf785dd667299715f3a2d0a38a2f3b36dd3af2136845ac71a88199bf4cdc1.jpg', 411514);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (10, 'Sensor de Color, Gestos y RGB GY-9960', 'Sensor', 'Este es el sensor RGB y gestos, funciona con un pequeño sensor APDS-9960 incorporado que ofrece medición de luz y color ambiental, detección de proximidad y sensación de gestos sin toque.', '331a621afa88afea63ae4b0a1dfdc468aa547ec7394a7bec4b4e82be595d2046.jpg', 344400);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (11, 'Módulo Wifi Esp8266 Esp01', 'Modulo WiFi', 'Chip altamente integrado, diseñado para aplicaciones donde se requiera conectividad a bajo costo. Ofrece una solución completa y autónoma de redes Wi-Fi, lo que le permite alojar la aplicación o servir como puente entre Internet y un microcontrolador.', '293f544583080501091f2b2d1f9eaf8ac3cd0e3a45bb9a7361b072c94217be9a.jpg', 184800);
INSERT INTO products (id, title, subtitle, description, image, price) VALUES (12, 'Módulo Wifi ESP8266 ESP-07 con stak TCP/IP', 'Modulo WiFi', 'ESP8266 es un chip altamente integrado diseñado para las necesidades de un nuevo mundo conectado. Ofrece una solución completa y autónoma de las redes Wi-Fi, lo que le permite ya sea anfitrión de la aplicación o para descargar todas las funciones de red Wi-Fi desde otro procesador de aplicaciones.', '5060bf4d2941c2b5da9ca7e2d0cf549e852740a04642aaa164de89a501acb132.jpg', 368825);

-- Tabla: users
CREATE TABLE IF NOT EXISTS users (
    id            INTEGER     NOT NULL ON CONFLICT ABORT
                              PRIMARY KEY ON CONFLICT ABORT AUTOINCREMENT
                              UNIQUE ON CONFLICT ABORT,
    name          TEXT (50)   NOT NULL ON CONFLICT ABORT,
    surname       TEXT (50)   NOT NULL ON CONFLICT ABORT,
    username      TEXT (60)   NOT NULL ON CONFLICT ABORT
                              UNIQUE ON CONFLICT ABORT,
    password_hash TEXT (64)   NOT NULL ON CONFLICT ABORT,
    is_admin      INTEGER (1) NOT NULL ON CONFLICT ABORT
                              DEFAULT (0) 
);

INSERT INTO users (id, name, surname, username, password_hash, is_admin) VALUES (1, 'Christian', 'Herrera', 'admin', '$2y$10$iPNef9BqfNqt1iL5dBbi0.qujkpkmdfQy7tbHBTEZV6H4Kk.bC5ea', 1);
INSERT INTO users (id, name, surname, username, password_hash, is_admin) VALUES (2, 'Pedro', 'Gonzales', 'user', '$2y$10$iPNef9BqfNqt1iL5dBbi0.qujkpkmdfQy7tbHBTEZV6H4Kk.bC5ea', 0);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
