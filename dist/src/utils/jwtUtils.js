"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '24h' });
    return token;
}
exports.createToken = createToken;
function verifyToken(token) {
    try {
        const verifyToken = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
        return verifyToken;
    }
    catch (error) {
        return false;
    }
}
exports.verifyToken = verifyToken;
function validateToken(token) {
    const result = verifyToken(token);
    if (!result) {
        throw { type: 'unauthorized', message: 'Invalid token!' };
    }
    return result;
}
exports.validateToken = validateToken;
