import * as testRepos from '../repositories/testRepositories'
import * as interfaces from '../interfaces/interfaces';

export async function newTest(testData: interfaces.testData) {
    return await testRepos.insertTest(testData);
}