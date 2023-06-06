const { DataTypes } = require("sequelize");
const sequelize = require("../db_connection");
const Blog = sequelize.define(
  "blog",
  {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [6, 500],
      },
    },
    author: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Blog;
