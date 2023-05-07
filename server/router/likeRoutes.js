const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');


router.route('/')
.get(likeController.getAllLike)
  
module.exports = router;