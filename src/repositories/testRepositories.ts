import prisma from  '../database/database';
import * as interfaces from '../interfaces/interfaces';

export async function insertTest(testData: interfaces.testData) {
    return await prisma.tests.create({ data: testData });
}