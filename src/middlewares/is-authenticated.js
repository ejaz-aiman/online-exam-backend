import { sendFailureResponse } from "../utils/utils.js";

const isAuthenticated = (req, res, next) => {
  const serverApiKey = process.env.API_KEY;
  const apiKey = req.headers["x-api-key"];

  if (!serverApiKey) {
    return sendFailureResponse(res, {
      error: "API KEY is not set in environment variable.",
      statusCode: 401,
    });
  }

  if (apiKey !== serverApiKey) {
    return sendFailureResponse(res, {
      error: "Unauthorized.",
      statusCode: 401,
    });
  }

  next();
};

export default isAuthenticated;
