import {
  createQuestionSvc,
  getQuestionsSvc,
  saveUserAnswerSvc,
  getQuestionAndUserAnswerSvc,
} from "../services/questions.js";
import { sendFailureResponse, sendSuccessResponse } from "../utils/utils.js";

export const createQuestion = async (req, res) => {
  try {
    const { title, options, type, answer } = req.body;
    const { statusCode, message, name, data, errors } = await createQuestionSvc(
      {
        title,
        type,
        options,
        answer,
      }
    );
    if (statusCode != 201) {
      sendFailureResponse(res, { error: message, statusCode, errors });
    } else {
      sendSuccessResponse(res, {
        name,
        data,
        statusCode,
        message,
      });
    }
  } catch (e) {
    console.log("Error in createQuestion", e);
    sendFailureResponse(res, {
      error: e.message || "Internal server error",
      statusCode: e.statusCode || 500,
    });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { message, statusCode, data, name } = await getQuestionsSvc();
    sendSuccessResponse(res, {
      message,
      statusCode,
      data,
      name,
    });
  } catch (e) {
    console.log("Error in getQuestions", e);
    sendFailureResponse(res, {
      error: e.message || "Internal server error",
      statusCode: e.statusCode || 500,
    });
  }
};

export const saveUserAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const file = req.file;
    const { answer } = req.body;
    const { statusCode, message } = await saveUserAnswerSvc({
      questionId,
      file,
      answer,
    });
    if (statusCode != 204) {
      sendFailureResponse(res, {
        error: message,
        statusCode,
      });
    } else {
      sendSuccessResponse(res, { message, statusCode });
    }
  } catch (e) {
    console.log("Error in saveUserAnswer", e);
    sendFailureResponse(res, {
      error: e.message || "Internal server error",
      statusCode: e.statusCode || 500,
    });
  }
};

export const getQuestionAndUserAnswer = async (req, res) => {
  try {
    const userId = 1;
    const { name, data, message, statusCode } =
      await getQuestionAndUserAnswerSvc(userId);
    sendSuccessResponse(res, {
      name,
      data,
      message,
      statusCode,
    });
  } catch (e) {
    console.log("Error in getQuestionAndUserAnswer", e);
    sendFailureResponse(res, {
      error: e.message || "Internal server error",
      statusCode: e.statusCode || 500,
    });
  }
};
