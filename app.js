const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const aboutRouter = require("./routes/about")
const splashRouter = require("./routes/splash")
const { restoreUser } = require("./auth");
const cors = require("cors");

const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: "superSecret", // individual user's session key
    store,
    saveUninitialized: false,
    resave: false,
    name: "taco_tea_session_auth.sid",
  })
);

app.use(restoreUser);
// create Session table if it doesn't already exist
store.sync();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);
app.use("/about", aboutRouter);
app.use("/splash", splashRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).render("error", {message:"404! This page does not exist!"})
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// routes


module.exports = app;
