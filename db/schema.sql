CREATE DATABASE burgers_db;
USE burgers_db;

-- creating table in database
CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger_name varchar(30) NOT NULL,
    devoured BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

