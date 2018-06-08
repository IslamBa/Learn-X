-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jun 2018 um 08:13
-- Server-Version: 10.1.19-MariaDB
-- PHP-Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `learnx`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `b_id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `passwort` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`b_id`, `name`, `passwort`) VALUES
(1, 'vishwas', 'geheim'),
(6, 'islam', 'mois'),
(7, 'tolga', 'gala'),
(34, 'lenovo', '$2b$10$yTi1/Y3ByfGsU3yJDfFPWeet5LVTb0pJgaylHe7A3lnKXiqgtfPMq'),
(35, 'bcrypt', '$2b$10$jv988Gew591qnc5Njn6t7.Yd4dalUisax.r/xaK.Azf9vkJTf58xC');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer_liste`
--

CREATE TABLE `benutzer_liste` (
  `id` int(11) NOT NULL,
  `b_id` int(11) NOT NULL,
  `l_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `benutzer_liste`
--

INSERT INTO `benutzer_liste` (`id`, `b_id`, `l_id`) VALUES
(13, 1, 1),
(11, 1, 16),
(12, 1, 17),
(32, 4, 0),
(33, 4, 0),
(34, 4, 1),
(6, 4, 11),
(35, 4, 14),
(36, 4, 24),
(37, 4, 25),
(38, 4, 26),
(39, 4, 27),
(1, 6, 1),
(2, 6, 4),
(4, 6, 9),
(5, 6, 10),
(7, 6, 12),
(8, 6, 13),
(10, 6, 15),
(28, 6, 22),
(31, 6, 23),
(14, 7, 1),
(15, 8, 1),
(16, 8, 2),
(17, 8, 2),
(18, 8, 2),
(19, 8, 4),
(25, 8, 13),
(27, 8, 15),
(26, 8, 16),
(20, 8, 18),
(21, 8, 19),
(22, 8, 20),
(23, 8, 20),
(24, 8, 21),
(29, 8, 22),
(30, 8, 23),
(9, 30, 14);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `inhalt`
--

CREATE TABLE `inhalt` (
  `f_id` int(11) NOT NULL,
  `frage` text NOT NULL,
  `antwort` text NOT NULL,
  `l_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `inhalt`
--

INSERT INTO `inhalt` (`f_id`, `frage`, `antwort`, `l_id`) VALUES
(1, 'Wie lautet die Haupstadt von Österreich?', 'Wien', 1),
(2, 'Auf welchem Kontinent liegt Uganda', 'Afrika', 1),
(3, 'Was bedeutet Maschine auf Englisch?', 'machine', 4),
(5, 'asdfasf', 'afasfasf', 10),
(6, 'asfasf', 'asfasf', 19),
(7, 'sss', 'fsfsf', 19),
(8, 'bbb', 'asasf', 19),
(9, 'Was kommt nach a', 'b', 22),
(10, 'Wann wurde Rom gegründet', '753', 1),
(11, 'Was ist ein Intergral?', 'Ein mathematisches Konstrukt zur Berechnung komplexer Flächen.', 12),
(12, '4+4+4', '12', 12);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `liste`
--

CREATE TABLE `liste` (
  `l_id` int(11) NOT NULL,
  `g_name` varchar(20) NOT NULL,
  `pers_anz` int(11) NOT NULL,
  `rnd_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `liste`
--

INSERT INTO `liste` (`l_id`, `g_name`, `pers_anz`, `rnd_id`) VALUES
(1, 'GGP', 6, 'P519eCk'),
(4, 'Englisch', 2, 'aQmto9R'),
(9, 'Deutsch', 1, 'H3mVZQ2'),
(12, 'Mathe', 1, 'xk2nQgp'),
(13, 'Alles', 2, 'B1tNbNa'),
(14, 'Mathe', 2, 'iP4Whb8'),
(16, 'Eng', 2, 'sw54E73'),
(17, 'medt', 1, 'KBqyOLw'),
(21, 'deutsch', 1, 'X6euQ7H'),
(27, 'INSY', 1, 'heFi5Q');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`b_id`);

--
-- Indizes für die Tabelle `benutzer_liste`
--
ALTER TABLE `benutzer_liste`
  ADD PRIMARY KEY (`id`),
  ADD KEY `b_id` (`b_id`,`l_id`);

--
-- Indizes für die Tabelle `inhalt`
--
ALTER TABLE `inhalt`
  ADD PRIMARY KEY (`f_id`),
  ADD KEY `l_id` (`l_id`);

--
-- Indizes für die Tabelle `liste`
--
ALTER TABLE `liste`
  ADD PRIMARY KEY (`l_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT für Tabelle `benutzer_liste`
--
ALTER TABLE `benutzer_liste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT für Tabelle `inhalt`
--
ALTER TABLE `inhalt`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `liste`
--
ALTER TABLE `liste`
  MODIFY `l_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
