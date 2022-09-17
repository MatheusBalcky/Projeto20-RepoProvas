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
const express_1 = require("express");
const schemaMiddleware_1 = require("../middlewares/schemaMiddleware");
const tokenAuthenticationMiddle_1 = require("../middlewares/tokenAuthenticationMiddle");
const authSchemas_1 = require("../schemas/authSchemas");
const testSchemas_1 = require("../schemas/testSchemas");
const authController = __importStar(require("../controllers/authController"));
const testsController = __importStar(require("../controllers/testsController"));
const routes = (0, express_1.Router)();
routes.post('/signup', (0, schemaMiddleware_1.validateSchemaMiddleware)(authSchemas_1.signUpSchema), authController.signUp);
routes.post('/signin', (0, schemaMiddleware_1.validateSchemaMiddleware)(authSchemas_1.signInSchema), authController.signIn);
routes.post('/new-test', tokenAuthenticationMiddle_1.tokenAuthenticationMiddle, (0, schemaMiddleware_1.validateSchemaMiddleware)(testSchemas_1.testData), testsController.newTest);
routes.get('/testsbydiscipline', tokenAuthenticationMiddle_1.tokenAuthenticationMiddle, testsController.getTestsByDiscipline);
routes.get('/testsbyinstructor', tokenAuthenticationMiddle_1.tokenAuthenticationMiddle, testsController.getTestsByInstructor);
routes.get('/test', (req, res) => {
    res.status(200).send('Test okay!');
});
exports.default = routes;
