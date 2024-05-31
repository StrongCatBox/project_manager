const { sequelize, DataTypes } = require("./db.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {}
);

module.exports = User;
