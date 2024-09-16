export const createQuestionTable = async (sequelize) => {
  return await sequelize.query(
    `
  CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      type VARCHAR(50) CHECK (type IN ('mcq', 'descriptive')),
      options JSONB,
      answer TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
    `
  );
};
