import express from "express";
import {
  createQuestion,
  getQuestions,
  saveUserAnswer,
  getQuestionAndUserAnswer,
} from "../controllers/question.js";
import isAuthenticated from "../middlewares/is-authenticated.js";
import upload from "../middlewares/upload-file.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/question", createQuestion);
router.get("/exam", getQuestions);
router.patch(
  "/question/:questionId/answer",
  upload.single("file"),
  saveUserAnswer
);
router.get("/user/:userId/result", getQuestionAndUserAnswer);

export default router;
