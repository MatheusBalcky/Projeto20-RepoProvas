"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../src/database/database"));
async function populateDataBaseSeed() {
    await database_1.default.terms.createMany({
        data: [
            { number: 1 },
            { number: 2 },
            { number: 3 },
            { number: 4 },
            { number: 5 },
            { number: 6 }
        ],
        skipDuplicates: true
    });
    await database_1.default.categories.createMany({
        data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
        skipDuplicates: true
    });
    await database_1.default.teachers.createMany({
        data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }],
        skipDuplicates: true
    });
    await database_1.default.disciplines.createMany({
        data: [
            { name: 'HTML e CSS', termId: 1 },
            { name: 'JavaScript', termId: 2 },
            { name: 'React', termId: 3 },
            { name: 'Humildade', termId: 1 },
            { name: 'Planejamento', termId: 2 },
            { name: 'Autoconfiança', termId: 3 },
        ]
    });
    await database_1.default.teachersDisciplines.createMany({
        data: [
            { teacherId: 1, disciplineId: 1 },
            { teacherId: 1, disciplineId: 2 },
            { teacherId: 1, disciplineId: 3 },
            { teacherId: 2, disciplineId: 4 },
            { teacherId: 2, disciplineId: 5 },
            { teacherId: 2, disciplineId: 6 },
        ]
    });
}
populateDataBaseSeed()
    .then(async () => {
    await database_1.default.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await database_1.default.$disconnect();
    process.exit(1);
});
