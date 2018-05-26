-- phpMyAdmin SQL Dump
-- version 4.4.15.8
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 26, 2018 at 04:10 AM
-- Server version: 5.6.31
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `specialty_categories`
--

CREATE TABLE IF NOT EXISTS `specialty_categories` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `specialty_categories`
--

INSERT INTO `specialty_categories` (`id`, `type`) VALUES
(2, 'type02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `fstLogin` varchar(255) NOT NULL,
  `active` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `resetPasswordToken` varchar(255) NOT NULL,
  `resetPasswordExpires` datetime NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `languages` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `workIn` int(11) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `acceptedInsurance` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL,
  `workHours` int(11) NOT NULL,
  `hospitalName` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `fstLogin`, `active`, `role`, `resetPasswordToken`, `resetPasswordExpires`, `firstName`, `lastName`, `gender`, `email`, `address`, `languages`, `website`, `workIn`, `degree`, `acceptedInsurance`, `specialty`, `workHours`, `hospitalName`) VALUES
(8, 'hellcatvn', '$2a$10$uAKh5LgnkwmDQcQstj2it.AhZppj1up3wGJlMq5HiCQNth7wBOFIS', 'Trần Quốc Long', '1', 1, 'sysAdmin', '7fd57a6658675f7b7d71f6027', '2018-04-14 05:22:00', '', '', '', '', '', '', '', 0, '', '', '', 0, ''),
(10, 'test01', '$2a$10$pVloHB7bG2joH5KTA8nFp.PHNLMjJpJfmrX6zJ1Zfc5/C4m3caqHi', '', '1', 1, 'doctor', '', '0000-00-00 00:00:00', 'Long', 'Trần', 'male', 'hellcatvn@gmail.com', 'Nguyễn Thị Minh Khai', 'vi', '', 0, 'Master', 'Yes', '', 0, 'Gia Định'),
(12, 'hellcatvn@gmail.com', '$2a$10$AcHSl9wlLIBW248Yw9zjVeJk8ZiuiHpWC2qK2hmgUbWrD.Ifw6lji', '', '0', 1, 'user', '', '0000-00-00 00:00:00', '', '', '', '', '', '', '', 0, '', '', '', 0, ''),
(13, 'dung@gmail.com', '$2a$10$yOTTKV/5ToZNWu/XwsPev.5dvrXrfuyVjpORetCW9kDCB32ncNbLy', '', '0', 1, 'user', '', '0000-00-00 00:00:00', '', '', '', '', '', '', '', 0, '', '', '', 0, ''),
(14, 'dung', '$2a$10$ohWQvPRHSek6vY9pk3DQsuoaEd30oH6Z2xgDEZY8OR9jYlb/qUtTi', '', '0', 1, 'user', '', '0000-00-00 00:00:00', '', '', '', '', '', '', '', 0, '', '', '', 0, ''),
(15, 'dungoccac', '$2a$10$dD8/L75wf6XtSnixadHWSeX3XQkeFRnhIgOE5krqj0f/2ukMy85dO', '', '1', 1, 'patient', '', '0000-00-00 00:00:00', '', '', '', '', '', '', '', 0, '', '', '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `working_hours`
--

CREATE TABLE IF NOT EXISTS `working_hours` (
  `id` int(11) NOT NULL,
  `parrent_id` varchar(255) NOT NULL,
  `monday` varchar(255) NOT NULL,
  `tuesday` varchar(255) NOT NULL,
  `wednesday` varchar(255) NOT NULL,
  `thursday` varchar(255) NOT NULL,
  `friday` varchar(255) NOT NULL,
  `saturday` varchar(255) NOT NULL,
  `sunday` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `specialty_categories`
--
ALTER TABLE `specialty_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `working_hours`
--
ALTER TABLE `working_hours`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `specialty_categories`
--
ALTER TABLE `specialty_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `working_hours`
--
ALTER TABLE `working_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
