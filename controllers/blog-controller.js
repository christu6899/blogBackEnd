const Blog = require("../models/blog-model");
const validation = require("../config/validation");
const sequelize = require("../db_connection");
const User = require("../models/user-model");

//新增blog
const blogPost = async (req, res) => {
  // check the validation of data
  const { error } = validation.blogValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
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

//get blog by blog id
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

//return blog by user id
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

//return all blogs
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

//delete blog with id
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

//update blog content
const blogEdit = async (req, res) => {
  // check the validation of data
  const { error } = validation.blogValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
