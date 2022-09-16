import { Request, Response } from 'express';
import * as interfaces from '../interfaces/interfaces';
import * as testServices from '../services/testServices'

export async function newTest(req: Request, res: Response) {
    const testData: interfaces.testData = req.body;

    await testServices.newTest(testData);

    res.sendStatus(201);
}

export async function getTestsByDiscipline(req: Request, res: Response) {
    const result =  await testServices.getTestsByDiscipline();

    res.status(200).send(result);
}

export async function getTestsByInstructor(req: Request, res: Response) {
    const result =  await testServices.getTestsByInstructor();

    res.status(200).send(result);
}