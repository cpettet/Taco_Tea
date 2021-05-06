const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { Comment, Sequelize } = require("../db/models");
const { requireAuth } = require("../auth");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  res.send("Hello from the comments");
});

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log(`did this run`);
    const { content, post_id } = req.body;
    console.log(content, post_id);
    console.log(typeof post_id);
    const author_id = req.session.auth.userId;
    try {
      const comment = await Comment.create({
        author_id,
        content,
        post_id,
      });
      res.json({ status: "inserted", comment_id: comment.id });
    } catch (error) {
      res.json({
        error,
        status: 500,
      });
    }
  })
);



module.exports = router;
