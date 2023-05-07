const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');


router.route('/')
.get(commentController.getAllComment)
.post(commentController.addComment)
  
router.route('/:id')



module.exports = router;