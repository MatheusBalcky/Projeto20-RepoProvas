import prisma from '../../src/database/database';
import * as bcrypt from '../../src/utils/bcryptUtils';
import { faker } from '@faker-js/faker';


export async function createUser () {
    const user = {
      email: faker.internet.email().toLowerCase(),
      password: "123456789ABC"
    };
  
    const insertedUser = await prisma.users.create({ data: {
              email: user.email,
              password: bcrypt.hashPassword(user.password)
          }});
  
  return { ...insertedUser, passwordUser: user.password};
}