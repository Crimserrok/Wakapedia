-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2026 at 05:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wma01db`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `art_id` int(6) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `cont` mediumtext NOT NULL,
  `write_by` int(6) DEFAULT NULL,
  `pos_x` varchar(24) NOT NULL,
  `pos_y` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`art_id`, `title`, `slug`, `cont`, `write_by`, `pos_x`, `pos_y`) VALUES
(5, 'ถ้ำคริสตัลไนกา:Naica Cave', 'ถ้ำคริสตัลไนกาnaica-cave-6a8dcac57275a', 'ถ้ำคริสตัลไนกา (Naica Crystal Cave หรือ Cueva de los Cristales) เป็นหนึ่งในสิ่งอัศจรรย์ทางธรณีวิทยาที่โดดเด่นที่สุดในโลก ตั้งอยู่ลึกลงไปใต้ดินประมาณ 300 เมตร ภายในเหมืองแร่ไนกา รัฐชีวาว่า (Chihuahua) ประเทศเม็กซิโก\r\nจุดเด่นและคุณลักษณะสำคัญ\r\n\r\n*คริสตัลยักษ์ระดับโลก: ภายในถ้ำเต็มไปด้วยผลึกแร่ เซเลไนต์ (Selenite) หรือผลึกแร่ยิปซัมโปร่งแสงขนาดใหญ่ มนุษย์พบผลึกที่ยาวได้ถึง 11.4 เมตร และหนักกว่า 12 ตัน ซึ่งคาดว่าใช้เวลาเติบโตสะสมมานานกว่า 500,000 ปี\r\n\r\n*จุดกำเนิดทางธรณีวิทยา: โพรงถ้ำตั้งอยู่เหนือกระเปาะหินหนืด (Magma chamber) ในอดีตถ้ำนี้เคยถูกน้ำที่อุดมไปด้วยแร่ธาตุท่วมขัง ความร้อนใต้ภิภพรักษาอุณหภูมิน้ำให้คงที่ราว 50°C เป็นเวลาแสนๆ ปี ทำให้แร่ธาตุตกผลึกจนมีขนาดมหึมา\r\n\r\n*สภาพแวดล้อมอันตราย: แม้จะสวยงามราวกับหลุดมาจากภาพยนตร์ไซไฟ แต่สภาพอากาศภายในกลับนรกชัดๆ อุณหภูมิสูงถึง 45–58°C และความชื้นสัมพัทธ์เกือบ 100% ทำให้เหงื่อระเหยไม่ได้ หากไม่มีชุดระบายความร้อนพิเศษ มนุษย์จะสามารถอยู่ในนี้ได้ไม่เกิน 10–15 นาที ก่อนจะเกิดสภาวะลมแดดรุนแรงจนอันตรายถึงชีวิต\r\n\r\nสถานะปัจจุบัน (ปิดถ้ำ): ในช่วงที่ทำการสำรวจและถ่ายทำสารคดี บริษัทเหมืองแร่ต้องใช้น้ำปั๊มออกจากถ้ำอย่างต่อเนื่อง แต่เมื่อปฏิบัติการทางเหมืองหยุดลงในปลายปี 2015 การสูบน้ำจึงยุติลง ส่งผลให้น้ำใต้ดินไหลกลับเข้าท่วมถ้ำตามเดิม ซึ่งนับเป็นข้อดีเพราะน้ำช่วยปกป้องผลึกไม่ให้สึกกร่อนจากอากาศภายนอก', 3, '-105.496389', '27.850833'),
(6, 'ทะเลเกลืออูยูนิ:Salar de Uyuni', 'ทะเลเกลืออูยูนิsalar-de-uyuni-6a8e4c5489511', 'ทะเลเกลืออูยูนิ (Salar de Uyuni) เป็นทะเลเกลือที่ใหญ่ที่สุดในโลก ครอบคลุมพื้นที่กว่า 10,582 ตารางกิโลเมตร ตั้งอยู่ทางตะวันตกเฉียงใต้ของประเทศโบลิเวีย ที่ความสูงราว 3,656 เมตรเหนือระดับน้ำทะเล\r\n\r\nจุดเด่นและคุณลักษณะสำคัญ\r\n*กระจกเงาบานใหญ่ที่สุดในโลก: ในช่วงฤดูฝน (มกราคม–มีนาคม) น้ำฝนตื้นๆ จะตกลงมาขังบนแผ่นเกลือ เรียบเนียนจนสะท้อนภาพท้องฟ้าและเมฆได้อย่างสมบูรณ์แบบ เกิดเป็นทัศนียภาพ \"Mirror Effect\" ที่ราวกับเดินอยู่บนท้องฟ้า\r\n\r\n*ขุมทรัพย์ลิเธียม: นอกจากความสวยงาม ที่นี่ยังเป็นแหล่งกักเก็บแร่ลิเธียม (Lithium) ที่สำคัญของโลก ซึ่งคาดว่ามีปริมาณมากถึง 17–20% ของปริมาณสำรองทั่วโลก\r\n\r\n*เกาะกระบองเพชรยักษ์: ใจกลางทะเลเกลือมีเกาะหินภูเขาไฟชื่อ Isla Incahuasi ที่มีต้นกระบองเพชรยักษ์อายุนับร้อยปีเติบโตอยู่เป็นจำนวนมาก ตัดกับพื้นเกลือสีขาวโพลนรอบทิศทาง\r\n\r\nนอกจากนี้ยังมีที่พักที่โดงดังในชื่อ โรงแรมเกลือ (Salt Hotels) ที่สร้างขึ้นจากบล็อกเกลือเกือบทั้งหมด ตั้งแต่ผนัง โต๊ะ เตียง ไปจนถึงเฟอร์นิเจอร์', 3, '-67.489133', '-20.133775'),
(7, 'เกาะมาดากัสการ์:Madagascar Island', 'เกาะมาดากัสการ์madagascar-island-6a8e505b7cceb', 'มาดากัสการ์ เป็นประเทศเกาะขนาดใหญ่ที่สุดเป็นอันดับ 4 ของโลก ตั้งอยู่ทางตะวันออกของทวีปแอฟริกาในมหาสมุทรอินเดีย โดดเด่นด้วยระบบนิเวศอันเป็นเอกลักษณ์ เนื่องจากเกาะแห่งนี้แยกตัวออกจากแผ่นดินใหญ่มานานกว่า 88 ล้านปี ทำให้สิ่งมีชีวิตและพืชพรรณกว่า 90% เป็นสายพันธุ์ท้องถิ่นที่ไม่สามารถพบได้จากที่อื่นในโลก จนได้รับการขนานนามว่าเป็น \"ทวีปที่ 8 ของโลก\"\r\n\r\nสถานที่อัศจรรย์ที่ไม่ควรพลาด\r\n\r\n*Allée des Baobabs\r\nถนนสายต้นเบาบับอันเป็นสัญลักษณ์ของประเทศ ตั้งอยู่ใกล้เมือง Morondava เรียงรายไปด้วยต้นเบาบับยักษ์สายพันธุ์ Adansonia grandidieri อายุหลายร้อยปีที่สูงตระหว่านเหนือผืนดิน\r\n\r\n*Reserva natural de Tsingy de Bemaraha\r\nอุทยานแห่งชาติมรดกโลกทางธรรมชาติของ UNESCO โดดเด่นด้วยเข็มหินปูนแหลมคมนับพันต้นที่เกิดจากการกัดเซาะของน้ำและลมมานานหลายล้านปี จนเกิดเป็น \"ป่าหิน\" ขนาดมหึมา\r\n\r\n*Andasibe-Mantadia National Park\r\nป่าฝนอุดมสมบูรณ์ที่เป็นแหล่งอาศัยสำคัญของสัตว์ที่เป็นสัญลักษณ์ของประเทศอย่าง ลีเมอร์ (Lemur) หลากหลายสายพันธุ์\r\n\r\n', 3, '47', '-20'),
(8, 'ถ้ำหนอนเรืองแสง:Waitomo Glowworm Caves', 'ถ้ำหนอนเรืองแสงwaitomo-glowworm-caves-6a8e514b65f34', 'ถ้ำหินปูนแห่งนี้ค้นพบอย่างเป็นทางการในช่วงปลายทศวรรษ 1880 โดยผู้นำชนเผ่าเมารีประจำท้องถิ่น Tane Tinorau ร่วมกับ Fred Mace นักสำรวจชาวอังกฤษ ซึ่งในปัจจุบันลูกหลานของชนเผ่าเมารียังคงมีส่วนร่วมในการบริหารจัดการและนำเที่ยวถ้ำแห่งนี้\r\n\r\n*โครงสร้างภายในถ้ำ: ตัวถ้ำแบ่งออกเป็น 3 ระดับหลัก โดยชั้นบนสุดเป็นทางเข้าและโถงแห้งที่เต็มไปด้วยหินงอกหินย้อยรูปทรงแปลกตา ชั้นที่สองเรียกว่า \"Cathedral\" (อาสนวิหาร) โถงสูงโถงกว้างที่มี acoustics หรือระบบเสียงตามธรรมชาติยอดเยี่ยมมากจนเคยมีนักร้องโอเปร่ามาขับร้อง และชั้นล่างสุดคือลำธารใต้ดินที่เป็นไฮไลต์สำหรับการล่องเรือชมหนอนเรืองแสง\r\n\r\n*หนอนเรืองแสงคืออะไร: ตัวกักเก็บแสงคือตัวอ่อนของยุงชนิดหนึ่ง (Arachnocampa luminosa) ซึ่งจะปล่อยเส้นใยเหนียวๆ คล้ายหยดน้ำทอดลงมาจากเพดานถ้ำเพื่อจับแมลง และใช้ปฏิกิริยาเคมีในร่างกายสร้างแสงสีฟ้าสดใสเพื่อล่อเหยื่อ ยิ่งตัวอ่อนหิวมากเท่าไร แสงก็ยิ่งสว่างไสวมากขึ้นเท่านั้น\r\n\r\n*กฎระเบียบที่เคร่งครัด: เพื่อปกป้องสภาพแวดล้อมที่เปราะบาง ภายในถ้ำห้ามถ่ายภาพด้วยแฟลช ห้ามสัมผัสผนังถ้ำหรือผลึกหินงอกหินย้อย และระหว่างล่องเรือชมหนอนเรืองแสงจะต้องเงียบเสียงที่สุด เนื่องจากความดังและแรงสั่นสะเทือนอาจทำให้หนอนเรืองแสงดับแสงลงได้\r\n\r\n', 3, '175.1036', '-38.2608'),
(9, 'โซโคตร้า:Socotra Island', 'โซโคตร้าsocotra-island-6a8e54ddd3412', 'โซโคตร้า (Socotra Island) เป็นเกาะหลักในหมู่เกาะโซโคตร้า ประเทศเยเมน ซึ่งได้รับการยกย่องจาก UNESCO ให้เป็นมรดกโลกทางธรรมชาติ ด้วยภูมิประเทศและพืชพรรณที่แปลกตาราวกับหลุดมาจากดาวดวงอื่น\r\n\r\nจุดท่องเที่ยวธรรมชาติบนเกาะ\r\n*Diksam ที่ราบสูงใจกลางเกาะที่เป็นจุดชมต้นเลือดมังกร (Dragon\'s Blood Tree) ในสภาพแวดล้อมทางธรรมชาติที่สมบูรณ์ที่สุดแห่งหนึ่ง\r\n\r\n -ผืนป่าต้นเลือดมังกร: บริเวณใกล้เคียงอย่างป่า Firmihin เป็นจุดที่มีต้นเลือดมังกรหนาแน่นที่สุดบนเกาะ ลำต้นทรงร่มยักษ์ขึ้นสลับซับซ้อนตามหน้าผาหิน\r\n\r\n -หุบเขาและจุดชมวิว: ล้อมรอบด้วยหุบเหวลึกอย่าง Wadi Dirhur ซึ่งสามารถขับรถ 4WD ขึ้นไปชมทัศนียภาพกว้างไกลของแนวเขาและป่าต้นไม้ยุคดึกดำบรรพ์\r\n\r\n*Hoq Cave หนึ่งในถ้ำหินปูนที่ใหญ่และยาวที่สุดบนเกาะโซโคตร้า ตั้งอยู่ทางฝั่งตะวันออกเฉียงเหนือ\r\n\r\n -ประติมากรรมหินใต้ภิภพ: ภายในถ้ำเต็มไปด้วยหินงอกหินย้อย เสาหินปูนขนาดมหึมา และแอ่งน้ำใต้ดินที่เกิดการสะสมตัวของแร่ธาตุมานานหลายพันปี\r\n\r\n -เส้นทางเดินสำรวจ: การเข้าชมต้องใช้การเดินเท้าขึ้นเขาประมาณ 1.5–2 ชั่วโมง และลัดเลาะเข้าไปในถ้ำลึกกว่า 3 กิโลเมตรพร้อมไฟฉายและไกด์ท้องถิ่น\r\n\r\nนอกจากต้นเลือดมังกรแล้ว ยังมี ต้นกุหลาบทะเลทราย (Desert Rose หรือ Adenium socotranum) ที่มีลำต้นพองโตคล้ายขวดน้ำและออกดอกสีชมพูสดบนหินแห้งแล้ง', 3, '53.92', '12.51');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `com_id` int(6) NOT NULL,
  `art_id` int(6) NOT NULL,
  `com_by` int(6) DEFAULT NULL,
  `cont` mediumtext NOT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`com_id`, `art_id`, `com_by`, `cont`, `img_src`, `created_at`) VALUES
(25, 9, 4, 'I have Desert Rose at my backyard too', 'img_6a8e56ee2c5022.41249961.jpg', '2026-08-26 10:01:02'),
(26, 8, 4, 'เหมือนท้องฟ้าจำลองเลย', 'img_6a8e57901fb511.25472990.jpg', '2026-08-26 10:03:44'),
(27, 7, 4, 'Now you see me, soon you won\'t', 'img_6a8e57c29bf949.67958759.jpg', '2026-08-26 10:04:34'),
(28, 5, 8, 'Yee888', NULL, '2026-08-26 10:05:19'),
(29, 9, 8, 'Yee', 'img_6a8e57fc0f84a1.51429023.jpg', '2026-08-26 10:05:32'),
(30, 7, 8, 'I think I seen a lizard hmm...., I\'m sure I seen it.', 'img_6a8e584538fbe3.59420797.jpg', '2026-08-26 10:06:45');

-- --------------------------------------------------------

--
-- Table structure for table `imgin`
--

CREATE TABLE `imgin` (
  `img_id` int(6) NOT NULL,
  `img_src` varchar(255) NOT NULL,
  `img_by` int(6) DEFAULT NULL,
  `art_id` int(6) NOT NULL,
  `img_order` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `imgin`
--

INSERT INTO `imgin` (`img_id`, `img_src`, `img_by`, `art_id`, `img_order`, `created_at`) VALUES
(8, 'img_6a8dfaedf09e60.26982599.jpg', 3, 5, 0, '2026-08-26 03:28:29'),
(9, 'img_6a8dfaf9017840.05838429.jpg', 3, 5, 0, '2026-08-26 03:28:41'),
(11, 'img_6a8e4cc6570024.16620964.jpg', 3, 6, 1, '2026-08-26 09:17:42'),
(12, 'img_6a8e4cce777249.83156740.jpg', 3, 6, 0, '2026-08-26 09:17:50'),
(16, 'img_6a8e519f84f626.61238330.png', 3, 8, 0, '2026-08-26 09:38:23'),
(17, 'img_6a8e51a6707066.01542293.jpg', 3, 8, 0, '2026-08-26 09:38:30'),
(18, 'img_6a8e51bf8c2e09.21657168.jpg', 3, 7, 0, '2026-08-26 09:38:55'),
(19, 'img_6a8e51c63539b7.61118635.jpg', 3, 7, 0, '2026-08-26 09:39:02'),
(20, 'img_6a8e51cc1a66a5.10672915.jpg', 3, 7, 0, '2026-08-26 09:39:08'),
(21, 'img_6a8e54f69387f3.47399089.jpg', 3, 9, 0, '2026-08-26 09:52:38'),
(22, 'img_6a8e550204a2e1.95868696.jpg', 3, 9, 0, '2026-08-26 09:52:50'),
(23, 'img_6a8e5508175306.60702709.jpg', 3, 9, 0, '2026-08-26 09:52:56'),
(24, 'img_6a8e56ee2c5022.41249961.jpg', 4, 9, 0, '2026-08-26 10:01:02'),
(25, 'img_6a8e57901fb511.25472990.jpg', 4, 8, 0, '2026-08-26 10:03:44'),
(26, 'img_6a8e57c29bf949.67958759.jpg', 4, 7, 0, '2026-08-26 10:04:34'),
(27, 'img_6a8e57fc0f84a1.51429023.jpg', 8, 9, 0, '2026-08-26 10:05:32'),
(28, 'img_6a8e584538fbe3.59420797.jpg', 8, 7, 0, '2026-08-26 10:06:45');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(6) NOT NULL,
  `user_mail` varchar(24) NOT NULL,
  `user_key` varchar(120) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_type` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_mail`, `user_key`, `user_name`, `user_type`) VALUES
(3, 'admin', '$2y$10$QPFhzJkOwsVe/6CGknLTg.vLlf3d908P.wVTqweDaVkvutUpo2t9.', 'Admin', 1),
(4, 'normie', '$2y$10$3alKf.Cvv4bi/Plxz64XjuD4mB.e9Lr2hOK7PxCGjY7EsLdhR4.si', 'Just Normal', 0),
(8, 'yee', '$2y$10$KVRQfCvnHIKRQ.jbV1BEr.D5.mp0kbrjSkAyBBb7n64BGU6Ip4ryi', 'Yee', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`art_id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `art_id` (`art_id`);

--
-- Indexes for table `imgin`
--
ALTER TABLE `imgin`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_mail` (`user_mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `art_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `com_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `imgin`
--
ALTER TABLE `imgin`
  MODIFY `img_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`art_id`) REFERENCES `article` (`art_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`art_id`) REFERENCES `article` (`art_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
