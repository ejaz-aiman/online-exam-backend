import { createQuestionTable } from "./create-question-table.js";
import { createUserAnswerTable } from "./create-user-answer-table.js";
import { createUserTable } from "./create-user-table.js";

export const createTables = async (sequelize) => {
  await Promise.all([
    createQuestionTable(sequelize),
    createUserAnswerTable(sequelize),
    createUserTable(sequelize),
  ]);
};
