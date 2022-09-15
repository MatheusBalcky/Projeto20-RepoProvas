import { users, tests } from '@prisma/client';


export type userData = Omit <users, 'id'>

export type testData = Omit <tests, 'id'>