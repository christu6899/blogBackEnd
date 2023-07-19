const express = require("express");
const router = express.Router();
const blogCtrl = require("../controllers/blog-controller");

//blog routes
router.post("/", blogCtrl.blogPost);
router.get("/", blogCtrl.blogGetAll);
router.get("/:id", blogCtrl.blogGetById);
router.put("/:id", blogCtrl.blogEdit);
router.get("/user/:user_id", blogCtrl.blogGetAllByUser);
router.delete("/:blog_id", blogCtrl.blogDelete);
module.exports = router;
