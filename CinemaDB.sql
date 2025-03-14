 select * from user;
-- select * from booking;
-- select * from film;
-- select * from manager;
-- select * from screening;
-- select * from seat;
-- select * from theatre;
-- select * from ticket;
-- select * from tickettype;


-- Select * FROM screening WHERE TheatreID = 1 AND Date = 2025-03-05 AND (StartTime = '17:00:00'|| (StartTime = '17:00:00'+SEC_TO_TIME(90) || StartTime = '17:00:00'- SEC_TO_TIME(90)));



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
  `ScreeningID` INT NOT NULL,
  PRIMARY KEY (`BookingID`),
  FOREIGN KEY (`ScreeningID`) REFERENCES `Screening`(`ScreeningID`) ON DELETE CASCADE
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
  `SeatNo` INT AUTO_INCREMENT,
  `Cost` INT NOT NULL ,
  PRIMARY KEY (`SeatNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `User` (
`EmployeeID` INT NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Role` varchar(50) NOT NULL,
  PRIMARY KEY (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `ShowingTime` (
`TimeID` int AUTO_INCREMENT,
  `StartTime` TIME NOT NULL,
  PRIMARY KEY (`TimeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `Category` (
`CategoryID` int AUTO_INCREMENT,
`Category` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `AgeRating` (
`AgeRatingID` int AUTO_INCREMENT,
  `AgeRating` varchar(5) NOT NULL,
  PRIMARY KEY (`AgeRatingID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `RunningTime` (
`RunningTimeID` int AUTO_INCREMENT,
  `RunningTime` int NOT NULL,
  PRIMARY KEY (`RunningTimeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Capacity` (
`CapacityID` int AUTO_INCREMENT,
  `Capacity` int NOT NULL,
  PRIMARY KEY (`CapacityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Film` (`Name`, `Category`, `Genre`, `RunningTime`, `Director`, `CoverImage`, `VideoURL`, `ReleaseDate`) 
VALUES
('The Dark Knight', 'Action', 'PG-13', 90,'Christopher Nolan', 'The_Dark_Knight.jpg', 'https://www.youtube.com/embed/TQfATDZY5Y4?si=SUfnoLnAVo0u5pGl', '2008-07-18'),
('Inception', 'Sci-Fi', 'PG-13', 90, 'Christopher Nolan', 'Inception.jpg', 'https://www.youtube.com/embed/LifqWf0BAOA?si=zsELF9jX_wI942eU', '2010-07-16'),
('The Shawshank Redemption', 'Drama', 'R', 90, 'Frank Darabont', 'The_Shawshank_Redemption.jpg', 'https://www.youtube.com/embed/PLl99DlL6b4?si=l5671WowLHFqEBn7', '1994-09-22'),
('Interstellar', 'Sci-Fi', 'PG-13', 90,'Christopher Nolan', 'Interstellar.jpg', 'https://www.youtube.com/embed/zSWdZVtXT7E?si=7lCey7HbESKCehHR', '2014-11-07'),
('The Godfather', 'Crime', 'R', 90, 'Francis Ford Coppola', 'The_Godfather.jpg', 'https://www.youtube.com/embed/UaVTIH8mujA?si=oD6qDcSZ8SnxRlph', '1972-03-24'),
('The Matrix', 'Sci-Fi', 'R', 120, 'The Wachowskis', 'The_Matrix.jpg', 'https://www.youtube.com/embed/vKQi3bBA1y8?si=4A2T7ZY5Fw2h7j7g', '1999-03-31'),
('Pulp Fiction', 'Crime', 'R', 160, 'Quentin Tarantino', 'Pulp_Fiction.jpg', 'https://www.youtube.com/embed/s7EdQ4FqbhY?si=on-Dn9BxGc3vfP_o', '1994-10-14'),
('Fight Club', 'Drama', 'R', 145, 'David Fincher', 'Fight_Club.jpg', 'https://www.youtube.com/embed/SUXWAEX2jlg?si=9dTgnf8TYtYP78h3', '1999-10-15'),
('Forrest Gump', 'Drama', 'PG-13', 145, 'Robert Zemeckis', 'Forrest_Gump.jpg', 'https://www.youtube.com/embed/bLvqoHBptjg?si=NJ07He0IhBlnRZjl', '1994-07-06'),
('The Lord of the Rings: The Fellowship of the Ring', 'Action', 'PG-13', 160, 'Peter Jackson', 'LOTR_Fellowship.jpg', 'https://www.youtube.com/embed/V75dMMIW2B4?si=zW4kCr4aU-PxHG_a', '2001-12-19'),
('The Avengers', 'Action', 'PG-13', 145, 'Joss Whedon', 'The_Avengers.jpg', 'https://www.youtube.com/embed/eOrNdBpGMv8?si=aXYvNhzS6tqFLmQX', '2012-05-04'),
('The Lion King', 'Kids', 'G', 90, 'Roger Allers, Rob Minkoff', 'The_Lion_King.jpg', 'https://www.youtube.com/embed/4sj1MT05lAA?si=Wh0pJtF5A8k2cx3V', '1994-06-24'),
('Star Wars: Episode IV - A New Hope', 'Sci-Fi', 'PG', 120, 'George Lucas', 'Star_Wars_A_New_Hope.jpg', 'https://www.youtube.com/embed/1g3_CFmnU7k?si=7cEOc9K8VuB2PexD', '1977-05-25'),
('The Dark Knight Rises', 'Action', 'PG-13', 160, 'Christopher Nolan', 'The_Dark_Knight_Rises.jpg', 'https://www.youtube.com/embed/g8evyE9TuYk?si=Ge8Exy52wVyxU_Mg', '2012-07-20'),
('Gladiator', 'Action', 'R', 160, 'Ridley Scott', 'Gladiator.jpg', 'https://www.youtube.com/embed/owK1qxDselE?si=QLbfRT-5Yk9GiYNr', '2000-05-05');

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

INSERT INTO `Booking` (`NoOfSeats`, `Cost`, `Email`, `ScreeningID`)
VALUES
(2, 20.00, 'john.doe@example.com', 1),
(4, 40.00, 'jane.smith@example.com', 1 ),
(1, 10.00, 'bob.johnson@example.com', 1 ),
(3, 30.00, 'alice.williams@example.com', 1),
(5, 50.00, 'charlie.brown@example.com', 1 );

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

INSERT INTO `User` (`Name`, `Email`, `Password`, `Role`)
VALUES
('Alice Johnson', 'alice.johnson@example.com', 'password123', "Manager"),
('Bob Smith', 'testMan@gmail.com', 'password123', "Manager"),
('Charlie Brown', 'charlie.brown@example.com', 'chocoCake789', "Manager"),
('Dana White', 'dana.white@example.com', 'admin@2025', "Manager"),
('Eve Black', 'eve.black@example.com', 'evePass001', "Manager");



INSERT INTO `ShowingTime` (`StartTime`)
VALUES
('17:00:00'),
('18:00:00'),
('18:30:00'),
('19:00:00'),
('19:30:00'),
('20:45:00'),
('20:00:00'),
('21:00:00');


INSERT INTO `AgeRating` (`AgeRating`)
VALUES
('G'),  
('PG'),      
('PG-13'),  
('15A'),  
('R');      

INSERT INTO `Category` (`Category`)
VALUES
('Action'),  
('Kids'),      
('Sci-Fi'),  
('Drama'), 
('Thriller'),  
('Comedy'),  
('Crime');  


INSERT INTO `RunningTime` (`RunningTime`)
VALUES
(75),  
(90),  
(110),  
(120),      
(130),
(145),  
(160);    


INSERT INTO `Capacity` (`Capacity`)
VALUES
(20),  
(30),  
(40),  
(50),      
(60); 

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;