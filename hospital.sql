-- phpMyAdmin SQL Dump
-- version 4.4.15.8
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 28, 2018 at 01:39 PM
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
-- Table structure for table `bookmarks`
--

CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` int(11) NOT NULL,
  `parrent_id` varchar(255) NOT NULL,
  `bookmarked_id` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `parrent_id`, `bookmarked_id`) VALUES
(3, '8', '9'),
(5, '7', '10'),
(6, '8', '12');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL,
  `parrent_id` varchar(255) NOT NULL,
  `cmt_for` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  `parrent_name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `parrent_id`, `cmt_for`, `content`, `status`, `rating`, `parrent_name`) VALUES
(5, '8', '10', 'test comment 2', '1', '5', 'hellcatvn'),
(6, '8', '10', 'test comment', '0', '5', 'hellcatvn'),
(7, '8', '10', 'test comment 3', '1', '', 'hellcatvn'),
(8, '8', '10', 'test comment 4', '1', '', 'hellcatvn'),
(9, '8', '10', 'sadsada', '1', '5', 'hellcatvn');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `fullName`, `fstLogin`, `active`, `role`, `resetPasswordToken`, `resetPasswordExpires`, `firstName`, `lastName`, `gender`, `email`, `address`, `languages`, `website`, `workIn`, `degree`, `acceptedInsurance`, `specialty`, `workHours`, `hospitalName`) VALUES
(8, 'hellcatvn', '$2a$10$uAKh5LgnkwmDQcQstj2it.AhZppj1up3wGJlMq5HiCQNth7wBOFIS', 'Trần Quốc Long', '1', 1, 'sysAdmin', '7fd57a6658675f7b7d71f6027', '2018-04-14 05:22:00', 'Long', 'Trần', 'female', 'hellcatvn@gmail.com', '', 'en', '', 0, 'Master', 'Yes', '', 0, ''),
(10, 'test01', '$2a$10$2jmVGmR2.qvWCEhSRCWoJ./5R7T/4iZ7awIlZ9EDlKKT8w0/6KYE2', '', '1', 1, 'doctor', '65ba2ae6979263f26ccf69715', '2018-05-27 05:33:41', 'Long', 'Trần', 'male', 'longmeowvn@gmail.com', 'Nguyễn Thị Minh Khai', 'vi', '', 0, 'Master', 'Yes', '', 0, 'Gia Định'),
(12, 'hellcatvn@gmail.com', '$2a$10$AcHSl9wlLIBW248Yw9zjVeJk8ZiuiHpWC2qK2hmgUbWrD.Ifw6lji', '', '0', 1, 'user', '', '0000-00-00 00:00:00', '', '', '', '', '', '', '', 0, '', '', '', 0, ''),
(13, 'test03', '$2a$10$37dxfS7ZCFY.VB3z13ARuu52Wr/YTaAzp5xia50yZXqHbJmcM.zHO', '', '1', 1, 'hospital', '', '0000-00-00 00:00:00', 'Dũng', 'Việt', '', 'vietdung@gmail.com', 'CMT8', '', '', 0, '', '', '', 0, 'Gia Định');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `working_hours`
--

INSERT INTO `working_hours` (`id`, `parrent_id`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`) VALUES
(5, '10', '11:00 AM-12:00 AM', '11:00 AM-11:00 AM', '11:00 AM-11:00 AM', '11:00 AM-11:00 AM', '11:00 AM-11:00 AM', '11:00 AM-11:00 AM', '07:00 AM-11:00 AM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `specialty_categories`
--
ALTER TABLE `specialty_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `working_hours`
--
ALTER TABLE `working_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
