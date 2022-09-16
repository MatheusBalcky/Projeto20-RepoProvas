import { Router } from "express";
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { tokenAuthenticationMiddle } from "../middlewares/tokenAuthenticationMiddle";
import { signUpSchema, signInSchema }  from '../schemas/authSchemas';
import { testData } from '../schemas/testSchemas' ;
import * as authController from '../controllers/authController'
import * as testsController from '../controllers/testsController'

const routes = Router();


routes.post('/signup', validateSchemaMiddleware(signUpSchema), authController.signUp);
routes.post('/signin',validateSchemaMiddleware(signInSchema), authController.signIn);

routes.post('/new-test', tokenAuthenticationMiddle, validateSchemaMiddleware(testData), testsController.newTest);

routes.get('/testsbydiscipline', tokenAuthenticationMiddle, testsController.getTestsByDiscipline);

routes.get('/testsbyinstructor', tokenAuthenticationMiddle, testsController.getTestsByInstructor);




routes.get('/test', (req, res) =>{
    res.status(200).send('Test okay!')
});

export default routes;