import prisma from  '../src/database/database'


async function populateDataBaseSeed() {
    await prisma.terms.createMany({
        data: [
            { number: 1},
            { number: 2},
            { number: 3},
            { number: 4},
            { number: 5},
            { number: 6}
        ],
        skipDuplicates: true
    });

    await prisma.categories.createMany({
        data: [{name: "Projeto"}, {name: "Prática"}, {name: "Recuperação"}],
        skipDuplicates: true
    });

    await prisma.teachers.createMany({
        data: [{ name: "Diego Pinho"}, { name: "Bruna Hamori"}],
        skipDuplicates: true
    });
}



populateDataBaseSeed()

    .then(async () => {
        await prisma.$disconnect()
    })

    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });