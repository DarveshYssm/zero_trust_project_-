INSERT INTO user_roles(user_id, role_id)
SELECT u.id, r.id
FROM users u, role r
WHERE u.email='admin@narxoz.kz'
  AND r.name='ADMIN'
  AND NOT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = u.id AND role_id = r.id
);
