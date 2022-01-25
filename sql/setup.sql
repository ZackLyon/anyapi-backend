-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS resources;

CREATE TABLE resources (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL
)