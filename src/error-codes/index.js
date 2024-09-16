export const invalidQuestionType = {
  field: "type",
  message: "Invalid type, one of mcq/descriptive is required.",
  code: "OEB-001",
};

export const invalidOptions = {
  field: "options",
  message: "Invalid options, more than one value should be there in options",
  code: "OEB-002",
};

export const invalidAnswer = {
  field: "answer",
  message: "Invalid answer, it should be one of options",
  code: "OEB-003",
};

export const invalidOptionType = {
  field: "options",
  message: "Invalid options, it should be an array of options",
  code: "OEB-004",
};
