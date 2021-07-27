const express = require("express");

const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { User, Post, Comment, Like, Sequelize } = require("../db/models");
const { requireAuth } = require("../auth");
const sequelize = require("sequelize");

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { emoji, post_id } = req.body;
    const author_id = req.session.auth.userId;
    //todos
    //insert emoji
    try {
      const newEmoji = await Like.create({
        emoji,
        post_id,
        user_id: author_id,
      });
      const user_id = author_id;
      const count = await Like.count({
        where: {
          emoji,
          user_id,
          post_id,
        },
      });
      res.json({
        emoji,
        count,
      });

      //select sum(emoji) from like where story_id = x
    } catch (error) {
      console.error(error);
    }
  })
);

module.exports = router;
