-- Host: 127.0.0.1    Database: nursingHomeDB
-- ------------------------------------------------------
-- Server version	8.0.44

drop database nursingHomeDB;
create database nursingHomeDB;
use nursingHomeDB;

--
-- Table structure for table `faculty_type`
--
DROP TABLE IF EXISTS `faculty_type`;
CREATE TABLE `faculty_type` (
  `facultyTypeID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  `facultyType` varchar(12) DEFAULT NULL
);

--
-- Table structure for table `payment_system`
--
DROP TABLE IF EXISTS `payment_system`;
CREATE TABLE `payment_system` (
  `paymentID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  `price` float DEFAULT NULL,
  `tax` float DEFAULT NULL,
  PRIMARY KEY (`paymentID`)
);

--
-- Table structure for table `medication`
--
DROP TABLE IF EXISTS `medication`;
CREATE TABLE `medication` (
  `medicationID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  `medicationType` varchar(20) DEFAULT NULL,
  `paymentID` INTEGER NOT NULL,
  PRIMARY KEY (`medicationID`),
  CONSTRAINT `medication_idfk_1` FOREIGN KEY (`paymentID`) REFERENCES `payment_system` (`paymentID`)
);

--
-- Table structure for table `phone_number`
--
DROP TABLE IF EXISTS `phone_number`;
CREATE TABLE `phone_number` (
  `numberID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  `phoneNumber` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`numberID`)
);

--
-- Table structure for table `faculty`
--
DROP TABLE IF EXISTS `faculty`;
CREATE TABLE `faculty` (
  `facultyID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  `facultyLastName` varchar(20) DEFAULT NULL,
  `facultyTypeID` INTEGER NOT NULL,
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`facultyTypeID`) REFERENCES `faculty_type` (`facultyTypeID`)
);

--
-- Table structure for table `trusted_family`
--
DROP TABLE IF EXISTS `trusted_family`;
CREATE TABLE `trusted_family` (
  `familyID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  `familyLastName` varchar(20) DEFAULT NULL,
  `phoneNumberID` INTEGER NOT NULL,
  PRIMARY KEY (`familyID`),
  CONSTRAINT `trusted_family_ibfk_1` FOREIGN KEY (`phoneNumberID`) REFERENCES `phone_number` (`numberID`)
);

--
-- Table structure for table `patient`
--
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient` (
  `patientID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `patientPriority` INTEGER DEFAULT NULL,
  `conditionDesc` varchar(100) DEFAULT NULL,
  `familyID` INTEGER NOT NULL,
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`familyID`) REFERENCES `trusted_family` (`familyID`),
  CONSTRAINT `patient_chk_1` CHECK (((`patientPriority` > 0) AND (`patientPriority` <= 5)))
);

--
-- Table structure for table `patient_room`
--
DROP TABLE IF EXISTS `patient_room`;
CREATE TABLE `patient_room` (
  `patientRoomID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  `patientRoomNumber` varchar(4) NOT NULL,
  `patientID` INTEGER NOT NULL,
  PRIMARY KEY (`patientRoomID`,`patientID`),
  CONSTRAINT `patient_room_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`)
);

--
-- Table structure for table `cost`
--
DROP TABLE IF EXISTS `patient_med`;
CREATE TABLE `patient_med` (
  `patientID` INTEGER NOT NULL,
  `medicationID` INTEGER NOT NULL,
  PRIMARY KEY (`medicationID`,`patientID`),
  CONSTRAINT `patient_med_ibfk_1` FOREIGN KEY (`medicationID`) REFERENCES `medication` (`medicationID`),
  CONSTRAINT `patient_med_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`)
);

--
-- Table structure for table `payment_summary`
--
DROP TABLE IF EXISTS `payment_summary`;
CREATE TABLE `payment_summary` (
  `paymentSumID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
  `netPayment` float DEFAULT NULL,
  `patientID` INTEGER NOT NULL,
  `paymentID` INTEGER NOT NULL,
  PRIMARY KEY (`paymentSumID`),
  CONSTRAINT `payment_summary_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`),
  CONSTRAINT `payment_summary_ibfk_1` FOREIGN KEY (`paymentID`) REFERENCES `payment_system` (`paymentID`)
);

--
-- Table structure for table `assigned_room`
--
DROP TABLE IF EXISTS `assigned_room`;
CREATE TABLE `assigned_room` (
  `patientRoomID` INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
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
CREATE TABLE `works_with` (
  `familyID` INTEGER NOT NULL,
  `facultyID` INTEGER NOT NULL,
  `paymentSumID` INTEGER NOT NULL,
  PRIMARY KEY (`facultyID`,`familyID`),
  CONSTRAINT `works_with_ibfk_1` FOREIGN KEY (`familyID`) REFERENCES `trusted_family` (`familyID`),
  CONSTRAINT `works_with_ibfk_2` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`),
  CONSTRAINT `works_with_ibfk_3` FOREIGN KEY (`paymentSumID`) REFERENCES `payment_summary` (`paymentSumID`)
);

--
-- DB system users
--
-- CREATE TABLE `user` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `username` VARCHAR(50) NOT NULL,
--   `password` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`)
-- );
-- INSERT INTO `user` (username, password) VALUES ('admin', 'password');


-- The Auto_Increment indices start at 1...retarded, I know
INSERT INTO faculty_type (facultyType) VALUES ('Doctor');
INSERT INTO faculty_type (facultyType) VALUES ('Nurse');

INSERT INTO payment_system (price, tax) VALUES (8.51, 2.7);
INSERT INTO payment_system (price, tax) VALUES (10.50, 1.0);
INSERT INTO payment_system (price, tax) VALUES (4.26, 3.8);
INSERT INTO payment_system (price, tax) VALUES (18.75, 4.2);

INSERT INTO medication (medicationType, paymentID) VALUES ("Advil", 1);
INSERT INTO medication (medicationType, paymentID) VALUES ("Metformin", 2);

INSERT INTO faculty (facultyLastName, facultyTypeID) VALUES ('Ventura', 1);
INSERT INTO faculty (facultyLastName, facultyTypeID) VALUES ('Roe', 2);
INSERT INTO faculty (facultyLastName, facultyTypeID) VALUES ('Oropesa', 2);
INSERT INTO faculty (facultyLastName, facultyTypeID) VALUES ('Snyder', 2);

INSERT INTO phone_number (phoneNumber) values ("912-222-2500");
INSERT INTO phone_number (phoneNumber) values ("777-234-9090");
INSERT INTO phone_number (phoneNumber) values ("912-232-6605");

INSERT INTO trusted_family (familyLastName, phoneNumberID) VALUES ("Bowers", 1);
INSERT INTO trusted_family (familyLastName, phoneNumberID) VALUES ("Clints", 3);
INSERT INTO trusted_family (familyLastName, phoneNumberID) VALUES ("Stewart", 2);

INSERT INTO patient (firstName, lastName, patientPriority, conditionDesc, familyID) VALUES ("Todd", "Howard", 5, "Headache", 3);
INSERT INTO patient (firstName, lastName, patientPriority, conditionDesc, familyID) VALUES ("Will", "Bowers", 3, "Dimentia", 1);

INSERT INTO patient_room (patientRoomNumber, patientID) VALUES (1132, 2);
INSERT INTO patient_room (patientRoomNumber, patientID) VALUES (2002, 1);

INSERT INTO assigned_room (patientRoomID, facultyID, floorNumber) VALUES (2, 1, 2);
INSERT INTO assigned_room (patientRoomID, facultyID, floorNumber) VALUES (1, 4, 1);

INSERT INTO patient_med (patientID, medicationID) VALUES (1, 1);
INSERT INTO patient_med (patientID, medicationID) VALUES (2, 1);
INSERT INTO patient_med (patientID, medicationID) VALUES (2, 2);

INSERT INTO payment_summary (netPayment, patientID, paymentID) VALUES (0, 1, 1);
INSERT INTO payment_summary (netPayment, patientID, paymentID) VALUES (0, 2, 1);
INSERT INTO payment_summary (netPayment, patientID, paymentID) VALUES (0, 2, 2);

-- INSERT INTO works_with VALUES ()