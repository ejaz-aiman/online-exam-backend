export default (sequelize, DataTypes) => {
  const user_answers = sequelize.define(
    "user_answers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
        field: "question_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      answer: {
        type: DataTypes.TEXT,
      },
      fileUri: {
        type: DataTypes.STRING(300),
        field: "file_uri",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      tableName: "user_answers",
      timestamps: true,
    }
  );

  user_answers.associate = (models) => {
    user_answers.belongsTo(models.questions, {
      foreignKey: "question_id",
      as: "question",
    });
  };

  return user_answers;
};
