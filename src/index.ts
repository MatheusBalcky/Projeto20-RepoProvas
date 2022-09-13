import express from 'express';
import cors from 'cors';
import "express-async-errors";
import routes from './routes/routes';
import dotenv from 'dotenv'; dotenv.config();
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json(), cors());

app.use(routes);
app.use(errorHandler);





app.get('/test', (req, res) =>{
    res.status(200).send('teste');
})

app.listen(process.env.PORT,  () => console.log(`Server running at port ${process.env.PORT}`) );