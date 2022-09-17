import { faker } from '@faker-js/faker';


export function randomTest() {
  const testData = {
    name: faker.internet.userName(),
    categoryId: Math.floor(Math.random() * 3 + 1),
    pdfUrl: faker.internet.url(),
    teacherDisciplineId: Math.floor(Math.random() * 6 + 1)
  }
  return testData
}