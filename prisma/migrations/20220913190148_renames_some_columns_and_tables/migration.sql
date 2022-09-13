/*
  Warnings:

  - You are about to drop the column `term_id` on the `disciplines` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `pdf_url` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_discipline_id` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `teachers_disciplines` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `termId` to the `disciplines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfUrl` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherDisciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_term_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers_disciplines" DROP CONSTRAINT "teachers_disciplines_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "teachers_disciplines" DROP CONSTRAINT "teachers_disciplines_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_category_id_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacher_discipline_id_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "term_id",
ADD COLUMN     "termId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "category_id",
DROP COLUMN "pdf_url",
DROP COLUMN "teacher_discipline_id",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "pdfUrl" TEXT NOT NULL,
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "teachers_disciplines";

-- CreateTable
CREATE TABLE "teachersDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "teachersDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
