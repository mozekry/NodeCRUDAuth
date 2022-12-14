/* Replace with your SQL commands *//* Replace with your SQL commands */

CREATE TABLE order_products(
        id serial primary key,
        quantity integer,
        order_id bigint references orders(id),
        product_id bigint references products(id)
 );