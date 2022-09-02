import express from 'express';
import dotenv from 'dotenv';
import userRouter from '../routes/user.routes';
import vehicleRouter from '../routes/vehicle.routes';
import cors from "cors";
import morgan from 'morgan';
import connect from '../db'

dotenv.config();

const app = express();

const port: string | number = process.env.PORT || 5000;
connect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/users', userRouter);
app.use('/vehicles', vehicleRouter);

app.use('*', (_req, res) => {
    res.send('Gapps Project Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});