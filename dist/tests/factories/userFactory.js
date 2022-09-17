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
exports.randomUser = exports.createUser = void 0;
const database_1 = __importDefault(require("../../src/database/database"));
const bcrypt = __importStar(require("../../src/utils/bcryptUtils"));
const faker_1 = require("@faker-js/faker");
async function createUser() {
    const user = {
        email: faker_1.faker.internet.email().toLowerCase(),
        password: "123456789ABC"
    };
    const insertedUser = await database_1.default.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashPassword(user.password)
        }
    });
    return Object.assign(Object.assign({}, insertedUser), { passwordUser: user.password });
}
exports.createUser = createUser;
function randomUser() {
    const user = {
        email: faker_1.faker.internet.email().toLowerCase(),
        password: "123456789ABC",
        repeatPassword: "123456789ABC"
    };
    return user;
}
exports.randomUser = randomUser;
