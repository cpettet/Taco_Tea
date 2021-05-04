const express = require('express');

const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const { User, Post } = require('../db/models')
const { requireAuth} = require('../auth')

router.get('/', requireAuth, csrfProtection,
asyncHandler(async(req, res)=>{
    const currentUserId = req.session.auth.userId
    console.log(currentUserId)
    const posts = await Post.findAll( {where: {author_id: currentUserId}})
    res.json({status: 'Ok'})
}))

router.get('/new', requireAuth, csrfProtection,
asyncHandler(async(req, res)=>{
    res.render('create-post', {
        csrfToken: req.csrfToken()
    })
}))



module.exports = router;
