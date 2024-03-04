
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('user');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    role_id BIGINT NOT NULL DEFAULT 2,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    favorite BOOLEAN NOT NULL DEFAULT FALSE,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Seed data for products
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('Apple iPhone 12', 799.99, 4.5, 'The iPhone 12 is a smartphone designed, developed, and marketed by Apple Inc. It is the fourteenth generation, lower-priced iPhone, succeeding the iPhone 11.', 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('Samsung Galaxy S21', 699.99, 4.3, 'The Samsung Galaxy S21 is a series of Android-based smartphones designed, developed, marketed, and manufactured by Samsung Electronics as part of its Galaxy S series.', 'https://www.samsung.com/us/smartphones/galaxy-s21-5g/buy/hero/hero-image.jpg', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('Google Pixel 5', 699.99, 4.2, 'The Google Pixel 5 is a smartphone developed by Google. It was announced on September 30, 2020, and released on October 29, 2020 as the successor to the Pixel 4.', 'https://store.google.com/us/product/pixel_5?hl=en-US', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('OnePlus 9 Pro', 899.99, 4.6, 'The OnePlus 9 Pro is a smartphone developed by OnePlus. It was announced on March 23, 2021, and released on March 26, 2021 as the successor to the OnePlus 8 Pro.', 'https://www.oneplus.com/oneplus-9-pro?from=9_pro', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('Xiaomi Mi 11', 699.99, 4.4, 'The Xiaomi Mi 11 is a smartphone developed by Xiaomi Inc. It was announced on December 28, 2020, and released on January 1, 2021 as the successor to the Xiaomi Mi 10.', 'https://www.mi.com/global/mi-11', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('Sony Xperia 1 III', 1299.99, 4.7, 'The Sony Xperia 1 III is a smartphone developed by Sony. It was announced on April 14, 2021, and released on August 19, 2021 as the successor to the Sony Xperia 1 II.', 'https://www.sony.com/electronics/smartphones/xperia-1m3', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('Motorola Edge 20 Pro', 699.99, 4.3, 'The Motorola Edge 20 Pro is a smartphone developed by Motorola. It was announced on August 5, 2021, and released on August 19, 2021 as the successor to the Motorola Edge 20.', 'https://www.motorola.com/us/smartphones-motorola-edge-20-pro/p', TRUE, TRUE);
INSERT INTO products (name, price, rating, description, image_url, favorite, available) VALUES ('LG Velvet', 499.99, 4.0, 'The LG Velvet is a smartphone developed by LG Electronics. It was announced on May 7, 2020, and released on May 15, 2020 as the successor to the LG G8.', 'https://www.lg.com/us/mobile-phones/velvet-5g', TRUE, TRUE);
--