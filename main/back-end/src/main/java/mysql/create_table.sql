DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Dog;
DROP TABLE IF EXISTS BelongTo;
DROP TABLE IF EXISTS MeetUp;

CREATE TABLE User(
    uid varchar(255) PRIMARY KEY,
    username VARCHAR(20),
    phone INT,
    email varchar(255),
    bio varchar(255),
    pic_link varchar(255)
);

CREATE TABLE Dog(
    did varchar(255) PRIMARY KEY,
    name VARCHAR(20),
    age INT,
    gender VARCHAR(20),
    breed VARCHAR(20),
    pic_link varchar(255)
);

CREATE TABLE BelongTo(
    did TEXT REFERENCES Dog,
    uid TEXT REFERENCES User
);

CREATE TABLE MeetUp(
    mid INT PRIMARY KEY,
    sender varchar(255) REFERENCES User,
    receiver varchar(255) REFERENCES User,
    status VARCHAR(20)
);
