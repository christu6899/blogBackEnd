require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const sequelize = require("./db_connection");
const cors = require("cors");
const passport = require("passport");
const app = express();
require("./config/passport")(passport);

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
