USE ucode_web;

SELECT h.id, h.name
FROM heroes h
JOIN races r ON h.race_id = r.id
JOIN heroes_teams ht ON h.id = ht.hero_id
WHERE r.name != 'Human'
  AND h.name LIKE '%a%'
  AND h.class_role IN ('tankman', 'healer')
GROUP BY h.id
HAVING COUNT(DISTINCT ht.team_id) >= 2
ORDER BY h.id
LIMIT 1;
