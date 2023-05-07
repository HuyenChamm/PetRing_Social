const express = require('express');
const router = express.Router();
const pet = require('../controllers/pet')


router.route('/:id').get(pet.getPet)


module.exports = router;