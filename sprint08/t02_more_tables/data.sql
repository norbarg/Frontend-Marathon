USE `ucode_web`;

INSERT IGNORE INTO races (name) VALUES 
('Human'), 
('Kree'), 
('Asgardian');

UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name IN ('Iron Man', 'Hulk', 'Doctor Strange', 'Black Widow');
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree') WHERE name = 'Captain Marvel';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Asgardian') WHERE name IN ('Thor', 'Rocket Raccoon', 'Groot', 'Vision', 'Gamora');

INSERT IGNORE INTO powers (name, type) VALUES
('bloody fist', 'attack'),
('iron shield', 'defense'),
('lightning strike', 'attack'),
('healing aura', 'defense');

INSERT IGNORE INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 200 FROM heroes h, powers p WHERE h.name = 'Iron Man' AND p.name = 'iron shield';

INSERT IGNORE INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 110 FROM heroes h, powers p WHERE h.name = 'Captain Marvel' AND p.name = 'bloody fist';

INSERT IGNORE INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 200 FROM heroes h, powers p WHERE h.name = 'Thor' AND p.name = 'iron shield';

INSERT IGNORE INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 130 FROM heroes h, powers p WHERE h.name = 'Thor' AND p.name = 'lightning strike';

INSERT IGNORE INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 90 FROM heroes h, powers p WHERE h.name = 'Vision' AND p.name = 'healing aura';

INSERT IGNORE INTO teams (name) VALUES
('Avengers'),
('Hydra'),
('Guardians');

INSERT IGNORE INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Iron Man' AND t.name = 'Avengers';

INSERT IGNORE INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Thor' AND t.name = 'Avengers';

INSERT IGNORE INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Black Widow' AND t.name = 'Hydra';

INSERT IGNORE INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Rocket Raccoon' AND t.name = 'Guardians';

INSERT IGNORE INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Vision' AND t.name = 'Avengers';

INSERT IGNORE INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Vision' AND t.name = 'Hydra';


-- hero for task t05

INSERT IGNORE INTO races (name) VALUES ('Kree');

INSERT INTO heroes (name, description, class_role, race_id)
SELECT 'Ronan', 'Kree warrior and judge known for extreme sense of justice.', 'tankman', r.id
FROM races r
WHERE r.name = 'Kree'
LIMIT 1;

INSERT IGNORE INTO teams (name) VALUES ('Avengers'), ('Hydra');

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id
FROM heroes h, teams t
WHERE h.name = 'Ronan' AND t.name IN ('Avengers', 'Hydra');
