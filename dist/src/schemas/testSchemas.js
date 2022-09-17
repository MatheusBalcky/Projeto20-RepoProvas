"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testData = void 0;
const joi_1 = __importDefault(require("joi"));
exports.testData = joi_1.default.object({
    name: joi_1.default.string().max(30).required(),
    categoryId: joi_1.default.number().min(1).max(3),
    pdfUrl: joi_1.default.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
    teacherDisciplineId: joi_1.default.number().min(1).max(6),
});
