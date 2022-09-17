import prisma from '../src/database/database'
import app from '../src/index';
import supertest from 'supertest';
import * as userFactory from './factories/userFactory'

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});


describe('POST /signin', () => {
    it('should answer with status 200 when credentials are valid', async () => {
        const user = await userFactory.createUser();

        const signInResult = await supertest(app).post("/signin").send({ email: user.email, password: user.passwordUser });

        expect(signInResult.body.token.length > 0).toBe(true)
        expect(signInResult.status).toBe(200);
    });
})