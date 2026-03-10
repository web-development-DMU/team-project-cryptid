CREATE TABLE IF NOT EXISTS test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    username TEXT,
    password PASSWORD,
    level INTEGER
);
INSERT INTO test (firstname, lastname, username, password) VALUES ('john', 'doe', 'johndoe', '123');
SELECT * FROM test;