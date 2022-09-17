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
const database_1 = __importDefault(require("../src/database/database"));
const index_1 = __importDefault(require("../src/index"));
const supertest_1 = __importDefault(require("supertest"));
const userFactory = __importStar(require("./factories/userFactory"));
beforeEach(async () => {
    await database_1.default.$executeRaw `TRUNCATE TABLE users;`;
});
afterAll(async () => {
    await database_1.default.$disconnect();
});
const request = (0, supertest_1.default)(index_1.default);
describe('POST /signin', () => {
    it('should answer with status 200 when credentials are valid', async () => {
        const user = await userFactory.createUser();
        const signInResult = await request.post("/signin").send({ email: user.email, password: user.passwordUser });
        expect(signInResult.body.token.length > 0).toBe(true);
        expect(signInResult.status).toBe(200);
    });
    it('Should answer status 401 when user does not exists or are not valid', async () => {
        const user = userFactory.randomUser();
        const signIn = await request.post("/signin").send({ email: user.email, password: user.password });
        expect(signIn.status).toBe(401);
    });
    it('Should answer status 401 when user exists but he puts the wrong password', async () => {
        const user = await userFactory.createUser();
        const signIn = await request.post('/signin').send({ email: user.email, password: '#wrongpassword' });
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
