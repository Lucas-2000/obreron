CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  amount NUMERIC NOT NULL,
  payment_type VARCHAR(20) CHECK (payment_type IN ('Cartão de crédito', 'Cartão de débito', 'Pix', 'Dinheiro')) NOT NULL,
  delivery_status VARCHAR(20) CHECK (delivery_status IN ('Pendente', 'Preparando', 'Enviado', 'Entregue')) NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id TEXT REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_id TEXT REFERENCES customers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  quantity INT NOT NULL,
  notes TEXT,
  item_id TEXT REFERENCES items(id) ON DELETE CASCADE,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);