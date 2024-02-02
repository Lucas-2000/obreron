CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_in_cents INTEGER NOT NULL,
  available BOOLEAN NOT NULL,
  preparation_time INTEGER,
  ingredients TEXT[],
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);