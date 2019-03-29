-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 31, 2017 at 05:46 PM
-- Server version: 5.5.52-0+deb8u1
-- PHP Version: 5.6.29-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `paczkolab`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
`id` int(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `code` varchar(255) CHARACTER SET latin1 NOT NULL,
  `street` varchar(255) NOT NULL,
  `flat` varchar(255) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `city`, `code`, `street`, `flat`) VALUES
(2, 'Warszawa', '00-999', 'Jerozolimskie', '200'),
(3, 'Wrocław', '11-200', 'Leżajska', '159'),
(12, 'Poznań', '02-300', 'Mielżyńskiego', '15');

-- --------------------------------------------------------

--
-- Table structure for table `box`
--

CREATE TABLE IF NOT EXISTS `box` (
`id` int(255) NOT NULL,
  `size_id` int(255) NOT NULL,
  `address_id` int(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `box`
--

INSERT INTO `box` (`id`, `size_id`, `address_id`) VALUES
(1, 5, 2),
(2, 1, 7),
(3, 6, 6),
(4, 1, 1),
(5, 1, 1),
(8, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `parcel`
--

CREATE TABLE IF NOT EXISTS `parcel` (
`id` int(255) NOT NULL,
  `address_id` int(255) DEFAULT NULL,
  `user_id` int(255) NOT NULL,
  `size_id` int(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parcel`
--

INSERT INTO `parcel` (`id`, `address_id`, `user_id`, `size_id`) VALUES
(10, 2, 17, 1);

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE IF NOT EXISTS `size` (
`id` int(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `price` int(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `size`, `price`) VALUES
(1, 'XLL', 5),
(5, 'XL', 20),
(8, 'XSS', 12),
(9, 'S', 10);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(255) NOT NULL,
  `address_id` int(255) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `credits` int(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `address_id`, `name`, `surname`, `credits`, `pass`) VALUES
(17, 12, 'Jarek', 'Mróż', 15, '$2y$10$Hum9tM2ol1lSTVwx69YY7en2gzXFSCPVeUFNdp08s.o59LNZF.nee'),
(18, 2, 'Piotr', 'Florkiewicz', 10, '$2y$10$E50KFUlLy1EVtjaTfYhOn.oUC7cWoFp21sgCkubZy.DwX3Knnt8OG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `box`
--
ALTER TABLE `box`
 ADD PRIMARY KEY (`id`), ADD KEY `size_id` (`size_id`), ADD KEY `address_id` (`address_id`), ADD KEY `id` (`id`);

--
-- Indexes for table `parcel`
--
ALTER TABLE `parcel`
 ADD PRIMARY KEY (`id`), ADD KEY `address_id` (`address_id`), ADD KEY `user_id` (`user_id`), ADD KEY `size_id` (`size_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`), ADD KEY `address_id` (`address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `box`
--
ALTER TABLE `box`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `parcel`
--
ALTER TABLE `parcel`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `parcel`
--
ALTER TABLE `parcel`
ADD CONSTRAINT `parcel_address_fk` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `parcel_size_fk` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`),
ADD CONSTRAINT `parcel_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
ADD CONSTRAINT `user_address_fk` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
