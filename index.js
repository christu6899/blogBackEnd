require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const sequelize = require("./db_connection");
const cors = require("cors");
const passport = require("passport");
const app = express();
require("./config/passport")(passport);

const options = {
  swaggerDefinition: {
    // 這邊會是你的api文件網頁描述
    info: {
      title: "ec_web_demo API",
      version: "1.0.0",
      description: "Generate ec_web_demo API document with swagger",
    },
  },
  // 這邊會是你想要產生的api文件檔案，我是直接讓swagger去列出所有controllers
  apis: ["./controllers/*.js"],
};
const specs = swaggerJsdoc(options);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/user", userRoute);
app.use(
  "/api/blogs",
  passport.authenticate("jwt", { session: false }),
  blogRoute
);

app.get("/", (req, res) => {
  res.send("test");
});

(async () => {
  try {
    await app.listen(8080);
    console.log("server is running on port 8080");
  } catch (err) {
    console.log(err);
  }
})();
