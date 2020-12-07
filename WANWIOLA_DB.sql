-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2020 at 05:07 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WANWIOLA_DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Account`
--

CREATE TABLE `Account` (
  `uid` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `sex` varchar(11) NOT NULL,
  `date_create` datetime DEFAULT current_timestamp(),
  `DOB` date NOT NULL,
  `phone` varchar(10) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Account`
--

INSERT INTO `Account` (`uid`, `username`, `password`, `email`, `sex`, `date_create`, `DOB`, `phone`, `firstname`, `lastname`, `address`) VALUES
('096bed7c-ee4e-463a-a2da-559dbf83f52d', 'sbxinth', '84ed30001fcccfc70cc54b02b82bbe7d', 'son.son.2013@hotmail.co.th', 'on', '2020-12-05 22:34:26', '1999-06-14', '0611725321', 'rachapol', 'burinwatthana', '176/16 ถนนลูกเสือ อ.หลังสวน จ.ชุมพร'),
('52ee5976-6504-431e-bff4-79c01d6f0b74', '1', 'c4ca4238a0b923820dcc509a6f75849b', 'sonbboyzax@gmail.com', 'on', '2020-12-06 04:28:57', '2020-12-02', '0911575321', 'Son', 'R.Burinwatthana', '176/16'),
('9996b225-c6c9-404b-8a24-a93cc26d4536', 'tawan', '40c148d8fc8227cd157caebd189e3d56', 'xx@xx.xx', 'male', '2020-12-06 03:50:03', '2020-12-10', '114', 'theTawan', 'Shine', '1111');

-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE `Inventory` (
  `Ivn_ID` int(50) NOT NULL,
  `Product_ID` varchar(150) NOT NULL,
  `Product_name` varchar(50) NOT NULL,
  `U_ID` varchar(150) NOT NULL,
  `imgurl` varchar(50) NOT NULL,
  `quantity` int(20) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Inventory`
--

INSERT INTO `Inventory` (`Ivn_ID`, `Product_ID`, `Product_name`, `U_ID`, `imgurl`, `quantity`, `date`) VALUES
(34, '2', 'Collagen', '375ed910-1c37-4465-9f9f-a84aff73b9f5', 'ส้มม.jpg', 1, '2020-12-05 19:20:40'),
(35, '2', 'Collagen', '375ed910-1c37-4465-9f9f-a84aff73b9f5', 'ส้มม.jpg', 1, '2020-12-05 19:21:45'),
(36, '1', 'DETOX', '375ed910-1c37-4465-9f9f-a84aff73b9f5', 'proo.jpg', 4, '2020-12-05 19:21:51'),
(37, '1', 'DETOX', '375ed910-1c37-4465-9f9f-a84aff73b9f5', 'proo.jpg', 1, '2020-12-05 23:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `PID` int(11) NOT NULL,
  `P_name` varchar(50) NOT NULL,
  `P_pirce` int(5) NOT NULL,
  `p_type` int(11) NOT NULL,
  `imgurl` varchar(100) NOT NULL,
  `p_description` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`PID`, `P_name`, `P_pirce`, `p_type`, `imgurl`, `p_description`) VALUES
(1, 'DETOX_b6', 150, 1, 'proo.jpg', 'ผลิตภัณฑ์อาหารเสริมดีท็อกล้างลำไส้ก็เพื่อทำความสะอาดและขจัดสิ่งสกปรก ของเสีย รวมทั้งสารพิษที่ตกค้างในลำไส้ออก'),
(2, 'Collagen_b12', 150, 2, 'wan.jpg', 'this product made for test'),
(3, 'WIOLA_collagen', 555, 2, 'ส้ม.jpg', '555555');

-- --------------------------------------------------------

--
-- Table structure for table `Product_type`
--

CREATE TABLE `Product_type` (
  `product_type_name` varchar(11) NOT NULL,
  `product_type_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Product_type`
--

INSERT INTO `Product_type` (`product_type_name`, `product_type_id`) VALUES
('Detox', '1'),
('collagen', '2');

-- --------------------------------------------------------

--
-- Table structure for table `Transaction_u_p`
--

CREATE TABLE `Transaction_u_p` (
  `Trans_ID` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `PID` int(11) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `amout` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `Inventory`
--
ALTER TABLE `Inventory`
  ADD PRIMARY KEY (`Ivn_ID`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`PID`);

--
-- Indexes for table `Transaction_u_p`
--
ALTER TABLE `Transaction_u_p`
  ADD PRIMARY KEY (`Trans_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Inventory`
--
ALTER TABLE `Inventory`
  MODIFY `Ivn_ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Transaction_u_p`
--
ALTER TABLE `Transaction_u_p`
  MODIFY `Trans_ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
