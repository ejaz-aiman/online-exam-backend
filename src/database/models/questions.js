export default (sequelize, DataTypes) => {
  const questions = sequelize.define(
    "questions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.STRING(50),
        validate: {
          isIn: [["mcq", "descriptive"]],
        },
      },
      options: {
        type: DataTypes.JSONB,
      },
      answer: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      tableName: "questions",
      timestamps: true,
    }
  );

  return questions;
};
