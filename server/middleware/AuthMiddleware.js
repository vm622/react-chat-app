const jwt = require('jsonwebtoken')
const User = require('../models/User.model.js')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user)
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({ success: false, error })
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token'})
  }
}

module.exports = { protect }
