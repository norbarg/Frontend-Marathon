USE `ucode_web`;

CREATE TABLE IF NOT EXISTS races (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE heroes
  ADD COLUMN race_id INT NULL AFTER class_role,
  ADD CONSTRAINT fk_heroes_race
    FOREIGN KEY (race_id) REFERENCES races(id)
    ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS powers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('attack', 'defense') NOT NULL
);

CREATE TABLE IF NOT EXISTS heroes_powers (
    hero_id INT NOT NULL,
    power_id INT NOT NULL,
    power_points INT NOT NULL,
    PRIMARY KEY (hero_id, power_id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS heroes_teams (
    hero_id INT NOT NULL,
    team_id INT NOT NULL,
    PRIMARY KEY (hero_id, team_id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);