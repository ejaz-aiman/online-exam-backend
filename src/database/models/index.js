import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createTables } from "../seed/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: parseInt(DB_PORT, 10),
  logging: true,
});

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established. Starting seeds...");
    await createTables(sequelize);
    console.log("Database seed complete");

    const models = {};
    const modelsDir = path.join(__dirname);

    const files = fs
      .readdirSync(modelsDir)
      .filter(
        (file) =>
          file.indexOf(".") !== 0 &&
          file !== "index.js" &&
          file.slice(-3) === ".js"
      );

    for (const file of files) {
      const modelPath = path.join(modelsDir, file);
      const { default: modelDefinition } = await import(modelPath);

      if (modelDefinition) {
        const modelName = file.split(".")[0];
        models[modelName] = modelDefinition(sequelize, Sequelize.DataTypes);
      } else {
        console.log(`Model in file ${file} is not defined properly.`);
      }
    }

    Object.keys(models).forEach((modelName) => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });

    return { models, sequelize };
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    throw error;
  }
};
