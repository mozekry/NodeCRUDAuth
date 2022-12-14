/* Replace with your SQL commands */

CREATE TABLE orders(
        id serial primary key,
        status varchar(100),
        user_id BIGINT REFERENCES users(id),
        name varchar(100) NULL
 );