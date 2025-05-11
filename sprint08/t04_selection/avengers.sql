USE ucode_web;

SELECT h.id, h.name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
GROUP BY h.id
ORDER BY total_power DESC, h.id ASC
LIMIT 1;

SELECT h.id, h.name, COALESCE(SUM(hp.power_points), 0) AS defense_power
FROM heroes h
LEFT JOIN heroes_powers hp ON h.id = hp.hero_id
LEFT JOIN powers p ON hp.power_id = p.id AND p.type = 'defense'
GROUP BY h.id
ORDER BY defense_power ASC, h.id ASC
LIMIT 1;

SELECT h.id, h.name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
WHERE t.name = 'Avengers'
GROUP BY h.id
HAVING COUNT(DISTINCT ht.team_id) = 1 
ORDER BY total_power DESC;

SELECT t.name AS team, SUM(hp.power_points) AS total_power
FROM teams t
JOIN heroes_teams ht ON t.id = ht.team_id
JOIN heroes h ON ht.hero_id = h.id
JOIN heroes_powers hp ON h.id = hp.hero_id
WHERE t.name IN ('Avengers', 'Hydra')
GROUP BY t.id
ORDER BY total_power ASC;
