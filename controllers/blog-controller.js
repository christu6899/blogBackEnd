const Blog = require("../models/blog-model");
const validation = require("../config/validation");
const sequelize = require("../db_connection");
const User = require("../models/user-model");

const blogPost = async (req, res) => {
  console.log(req.body.title, req.body.content);
  const { error } = validation.blogValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await sequelize.sync({ force: false });
    const savedBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });
    res.status(200).send({
      msg: "success",
      savedObject: savedBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("blog not saved.");
  }
};

const blogGetById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id, author: req.user.id },
    });
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};

const blogGetAllByUser = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { author: req.params.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
};

const blogGetAll = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const blogDelete = async (req, res) => {
  try {
    await Blog.destroy({
      where: { id: req.params.blog_id, author: req.user.id },
    });
    res.status(200).send({ message: "delete success" });
  } catch (err) {
    console.log("err" + err);
    res.status(400).send({ message: err });
  }
};

const blogEdit = async (req, res) => {
  try {
    await Blog.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id, author: req.user.id } }
    );
    res.status(200).send({ message: "update successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "update fail" });
  }
};

module.exports = {
  blogPost,
  blogGetById,
  blogGetAll,
  blogGetAllByUser,
  blogDelete,
  blogEdit,
};
