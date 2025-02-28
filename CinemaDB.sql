-- select * from admin;
-- select * from booking;
-- select * from film;
-- select * from manager;
-- select * from screening;
-- select * from seat;
-- select * from theatre;
-- select * from ticket;
-- select * from tickettype;

DROP DATABASE IF EXISTS `cinemaDB`;
CREATE DATABASE `cinemaDB`;
USE `cinemaDB`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinemaDB`
--

CREATE TABLE `Film` (
  `FilmID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Category` varchar(10) NOT NULL,
  `RunningTime` int(10) NOT NULL,
  `Genre` varchar(50) NOT NULL,
  `Director` varchar(50) NOT NULL,
  `CoverImage` varchar(50) NOT NULL,
  `VideoURL` varchar(300) NOT NULL,
  `ReleaseDate` DATE NOT NULL,
  PRIMARY KEY (`FilmID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Theatre` (
  `TheatreID` INT NOT NULL AUTO_INCREMENT,
  `Capacity` INT NOT NULL,
  -- `CapacityRemaining` INT NOT NULL,
  PRIMARY KEY (`TheatreID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Screening` (
  `ScreeningID` INT NOT NULL AUTO_INCREMENT,
  `StartTime` TIME NOT NULL,
  `Date` DATE NOT NULL,
  `SeatsRemaining` INT UNSIGNED NOT NULL,
  `TheatreID` INT NOT NULL,
  `FilmID` INT NOT NULL,
  PRIMARY KEY (`ScreeningID`),
  FOREIGN KEY (`FilmID`) REFERENCES `Film`(`FilmID`) ON DELETE CASCADE,
  FOREIGN KEY (`TheatreID`) REFERENCES `Theatre`(`TheatreID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Booking` (
  `BookingID` INT NOT NULL AUTO_INCREMENT,
  `NoOfSeats` INT NOT NULL,
  `Cost` Decimal(5,2) NOT NULL,
  `Email` varchar(50) NOT NULL,
  PRIMARY KEY (`BookingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `TicketType` (
  `Name` varchar(15) NOT NULL,
  `Cost` Decimal(5,2) NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Ticket` (
  `TicketNo` INT NOT NULL AUTO_INCREMENT,
  `BookingID` INT NOT NULL,
  `TheatreID` INT NOT NULL,
  `ScreeningID` INT NOT NULL,
  `TicketType` varchar(15) NOT NULL,
  PRIMARY KEY (`TicketNo`),
  FOREIGN KEY (`BookingID`) REFERENCES `Booking`(`BookingID`) ON DELETE CASCADE,
  FOREIGN KEY (`ScreeningID`) REFERENCES `Screening`(`ScreeningID`) ON DELETE CASCADE,
  FOREIGN KEY (`TicketType`) REFERENCES `TicketType`(`Name`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Seat` (
  `SeatNo` INT ,
  `Cost` INT NOT NULL ,
  PRIMARY KEY (`SeatNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Manager` (
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Admin` (
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `Film` (`Name`, `Category`, `Genre`, `RunningTime`, `Director`, `CoverImage`, `VideoURL`, `ReleaseDate`) 
VALUES
('The Dark Knight', 'Action', 'PG-13', 90,'Christopher Nolan', 'The_Dark_Knight.jpg', 'https://www.youtube.com/embed/TQfATDZY5Y4?si=SUfnoLnAVo0u5pGl', '2008-07-18'),
('Inception', 'Sci-Fi', 'PG-13', 90, 'Christopher Nolan', 'Inception.jpg', 'https://www.youtube.com/embed/LifqWf0BAOA?si=zsELF9jX_wI942eU', '2010-07-16'),
('The Shawshank Redemption', 'Drama', 'R', 90, 'Frank Darabont', 'The_Shawshank_Redemption.jpg', 'https://www.youtube.com/embed/PLl99DlL6b4?si=l5671WowLHFqEBn7', '1994-09-22'),
('Interstellar', 'Sci-Fi', 'PG-13', 90,'Christopher Nolan', 'Interstellar.jpg', 'https://www.youtube.com/embed/zSWdZVtXT7E?si=7lCey7HbESKCehHR', '2014-11-07'),
('The Godfather', 'Crime', 'R', 90, 'Francis Ford Coppola', 'The_Godfather.jpg', 'https://www.youtube.com/embed/UaVTIH8mujA?si=oD6qDcSZ8SnxRlph', '1972-03-24');

INSERT INTO `Theatre` (`Capacity`)
VALUES
(50),
(30),
(40),
(30),
(20);

INSERT INTO `Screening` (`StartTime`, `Date`, `SeatsRemaining`, `TheatreID`, `FilmID`)
VALUES
('18:30:00', '2025-02-14', 20, 1, 1),  
('20:45:00', '2025-02-14', 15, 2, 2),  
('17:00:00', '2025-02-15', 10, 3, 3),  
('21:00:00', '2025-02-15', 5, 4, 4),   
('19:30:00', '2025-02-16', 12, 5, 5);  

INSERT INTO `Booking` (`NoOfSeats`, `Cost`, `Email`)
VALUES
(2, 20.00, 'john.doe@example.com'),
(4, 40.00, 'jane.smith@example.com'),
(1, 10.00, 'bob.johnson@example.com'),
(3, 30.00, 'alice.williams@example.com'),
(5, 50.00, 'charlie.brown@example.com');

INSERT INTO `TicketType` (`Name`, `Cost`)
VALUES
('Standard', 10.00),
('VIP', 20.00),
('Student', 7.50),
('Senior', 5.00),
('Child', 3.00);

INSERT INTO `Ticket` (`BookingID`, `TheatreID`, `ScreeningID`, `TicketType`)
VALUES
(1, 1, 1, 'Standard'),  -- Booking 1, Theatre 1, Screening 1, Standard ticket
(2, 2, 2, 'VIP'),       -- Booking 2, Theatre 2, Screening 2, VIP ticket
(3, 3, 3, 'Student'),   -- Booking 3, Theatre 3, Screening 3, Student ticket
(4, 4, 4, 'Standard'),  -- Booking 4, Theatre 4, Screening 4, Standard ticket
(5, 5, 5, 'VIP');       -- Booking 5, Theatre 5, Screening 5, VIP ticket

INSERT INTO `Seat` (`SeatNo`, `Cost`)
VALUES
(1, 10),
(2, 12),
(3, 15),
(4, 10),
(5, 20);

INSERT INTO `Manager` (`Name`, `Email`, `Password`)
VALUES
('Alice Johnson', 'alice.johnson@example.com', 'password123'),
('Bob Smith', 'bob.smith@example.com', 'securePass456'),
('Charlie Brown', 'charlie.brown@example.com', 'chocoCake789'),
('Dana White', 'dana.white@example.com', 'admin@2025'),
('Eve Black', 'eve.black@example.com', 'evePass001');

INSERT INTO `Admin` (`Name`, `Email`, `Password`)
VALUES
('Grace Lee', 'grace.lee@example.com', 'gracePass987'),
('Henry Ford', 'henry.ford@example.com', 'fordPassword2025'),
('Ivy Green', 'ivy.green@example.com', 'greenPass123'),
('Jack Turner', 'jack.turner@example.com', 'jackPass1234'),
('Lily Adams', 'lily.adams@example.com', 'lilyPass2025');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;