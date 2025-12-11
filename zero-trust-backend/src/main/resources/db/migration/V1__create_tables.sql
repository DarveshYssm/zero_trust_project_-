CREATE TABLE IF NOT EXISTS role (
                                    id SERIAL PRIMARY KEY,
                                    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     email VARCHAR(255) UNIQUE NOT NULL,
                                     password VARCHAR(255) NOT NULL,
                                     last_active_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
                                          user_id INT REFERENCES users(id),
                                          role_id INT REFERENCES role(id),
                                          PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS tasks (
                                     id SERIAL PRIMARY KEY,
                                     title VARCHAR(255),
                                     description TEXT,
                                     created_at TIMESTAMP,
                                     user_id INT REFERENCES users(id)
);
