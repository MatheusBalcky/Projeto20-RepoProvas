"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../src/database/database"));
const testFactory = __importStar(require("./factories/testFactory"));
const userFactory = __importStar(require("./factories/userFactory"));
beforeEach(async () => {
    await database_1.default.$executeRaw `TRUNCATE TABLE tests;`;
});
afterAll(async () => {
    await database_1.default.$disconnect();
});
const request = (0, supertest_1.default)(index_1.default);
describe('POST /new-test', () => {
    it('Should answer status 401 when are not sent the access token', async () => {
        const testData = testFactory.randomTest();
        const test = await request.post('/new-test').send(testData);
        expect(test.status).toBe(401);
    });
    it('Should answer status 422 when the entity is invalid', async () => {
        const user = await userFactory.createUser();
        const signIn = await request.post('/signin').send({ email: user.email, password: user.passwordUser });
        const testData = testFactory.randomTest();
        const test = await request.post('/new-test')
            .set('Authorization', `Bearer ${signIn.body.token}`)
            .send(Object.assign(Object.assign({}, testData), { noToBeHere: 'troll' }));
        expect(test.status).toBe(422);
    });
    it('Should answer status 201 when everything works well', async () => {
        const user = await userFactory.createUser();
        const signIn = await request.post('/signin').send({ email: user.email, password: user.passwordUser });
        const testData = testFactory.randomTest();
        const test = await request.post('/new-test')
            .set('Authorization', `Bearer ${signIn.body.token}`)
            .send(testData);
        expect(test.status).toBe(201);
    });
});
describe('GET', () => {
    it('Should answer status 200 when the token are sent', async () => {
        const user = await userFactory.createUser();
        const signIn = await (0, supertest_1.default)(index_1.default).post('/signin').send({ email: user.email, password: user.passwordUser });
        const tests = await (0, supertest_1.default)(index_1.default).get('/testsbydiscipline')
            .set('Authorization', `Bearer ${signIn.body.token}`);
        expect(tests.body).toBeInstanceOf(Array);
        expect(tests.status).toBe(200);
    });
    it('Should answer status 401 when the token are not sent', async () => {
        const tests = await request.get('/testsbydiscipline');
        expect(tests.status).toBe(401);
    });
});
describe('GET /testsbyinstructor', () => {
    it('Should answer status 200 when the token are sent', async () => {
        const user = await userFactory.createUser();
        const signIn = await (0, supertest_1.default)(index_1.default).post('/signin').send({ email: user.email, password: user.passwordUser });
        const tests = await (0, supertest_1.default)(index_1.default).get('/testsbyinstructor')
            .set('Authorization', `Bearer ${signIn.body.token}`);
        expect(tests.body).toBeInstanceOf(Array);
        expect(tests.status).toBe(200);
    });
    it('Should answer status 401 when the token are not sent', async () => {
        const tests = await request.get('/testsbyinstructor');
        expect(tests.status).toBe(401);
    });
});
