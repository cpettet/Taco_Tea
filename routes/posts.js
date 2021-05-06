const express = require("express");

const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { User, Post, Comment, Sequelize } = require("../db/models");
const { requireAuth } = require("../auth");
const Op = Sequelize.Op;

router.get(
  "/",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const currentUserId = req.session.auth.userId;
    const posts = await Post.findAll({ where: { author_id: currentUserId } });
    res.json({ status: "Ok" });
  })
);

router.get(
  "/new",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("create-post", {
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const {
      title,
      postType,
      isComments,
      isEmojis,
      body,
      recipeId,
      tagLinksId,
      isVegetarian,
      isVegan,
      isGlutenFree,
    } = req.body;
    const author_id = req.session.auth.userId;
    await Post.create({
      author_id,
      post_type: postType,
      title,
      body,
      likes: isEmojis,
      comments: isComments,
      recipe_id: recipeId,
      tag_links_id: tagLinksId,
    });
    res.redirect("/");
  })
);

router.get(
  "/:id",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const emojiCodes = [
      "1F44D", // thumbs-up
      "1F44E", // thumbs-down
      "1F525", // fire
      "1F4A9", // poop
      "1F4A6", // water
      "1F32E", // taco
      "1F389", // confetti
      "1F920", // sombrero
    ];
    // const realEmojis = ["👍", "👎", "🔥", "💩", "💦", "🌮", "🎉", "🤠"];
    const userId = req.session.auth.userId;
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    // - grab all comments by post_id
    const comments = await Comment.findAll({
      where: {
        post_id: { [Op.eq]: postId }
      },
      include: [{model: User}],
      order: [['updatedAt', 'DESC']]
    });
    const emojis = emojiCodes.map((code) => {
      return String.fromCodePoint(parseInt(code, 16));
    })
    //   - order by updatedAt, desc
    // - carried comments into the object for render
    res.render("edit-post", { post, userId, csrfToken: req.csrfToken(), comments, emojis });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    // Let's come back to this
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    await post.destroy();
    res.json({ delete: true, postId });
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const {
      title,
      postType,
      isComments,
      isEmojis,
      body,
      recipeId,
      tagLinksId,
      isVegetarian,
      isVegan,
      isGlutenFree,
    } = req.body;
    console.log(`here come da logs`);
    console.log(isComments);
    console.log(isEmojis);
    const author_id = req.session.auth.userId;
    const post = await Post.findByPk(req.params.id);
    await post.update({
      author_id,
      post_type: postType,
      title,
      body,
      likes: isEmojis,
      comments: isComments,
      recipe_id: recipeId,
      tag_links_id: tagLinksId,
    });
    res.json({ update: true, post_id: post.id });
  })
);

module.exports = router;
