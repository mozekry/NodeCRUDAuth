import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type user = {
    id?: number;
    name: string;
    age: number;
    address: string;
    password: string;
};
export type userlogin = {
    name: string;
    password: string;
};

export class UserRepo {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM USERS';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }

    async show(id: number): Promise<user> {
        try {
            const sql = 'SELECT * FROM USERS WHERE id=($1)';
           
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find USER ${id}. Error: ${err}`);
        }
    }

    async create(b: user): Promise<user> {
        try {
            const sql =
                'INSERT INTO USERS (name, age, address,password) VALUES($1, $2, $3,$4) RETURNING NAME, AGE,Address';
            
            const hash = bcrypt.hashSync(
                b.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS??"")
            );
            const conn = await client.connect();

            const result = await conn.query(sql, [
                b.name,
                b.age,
                b.address,
                hash,
            ]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Could not add new USER ${b.name}. Error: ${err}`);
        }
    }

    //   async edit(id:number):Promise<Weapon>{

    // try {
    //     const sql = 'Update mythical_weapons WHERE id=($1)'
    //     // @ts-ignore
    //     const conn = await Client.connect()

    //     const result = await conn.query(sql, [id])

    //     const book = result.rows[0]

    //     conn.release()

    //     return book
    //       } catch (err) {
    //           throw new Error(`Could not delete Weapon ${id}. Error: ${err}`)
    //       }
    //   };

    async delete(id: string): Promise<user> {
        try {
            const sql = 'DELETE FROM USERS WHERE id=($1)';
           
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async authenticate(name: string, password: string): Promise<user | null> {
        const conn = await client.connect();
        const sql = 'select name, password FROM users WHERE name = ($1)';
        const result = await conn.query(sql, [name]);
        console.log('insertedPass', password + BCRYPT_PASSWORD);
        if (result.rows.length) {
            const user: user = result.rows[0];
            console.log('user', user);

            if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }
}
