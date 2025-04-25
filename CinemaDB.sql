 -- select * from user;
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
  `Name` varchar(300) NOT NULL,
  `Category` varchar(10) NOT NULL,
  `RunningTime` int(10) NOT NULL,
  `Genre` varchar(50) NOT NULL,
  `Director` varchar(50) NOT NULL,
  `CoverImage` varchar(300) NOT NULL,
  `VideoURL` varchar(300) NOT NULL,
  `ReleaseDate` DATE NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Starring` varchar(100) NOT NULL,
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

INSERT INTO `Film` (`Name`, `Category`, `Genre`, `RunningTime`, `Director`, `CoverImage`, `VideoURL`, `ReleaseDate`, `Description`, `Starring`) 
VALUES
('The Dark Knight', 'Action', 'PG-13', 90,'Christopher Nolan', 'The_Dark_Knight.jpg', 'https://www.youtube.com/embed/TQfATDZY5Y4?si=SUfnoLnAVo0u5pGl', '2008-07-18', 'A gripping tale of Batmans battle against the Joker, who seeks to undermine Gotham City with chaos and destruction. Nolans masterful direction and Heath Ledgers iconic portrayal of the Joker make this film an unforgettable chapter in the Batman saga.', 'Christian Bale, Heath Ledger'),
('Inception', 'Sci-Fi', 'PG-13', 90, 'Christopher Nolan', 'Inception.jpg', 'https://www.youtube.com/embed/LifqWf0BAOA?si=zsELF9jX_wI942eU', '2010-07-16', ' A mind-bending thriller where a thief who enters the minds of others must perform the impossible task of planting an idea. With stunning visuals and complex storytelling, this film explores the boundaries between dreams and reality.', 'Leonardo DiCaprio'),
('The Shawshank Redemption', 'Drama', 'R', 90, 'Frank Darabont', 'The_Shawshank_Redemption.jpg', 'https://www.youtube.com/embed/PLl99DlL6b4?si=l5671WowLHFqEBn7', '1994-09-22', 'This inspiring story follows Andy Dufresne, a banker wrongfully imprisoned for murder, as he navigates life inside Shawshank prison. Through his friendship with fellow inmate Red, Andys hope and resilience shine through, making it one of the greatest films ever made.', 'Morgan Freeman'),
('Interstellar', 'Sci-Fi', 'PG-13', 90,'Christopher Nolan', 'Interstellar.jpg', 'https://www.youtube.com/embed/zSWdZVtXT7E?si=7lCey7HbESKCehHR', '2014-11-07', 'A visually stunning journey through space as a team of astronauts embarks on a mission to find a new habitable planet for humanity. Themes of love, time, and sacrifice make this film an emotionally and intellectually powerful experience.', 'Matthew McConaughey'),
('The Godfather', 'Crime', 'R', 90, 'Francis Ford Coppola', 'The_Godfather.jpg', 'https://www.youtube.com/embed/UaVTIH8mujA?si=oD6qDcSZ8SnxRlph', '1972-03-24', 'A classic mafia epic that delves into the life of the powerful Corleone family. This film explores themes of power, loyalty, and betrayal while showcasing legendary performances by Marlon Brando and Al Pacino.', 'Marlon Brando, Al Pacino'),
('The Matrix', 'Sci-Fi', 'R', 120, 'The Wachowskis', 'The_Matrix.jpg', 'https://www.youtube.com/embed/vKQi3bBA1y8?si=4A2T7ZY5Fw2h7j7g', '1999-03-31', 'A revolutionary sci-fi action film that explores the nature of reality and humanitys place within it. Neo discovers that the world he lives in is a simulation controlled by machines, leading to a battle to free humankind.', 'Keanu Reeves'),
('Pulp Fiction', 'Crime', 'R', 160, 'Quentin Tarantino', 'Pulp_Fiction.jpg', 'https://www.youtube.com/embed/s7EdQ4FqbhY?si=on-Dn9BxGc3vfP_o', '1994-10-14', ' A darkly comedic and intricately woven film that intertwines multiple storylines involving crime and redemption. With sharp dialogue and iconic characters, this film became a cultural milestone in modern cinema.', 'John Travolta'),
('Fight Club', 'Drama', 'R', 145, 'David Fincher', 'Fight_Club.jpg', 'https://www.youtube.com/embed/SUXWAEX2jlg?si=9dTgnf8TYtYP78h3', '1999-10-15', 'A psychological drama that explores themes of consumerism, identity, and masculinity through the story of an unnamed narrator who forms an underground fight club with the enigmatic Tyler Durden.', 'Brad Pitt'),
('Forrest Gump', 'Drama', 'PG-13', 145, 'Robert Zemeckis', 'Forrest_Gump.jpg', 'https://www.youtube.com/embed/bLvqoHBptjg?si=NJ07He0IhBlnRZjl', '1994-07-06', ' A heartwarming and poignant tale of Forrest Gump, a man with a low IQ but an extraordinary life. From influencing major historical events to inspiring those around him, Forrests journey is both humorous and deeply moving', 'Tom Hanks'),
('The Lord of the Rings: The Fellowship of the Ring', 'Action', 'PG-13', 160, 'Peter Jackson', 'LOTR_Fellowship.jpg', 'https://www.youtube.com/embed/V75dMMIW2B4?si=zW4kCr4aU-PxHG_a', '2001-12-19', 'The epic beginning to the Lord of the Rings trilogy, as Frodo Baggins sets out on a dangerous quest to destroy a powerful ring. Filled with breathtaking visuals and a legendary cast, it’s an unforgettable fantasy adventure', 'Ian McKellan'),
('The Avengers', 'Action', 'PG-13', 145, 'Joss Whedon', 'The_Avengers.jpg', 'https://www.youtube.com/embed/eOrNdBpGMv8?si=aXYvNhzS6tqFLmQX', '2012-05-04', 'Earth’s mightiest heroes assemble to protect the world from the threat of Loki, who attempts to bring an alien invasion to Earth. With iconic performances and thrilling action, this marks the beginning of the Marvel Cinematic Universe.', 'Robert Downey Jr, Chris Evans'),
('The Lion King', 'Kids', 'G', 90, 'Roger Allers, Rob Minkoff', 'The_Lion_King.jpg', 'https://www.youtube.com/embed/4sj1MT05lAA?si=Wh0pJtF5A8k2cx3V', '1994-06-24', 'A beloved Disney classic, following the journey of Simba, a young lion prince who must overcome tragedy and responsibility to become king. With unforgettable songs and beautiful animation, it’s a timeless tale of growth and courage', 'Jeremy Irons'),
('Star Wars: Episode IV - A New Hope', 'Sci-Fi', 'PG', 120, 'George Lucas', 'Star_Wars_A_New_Hope.jpg', 'https://www.youtube.com/embed/1g3_CFmnU7k?si=7cEOc9K8VuB2PexD', '1977-05-25', 'The groundbreaking sci-fi epic that introduced audiences to the world of Star Wars. Luke Skywalker embarks on an adventure to rescue Princess Leia and battle the evil Empire, in a story that forever changed cinema', 'Mark Hamill, Harrison Ford'),
('The Dark Knight Rises', 'Action', 'PG-13', 160, 'Christopher Nolan', 'The_Dark_Knight_Rises.jpg', 'https://www.youtube.com/embed/g8evyE9TuYk?si=Ge8Exy52wVyxU_Mg', '2012-07-20', ' The final installment of Nolan’s Batman trilogy, where Bruce Wayne must rise from physical and emotional defeat to face Bane, a formidable foe who threatens Gotham. A fitting conclusion to the epic saga', 'Christian Bale, Heath Ledger'),
('Gladiator', 'Action', 'R', 160, 'Ridley Scott', 'Gladiator.jpg', 'https://www.youtube.com/embed/owK1qxDselE?si=QLbfRT-5Yk9GiYNr', '2000-05-05', 'A powerful and brutal historical epic about Maximus, a betrayed Roman general who seeks revenge against the corrupt emperor who murdered his family. With stunning action and an unforgettable performance by Russell Crowe.', 'Russell Crowe');

INSERT INTO `Theatre` (`Capacity`)
VALUES
(50),
(30),
(40),
(30),
(20);

INSERT INTO `Screening` (`StartTime`, `Date`, `SeatsRemaining`, `TheatreID`, `FilmID`)
VALUES

('17:00:00', '2025-02-24', 35, 1, 1), -- OUT OF DATE FOR TESTING ON DARK KNIGHT FILM;

-- WEEK 4

('17:00:00', '2025-05-15', 37, 1, 1),
('17:00:00', '2025-05-15', 30, 2, 2),
('17:00:00', '2025-05-15', 40, 3, 3),
('17:00:00', '2025-05-15', 30, 4, 4),
('17:00:00', '2025-05-15', 20, 5, 5),
('18:30:00', '2025-04-15', 50, 1, 6),
('18:30:00', '2025-04-15', 30, 2, 1),
('18:30:00', '2025-04-15', 40, 3, 8),
('18:30:00', '2025-04-15', 22, 4, 9),
('18:30:00', '2025-04-15', 20, 5, 10),
('20:45:00', '2025-04-15', 50, 1, 11),
('20:00:00', '2025-04-15', 28, 2, 12),
('21:00:00', '2025-04-15', 40, 3, 1),
('21:00:00', '2025-04-15', 30, 4, 2),
('20:45:00', '2025-04-15', 20, 5, 3),

('17:00:00', '2025-04-16', 50, 1, 7),
('17:00:00', '2025-04-16', 30, 2, 8),
('17:00:00', '2025-04-16', 30, 3, 13),
('17:00:00', '2025-04-16', 23, 4, 14),
('17:00:00', '2025-04-16', 20, 5, 15),
('20:00:00', '2025-04-16', 50, 1, 6),
('20:00:00', '2025-04-16', 30, 2, 1),
('19:00:00', '2025-04-16', 30, 3, 8),
('20:00:00', '2025-04-16', 26, 4, 9),
('20:00:00', '2025-04-16', 20, 5, 3),
('21:30:00', '2025-04-16', 26, 2, 15),
('21:30:00', '2025-04-16', 14, 5, 7),

('17:00:00', '2025-04-17', 50, 1, 13),
('17:00:00', '2025-04-17', 30, 2, 14),
('17:00:00', '2025-04-17', 40, 3, 2),
('17:00:00', '2025-04-17', 30, 4, 10),
('17:00:00', '2025-04-17', 20, 5, 11),
('19:00:00', '2025-04-17', 49, 1, 13),
('20:00:00', '2025-04-17', 30, 2, 6),
('18:30:00', '2025-04-17', 40, 3, 9),
('20:00:00', '2025-04-17', 30, 4, 3),
('20:00:00', '2025-04-17', 20, 5, 11),
('21:00:00', '2025-04-17', 50, 1, 8),
('21:00:00', '2025-04-17', 40, 3, 13),
('21:30:00', '2025-04-17', 30, 4, 7),

('17:00:00', '2025-04-18', 50, 1, 1),
('17:00:00', '2025-04-18', 30, 2, 2),
('17:00:00', '2025-04-18', 30, 3, 3),
('17:00:00', '2025-04-18', 27, 4, 4),
('17:00:00', '2025-04-18', 20, 5, 5),
('18:30:00', '2025-04-18', 50, 1, 6),
('18:30:00', '2025-04-18', 30, 2, 1),
('18:30:00', '2025-04-18', 40, 3, 8),
('18:30:00', '2025-04-18', 13, 4, 9),
('18:30:00', '2025-04-18', 15, 5, 10),
('20:45:00', '2025-04-18', 50, 1, 11),
('20:00:00', '2025-04-18', 30, 2, 12),
('21:00:00', '2025-04-18', 31, 3, 1),
('21:00:00', '2025-04-18', 30, 4, 2),
('20:45:00', '2025-04-18', 20, 5, 3),

('17:00:00', '2025-04-19', 46, 1, 7),
('17:00:00', '2025-04-19', 30, 2, 8),
('17:00:00', '2025-04-19', 40, 3, 13),
('17:00:00', '2025-04-19', 30, 4, 14),
('17:00:00', '2025-04-19', 20, 5, 15),
('20:00:00', '2025-04-19', 50, 1, 6),
('20:00:00', '2025-04-19', 30, 2, 1),
('19:00:00', '2025-04-19', 40, 3, 8),
('20:00:00', '2025-04-19', 30, 4, 9),
('20:00:00', '2025-04-19', 20, 5, 3),
('21:30:00', '2025-04-19', 30, 2, 15),
('21:30:00', '2025-04-19', 20, 5, 7),

('17:00:00', '2025-04-20', 50, 1, 13),
('17:00:00', '2025-04-20', 30, 2, 14),
('17:00:00', '2025-04-20', 40, 3, 2),
('17:00:00', '2025-04-20', 27, 4, 10),
('17:00:00', '2025-04-20', 18, 5, 11),
('19:00:00', '2025-04-20', 50, 1, 13),
('20:00:00', '2025-04-20', 30, 2, 6),
('18:30:00', '2025-04-20', 40, 3, 9),
('20:00:00', '2025-04-20', 30, 4, 3),
('20:00:00', '2025-04-20', 20, 5, 11),
('21:00:00', '2025-04-20', 50, 1, 8),
('21:00:00', '2025-04-20', 40, 3, 13),
('21:30:00', '2025-04-20', 30, 4, 7),

('17:00:00', '2025-04-21', 50, 1, 5),
('17:00:00', '2025-04-21', 30, 2, 1),
('17:00:00', '2025-04-21', 40, 3, 2),
('17:00:00', '2025-04-21', 30, 4, 6),
('17:00:00', '2025-04-21', 20, 5, 10),
('18:30:00', '2025-04-21', 46, 1, 2),
('18:30:00', '2025-04-21', 30, 2, 4),
('18:30:00', '2025-04-21', 40, 3, 12),
('19:00:00', '2025-04-21', 30, 4, 6),
('20:00:00', '2025-04-21', 20, 5, 11),
('20:00:00', '2025-04-21', 50, 1, 8),
('20:00:00', '2025-04-21', 30, 2, 5),
('20:00:00', '2025-04-21', 40, 3, 13),
('20:00:00', '2025-04-21', 30, 4, 7),
('20:00:00', '2025-04-21', 20, 5, 12),
('21:30:00', '2025-04-21', 24, 2, 7),
('21:30:00', '2025-04-21', 20, 5, 11);





INSERT INTO `Booking` (`NoOfSeats`, `Cost`, `Email`, `ScreeningID`)
VALUES
(2, 20.00, 'sample@example.com', 12),
(4, 30.00, 'sample@example.com', 24),
(1, 20.00, 'sample@example.com', 33),
(3, 15.00, 'sample@example.com', 71),
(9, 50.00, 'sample@example.com', 53),
(4, 40.00, 'sample@example.com', 56),
(4, 80.00, 'sample@example.com', 86),
(10, 75.00, 'asample@example.com', 18),
(2, 20.00, 'sample@example.com', 49),
(9, 67.50, 'sample@example.com', 49),
(6, 27.00, 'sample@example.com', 49),
(10, 50.00, 'sample@example.com', 43),
(6, 60.00, 'sample@example.com', 27),
(4, 60.00, 'sample@example.com', 26),
(10, 100.00, 'sample@example.com', 23),
(3, 30.00, 'sample@example.com', 44),
(7, 52.50, 'sample@example.com', 19),
(6, 30.00, 'sample@example.com', 96),
(2, 20.00, 'sample@example.com', 72),
(8, 41.50, 'sample@example.com', 9),
(5, 50.00, 'sample@example.com', 50),
(7, 70.00, 'sample@example.com', 1),
(4, 12.00, 'sample@example.com', 1),
(2, 40.00, 'sample@example.com', 1);



INSERT INTO `TicketType` (`Name`, `Cost`)
VALUES
('Standard', 10.00),
('VIP', 20.00),
('Student', 7.50),
('Senior', 5.00),
('Child', 3.00);

-- INSERT INTO `Ticket` (`BookingID`, `TheatreID`, `ScreeningID`, `TicketType`)
-- VALUES
-- (1, 1, 1, 'Standard'),  -- Booking 1, Theatre 1, Screening 1, Standard ticket
-- (2, 2, 1, 'VIP'),       -- Booking 2, Theatre 2, Screening 2, VIP ticket
-- (3, 3, 1, 'Student'),   -- Booking 3, Theatre 3, Screening 3, Student ticket
-- (4, 4, 1, 'Standard'),  -- Booking 4, Theatre 4, Screening 4, Standard ticket
-- (5, 5, 1, 'VIP');       -- Booking 5, Theatre 5, Screening 5, VIP ticket

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
('Charlie Brown', 'charlie.brown@example.com', 'chocoCake789', "Admin"),
('Dana White', 'testAd@gmail.com', 'password123', "Admin"),
('Eve Black', 'eve.black@example.com', 'evePass001', "Manager");



INSERT INTO `ShowingTime` (`StartTime`)
VALUES
('17:00:00'),
('17:30:00'),
('17:45:00'),
('18:00:00'),
('18:30:00'),
('18:45:00'),
('19:00:00'),
('19:30:00'),
('19:45:00'),
('20:00:00'),
('20:30:00'),
('20:45:00'),
('21:00:00'),
('21:30:00'),
('21:45:00');


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