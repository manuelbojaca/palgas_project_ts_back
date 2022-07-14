import express, {Express, Request,Response} from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import cors from "cors";
import morgan from 'morgan';
import connect from './db'

dotenv.config();

const app: Express = express();

const port = process.env.PORT;
connect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/users', userRouter);

app.route('/').get((req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});