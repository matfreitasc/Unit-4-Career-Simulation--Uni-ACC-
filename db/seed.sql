CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS cartItems CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;


-- Create tables for the database
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE product (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() ,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category_id BIGINT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    available BOOLEAN NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() ,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    access_token VARCHAR(225),
    refresh_token VARCHAR(225),
    address VARCHAR(100) ,
    address2 VARCHAR(50),
    city VARCHAR(90) ,
    state VARCHAR(20) ,
    zip VARCHAR(12) ,
    country VARCHAR(90) ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Each row represents a cart
CREATE TABLE carts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4() ,
    user_id UUID,
    session_id UUID,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Each row represents a product in a cart
CREATE TABLE cartItems (
    id BIGSERIAL PRIMARY KEY,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);


-- Trigger and function to make the first user admin
CREATE OR REPLACE FUNCTION make_first_user_admin()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM users) = 1 THEN
        UPDATE users SET is_admin = TRUE WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER make_first_user_admin
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION make_first_user_admin();


-- Create categories
INSERT INTO categories (name, description) VALUES ('Electronics', 'Electronic devices and accessories');
INSERT INTO categories (name, description) VALUES ('Clothing', 'Clothing and accessories');
INSERT INTO categories (name, description) VALUES ('Books', 'Books and literature');
INSERT INTO categories (name, description) VALUES ('Home', 'Home and garden');
INSERT INTO categories (name, description) VALUES ('Toys', 'Toys and games');
INSERT INTO categories (name, description) VALUES ('Health', 'Health and beauty');

-- Create products
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('iPhone 12', 'The iPhone 12 is a smartphone designed, developed, and marketed by Apple Inc. It is the fourteenth generation, lower-priced iPhone, succeeding the iPhone 11.', 1, 799.99, 100, true, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604343704000');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('MacBook Pro', 'The MacBook Pro is a line of Macintosh portable computers introduced in January 2006, by Apple Inc. It is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air, and is sold with 13- and 16-inch screens.', 1, 1299.99, 100, true, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('Apple Watch', 'The Apple Watch is a line of smartwatches designed, developed, and marketed by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services.', 1, 399.99, 100, true, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT613ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-trail-ultra2_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=1694507270905');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('AirPods', 'AirPods are wireless Bluetooth earbuds created by Apple. They were first released on December 13, 2016, with a 2nd generation released in 2019 and the premium AirPods Pro released later that year.', 1, 199.99, 100, false, 'https://cdn.mos.cms.futurecdn.net/Qg9oo4uhpH4x6VqhwNX4ED-1200-80.jpg');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('Apple TV', 'Apple TV is a digital media player and microconsole developed and sold by Apple Inc. It is a small network appliance and entertainment device that can receive digital data for visual and audio content such as music, video, video games, or the screen display of certain other devices, and play it on a connected television set or other video display.', 1, 149.99, 100, true, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617126638000');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('Apple Music', 'Apple Music is a music and video streaming service developed by Apple Inc. Users select music to stream to their device on-demand, or they can listen to existing, curated playlists.', 1, 9.99, 100, false, 'https://cdn.mos.cms.futurecdn.net/tyAj9JuL9U7MYmxrK4fxbh.jpg');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('Apple Arcade', 'Apple Arcade is a video game subscription service by Apple Inc. for iOS, iPadOS, tvOS, and macOS devices. It was announced in March 2019, and launched in September 2019.', 1, 4.99, 100, false, 'https://www.cnet.com/a/img/resize/f872ceeda8cba8592fe36386f4ef5e395e784d4d/hub/2022/12/22/408c9668-ccf6-4e15-9a94-6b5b34c5e21d/apple-arcade-banner-2023-refresh-1920-1080-1.jpg?auto=webp&fit=crop&height=675&width=1200');
INSERT INTO product (name, description, category_id, price, quantity, available, image_url) VALUES ('Apple Fitness+', 'Apple Fitness+ is a subscription service that offers workouts designed to be done with Apple Watch. It is available on iPhone, iPad, and Apple TV.', 1, 9.99, 100, true, 'https://64bitapps.com/wp-content/uploads/2022/05/apple-fitness.jpg');

