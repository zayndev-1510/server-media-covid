-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2022 at 02:49 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_media_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` varchar(12) NOT NULL,
  `nama_lengkap` varchar(50) DEFAULT NULL,
  `alamat` varchar(50) DEFAULT NULL,
  `nomor_telepon` varchar(12) DEFAULT NULL,
  `foto_profil` text DEFAULT 'default.png',
  `tgl_buat` date DEFAULT NULL,
  `waktu_buat` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `nama_lengkap`, `alamat`, `nomor_telepon`, `foto_profil`, `tgl_buat`, `waktu_buat`) VALUES
('jas1723923', 'Admin', 'Jln Betoambari', '082271586923', 'default.png', '2022-07-20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kategori`
--

CREATE TABLE `tbl_kategori` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_kategori`
--

INSERT INTO `tbl_kategori` (`id`, `nama_kategori`) VALUES
(1, 'Pencegahan Covid'),
(2, 'Penanganan Covid'),
(3, 'Gejala Covid'),
(4, 'Vaksinasi ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_komentar`
--

CREATE TABLE `tbl_komentar` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `sub_parent_id` int(11) NOT NULL,
  `id_pengguna` varchar(12) NOT NULL,
  `nama_komentar` varchar(50) NOT NULL,
  `komentar` text DEFAULT NULL,
  `tgl` date DEFAULT NULL,
  `id_video` int(11) DEFAULT NULL,
  `waktu` time DEFAULT NULL,
  `reply` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_komentar`
--

INSERT INTO `tbl_komentar` (`id`, `parent_id`, `sub_parent_id`, `id_pengguna`, `nama_komentar`, `komentar`, `tgl`, `id_video`, `waktu`, `reply`) VALUES
(70, 0, 0, 'wyv2j8x5s13q', 'khairul', 'p', '2022-08-13', 22, '17:53:55', 0),
(71, 0, 0, 'jas1723923', 'Muhammad Khairul', 'DIMANA', '2022-08-13', 22, '17:54:11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `id` int(11) NOT NULL,
  `id_pengguna` varchar(12) NOT NULL,
  `username` varchar(50) NOT NULL,
  `sandi` text DEFAULT NULL,
  `lvl` int(11) DEFAULT NULL,
  `tgl_buat` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`id`, `id_pengguna`, `username`, `sandi`, `lvl`, `tgl_buat`) VALUES
(18, 'swbcfj54z9pq', 'zayn1510', 'eyJpdiI6Ilc3V2s0NWtrWlFhTHFwVzZlWktJSFE9PSIsInZhbHVlIjoiT2FjOVF1Yi8yOGQ5ZWFWT1dSM2pZUT09IiwibWFjIjoiMDM5NjM0YzIyOTM3YjA2Mjk5ZWUxODNjMDdjMzE2YTg0N2U5MGI1NjQ1YzAyYThhYTE1ODM2ZjhjNGM0ZmU3OCIsInRhZyI6IiJ9', 1, '2022-07-24'),
(19, 'jas1723923', 'khairul017', 'eyJpdiI6Ilc3V2s0NWtrWlFhTHFwVzZlWktJSFE9PSIsInZhbHVlIjoiT2FjOVF1Yi8yOGQ5ZWFWT1dSM2pZUT09IiwibWFjIjoiMDM5NjM0YzIyOTM3YjA2Mjk5ZWUxODNjMDdjMzE2YTg0N2U5MGI1NjQ1YzAyYThhYTE1ODM2ZjhjNGM0ZmU3OCIsInRhZyI6IiJ9', 2, '2022-07-24'),
(20, 'wyv2j8x5s13q', 'khairul16', 'eyJpdiI6IkdQNytjdVF1UWxYMGFqVkN4Mk43SXc9PSIsInZhbHVlIjoiMVZmWEJ4ckJKVEJESXFhemxrRk9XQT09IiwibWFjIjoiN2U1MWUxNjJlNjUzODE1ODQ0ZmMzZTIyMGIyYjA4ODQ3NTM3ODNjNmE4NTRjZWUzOGVmYjk3NmYyNDdjODQ1NyIsInRhZyI6IiJ9', 1, '2022-07-26'),
(21, '346nl07kyoc5', 'luffydono15', 'eyJpdiI6Ind1U3VBaEZoZFZsc0F6cnp2bUdRZFE9PSIsInZhbHVlIjoiRitGOVloWEhxOGZtbVRUWm9DU0VRdz09IiwibWFjIjoiNWEzOWE0NDdiNTBiODBkNmNmYzBmZjZlMTEyYmFmOWQzMTRhMTVmNDlhNTJmNjIzYjVkNzg3NzZhNzdmNmZiZCIsInRhZyI6IiJ9', 1, '2022-08-08');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pengguna`
--

CREATE TABLE `tbl_pengguna` (
  `id` varchar(12) NOT NULL,
  `nama_lengkap` varchar(50) DEFAULT NULL,
  `alamat` varchar(50) DEFAULT NULL,
  `nomor_telepon` varchar(12) DEFAULT NULL,
  `tgl_buat` date DEFAULT NULL,
  `waktu_buat` time DEFAULT NULL,
  `foto_profil` text NOT NULL DEFAULT 'default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_pengguna`
--

INSERT INTO `tbl_pengguna` (`id`, `nama_lengkap`, `alamat`, `nomor_telepon`, `tgl_buat`, `waktu_buat`, `foto_profil`) VALUES
('346nl07kyoc5', 'Mugiwara No Luffy', 'Jln East Blue', '082271586923', '2022-08-08', '13:13:18', 'default.png'),
('swbcfj54z9pq', 'Zayn Malik', 'Jln Ahmad Yani', '082271586923', '2022-07-24', '00:00:00', 'file_20220724062736.jpg'),
('wyv2j8x5s13q', 'khairul', 'jl. beteoambari', '082293361736', '2022-07-26', '05:25:36', 'file_20220726052632.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reaction`
--

CREATE TABLE `tbl_reaction` (
  `id` int(11) NOT NULL,
  `id_pengguna` varchar(12) DEFAULT NULL,
  `id_video` int(11) NOT NULL,
  `love` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_reaction`
--

INSERT INTO `tbl_reaction` (`id`, `id_pengguna`, `id_video`, `love`) VALUES
(37, '346nl07kyoc5', 23, 0),
(38, '346nl07kyoc5', 22, 0),
(39, 'wyv2j8x5s13q', 22, 0),
(40, 'wyv2j8x5s13q', 25, 0),
(41, 'wyv2j8x5s13q', 24, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_video`
--

CREATE TABLE `tbl_video` (
  `id` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `judul_video` varchar(50) DEFAULT NULL,
  `video` varchar(100) DEFAULT NULL,
  `tgl_posting` date DEFAULT NULL,
  `waktu_posting` time DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `love` int(11) NOT NULL,
  `komen` int(11) NOT NULL,
  `lihat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_video`
--

INSERT INTO `tbl_video` (`id`, `id_kategori`, `judul_video`, `video`, `tgl_posting`, `waktu_posting`, `author`, `love`, `komen`, `lihat`) VALUES
(22, 2, 'Mengurangi Mobilitas Tubuh', 'file_20220809141742.mp4', '2022-08-09', '14:17:42', 'admin', 0, 2, 2),
(23, 1, 'Pencegahan Agar Tidak Terkena Covid', 'file_20220810110830.mp4', '2022-08-10', '11:08:30', 'admin', 0, 0, 1),
(24, 3, 'Gejala-gejala terkena covid', 'file_20220810110933.mp4', '2022-08-10', '11:09:33', 'admin', 0, 0, 1),
(25, 4, 'Vaksinasi', 'file_20220810111016.mp4', '2022-08-10', '11:10:16', 'admin', 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_komentar`
--
ALTER TABLE `tbl_komentar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_pengguna`
--
ALTER TABLE `tbl_pengguna`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_reaction`
--
ALTER TABLE `tbl_reaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_video`
--
ALTER TABLE `tbl_video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_komentar`
--
ALTER TABLE `tbl_komentar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_reaction`
--
ALTER TABLE `tbl_reaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `tbl_video`
--
ALTER TABLE `tbl_video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
