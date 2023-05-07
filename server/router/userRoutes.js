const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const login = require('../controllers/auth')


router.route('/login').get(login.auth)

router.route('/')
  .get(userController.getAllUser)
  .post(userController.addUser)

router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;