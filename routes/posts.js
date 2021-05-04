const express = require('express');

const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const { User, Post } = require('../db/models')
const { requireAuth} = require('../auth')

router.get('/', requireAuth, csrfProtection,
asyncHandler(async(req, res)=>{
    const currentUserId = req.session.auth.userId
    const posts = await Post.findAll( {where: {author_id: currentUserId}})
    res.json({status: 'Ok'})
}))

router.get('/new', requireAuth, csrfProtection,
asyncHandler(async(req, res)=>{
    res.render('create-post', {
        csrfToken: req.csrfToken()
    })
}));

router.post("/", requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const { title, postType, isComments, isEmojis, body, recipeId, tagLinksId, isVegetarian, isVegan, isGlutenFree } = req.body;
    const author_id = req.session.auth.userId;
}))



module.exports = router;
