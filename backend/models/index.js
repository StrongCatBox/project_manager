const { sequelize, DataTypes } = require("./db.js");
const Project = require("./project.model.js");
const Task = require("./task.model.js");
const User = require("./user.model.js");

Project.hasMany(Task, { foreignKey: "id_project", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "id_project", as: "project" });

User.hasMany(Task, { foreignKey: "id_user", as: "tasks" });
Task.belongsTo(User, { foreignKey: "id_user", as: "user" });

module.exports = {
  sequelize,
  DataTypes,
  Project,
  Task,
  User,
};
