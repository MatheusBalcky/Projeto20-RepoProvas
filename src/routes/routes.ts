import { Router } from "express";

// import * as  
// import * as  

const routes = Router();


routes.get('/test', (req, res) =>{
    res.status(200).send('Test okay!')
});



export default routes;