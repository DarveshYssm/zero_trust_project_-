INSERT INTO users(email, password, last_active_at)
SELECT
    'admin@narxoz.kz',
    '$2a$10$N9qo8uLOickgx2ZMRZoMye8M4p1Z3T5eB5D1r1gO8gV8gV8gV8gV8',
    NOW()
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='admin@narxoz.kz');