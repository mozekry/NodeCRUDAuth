import client from '../database';

export type Product = {
    id?:number,
    name:string,
    price:number
}

export class ProductStore{
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }
    async create(b: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
           
            const conn = await client.connect();

            const result = await conn.query(sql, [b.name, b.price]);

            const book = result.rows[0];

            conn.release();

            return book;
        } catch (err) {
            throw new Error(
                `Could not add order ${b.name}. Error: ${err}`
            );
        }
    }
}