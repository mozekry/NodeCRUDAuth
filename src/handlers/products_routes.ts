import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const Order: Product[] = await store.index();
    res.json(Order);
};

const create = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    };

    try {
        const newProduct: Product = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const product_routes = (app: express.Application) => {
    // app.get('/products/:id', );
     app.get('/newproducts', index);
     app.post('/newproducts', create);
 };
 
 export default product_routes;