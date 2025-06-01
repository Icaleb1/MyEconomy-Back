import express, { Application } from 'express';
import cors from 'cors';
import authRouter from './routes/AuthRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});