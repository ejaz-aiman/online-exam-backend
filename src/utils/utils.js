export const sendSuccessResponse = (
  res,
  { data, message, name, statusCode }
) => {
  res.status(statusCode).json({ [name]: data, message });
};

export const sendFailureResponse = (
  res,
  { error, statusCode, errors = [] }
) => {
  res.status(statusCode).json({ error, errors });
};

export const removeSpaces = (str) => str.replace(/\s+/g, "");
