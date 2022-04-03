const chatroomModel = require('../models/Chatroom.model.js');
const userModel = require('../models/User.model.js');
const messageModel = require('../models/Message.model.js');

module.exports = {
  createChatroom: async (req, res) => {
    try {
      const { name, creator, members } = req.body;
      members.push(creator);
      const chatroom = await chatroomModel.createChatroom(name, creator, members);
      return res.status(200).json({ success: true, chatroom });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  postMessage: async (req, res) => {
    try {
      const  roomId  = req.params.roomId;
      const message = req.body.messageText;
      const currentLoggedUser = req.params.userId;
      const post = await messageModel.createPostInChatRoom(roomId, currentLoggedUser, message); 
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getUserChatrooms: async (req, res) => {
    try {
      const currentLoggedUser = req.params.userId;
      const rooms = await chatroomModel.getChatRoomsByUserId(currentLoggedUser);
      return res.status(200).json({ success: true, userChatrooms: rooms });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getConversationByRoomId: async (req, res) => {
    try {
      const  roomId  = (req.params.roomId);
      const room = await chatroomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        };
      const users = await userModel.getUsersByIds(room.members);
      
      const conversation = await messageModel.getConversationByRoomId(roomId, options);
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
  joinChatroom: async (req, res) => {
    try {  
    
      const  roomId  = req.params.roomId;
      const  userId  = req.params.userId;
      const room = await chatroomModel.addUserToChatroom(roomId, userId);
      return res.status(200).json({ 
        success: true, 
        message: "User added to chatroom succesfully",
        room
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  leaveChatroom: async (req, res) => {
    try {  
    
      const  roomId  = req.params.roomId;
      const  userId  = req.params.userId;
      const room = await chatroomModel.deleteUserFromChatroom(roomId, userId);
      return res.status(200).json({ 
        success: true, 
        message: "User deleted from chatroom succesfully",
        room
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  deleteRoomById: async (req, res) => {
    try {  
      const { roomId } = req.params;
      const room = await chatroomModel.remove({ _id: roomId });
      const messages = await messageModel.remove({ chatroom: roomId })
      return res.status(200).json({ 
        success: true, 
        message: "Operation performed succesfully",
        deletedRoomsCount: room.deletedCount,
        deletedMessagesCount: messages.deletedCount,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  deleteMessageById: async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await messageModel.remove({ _id: messageId });
      return res.status(200).json({ 
        success: true, 
        deletedMessagesCount: message.deletedCount,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
}
