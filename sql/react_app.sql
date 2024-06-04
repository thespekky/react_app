-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jún 04. 20:28
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
-- Tábla szerkezet ehhez a táblához `kosarasok`
--

CREATE TABLE `kosarasok` (
  `ID` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `bdate` date NOT NULL,
  `team` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `image` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `introduction` varchar(200) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kosarasok`
--

INSERT INTO `kosarasok` (`ID`, `name`, `bdate`, `team`, `image`, `introduction`) VALUES
(1, 'Valaki Valami', '2022-10-18', 'Csapat1', '', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, placeat illo veniam iste sunt maxime eaque repellendus! Perferendis natus saepe ad veritatis sit dolores voluptatibus harum elige'),
(2, 'Valaki Valami 1', '2002-10-18', 'CSapat2', '', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, placeat illo veniam iste sunt maxime eaque repellendus! Perferendis natus saepe ad veritatis sit dolores voluptatibus harum elige'),
(3, 'Valaki Valami 2', '2012-10-18', 'CSapat3', '', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta error, placeat illo veniam iste sunt maxime eaque');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `email` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `refreshtoken` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
(9, 'asdad@asd.com', 'asdad@asd.com asdad@asd.com', 'asdad@asd.com', 'f74b1bfad7e8395aa72779cff01e19e3c317fc09', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kosarasok`
--
ALTER TABLE `kosarasok`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kosarasok`
--
ALTER TABLE `kosarasok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
