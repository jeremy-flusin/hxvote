CREATE DATABASE `hxvote`;

CREATE TABLE `hxvote`.`Action` (
`id` INT NOT NULL AUTO_INCREMENT,
`category_id` INT NOT NULL,
`label` VARCHAR(255) NULL,
`votes` INT NULL DEFAULT 0,    
PRIMARY KEY (`id`));

CREATE TABLE `hxvote`.`ActionRequest` (
`id` INT NOT NULL AUTO_INCREMENT,
`author` VARCHAR(255) NULL,
`description` VARCHAR(2048) NULL,
`date` DATE NULL,
PRIMARY KEY (`id`));

CREATE TABLE `hxvote`.`Category` (
`id` INT NOT NULL AUTO_INCREMENT,
`label` VARCHAR(255) NULL,
PRIMARY KEY (`id`));

CREATE TABLE `hxvote`.`Administration` (
`frontAccessible` INT NOT NULL );




