const express = require("express");
const router = express.Router();
const blogServices = require("../services/blog-services");

//blog routes
router.post("/", blogServices.blogPost);
router.get("/", blogServices.blogGetAll);
router.get("/:id", blogServices.blogGetById);
router.put("/:id", blogServices.blogEdit);
router.get("/user/:user_id", blogServices.blogGetAllByUser);
router.delete("/:blog_id", blogServices.blogDelete);
module.exports = router;
