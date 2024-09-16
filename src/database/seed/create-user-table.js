export const createUserTable = async (sequelize) => {
  return await sequelize.query(
    `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type VARCHAR(50) CHECK (type IN ('examiner', 'examinee')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
      `
  );
};
