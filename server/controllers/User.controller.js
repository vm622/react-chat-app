const userModel = require('../models/User.model.js');

/*TODO: add {login, register, auth, token, jwt} */

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await userModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await userModel.registerUser(username, email, password);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password} = req.body;
      const user = await userModel.loginUser(email, password);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const user = await userModel.deleteUserById(req.params.id);
      return res.status(200).json({ 
        success: true, 
        message: `Deleted a count of ${user.deletedCount} user.` 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
}
