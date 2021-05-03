var express = require('express');
var router = express.Router();
const {requireAuth} = require('../auth')
/* GET home page. */
router.get('/', requireAuth, function(req, res, next) {

  res.render('index', { title: 'a/A Express Skeleton Home' });

});


module.exports = router;
