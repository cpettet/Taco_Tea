const express = require('express');
const { Post, sequelize} = require("../db/models");
const { asyncHandler } = require("./utils");


const router = express.Router();


router.get("/", asyncHandler(async(req, res, next) => {
    const posts = await Post.findAll({
        order: sequelize.random(), limit: 6
    });
    const date = posts.forEach((post) =>
     post.newDate = post.createdAt.toString().split(" ").splice(1,3).join(" "));

    const num = posts.forEach((post, i) =>{post.order = i+1})

    res.render("splash", {posts})
}))

module.exports = router;
