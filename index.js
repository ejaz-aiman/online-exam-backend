import express from "express";
import cors from "cors";
import { initDb } from "./src/database/models/index.js";
import router from "./src/routes/index.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
const startServer = async () => {
  try {
    const { models, sequelize } = await initDb();
    globalThis.db = { models, sequelize };
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
};

startServer();
