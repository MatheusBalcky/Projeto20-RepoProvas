"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPassword(password) {
    const saltRounds = 10;
    const passwordCrypted = bcrypt_1.default.hashSync(password, saltRounds);
    return passwordCrypted;
}
exports.hashPassword = hashPassword;
function comparePasswords(passwordToValidate, passwordCrypted) {
    const compareResult = bcrypt_1.default.compareSync(passwordToValidate, passwordCrypted);
    if (!compareResult) {
        return false;
    }
    else {
        return true;
    }
}
exports.comparePasswords = comparePasswords;
