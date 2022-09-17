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

const request = supertest(app);

describe('POST /new-test', () => {
  it('Should answer status 401 when are not sent the access token', async () => {
    const testData = testFactory.randomTest()

    const test = await request.post('/new-test').send(testData);

    expect(test.status).toBe(401);
  });

  it('Should answer status 422 when the entity is invalid', async () => {
    const user = await userFactory.createUser();
    const signIn = await request.post('/signin').send({ email: user.email, password: user.passwordUser });

    const testData = testFactory.randomTest()

    const test = await request.post('/new-test')
      .set('Authorization', `Bearer ${signIn.body.token}`)
      .send({ ...testData, noToBeHere: 'troll' });

    expect(test.status).toBe(422);
  });

  it('Should answer status 201 when everything works well', async () => {
    const user = await userFactory.createUser();
    const signIn = await request.post('/signin').send({ email: user.email, password: user.passwordUser });

    const testData = testFactory.randomTest()

    const test = await request.post('/new-test')
      .set('Authorization', `Bearer ${signIn.body.token}`)
      .send(testData);

    expect(test.status).toBe(201);
  })
});

describe('GET', () => {
  it('Should answer status 200 when the token are sent', async () => {
    const user = await userFactory.createUser();
    const signIn = await supertest(app).post('/signin').send({ email: user.email, password: user.passwordUser });
    
    const tests = await supertest(app).get('/testsbydiscipline')
      .set('Authorization', `Bearer ${signIn.body.token}`);
    
    expect(tests.body).toBeInstanceOf(Array);
    expect(tests.status).toBe(200);
  });

  it('Should answer status 401 when the token are not sent', async () => {
    const tests = await request.get('/testsbydiscipline');
  
    expect(tests.status).toBe(401);
  });
});

describe('GET /testsbyinstructor', () =>{
  it('Should answer status 200 when the token are sent', async () => {
    const user = await userFactory.createUser();
    const signIn = await supertest(app).post('/signin').send({ email: user.email, password: user.passwordUser });
    
    const tests = await supertest(app).get('/testsbyinstructor')
      .set('Authorization', `Bearer ${signIn.body.token}`);
    
    expect(tests.body).toBeInstanceOf(Array);
    expect(tests.status).toBe(200);
  });

  it('Should answer status 401 when the token are not sent', async () => {
    const tests = await request.get('/testsbyinstructor');
  
    expect(tests.status).toBe(401);
  });
});