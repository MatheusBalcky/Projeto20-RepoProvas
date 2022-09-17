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

const request = supertest(app);

describe('POST /signin', () => {
  it('should answer with status 200 when credentials are valid', async () => {
    const user = await userFactory.createUser();

    const signInResult = await request.post("/signin").send({ email: user.email, password: user.passwordUser });

    expect(signInResult.body.token.length > 0).toBe(true)
    expect(signInResult.status).toBe(200);
  });

  it('Should answer status 401 when user does not exists or are not valid', async () => {
    const user = userFactory.randomUser();

    const signIn = await request.post("/signin").send({ email: user.email, password: user.password});
    
    expect(signIn.status).toBe(401);
  });

  it('Should answer status 401 when user exists but he puts the wrong password', async () => {
    const user = await userFactory.createUser();

    const signIn = await request.post('/signin').send({ email: user.email, password: '#wrongpassword'})

    expect(signIn.status).toBe(401);
  });
});


describe('POST /signup', () => {
  it('Should answer with status 201 when credentials are valid', async () => {
    const userData = userFactory.randomUser();

    const signUp = await request.post("/signup").send(userData);

    expect(signUp.status).toBe(201);
  });

  it('Should answer with status 422 when credentials are not valid', async () => {
    const userData = userFactory.randomUser();

    const signUp = await request.post("/signup").send({ userData, notobehere: 'troll' });

    expect(signUp.status).toBe(422);
  });

  it('Should answer with status 409 when user already exists', async () => {
    const user = await userFactory.createUser();

    const signUp = await request.post("/signup").send({
      email: user.email,
      password: user.passwordUser,
      repeatPassword: user.passwordUser
    });

    expect(signUp.status).toBe(409);
  });
});