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

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const authorId = req.session.auth.userId;
    const content = req.body.content;
    try {
      const comment = await Comment.findByPk(commentId);
      if (comment.author_id === authorId) {
        await comment.update({
          content,
          updatedAt: new Date(),
        });
        res.json({ update: true, comment_id: comment.id });
      } else {
        res.json({ error: "Not your post", status: 403 });
      }
    } catch (error) {
      res.json({ error, status: 500 });
    }
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const authorId = req.session.auth.userId;
    try {
      const comment = await Comment.findByPk(commentId);
      if (comment.author_id === authorId) {
        await comment.destroy();
        res.json({ deleted: true, comment_id: comment.id });
      } else {
        res.json({ error: "Not your post", status: 403 });
      }
    } catch (error) {
      res.json({ error, status: 500 });
    }

  })
)

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
