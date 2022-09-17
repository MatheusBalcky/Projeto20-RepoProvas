import dotenv from 'dotenv';
import app from './index';
dotenv.config();


app.listen(process.env.PORT,() => {
    console.log(`Server running at port ${process.env.PORT}`)
});