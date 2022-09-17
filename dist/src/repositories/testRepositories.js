"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsByInstructor = exports.testsByDiscipline = exports.insertTest = void 0;
const database_1 = __importDefault(require("../database/database"));
async function insertTest(testData) {
    return await database_1.default.tests.create({ data: testData });
}
exports.insertTest = insertTest;
async function testsByDiscipline() {
    const result = await database_1.default.terms.findMany({
        select: {
            number: true,
            disciplines: {
                select: {
                    name: true,
                    teachersDisciplines: {
                        select: {
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: { select: { name: true } },
                                    teachersDisciplines: {
                                        select: {
                                            teacher: { select: { name: true } }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return result.map(item => {
        return {
            term: item.number,
            disciplines: item.disciplines.map(item => {
                return {
                    name: item.name,
                    tests: item.teachersDisciplines[0].tests.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            pdfUrl: item.pdfUrl,
                            categoryName: item.category.name,
                            teacherName: item.teachersDisciplines.teacher.name
                        };
                    })
                };
            })
        };
    });
}
exports.testsByDiscipline = testsByDiscipline;
async function testsByInstructor() {
    const result = await database_1.default.teachers.findMany({
        select: {
            name: true,
            teachersDisciplines: {
                select: {
                    tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            category: { select: { id: true, name: true } },
                            teachersDisciplines: {
                                select: { id: true, discipline: true, teacher: { select: { name: true } } }
                            }
                        }
                    }
                }
            }
        }
    });
    return result.map(item => {
        return {
            teacherName: item.name,
            tests: item.teachersDisciplines
                .map(item => item.tests)
                .reduce((lst, sub) => lst.concat(sub), [])
                .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    pdfUrl: item.pdfUrl,
                    categoryName: item.category.name,
                    teacherName: item.teachersDisciplines.teacher.name,
                    disciplineName: item.teachersDisciplines.discipline.name
                };
            })
        };
    });
}
exports.testsByInstructor = testsByInstructor;
