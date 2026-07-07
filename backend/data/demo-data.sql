-- ============================================
-- BASE DE DATOS METROCDMX - MOVILIDAD CIUDAD DE MÉXICO
-- ============================================

CREATE DATABASE IF NOT EXISTS dashboard_ia_db;
USE dashboard_ia_db;

-- 1. Eliminar tablas antiguas si existen
DROP TABLE IF EXISTS alertas;
DROP TABLE IF EXISTS tarifas;
DROP TABLE IF EXISTS estaciones;
DROP TABLE IF EXISTS lineas_metro;
DROP TABLE IF EXISTS operadores;

DROP TABLE IF EXISTS tickets_ti;
DROP TABLE IF EXISTS inventario;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS presupuestos;
DROP TABLE IF EXISTS empleados;
DROP TABLE IF EXISTS cursos_academia;
DROP TABLE IF EXISTS servicios_corporativos;
DROP TABLE IF EXISTS info_empresa;
DROP TABLE IF EXISTS servicios;
DROP TABLE IF EXISTS departamentos;

-- 2. Crear nuevas tablas
CREATE TABLE lineas_metro (
  id INT PRIMARY KEY AUTO_INCREMENT,
  linea VARCHAR(5) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  color_hex VARCHAR(7) NOT NULL,
  total_estaciones INT,
  primera_salida TIME,
  ultima_salida TIME,
  estado ENUM('normal','lento','suspendido') DEFAULT 'normal',
  mensaje_estado TEXT
);

CREATE TABLE estaciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  linea_id INT,
  sistema VARCHAR(20) NOT NULL,        -- metro, metrobus, cablebus, trolebus, tren_ligero, rtp, suburbano, ecobici
  latitud DECIMAL(10,8) NOT NULL,
  longitud DECIMAL(11,8) NOT NULL,
  accesible BOOLEAN DEFAULT FALSE,
  tiene_elevador BOOLEAN DEFAULT FALSE,
  correspondencia JSON,                -- Array de strings con otras líneas en la misma estación, e.g. ["L2", "L9"]
  FOREIGN KEY (linea_id) REFERENCES lineas_metro(id) ON DELETE SET NULL
);

CREATE TABLE alertas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sistema VARCHAR(20) NOT NULL,
  linea VARCHAR(10),
  tipo ENUM('incidencia','mantenimiento','suspension','informativo') NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  inicio DATETIME NOT NULL,
  fin_esperado DATETIME,
  activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE tarifas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sistema VARCHAR(20) NOT NULL,
  categoria VARCHAR(30) NOT NULL,      -- general, estudiante, adulto_mayor, discapacidad
  precio DECIMAL(8,2) NOT NULL,
  moneda VARCHAR(3) DEFAULT 'MXN',
  descripcion TEXT
);

CREATE TABLE operadores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  nombre_corto VARCHAR(20) NOT NULL,
  descripcion TEXT,
  sitio_web VARCHAR(255),
  color_hex VARCHAR(7),
  horario_semana VARCHAR(100),
  horario_sabado VARCHAR(100),
  horario_domingo VARCHAR(100)
);

-- 3. Poblar tablas

-- LINEAS METRO
INSERT INTO lineas_metro (linea, nombre, color_hex, total_estaciones, primera_salida, ultima_salida, estado, mensaje_estado) VALUES
('L1', 'Observatorio - Pantitlán', '#F54394', 20, '05:00:00', '00:00:00', 'normal', 'Servicio normal en toda la línea.'),
('L2', 'Cuatro Caminos - Tasqueña', '#004F9F', 24, '05:00:00', '00:00:00', 'normal', 'Servicio normal. Sin demoras reportadas.'),
('L3', 'Indios Verdes - Universidad', '#007D63', 21, '05:00:00', '00:00:00', 'lento', 'Afluencia alta de usuarios, avance de trenes lento de 6 a 8 minutos.'),
('L4', 'Martín Carrera - Santa Anita', '#00A19B', 10, '05:00:00', '00:00:00', 'normal', 'Avance de trenes continuo.'),
('L5', 'Politécnico - Pantitlán', '#FED300', 13, '05:00:00', '00:00:00', 'normal', 'Servicio regular en terminales.'),
('L6', 'El Rosario - Martín Carrera', '#D8232A', 10, '05:00:00', '00:00:00', 'normal', 'Servicio operando sin novedades.'),
('L7', 'El Rosario - Barranca del Muerto', '#E97D00', 14, '05:00:00', '00:00:00', 'normal', 'Flujo de trenes constante de 4 minutos.'),
('L8', 'Garibaldi/Lagunilla - Constitución de 1917', '#00843D', 19, '05:00:00', '00:00:00', 'normal', 'Avance regular.'),
('L9', 'Tacubaya - Pantitlán', '#691B31', 12, '05:00:00', '00:00:00', 'suspendido', 'Suspensión parcial por obras de renivelación entre Pantitlán y Puebla.'),
('LA', 'Pantitlán - La Paz', '#9E1B32', 10, '05:00:00', '00:00:00', 'normal', 'Servicio funcionando con normalidad.'),
('LB', 'Buenavista - Ciudad Azteca', '#B2B2B2', 21, '05:00:00', '00:00:00', 'normal', 'Servicio estable.'),
('L12', 'Mixcoac - Tláhuac', '#B0925A', 20, '05:00:00', '00:00:00', 'normal', 'Operación normal con trenes cada 5 minutos.');

-- ESTACIONES METRO (Key Stations and Correspondence Stations)
INSERT INTO estaciones (nombre, linea_id, sistema, latitud, longitud, accesible, tiene_elevador, correspondencia) VALUES
('Pantitlán', 1, 'metro', 19.41620000, -99.07470000, TRUE, TRUE, '["L5", "L9", "LA"]'),
('Tacubaya', 1, 'metro', 19.40320000, -99.18720000, TRUE, FALSE, '["L7", "L9"]'),
('Balderas', 1, 'metro', 19.42730000, -99.14910000, FALSE, FALSE, '["L3"]'),
('Chabacano', 2, 'metro', 19.40850000, -99.13580000, TRUE, TRUE, '["L8", "L9"]'),
('Zócalo/Tenochtitlan', 2, 'metro', 19.43280000, -99.13320000, FALSE, FALSE, '[]'),
('Bellas Artes', 2, 'metro', 19.43620000, -99.14170000, TRUE, TRUE, '["L8"]'),
('Hidalgo', 2, 'metro', 19.43730000, -99.14720000, TRUE, FALSE, '["L3"]'),
('Pino Suárez', 1, 'metro', 19.42600000, -99.13300000, TRUE, FALSE, '["L2"]'),
('Salto del Agua', 1, 'metro', 19.42700000, -99.14200000, FALSE, FALSE, '["L8"]'),
('Ermita', 2, 'metro', 19.36210000, -99.14290000, TRUE, TRUE, '["L12"]'),
('Zapata', 3, 'metro', 19.37070000, -99.16480000, TRUE, TRUE, '["L12"]'),
('Mixcoac', 7, 'metro', 19.37610000, -99.18760000, TRUE, TRUE, '["L12"]'),
('Atlalilco', 8, 'metro', 19.35640000, -99.10140000, TRUE, TRUE, '["L12"]'),
('Martín Carrera', 4, 'metro', 19.48510000, -99.10440000, FALSE, FALSE, '["L6"]'),
('El Rosario', 6, 'metro', 19.50420000, -99.20010000, TRUE, TRUE, '["L7"]'),
('La Raza', 3, 'metro', 19.46970000, -99.13680000, FALSE, FALSE, '["L5"]'),
('Consulado', 4, 'metro', 19.45820000, -99.11320000, FALSE, FALSE, '["L5"]'),
('Oceanía', 5, 'metro', 19.44550000, -99.08720000, FALSE, FALSE, '["LB"]'),
('San Lázaro', 1, 'metro', 19.43030000, -99.11470000, TRUE, TRUE, '["LB"]'),
('Guerrero', 3, 'metro', 19.44520000, -99.14650000, TRUE, FALSE, '["LB"]'),
('Garibaldi/Lagunilla', 8, 'metro', 19.44430000, -99.13960000, TRUE, FALSE, '["LB"]'),
('Jamaica', 4, 'metro', 19.40880000, -99.12190000, TRUE, FALSE, '["L9"]'),
('Santa Anita', 4, 'metro', 19.39760000, -99.12160000, TRUE, FALSE, '["L8"]'),
('Deportivo 18 de Marzo', 3, 'metro', 19.48390000, -99.12610000, TRUE, FALSE, '["L6"]'),
('Instituto del Petróleo', 5, 'metro', 19.48970000, -99.14370000, FALSE, FALSE, '["L6"]'),
('Indios Verdes', 3, 'metro', 19.49750000, -99.11970000, TRUE, TRUE, '[]'),
('Observatorio', 1, 'metro', 19.39820000, -99.20030000, FALSE, FALSE, '[]'),
('Cuatro Caminos', 2, 'metro', 19.45970000, -99.21580000, TRUE, TRUE, '[]'),
('Tasqueña', 2, 'metro', 19.34420000, -99.14250000, TRUE, FALSE, '[]'),
('Universidad', 3, 'metro', 19.32430000, -99.17420000, TRUE, FALSE, '[]'),
('Barranca del Muerto', 7, 'metro', 19.36060000, -99.18950000, TRUE, TRUE, '[]'),
('Constitución de 1917', 8, 'metro', 19.34580000, -99.06280000, TRUE, TRUE, '[]'),
('La Paz', 10, 'metro', 19.35030000, -98.97930000, FALSE, FALSE, '[]'),
('Buenavista', 11, 'metro', 19.44610000, -99.15240000, TRUE, TRUE, '[]'),
('Ciudad Azteca', 11, 'metro', 19.53420000, -99.02720000, TRUE, TRUE, '[]'),
('Tláhuac', 12, 'metro', 19.28690000, -99.00510000, TRUE, TRUE, '[]'),
-- Estaciones Intermedias Relevantes
('Sevilla', 1, 'metro', 19.42170000, -99.17060000, TRUE, FALSE, '[]'),
('Chapultepec', 1, 'metro', 19.42060000, -99.17640000, TRUE, FALSE, '[]'),
('Insurgentes', 1, 'metro', 19.42330000, -99.16300000, FALSE, FALSE, '[]'),
('Cuauhtémoc', 1, 'metro', 19.42580000, -99.15470000, FALSE, FALSE, '[]'),
('Merced', 1, 'metro', 19.42560000, -99.12510000, FALSE, FALSE, '[]'),
('Candelaria', 1, 'metro', 19.42780000, -99.11970000, FALSE, FALSE, '["L4"]'),
('Moctezuma', 1, 'metro', 19.42750000, -99.11060000, FALSE, FALSE, '[]'),
('Balbuena', 1, 'metro', 19.42440000, -99.10220000, FALSE, FALSE, '[]'),
('Boulevard Puerto Aéreo', 1, 'metro', 19.41970000, -99.09640000, FALSE, FALSE, '[]'),
('Gómez Farías', 1, 'metro', 19.41610000, -99.09030000, FALSE, FALSE, '[]'),
('Zaragoza', 1, 'metro', 19.41250000, -99.08250000, FALSE, FALSE, '[]'),
('Revolución', 2, 'metro', 19.43890000, -99.15390000, FALSE, FALSE, '[]'),
('Allende', 2, 'metro', 19.43580000, -99.13750000, FALSE, FALSE, '[]'),
('San Antonio Abad', 2, 'metro', 19.41830000, -99.13420000, FALSE, FALSE, '[]'),
('Viaducto', 2, 'metro', 19.40080000, -99.13640000, FALSE, FALSE, '[]'),
('Xola', 2, 'metro', 19.39530000, -99.13780000, TRUE, FALSE, '[]'),
('Villa de Cortés', 2, 'metro', 19.38780000, -99.13940000, FALSE, FALSE, '[]'),
('Nativitas', 2, 'metro', 19.37940000, -99.14030000, FALSE, FALSE, '[]'),
('Portales', 2, 'metro', 19.36970000, -99.14170000, FALSE, FALSE, '[]'),
('General Anaya', 2, 'metro', 19.35330000, -99.14220000, FALSE, FALSE, '[]'),
('Tlatelolco', 3, 'metro', 19.45030000, -99.14280000, FALSE, FALSE, '[]'),
('Juárez', 3, 'metro', 19.43360000, -99.14780000, FALSE, FALSE, '[]'),
('Niños Héroes', 3, 'metro', 19.41890000, -99.15080000, FALSE, FALSE, '[]'),
('Hospital General', 3, 'metro', 19.41280000, -99.15220000, FALSE, FALSE, '[]'),
('Centro Médico', 3, 'metro', 19.40690000, -99.15500000, TRUE, TRUE, '["L9"]'),
('Eugenia', 3, 'metro', 19.38580000, -99.15810000, FALSE, FALSE, '[]'),
('División del Norte', 3, 'metro', 19.37970000, -99.15940000, FALSE, FALSE, '[]'),
('Coyoacán', 3, 'metro', 19.36190000, -99.17110000, FALSE, FALSE, '[]'),
('Viveros/Derechos Humanos', 3, 'metro', 19.35360000, -99.17580000, FALSE, FALSE, '[]'),
('Miguel Ángel de Quevedo', 3, 'metro', 19.34580000, -99.18030000, FALSE, FALSE, '[]'),
('Copilco', 3, 'metro', 19.33580000, -99.17690000, FALSE, FALSE, '[]'),
('Polanco', 7, 'metro', 19.43280000, -99.19140000, TRUE, TRUE, '[]'),
('Auditorio', 7, 'metro', 19.42580000, -99.19220000, TRUE, FALSE, '[]'),
('Constituyentes', 7, 'metro', 19.41190000, -99.19220000, FALSE, FALSE, '[]'),
('San Antonio', 7, 'metro', 19.37030000, -99.18890000, FALSE, FALSE, '[]'),
('Patriotismo', 9, 'metro', 19.40580000, -99.17830000, TRUE, FALSE, '[]'),
('Chilpancingo', 9, 'metro', 19.40610000, -99.16890000, TRUE, FALSE, '[]'),
('Lázaro Cárdenas', 9, 'metro', 19.40670000, -99.14360000, FALSE, FALSE, '[]'),
('Velódromo', 9, 'metro', 19.40830000, -99.09780000, FALSE, FALSE, '[]'),
('Ciudad Deportiva', 9, 'metro', 19.40860000, -99.08830000, FALSE, FALSE, '[]'),
('Puebla', 9, 'metro', 19.40720000, -99.08250000, FALSE, FALSE, '[]'),
('Insurgentes Sur', 12, 'metro', 19.37420000, -99.17860000, TRUE, TRUE, '[]'),
('Hospital 20 de Noviembre', 12, 'metro', 19.37250000, -99.17060000, TRUE, TRUE, '[]'),
('Parque de los Venados', 12, 'metro', 19.37060000, -99.15780000, TRUE, TRUE, '[]'),
('Eje Central', 12, 'metro', 19.36640000, -99.14780000, TRUE, TRUE, '[]'),
('Mexicaltzingo', 12, 'metro', 19.35890000, -99.12190000, TRUE, TRUE, '[]'),
('Culhuacán', 12, 'metro', 19.34080000, -99.10830000, TRUE, TRUE, '[]'),
('San Andrés Tomatlán', 12, 'metro', 19.33080000, -99.09580000, TRUE, TRUE, '[]'),
('Periférico Oriente', 12, 'metro', 19.31780000, -99.07470000, TRUE, TRUE, '[]'),
('Olivos', 12, 'metro', 19.30610000, -99.05780000, TRUE, TRUE, '[]'),
('Nopalera', 12, 'metro', 19.30060000, -99.04940000, TRUE, TRUE, '[]');

-- ALERTAS MOCK
INSERT INTO alertas (sistema, linea, tipo, titulo, descripcion, inicio, fin_esperado, activa) VALUES
('metro', 'L3', 'incidencia', 'Avance lento de trenes', 'Afluencia máxima en terminal Indios Verdes. Tiempos de espera de 8 minutos. Toma previsiones.', NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), TRUE),
('metro', 'L9', 'suspension', 'Cierre parcial por mantenimiento', 'Estaciones Pantitlán, Puebla y Ciudad Deportiva permanecen cerradas por obras de renivelación. RTP ofrece servicio alterno.', '2024-01-01 05:00:00', NULL, TRUE),
('metrobus', 'L1', 'incidencia', 'Desvío de ruta por manifestación', 'Metrobús realiza desvíos en Av. Insurgentes a la altura de Reforma. Estaciones Hamburgo y El Ángel sin servicio temporal.', NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), TRUE),
('cablebus', 'L2', 'mantenimiento', 'Mantenimiento Anual Programado', 'Servicio suspendido temporalmente por revisión periódica de cables de tracción. Se dispone de apoyo de autobuses RTP.', NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), TRUE),
('metro', 'L1', 'informativo', 'Obras de Modernización L1', 'Modernización de vías y sistemas tecnológicos de Balderas a Observatorio. Servicio operado de Pantitlán a Balderas únicamente.', '2023-11-09 05:00:00', NULL, TRUE);

-- TARIFAS VIGENTES 2024
INSERT INTO tarifas (sistema, categoria, precio, moneda, descripcion) VALUES
('metro', 'general', 5.00, 'MXN', 'Tarifa plana general para todo el sistema de metro de la CDMX.'),
('metrobus', 'general', 6.00, 'MXN', 'Tarifa general por viaje. Transbordo gratuito entre líneas dentro de las primeras 2 horas.'),
('metrobus', 'aeropuerto', 30.00, 'MXN', 'Tarifa especial Línea 4 desde o hacia las terminales del AICM.'),
('cablebus', 'general', 7.00, 'MXN', 'Tarifa plana por viaje en las líneas 1 y 2.'),
('rtp', 'ordinario', 2.00, 'MXN', 'Autobuses de ruta regular con paradas establecidas.'),
('rtp', 'expreso', 4.00, 'MXN', 'Autobuses exprés que circulan por vías rápidas y realizan menos paradas.'),
('rtp', 'atenea', 2.00, 'MXN', 'Servicio exclusivo para mujeres y niños.'),
('rtp', 'nochebus', 7.00, 'MXN', 'Servicio de transporte transporte nocturno que opera de 00:00 a 05:00 horas.'),
('trolebus', 'general', 4.00, 'MXN', 'Tarifa regular para líneas de trolebús.'),
('trolebus', 'elevado', 7.00, 'MXN', 'Tarifa especial para la Línea 10 (Trolebús Elevado Constitución - Acahualtepec).'),
('tren_ligero', 'general', 4.00, 'MXN', 'Tarifa plana por viaje Tasqueña - Xochimilco.'),
('suburbano', 'corto', 10.00, 'MXN', 'Viaje corto: de 0 a 12.8 kilómetros.'),
('suburbano', 'largo', 23.00, 'MXN', 'Viaje largo: de 12.9 a 25.6 kilómetros.'),
('ecobici', 'anual', 548.00, 'MXN', 'Plan anual de uso ilimitado (trayectos de hasta 45 minutos).'),
('ecobici', '7_dias', 409.00, 'MXN', 'Uso temporal por 7 días consecutivos.'),
('ecobici', '3_dias', 245.00, 'MXN', 'Uso temporal por 3 días consecutivos.'),
('ecobici', '1_dia', 123.00, 'MXN', 'Uso temporal por 1 día (24 horas).'),
('metro', 'adulto_mayor', 0.00, 'MXN', 'Acceso gratuito presentando credencial de elector o INAPAM.'),
('metro', 'discapacidad', 0.00, 'MXN', 'Acceso gratuito presentando tarjeta oficial de gratuidad.');

-- OPERADORES DE TRANSPORTE
INSERT INTO operadores (nombre, nombre_corto, descripcion, sitio_web, color_hex, horario_semana, horario_sabado, horario_domingo) VALUES
('Sistema de Transporte Colectivo Metro', 'STC Metro', 'Red de ferrocarril metropolitano que cruza la CDMX y parte del Estado de México con 195 estaciones activas.', 'https://www.metro.cdmx.gob.mx', '#D40000', 'Lunes a Viernes: 05:00 - 00:00', 'Sábados: 06:00 - 00:00', 'Domingos e Históricos: 07:00 - 00:00'),
('Metrobús de la Ciudad de México', 'Metrobús', 'Sistema de autobús de tránsito rápido (BRT) que circula en carriles exclusivos con 7 líneas en operación.', 'https://www.metrobus.cdmx.gob.mx', '#003DA5', 'Lunes a Sábado: 04:30 - 00:00', 'Sábados: 04:30 - 00:00', 'Domingos y Festivos: 05:00 - 00:00'),
('Red de Transporte de Pasajeros', 'RTP', 'Organismo público que opera autobuses de pasajeros en zonas periféricas y rutas alimentadoras.', 'https://www.rtp.cdmx.gob.mx', '#E87722', 'Lunes a Domingo: 05:00 - 23:00', 'Sábados: 05:00 - 23:00', 'Nochebús: 00:00 - 05:00'),
('Servicios de Transportes Eléctricos', 'STE Trolebús', 'Operador de la red de trolebuses y del Tren Ligero en la zona sur de la Ciudad de México.', 'https://www.ste.cdmx.gob.mx', '#6929C4', 'Lunes a Sábado: 05:00 - 00:00', 'Sábados: 05:00 - 00:00', 'Domingos: 05:30 - 23:30'),
('Cablebús CDMX', 'Cablebús', 'Sistema de transporte teleférico para zonas de difícil acceso geográfico con dos líneas activas.', 'https://www.cablebus.cdmx.gob.mx', '#00843D', 'Lunes a Viernes: 05:00 - 23:00', 'Sábados: 06:00 - 23:00', 'Domingos: 07:00 - 23:00'),
('Ferrocarril Suburbano de la Zona Metropolitana', 'Tren Suburbano', 'Tren rápido de cercanías que conecta Buenavista (CDMX) con Cuautitlán (Estado de México).', 'https://fsuburbano.com', '#9E1B32', 'Lunes a Viernes: 05:00 - 00:30', 'Sábados: 06:00 - 00:30', 'Domingos: 07:00 - 00:30'),
('ECOBICI CDMX', 'ECOBICI', 'Sistema de bicicletas públicas compartidas de la Ciudad de México con más de 680 estaciones.', 'https://ecobici.cdmx.gob.mx', '#00843D', 'Lunes a Domingo: 05:00 - 00:30', 'Sábados: 05:00 - 00:30', 'Domingos: 05:00 - 00:30');
