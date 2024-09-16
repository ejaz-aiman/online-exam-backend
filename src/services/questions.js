import { questionType } from "../constants/index.js";
import { removeSpaces } from "../utils/utils.js";
import { validateQuestion } from "../validations/index.js";
import { uploadFileToS3 } from "./aws.js";

export const getQuestionsSvc = async () => {
  const { questions: Question } = db.models;
  const sequelize = db.sequelize;
  const questions = await Question.findAll({
    order: sequelize.random(),
    limit: 1,
  });
  return {
    data: questions.length > 0 ? questions.map((e) => e.dataValues) : [],
    name: "questions",
    statusCode: 200,
    message: "Success",
  };
};

export const createQuestionSvc = async ({ title, type, options, answer }) => {
  const { questions: Question } = db.models;
  const sequelize = db.sequelize;
  const errors = validateQuestion(type, options, answer);
  if (errors) {
    return {
      message: "Validation error.",
      statusCode: 400,
      errors,
    };
  }
  const normalizedTitle = removeSpaces(title).toLowerCase();
  const isQuestionExists = await Question.count({
    where: sequelize.where(
      sequelize.fn(
        "REPLACE",
        sequelize.fn("LOWER", sequelize.col("title")),
        " ",
        ""
      ),
      normalizedTitle
    ),
  });

  if (isQuestionExists) {
    return {
      message: "Question already exists.",
      statusCode: 400,
    };
  }
  const question = await Question.create({
    title,
    type,
    options,
    answer,
  });

  return {
    data: question,
    name: "question",
    statusCode: 201,
    message: "Success",
  };
};

export const saveUserAnswerSvc = async ({ questionId, answer, file }) => {
  const { questions: Question, "user-answer": UserAnswer } = db.models;
  console.log(db.models);
  const sequelize = db.sequelize;
  const userId = 1; //should be extracted from token or cookie
  let question = await Question.findOne({
    where: {
      id: questionId,
    },
  });
  if (!question) {
    return {
      message: "Question not found.",
      statusCode: 404,
    };
  }
  question = question.dataValues;
  if (question.type == questionType.MCQ && !answer) {
    return {
      message: "Select one of the options.",
      statusCode: 400,
    };
  }

  if (file && answer) {
    return {
      message: "Either file or answer should be provided.",
      statusCode: 400,
    };
  }
  let fileUri = null;
  if (question.type == questionType.DESCRIPTIVE && file) {
    fileUri = await uploadFileToS3({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // Adjust the ACL as needed
    });
  }
  const userAnswerExists = await UserAnswer.findOne({
    where: {
      questionId,
      userId,
    },
  });

  if (userAnswerExists) {
    await UserAnswer.update({
      answer,
      fileUri,
    });
  } else {
    await UserAnswer.create({
      userId,
      questionId,
      answer,
      fileUri,
    });
  }
  return {
    message: "Success",
    statusCode: 204,
  };
};

export const getQuestionAndUserAnswerSvc = async (userId) => {
  const { questions: Question, "user-answer": UserAnswer } = db.models;
  const answers = await UserAnswer.findAll({
    include: [
      {
        model: Question,
        required: true,
        as: "question",
      },
    ],
    where: { userId },
  });
  return {
    data: answers.length > 0 ? answers.map((e) => e.dataValues) : [],
    message: "Success",
    statusCode: 200,
    name: "answers",
  };
};
