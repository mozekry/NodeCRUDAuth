import client from '../database';

export type Weapon = {
    id?: number;
    name: string;
    type: string;
    weight: number;
};

export class MythicalWeaponsStore {
    async index(): Promise<Weapon[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM mythical_weapons';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`ERROR HAPPENED ${error}`);
        }
    }

    async show(id: number): Promise<Weapon> {
        try {
            const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)';
            
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find Weapon ${id}. Error: ${err}`);
        }
    }

    async create(b: Weapon): Promise<Weapon> {
        try {
            const sql =
                'INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *';
           
            const conn = await client.connect();

            const result = await conn.query(sql, [b.name, b.type, b.weight]);

            const book = result.rows[0];

            conn.release();

            return book;
        } catch (err) {
            throw new Error(
                `Could not add new Weapon ${b.name}. Error: ${err}`
            );
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

    async delete(id: string): Promise<Weapon> {
        try {
            const sql = 'DELETE FROM mythical_weapons WHERE id=($1)';
            
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const book = result.rows[0];

            conn.release();

            return book;
        } catch (err) {
            throw new Error(`Could not delete Weapon ${id}. Error: ${err}`);
        }
    }
}
