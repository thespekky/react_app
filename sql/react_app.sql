-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Sze 29. 19:01
-- Kiszolgáló verziója: 10.4.17-MariaDB
-- PHP verzió: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `react_app`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvencek`
--

CREATE TABLE `kedvencek` (
  `user_id` int(11) NOT NULL,
  `kosarasok_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kedvencek`
--

INSERT INTO `kedvencek` (`user_id`, `kosarasok_id`) VALUES
(5, 4),
(11, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosarasok`
--

CREATE TABLE `kosarasok` (
  `ID` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `bdate` date NOT NULL,
  `team` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `image` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `introduction` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kosarasok`
--

INSERT INTO `kosarasok` (`ID`, `name`, `bdate`, `team`, `image`, `introduction`, `start_date`, `end_date`) VALUES
(1, 'Valaki Valami', '2022-10-18', 'Csapat1', 'image.png', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, placeat illo veniam iste sunt maxime eaque repellendus! Perferendis natus saepe ad veritatis sit dolores voluptatibus harum elige', '2024-04-01', NULL),
(2, 'Valaki Valami 1', '2002-10-18', 'CSapat2', 'image.png', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, placeat illo veniam iste sunt maxime eaque repellendus! Perferendis natus saepe ad veritatis sit dolores voluptatibus harum elige', '2023-03-25', '2024-09-04'),
(3, 'Valaki Valami 2', '2012-10-18', 'CSapat3', 'image.png', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, placeat illo veniam iste sunt maxime eaque', '2024-09-01', '2024-09-19'),
(4, 'Valami10', '2001-11-22', 'CS10', 'image.png', 'Intro', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosarasok_csalad`
--

CREATE TABLE `kosarasok_csalad` (
  `ID` int(11) NOT NULL,
  `Vezetek_nev` text COLLATE utf8_hungarian_ci NOT NULL,
  `Kereszt_nev` text COLLATE utf8_hungarian_ci NOT NULL,
  `Kapcsolat` text COLLATE utf8_hungarian_ci NOT NULL,
  `Kosaras` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosarasok_eredmenyek`
--

CREATE TABLE `kosarasok_eredmenyek` (
  `ID` int(11) NOT NULL,
  `kosaras_id` int(11) NOT NULL,
  `helyszin` text COLLATE utf8_hungarian_ci NOT NULL,
  `csarnok` text COLLATE utf8_hungarian_ci NOT NULL,
  `pontok` int(11) NOT NULL,
  `buntetesek` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kosarasok_eredmenyek`
--

INSERT INTO `kosarasok_eredmenyek` (`ID`, `kosaras_id`, `helyszin`, `csarnok`, `pontok`, `buntetesek`) VALUES
(1, 1, 'Baja', 'Aréna', 12, 'sárgalap'),
(2, 1, 'Baja1', 'Aréna1', 121, 'sárgalap1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `email` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `refreshtoken` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `refreshtoken`
--

INSERT INTO `refreshtoken` (`email`, `refreshtoken`) VALUES
('admin@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNzUzMzM1NX0.UN68B5cN6ZOKezLBlIJolwrhICOahUAYzzYiWUV2B5s'),
('asdad@asd.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGFkQGFzZC5jb20iLCJpYXQiOjE3MTc2MTYyMjZ9.8u02Mos8H67QbEf5dJeFuq3EPfgeMEAM08_k1dfWWCc'),
('simpleuser@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXBsZXVzZXJAZ21haWwuY29tIiwiaWF0IjoxNzI0MTY3MjU0fQ.4m7fm4Fhpuwh_5KMze5AkEVjO4BTlT5TJZdQRotPaZU');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `username`, `name`, `email`, `password`, `admin`) VALUES
(1, 'user_name', 'Name Name', 'usermail@gmail.com', 'secret', 0),
(2, 'admin_name', 'Admin Admin', 'admin@gmail.com', 'f74b1bfad7e8395aa72779cff01e19e3c317fc09', 1),
(5, 'asdasd', 'asd  asd2', 'teszt1@teszt1.teszt1', 'Teszt1@teszt1.teszt1', 0),
(8, 'teszt1@teszt1.teszt1', 'teszt1@teszt1.teszt1 teszt1@teszt1.teszt1', 'teszt1@teszt1.teszt112121', 'e0ae94f6fb0b5c3e09cff5d1bf2cc523e041ee36', 0),
(9, 'asdad@asd.com', 'asdad@asd.com asdad@asd.com', 'asdad@asd.com', 'f74b1bfad7e8395aa72779cff01e19e3c317fc09', 0),
(11, 'su', 'Simple User', 'simpleuser@gmail.com', '$2b$10$xmpVYEcX3dLfNDdKLg6.ae9litJvwd6ggHngerD4Bc5HKY1oxJIle', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kedvencek`
--
ALTER TABLE `kedvencek`
  ADD KEY `user_id` (`user_id`,`kosarasok_id`),
  ADD KEY `kosarasok_id` (`kosarasok_id`);

--
-- A tábla indexei `kosarasok`
--
ALTER TABLE `kosarasok`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `kosarasok_csalad`
--
ALTER TABLE `kosarasok_csalad`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Kosaras` (`Kosaras`);

--
-- A tábla indexei `kosarasok_eredmenyek`
--
ALTER TABLE `kosarasok_eredmenyek`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `kosaras_id` (`kosaras_id`);

--
-- A tábla indexei `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kosarasok`
--
ALTER TABLE `kosarasok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `kosarasok_csalad`
--
ALTER TABLE `kosarasok_csalad`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kosarasok_eredmenyek`
--
ALTER TABLE `kosarasok_eredmenyek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kedvencek`
--
ALTER TABLE `kedvencek`
  ADD CONSTRAINT `kedvencek_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `kedvencek_ibfk_2` FOREIGN KEY (`kosarasok_id`) REFERENCES `kosarasok` (`ID`);

--
-- Megkötések a táblához `kosarasok_csalad`
--
ALTER TABLE `kosarasok_csalad`
  ADD CONSTRAINT `kosarasok_csalad_ibfk_1` FOREIGN KEY (`Kosaras`) REFERENCES `kosarasok` (`ID`);

--
-- Megkötések a táblához `kosarasok_eredmenyek`
--
ALTER TABLE `kosarasok_eredmenyek`
  ADD CONSTRAINT `kosarasok_eredmenyek_ibfk_1` FOREIGN KEY (`kosaras_id`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
