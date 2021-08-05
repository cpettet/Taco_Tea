const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const {
  User,
  Post,
  Comment,
  Sequelize,
  Like,
  Recipe,
} = require("../db/models");
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
      recipeName,
      recipeBody,
      isVegetarian,
      isVegan,
      isGlutenFree,
    } = req.body;
    const author_id = req.session.auth.userId;
    const post = await Post.create({
      author_id,
      post_type: postType,
      title,
      body,
      likes: isEmojis,
      comments: isComments,
      recipe_id: recipeId,
      tag_links_id: tagLinksId,
    });
    if (postType === "recipe") {
      const recipe = await Recipe.create({
        name: recipeName,
        post_id: post.id,
        is_vegetarian: isVegetarian,
        is_vegan: isVegan,
        is_gluten_free: isGlutenFree,
        body: recipeBody,
      });
    }
    res.redirect("/");
  })
);

// GET /posts/:id
router.get(
  "/:id",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const emojiObj = {
      "👍": {
        symbol: "👍",
        count: 0,
      },
      "👎": {
        symbol: "👎",
        count: 0,
      },
      "🔥": {
        symbol: "🔥",
        count: 0,
      },
      "💩": {
        symbol: "💩",
        count: 0,
      },
      "💦": {
        symbol: "💦",
        count: 0,
      },
      "🌮": {
        symbol: "🌮",
        count: 0,
      },
      "🎉": {
        symbol: "🎉",
        count: 0,
      },
      "🤠": {
        symbol: "🤠",
        count: 0,
      },
    };

    const totalLikes = await Like.findAll({
      where: {
        post_id: postId,
      },
    });

    // loop over total likes
    // check the emoji type
    totalLikes.forEach((emoji) => {
      const emojiSymbol = emoji.dataValues.emoji;
      if (emojiObj[emojiSymbol] === undefined) {
        return;
      }
      emojiObj[emojiSymbol]["count"]++;
    });
    // array of dictionaries, ex. [{ '👎': 4 }]
    const userId = req.session.auth.userId;
    const post = await Post.findByPk(postId, {
      include: [{ model: Recipe }],
      nest: true,
    });

    if(post === null){
      return res.render('error', {
        message: "We're so sorry, this post does not exist"
      })
    }
    console.log("Here is the post:", post)
    // - grab all comments by post_id
    const comments = await Comment.findAll({
      where: {
        post_id: { [Op.eq]: postId },
      },
      include: [{ model: User }],
      order: [["updatedAt", "DESC"]],
    });
    //   - order by updatedAt, desc
    // - carried comments into the object for render
    res.render("edit-post", {
      post,
      userId,
      csrfToken: req.csrfToken(),
      comments,
      emojis: emojiObj,
    });
  })
);

// DELETE /posts/:id
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

// PUT /posts/:id
router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const {
      title,
      post_type,
      isComments,
      isEmojis,
      body,
      recipeId,
      tagLinksId,
      name,
      isVegetarian,
      isVegan,
      isGlutenFree,
      recipe_body,
    } = req.body;
    const author_id = req.session.auth.userId;
    const post = await Post.findByPk(req.params.id);
    if (post_type === "recipe") {
      try {
        const recipe = await Recipe.findOne({
          where: {
            post_id: {
              [Op.eq]: post.id,
            },
          },
        });
        if (recipe) {
          await recipe.update({
            name,
            is_vegetarian: isVegetarian,
            is_vegan: isVegan,
            is_gluten_free: isGlutenFree,
            body: recipe_body,
          });
        } else {
          await Recipe.create({
            name,
            post_id: post.id,
            is_vegetarian: isVegetarian,
            is_vegan: isVegan,
            is_gluten_free: isGlutenFree,
            body: recipe_body,
          });
        }
      } catch (error) {
        res.json({error, status: 500});
      }
    }
    await post.update({
      author_id,
      post_type,
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

router.get('/*', function(req, res){
  res.render('error', {message:"404, this page does not exist!"});
});

module.exports = router;
