
CREATE DATABASE ucode_web;

CREATE USER 'msvishchev'@'localhost' IDENTIFIED BY 'securepass';

GRANT ALL PRIVILEGES ON ucode_web.* TO 'msvishchev'@'localhost';

FLUSH PRIVILEGES;
