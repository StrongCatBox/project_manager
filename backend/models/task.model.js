const { sequelize, DataTypes } = require("./db.js");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },

    id_user: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },

    date: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  },
  {}
);

module.exports = Task;
