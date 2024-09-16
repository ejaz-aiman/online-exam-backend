import { questionType } from "../constants/index.js";
import {
  invalidAnswer,
  invalidOptions,
  invalidQuestionType,
} from "../error-codes/index.js";

export const validateQuestion = (type, options, answer) => {
  const errors = [];
  if (!Object.values(questionType).includes(type)) {
    errors.push(invalidQuestionType);
  }
  if (!Array.isArray(options)) {
    errors.push(invalidOptionType);
  } else if (type == questionType.MCQ && !options.includes(answer)) {
    errors.push(invalidAnswer);
  } else if (type == questionType.MCQ && options.length < 2) {
    errors.push(invalidOptions);
  }
  return errors.length > 0 ? errors : null;
};
