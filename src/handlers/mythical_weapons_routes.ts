import express, { NextFunction, Request, Response } from 'express';
import { Weapon, MythicalWeaponsStore } from '../models/mythical_weapons';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new MythicalWeaponsStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const Weapons: Weapon[] = await store.index();
    res.json(Weapons);
};

const show = async (req: Request, res: Response): Promise<void> => {
    const Weapons: Weapon = await store.show(parseInt(req.params.id));
    res.json(Weapons);
};
const create = async (req: Request, res: Response): Promise<void> => {
    const weapon: Weapon = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
    };

    try {
        const Weapons: Weapon = await store.create(weapon);
        res.json(Weapons);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const remove = async (req: Request, res: Response): Promise<void> => {
    const Weapons: Weapon = await store.delete(req.params.id);
    res.json(Weapons);
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader != undefined ? authorizationHeader.split(' ')[1]:"";
        jwt.verify(token, TOKEN_SECRET !=undefined?TOKEN_SECRET:"");
        next();
    } catch (error) {
        res.status(401);
    }
};

const mythical_weapons_routes = (app: express.Application) => {
    app.get('/products/:id', show);
    app.get('/products', index);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', verifyAuthToken, remove);
};

export default mythical_weapons_routes;
