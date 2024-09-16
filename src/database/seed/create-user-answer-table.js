export const createUserAnswerTable = async (sequelize) => {
  return await sequelize.query(
    `
    CREATE TABLE IF NOT EXISTS user_answers (
        id SERIAL PRIMARY KEY,
        question_id INT NOT NULL,
        answer TEXT,
        file_uri VARCHAR(300),
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
      `
  );
};
