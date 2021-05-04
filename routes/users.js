var express = require("express");
var router = express.Router();
const {
  asyncHandler,
  csrfProtection,
  comparePassword,
  hashPassword,
} = require("./utils");
const { User } = require("../db/models");
const { loginUser, logoutUser } = require("../auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/new",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const loggedIn = res.locals.authenticated;
    res.render("create-user", { csrfToken: req.csrfToken(), loggedIn });
  })
);

router.post(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // check for no match
    if (password !== confirmPassword) {
      // no match
      res.render("create-user", {
        csrfToken: req.csrfToken(),
        error: "Passwords don't match",
        username,
        email,
      });
    } // the passwords match
    else {
      // hash the password
      const hashedPass = await hashPassword(password);
      // bring in the user from the db schema
      const newUser = await User.create({
        user_name: username,
        email,
        hashed_password: hashedPass,
      });
      loginUser(req, res, newUser);
      res.redirect("/");
      // insert the new user in the db
    }
  })
);

router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() });
  })
);

router.post(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    console.log(user.hashed_password);
    if (user) {
      const correctPassword = await comparePassword(
        password,
        user.hashed_password
      );
      if (correctPassword) {
        loginUser(req, res, user);
        res.redirect("/");
      }
    } else {
      res.render("login", {
        csrfToken: req.csrfToken(),
        error: "Login info incorrect",
      });
    }
  })
);

router.get("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

module.exports = router;
