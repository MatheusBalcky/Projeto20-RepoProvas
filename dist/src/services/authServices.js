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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const authRepos = __importStar(require("../repositories/authRepositories"));
const bcrypt = __importStar(require("../utils/bcryptUtils"));
const jwt = __importStar(require("../utils/jwtUtils"));
async function signUp(userData) {
    const user = await authRepos.findUserByEmail(userData.email);
    if (user)
        throw { type: 'conflict', message: 'conflict' };
    const encryptedPassword = bcrypt.hashPassword(userData.password);
    return await authRepos.insertUser({ email: userData.email.toLowerCase(), password: encryptedPassword });
}
exports.signUp = signUp;
async function signIn(userData) {
    const user = await authRepos.findUserByEmail(userData.email.toLowerCase());
    if (!user)
        throw { type: 'unauthorized', message: 'unauthorized invalid email' };
    const result = bcrypt.comparePasswords(userData.password, user.password);
    if (!result)
        throw { type: 'unauthorized', message: 'unauthorized invalid password' };
    const token = jwt.createToken({ userId: user.id });
    return token;
}
exports.signIn = signIn;
