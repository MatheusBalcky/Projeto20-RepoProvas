import { Router } from "express";
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import * as authSchemas from '../schemas/authSchemas' 
import * as authController from '../controllers/authController'

const routes = Router();


routes.post('/signup', validateSchemaMiddleware(authSchemas.signUpSchema), authController.signUp);
routes.post('/signin',validateSchemaMiddleware(authSchemas.signInSchema), authController.signIn);





routes.get('/test', (req, res) =>{
    res.status(200).send('Test okay!')
});

export default routes;