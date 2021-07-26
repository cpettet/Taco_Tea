const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { Comment, Sequelize } = require("../db/models");
const { requireAuth } = require("../auth");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  res.send("Hello from the comments");
});

/*
frontend:
 - click edit -> new page in /comments/:id

backend:
 - /comments/:id
    - shows edit functionality if author
        - req.auth.session.userId === comment.author_id
    - shows comment text if non-author
*/

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { content, post_id } = req.body;
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
