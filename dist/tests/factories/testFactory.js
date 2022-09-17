"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomTest = void 0;
const faker_1 = require("@faker-js/faker");
function randomTest() {
    const testData = {
        name: faker_1.faker.internet.userName(),
        categoryId: Math.floor(Math.random() * 3 + 1),
        pdfUrl: faker_1.faker.internet.url(),
        teacherDisciplineId: Math.floor(Math.random() * 6 + 1)
    };
    return testData;
}
exports.randomTest = randomTest;
