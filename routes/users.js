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
      // bring in the user from the db schema
      // insert the new user in the db
      // hash the password
    }
  })
);

module.exports = router;
