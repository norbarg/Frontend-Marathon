USE sword;
ALTER TABLE users ADD status ENUM('admin', 'user') DEFAULT 'user';
