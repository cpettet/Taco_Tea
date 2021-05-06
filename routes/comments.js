const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { Comment, Sequelize } = require("../db/models");
const { requireAuth } = require("../auth");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
    res.send("Hello from the comments")
})

// router.post("/", requireAuth, csrfProtection, asyncHandler(async (req, res) => {
//     const { comment }
//     { author_id, post_id, content: comment }
// }));

module.exports = router;