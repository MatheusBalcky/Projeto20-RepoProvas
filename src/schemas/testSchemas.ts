import Joi from 'joi';

export const testData = Joi.object({
    name: Joi.string().max(30).required(),
    categoryId: Joi.number().min(1).max(3),
    pdfUrl: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
    teacherDisciplineId: Joi.number().min(1).max(6),
});
