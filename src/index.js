import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import allRoutes from './v1/routes';
import apiDocumentation from '../swagger.json';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => { console.log(`Error at mongo: ${err}`); });
mongoose.connection.on('connected', () => { console.log('Connected to mongoDB'); });

app.use('/api/v1', allRoutes);
app.use(`/api/v1/documentation`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.get('**', (req, res) => res.status(200).json({ status: 200, message: `Welcome to Getir Assignment Challenge Backend` }));

app.listen(process.env.PORT, () => { console.log('Server Started on', process.env.PORT); });

export default app;
