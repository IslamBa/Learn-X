-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 04. Mai 2018 um 08:16
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
  `passwort` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`b_id`, `name`, `passwort`) VALUES
(1, 'vishwas', 'geheim');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer_liste`
--

CREATE TABLE `benutzer_liste` (
  `id` int(11) NOT NULL,
  `b_id` int(11) NOT NULL,
  `l_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `liste`
--

CREATE TABLE `liste` (
  `l_id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `pers_anz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `benutzer_liste`
--
ALTER TABLE `benutzer_liste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `inhalt`
--
ALTER TABLE `inhalt`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `liste`
--
ALTER TABLE `liste`
  MODIFY `l_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
