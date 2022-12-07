import express, { Request, Response } from 'express';
import { user, userlogin, UserRepo } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new UserRepo();

const index = async (_req: Request, res: Response): Promise<void> => {
    const user: user[] = await store.index();
    res.json(user);
};

const show = async (req: Request, res: Response): Promise<void> => {
    const user: user = await store.show(parseInt(req.params.id));
    res.json(user);
};
const create = async (req: Request, res: Response): Promise<void> => {
    const user: user = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        password: req.body.password,
    };
    const newUser: user = await store.create(user);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET??"");
    res.json(token);
};

const remove = async (req: Request, res: Response): Promise<void> => {
    const user: user = await store.delete(req.params.id);
    res.json(user);
};

const login = async (req: Request, res: Response): Promise<void> => {
    const user: userlogin = {
        name: req.body.name,
        password: req.body.password,
    };
    const newUser: user | null = await store.authenticate(
        user.name,
        user.password
    );
    console.log('dddddddddd', newUser);
    if (newUser) {
        res.json({ name: newUser.name });
    } else {
        res.status(401).sendStatus(401);
    }
};

const users_routes = (app: express.Application) => {
    app.get('/users/:id', show);
    app.get('/users', index);
    app.post('/users', create);
    app.delete('/users/:id', remove);
    app.post('/users/login', login);
};

export default users_routes;
