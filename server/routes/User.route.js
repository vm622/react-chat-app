const express = require('express');

const user = require('../controllers/User.controller.js');
const { protect } = require('../middleware/AuthMiddleware.js')

const router = express.Router();

router.get('/', protect, user.getAllUsers)
.post('/register', user.registerUser)
.post('/login', user.loginUser)
.get('/:id', protect, user.getUserById)
.delete('/:id', protect, user.deleteUserById)

module.exports = router;
