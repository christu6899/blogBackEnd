const { DataTypes } = require("sequelize");
const sequelize = require("../db_connection");
const bcrypt = require("bcrypt");
const Blog = require("./blog-model");

const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [6, 12],
      },
    },
    password: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        len: [2, 1024],
      },
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

Blog.belongsTo(User, { foreignKey: "author" });
User.hasMany(Blog, { foreignKey: "author" });

User.beforeSave(async (user) => {
  if (user.changed("password") || user.isNewRecord) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      console.log(hash);
      user.password = hash;
    } catch (err) {
      console.log(err);
    }
  }
});

User.prototype.comparePassword = async (password, user) => {
  try {
    const check = await bcrypt.compare(password, user.password);
    return check;
  } catch (err) {
    return err;
  }
};

module.exports = User;
