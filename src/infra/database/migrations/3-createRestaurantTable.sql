DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'restaurant_category') THEN
    CREATE TYPE restaurant_category AS ENUM (
      'Japonês', 'Francês', 'Italiano', 'Chinês', 'Brasileiro', 'Fast Food',
      'Indiano', 'Mexicano', 'Tailandês', 'Americano', 'Mediterrâneo',
      'Vegetariano', 'Vegano', 'Frutos do Mar', 'Churrascaria', 'Pizza',
      'Sobremesas', 'Cafeteria', 'Bar', 'Pub', 'Food Truck', 'Outra Categoria'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS restaurants (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  category restaurant_category NOT NULL,
  description TEXT,
  openingHour INTEGER NOT NULL,
  closingHour INTEGER NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
