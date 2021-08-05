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
      try {
        const newUser = await User.create({
          user_name: username,
          email,
          hashed_password: hashedPass,
        });
        loginUser(req, res, newUser);
        res.redirect("/");
        // insert the new user in the db
      } catch (error) {
        res.render("create-user", {
          csrfToken: req.csrfToken(),
          error:
            "Woops there is an error. It appears that you used an email or username that is in our database. Can you try a new email or username",
          username,
          email,
        });
      }
    }
  })
);

router.get(
  "/demo",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const demoUser = await User.findByPk(2);
    loginUser(req, res, demoUser);
    res.json({ status: "ok" });
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
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
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
        error: "Email or password is incorrect",
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
