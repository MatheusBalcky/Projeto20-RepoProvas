import app from '../src/index';
import supertest from 'supertest';
import prisma from '../src/database/database';
import * as testFactory from './factories/testFactory'
import * as userFactory from './factories/userFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});


describe('POST /new-test', () => {
  it('Should answer status 401 when are not sent the access token', async () => {
    const testData = testFactory.randomTest()
    
    const test = await supertest(app).post('/new-test').send(testData);

    expect(test.status).toBe(401);
  });

  it('Should answer status 422 when the entity is invalid', async () => {
    const user = await userFactory.createUser();
    const signIn = await supertest(app).post('/signin').send({ email: user.email, password: user.passwordUser });
    
    const testData = testFactory.randomTest()

    const test = await supertest(app).post('/new-test')
    .set('Authorization', `Bearer ${signIn.body.token}`)
    .send({...testData, noToBeHere: 'troll'});

    expect(test.status).toBe(422);
  });

  it('Should answer status 201 when everything works well', async () =>{
    const user = await userFactory.createUser();
    const signIn = await supertest(app).post('/signin').send({ email: user.email, password: user.passwordUser });
    
    const testData = testFactory.randomTest()

    const test = await supertest(app).post('/new-test')
    .set('Authorization', `Bearer ${signIn.body.token}`)
    .send(testData);

    expect(test.status).toBe(201);
  })
});