import prisma from '../database/database';
import * as interfaces from '../interfaces/interfaces';

export async function insertTest(testData: interfaces.testData) {
    return await prisma.tests.create({ data: testData });
}

export async function testsByDiscipline() {
    const result = await prisma.terms.findMany({
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
                        }
                    })
                }

            })
        }
    });
}

export async function testsByInstructor() {
    const result = await prisma.teachers.findMany({
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
            tests: 
            item.teachersDisciplines
            .map(item => item.tests)
            .reduce( (lst, sub) => lst.concat(sub), [])
            .map(item =>{
                return {
                    id: item.id,
                    name: item.name,
                    pdfUrl: item.pdfUrl,
                    categoryName: item.category.name,
                    teacherName: item.teachersDisciplines.teacher.name,
                    disciplineName: item.teachersDisciplines.discipline.name
                }
            })
        }});
}