var express = require("express");
var router = express.Router();
const {
  asyncHandler,
  csrfProtection,
  comparePassword,
  hashPassword,
} = require("./utils");
const { User } = require("../db/models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/new",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("create-user", { csrfToken: req.csrfToken() });
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
      const hashedPass = await hashPassword(password)
      // bring in the user from the db schema
      await User.create({
        user_name: username,
        email,
        hashed_password: hashedPass
      });
      res.redirect('/');
      // insert the new user in the db
    }
  })
);

router.get("/login", csrfProtection, asyncHandler(async (req, res,) => {
  res.render("login", { csrfToken: req.csrfToken() });
}));

router.post(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const correctPassword = await comparePassword(password, user.hashed_password);
      if (correctPassword) {
        res.redirect("/");
      }
    } else {

    }
  })
);

module.exports = router;
