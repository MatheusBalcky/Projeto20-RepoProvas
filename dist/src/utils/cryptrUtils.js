"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptByCryptr = exports.encryptByCryptr = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const cryptr = new cryptr_1.default(`${process.env.CRYPTR_KEY}`);
function encryptByCryptr(toCrypt) {
    return cryptr.encrypt(toCrypt);
}
exports.encryptByCryptr = encryptByCryptr;
function decryptByCryptr(toDecrypt) {
    return cryptr.decrypt(toDecrypt);
}
exports.decryptByCryptr = decryptByCryptr;
