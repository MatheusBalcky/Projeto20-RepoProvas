"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./index"));
dotenv_1.default.config();
index_1.default.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});
