var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/new", csrfProtection, asyncHandler(async(req, res) => {
  res.render("create-user", { csrfToken: req.csrfToken() });
}));

module.exports = router;
