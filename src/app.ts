import express, { Application } from 'express';
import connect from './db';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';
import vehicleRouter from './routes/vehicle.routes';
import journeyRouter from './routes/journey.routes'
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const port: string | number = process.env.PORT || 5000;

app.set('port', port);

connect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/users', userRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/journeys', journeyRouter);

app.use('/', (_req, res) => {
    res.send('Gapps Project Server');
});

export default app;