CREATE DATABASE mysql_the_project;

use mysql_the_project;

CREATE TABLE category(
	categoryId INT NOT NULL AUTO_INCREMENT,
	categoryName VARCHAR(50) NOT NULL,
	PRIMARY KEY (categoryId)
);

INSERT INTO category(categoryName)
VALUES('Historia'),
      ('Matematik'),
      ('Geografi'),
      ('Psykologi'),
      ('Biologi'),
      ('Kemi'),
      ('UXD'),
      ('Fysik');

CREATE TABLE collections(
    collectionId INT NOT NULL AUTO_INCREMENT,
    collectionName VARCHAR(50) NOT NULL,
    sharedCollection BOOLEAN DEFAULT FALSE,
    createdBy VARCHAR(50) NOT NULL,
    PRIMARY KEY (collectionId)
);

INSERT INTO collections(collectionName, createdBy, sharedCollection)
VALUES('Min collection 1','Me', 0),
('Min collection 2','me', 1),
('Min collection 3','meeee', 1),
('Min collection 4','meee2', 0);

CREATE TABLE flashcard(
    collectionId INT,
    flashcardId INT NOT NULL AUTO_INCREMENT,
	flashcardQuestion VARCHAR(500) NOT NULL,
    flashcardAnswer VARCHAR(500) NOT NULL,
    categoryId INT NOT NULL,
	PRIMARY KEY (flashcardId),
    FOREIGN KEY (categoryId) REFERENCES category(categoryId),
    FOREIGN KEY (collectionId) REFERENCES collections(collectionId) ON DELETE SET NULL
);

INSERT INTO flashcard(flashcardQuestion, flashcardAnswer,collectionId, categoryId)
VALUES('Vilket år föll Berlinmuren och varför var det viktigt?', '1989. Murens fall symboliserade slutet på kalla kriget och början på Tysklands återförening.', 2, 1),
      ('Vad är 2+2?', '4', 2, 2),
      ('Vilken är världens längsta flod?', 'Nilen (ibland anses Amazonas vara längst beroende på mätmetod).',2, 3),
      ('Vad innebär klassisk betingning?', 'En inlärningsprocess där en neutral stimulus kopplas till en automatisk respons genom upprepad association.',2, 4),
      ('Vad är cellens mitokondriers huvudfunktion?', 'Att producera energi (ATP) genom cellandning.',2, 5),
      ('Vad är pH-värde ett mått på?', 'Hur sur eller basisk en lösning är.',2, 6),
      ('Vad innebär användarcentrerad design?', 'Att designprocessen fokuserar på användarnas behov, beteenden och mål för att skapa bättre användarupplevelser.',2, 7),
      ('Vad säger Newtons första lag?', 'Ett föremål förblir i vila eller rör sig med konstant hastighet om ingen yttre kraft påverkar det.',2, 8);

CREATE TABLE quiz(
    collectionId INT,
    quizId INT NOT NULL AUTO_INCREMENT,
	quizQuestion VARCHAR(500) NOT NULL,
    quizCorrectAnswer VARCHAR(500) NOT NULL,
    quizAnswer1 VARCHAR(500) NOT NULL,
    quizAnswer2 VARCHAR(500) NOT NULL,
    quizAnswer3 VARCHAR(500) NOT NULL,
    categoryId INT NOT NULL,
	PRIMARY KEY (quizId),
    FOREIGN KEY (categoryId) REFERENCES category(categoryId),
    FOREIGN KEY (collectionId) REFERENCES collections(collectionId) ON DELETE SET NULL
);

INSERT INTO quiz(quizQuestion, quizCorrectAnswer, quizAnswer1, quizAnswer2, quizAnswer3, collectionId, categoryId)
VALUES(
       'hur många laxar?', '6', '5', '12','annat',1, 5),
    ('hur många Sjömän?', '7', '5', '12','annat',1, 1),
    ('Hur många kalorier i ett glas vatten?', '0', '5','annat', '12',1, 5),
    ('hur många ben har en tusenfoting?', 'vet ej', '1000', '12 000','annat',1, 5
      );

CREATE TABLE ratings(
    ratingId INT NOT NULL AUTO_INCREMENT,
    ratingScore INT,
    collectionId INT NOT NULL,
    ratedBy VARCHAR(50) NOT NULL,
    PRIMARY KEY (ratingId),
    FOREIGN KEY (collectionId) REFERENCES collections(collectionId)
);

INSERT INTO ratings(ratingScore, collectionId, ratedBy)
VALUES (3, 2, 'carro'),
(4, 2, 'test'),
(4, 1, 'test'),
(3, 2, 'test2'),
(2, 2, 'test3');

SELECT * FROM category;
SELECT * FROM collections;
SELECT * FROM flashcard;
SELECT * FROM flashcard WHERE collectionId = 2;
SELECT * FROM quiz;
SELECT * FROM collections WHERE collectionId = 1;
SELECT * FROM ratings;
SELECT * FROM ratings WHERE collectionId = 2;
SELECT AVG(ratingScore) FROM ratings WHERE collectionId = 2;

DROP TABLE flashcard;
DROP TABLE quiz;
DROP TABLE collections;
DROP TABLE category;
DROP TABLE ratings;
