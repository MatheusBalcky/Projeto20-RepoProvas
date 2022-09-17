"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.findUserByEmail = void 0;
const database_1 = __importDefault(require("../database/database"));
async function findUserByEmail(email) {
    return await database_1.default.users.findUnique({ where: { email } });
}
exports.findUserByEmail = findUserByEmail;
async function insertUser(userData) {
    return await database_1.default.users.create({ data: userData });
}
exports.insertUser = insertUser;
