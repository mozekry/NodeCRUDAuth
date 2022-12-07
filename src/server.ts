import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mythical_weapons_routes from './handlers/mythical_weapons_routes';
import users_routes from './handlers/users_routes';

const app: express.Application = express();
const address = '0.0.0.0.3000';

const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello, World!');
});

app.get(
    '/test-cors',
    cors(corsOptions),
    function (req: Request, res: Response, next) {
        res.json('Hello CORS');
        next();
    }
  
);

mythical_weapons_routes(app);
users_routes(app);

app.listen(3000, function () {
    console.log(`starting app on ${address}`);
});
