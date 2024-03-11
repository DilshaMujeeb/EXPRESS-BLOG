var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
var verifyToken = require('../middleware/authentication')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', userController.createAccount)
router.post('/login', userController.login)
router.get('/users',userController.userList)
router.post('/createBlog',verifyToken,userController.createBlog)
router.get('/blogs', verifyToken, userController.getAllBlogs)
router.get('/:id', verifyToken, userController.getById)
router.put('/:id', verifyToken, userController.update)
router.delete('/:id',verifyToken,userController.delete)
module.exports = router;
