
-- Host: 127.0.0.1    Database: nurserydb
-- ------------------------------------------------------
-- Server version	8.0.44


--
-- Table structure for table `faculty_type`
--
DROP TABLE IF EXISTS `faculty_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty_type` (
  `facultyTypeID` INTEGER NOT NULL UNIQUE PRIMARY KEY,
  `facultyType` varchar(12) DEFAULT NULL
);

--
-- Table structure for table `medication`
--
DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `medicationID` INTEGER NOT NULL,
  `medidactionType` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`medicationID`)
);

--
-- Table structure for table `payment_system`
--
DROP TABLE IF EXISTS `payment_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_system` (
  `paymentID` INTEGER NOT NULL UNIQUE,
  `price` float DEFAULT NULL,
  `tax` float DEFAULT NULL,
  PRIMARY KEY (`paymentID`)
);

--
-- Table structure for table `phone_number`
--
DROP TABLE IF EXISTS `phone_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_number` (
  `numberID` INTEGER NOT NULL UNIQUE,
  `phone_number` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`numberID`)
);

--
-- Table structure for table `cost`
--
DROP TABLE IF EXISTS `cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost` (
  `medicationID` INTEGER NOT NULL UNIQUE,
  `medication_price` float NULL,
  `paymentID` INTEGER NOT NULL,
  PRIMARY KEY (`medicationID`,`paymentID`),
  CONSTRAINT `cost_ibfk_1` FOREIGN KEY (`medicationID`) REFERENCES `medication` (`medicationID`),
  CONSTRAINT `cost_ibfk_2` FOREIGN KEY (`paymentID`) REFERENCES `payment_system` (`paymentID`)
);

--
-- Table structure for table `faculty`
--
DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `facultyID` INTEGER NOT NULL UNIQUE PRIMARY KEY,
  `facultyLastName` varchar(20) DEFAULT NULL,
  `facultyTypeID` INTEGER NOT NULL,
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`facultyTypeID`) REFERENCES `faculty_type` (`facultyTypeID`)
);

--
-- Table structure for table `trusted_family`
--
DROP TABLE IF EXISTS `trusted_family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trusted_family` (
  `familyID` INTEGER NOT NULL UNIQUE,
  `lastName` varchar(20) DEFAULT NULL,
  `phone_numberID` INTEGER NOT NULL,
  PRIMARY KEY (`familyID`),
  CONSTRAINT `trusted_family_ibfk_1` FOREIGN KEY (`phone_numberID`) REFERENCES `phone_number` (`numberID`)
);

--
-- Table structure for table `patient`
--
DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patientID` INTEGER NOT NULL UNIQUE PRIMARY KEY,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `patientPriority` INTEGER DEFAULT NULL,
  `conditiondesc` varchar(100) DEFAULT NULL,
  `familyID` INTEGER NOT NULL,
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`familyID`) REFERENCES `trusted_family` (`familyID`),
  CONSTRAINT `patient_chk_1` CHECK (((`patientPriority` > 0) AND (`patientPriority` < 5)))
);

--
-- Table structure for table `patient_room`
--

DROP TABLE IF EXISTS `patient_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_room` (
  `patientroomID` INTEGER NOT NULL UNIQUE,
  `patientroomNumber` varchar(4) NOT NULL,
  `patientID` INTEGER NOT NULL,
  PRIMARY KEY (`patientroomID`,`patientID`),
  CONSTRAINT `patient_room_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`)
);

--
-- Table structure for table `payment_summary`
--
DROP TABLE IF EXISTS `payment_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_summary` (
  `paymentSumID` INTEGER NOT NULL,
  `netpayment` float DEFAULT NULL,
  `paymentID` INTEGER NOT NULL,
  PRIMARY KEY (`paymentSumID`),
  CONSTRAINT `payment_summary_ibfk_1` FOREIGN KEY (`paymentID`) REFERENCES `payment_system` (`paymentID`)
);

--
-- Table structure for table `assigned_room`
--
DROP TABLE IF EXISTS `assigned_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_room` (
  `patientRoomID` INTEGER NOT NULL UNIQUE,
  `facultyID` INTEGER NOT NULL,
  `floorNumber` INTEGER NOT NULL,
  PRIMARY KEY (`patientRoomID`,`facultyID`),
  CONSTRAINT `assigned_room_ibfk_1` FOREIGN KEY (`patientRoomID`) REFERENCES `patient_room` (`patientroomID`),
  CONSTRAINT `assigned_room_chk_1` CHECK (((`floorNumber` > 0) and (`floorNumber` < 4)))
);

--
-- Table structure for table `works_with`
--

DROP TABLE IF EXISTS `works_with`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works_with` (
  `familyID` INTEGER NOT NULL,
  `facultyID` INTEGER NOT NULL,
  `paymentSumID` INTEGER NOT NULL,
  PRIMARY KEY (`facultyID`,`familyID`),
  CONSTRAINT `works_with_ibfk_1` FOREIGN KEY (`familyID`) REFERENCES `trusted_family` (`familyID`),
  CONSTRAINT `works_with_ibfk_2` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`),
  CONSTRAINT `works_with_ibfk_3` FOREIGN KEY (`paymentSumID`) REFERENCES `payment_summary` (`paymentSumID`)
);


INSERT INTO faculty_type VALUES (0, 'Doctor');
INSERT INTO faculty_type VALUES (1, 'Nurse');

INSERT INTO faculty VALUES (0, 'Ventura', 0);
INSERT INTO faculty VALUES (1, 'Roe', 1);
INSERT INTO faculty VALUES (2, 'Oropesa', 1);
INSERT INTO faculty VALUES (3, 'Snyder', 1);