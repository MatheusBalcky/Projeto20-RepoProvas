import { Request, Response } from 'express';
import * as interfaces from '../interfaces/interfaces';
import * as testServices from '../services/testServices'

export async function newTest(req: Request, res: Response) {
    const testData: interfaces.testData = req.body;

    await testServices.newTest(testData);

    res.sendStatus(201);
}