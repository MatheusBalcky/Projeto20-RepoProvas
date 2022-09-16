import prisma from  '../database/database';
import * as interfaces from '../interfaces/interfaces';

export async function insertTest(testData: interfaces.testData) {
    return await prisma.tests.create({ data: testData });
}

export async function testsByDiscipline() {
    const result = await prisma.terms.findMany({
        select: {
            number: true,
            disciplines: {
                select:{
                    name: true,
                    teachersDisciplines: {
                        select: {
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: { select: { name: true} },
                                    teachersDisciplines: {
                                        select :{
                                            teacher: { select: { name: true}}
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


    // return result




    return result.map(item => {
        return {
            term: item.number,
            disciplines: item.disciplines.map( item =>{
                return {
                    name: item.name,
                    tests: item.teachersDisciplines[0].tests.map(item =>{
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
        }})


}

export async function testsByInstructor () {

}