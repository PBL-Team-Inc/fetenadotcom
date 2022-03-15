-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2022 at 07:44 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(8) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0-user\r\n1-admin',
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `DoB` date NOT NULL,
  `Password` varchar(30) NOT NULL,
  `CountryCode` varchar(4) NOT NULL,
  `PhoneNumber` varchar(14) NOT NULL,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0-false-not deleted\r\n1-true-deleted',
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`AdminID`, `IsAdmin`, `FirstName`, `LastName`, `Email`, `DoB`, `Password`, `CountryCode`, `PhoneNumber`, `Deleted`, `CreatedOn`) VALUES
(1, 1, 'Tibebe', 'Solomomn', 'tibe@gmail.com', '2022-02-09', '1234qwerty!@#$%', '+251', '999999999', 0, '2022-02-26 12:08:30'),
(2, 1, 'John', 'Robi', 'john@gmail.com', '2022-02-14', '1234qwerty', '+251', '911111111', 0, '2022-02-26 12:08:30'),
(3, 1, 'Sami', 'Sky', 'Sami@gmail.com', '2022-02-01', '1234qwerty', '+25', '911111111', 0, '2022-02-26 12:36:43'),
(4, 1, 'SELAMU', 'lname', 'selamu@gmail.com', '2022-02-08', '12345678Qw', '+251', '911111111', 0, '2022-02-26 18:59:04');

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `ExamName` varchar(50) NOT NULL,
  `ExamKey` varchar(10) NOT NULL,
  `ClassName` varchar(20) DEFAULT NULL,
  `ExamType` varchar(1) NOT NULL DEFAULT 'C',
  `SubjectArea` varchar(50) NOT NULL,
  `Duration` time NOT NULL DEFAULT '30:00:00',
  `AnswerKey` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Weight` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`ExamName`, `ExamKey`, `ClassName`, `ExamType`, `SubjectArea`, `Duration`, `AnswerKey`, `Weight`) VALUES
('Continuous', '1234', 'Dynamics', 'C', 'Physics', '30:00:00', '[\"1\", \"A\"]', 20);

-- --------------------------------------------------------

--
-- Table structure for table `exam_user`
--

CREATE TABLE `exam_user` (
  `UserID` int(8) NOT NULL,
  `ExamKey` varchar(10) NOT NULL,
  `Score` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exam_user`
--

INSERT INTO `exam_user` (`UserID`, `ExamKey`, `Score`) VALUES
(1, '1234', 20);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(8) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0-user\r\n1-admin',
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `DoB` date NOT NULL,
  `Password` varchar(30) NOT NULL,
  `CountryCode` varchar(4) NOT NULL,
  `PhoneNumber` varchar(14) NOT NULL,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0-false-not deleted\r\n1-true-deleted',
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `IsAdmin`, `FirstName`, `LastName`, `Email`, `DoB`, `Password`, `CountryCode`, `PhoneNumber`, `Deleted`, `CreatedOn`) VALUES
(1, 0, 'Tibebe', 'Solomomn', 'tibe@gmail.com', '2022-02-09', '1234qwerty!@#$%', '+251', '999999999', 0, '2022-02-26 12:08:30'),
(2, 0, 'John', 'Robi', 'john@gmail.com', '2022-02-14', '1234qwerty', '+251', '911111111', 0, '2022-02-26 12:08:30'),
(3, 0, 'Sami', 'Sky', 'Sami@gmail.com', '2022-02-01', '1234qwerty', '+251', '911111111', 0, '2022-02-26 12:36:43'),
(4, 0, 'SELAMU', 'lname', 'selamu@gmail.com', '2022-02-17', '12345678Qw', '+251', '911111111', 0, '2022-02-26 18:53:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`),
  ADD UNIQUE KEY `Email` (`Email`(50)),
  ADD KEY `DELETED` (`Deleted`),
  ADD KEY `AccType` (`IsAdmin`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`ExamName`,`ExamType`),
  ADD KEY `ExamKey` (`ExamKey`),
  ADD KEY `ExamType` (`ExamType`),
  ADD KEY `SubjectArea` (`SubjectArea`);

--
-- Indexes for table `exam_user`
--
ALTER TABLE `exam_user`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ExamKey` (`ExamKey`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`(50)),
  ADD KEY `DELETED` (`Deleted`),
  ADD KEY `AccType` (`IsAdmin`),
  ADD KEY `Email_2` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exam_user`
--
ALTER TABLE `exam_user`
  MODIFY `UserID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exam_user`
--
ALTER TABLE `exam_user`
  ADD CONSTRAINT `exam_user_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `exam_user_ibfk_2` FOREIGN KEY (`ExamKey`) REFERENCES `exam` (`ExamKey`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
