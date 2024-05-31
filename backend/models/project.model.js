const { sequelize, DataTypes } = require("./db.js");
const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    },

    endDate: {
      type: DataTypes.DATE,
    },

    taskCount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    indexes: [],
  }
);

module.exports = Project;
