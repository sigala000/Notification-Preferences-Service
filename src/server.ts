import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import preferencesRoutes from './api/preferences';
import evaluateRoutes from './api/evaluate';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', preferencesRoutes);
app.use('/', evaluateRoutes);

app.listen(3000, () => console.log('Running'));
