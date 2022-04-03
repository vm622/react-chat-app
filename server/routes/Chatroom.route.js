const express = require('express');

const chatRoom = require('../controllers/Chatroom.controller.js');
const { protect } = require('../middleware/AuthMiddleware')

const router = express.Router();

router.get('/:userId', protect, chatRoom.getUserChatrooms)
.get('/chat/:roomId', protect, chatRoom.getConversationByRoomId)
.post('/create', protect, chatRoom.createChatroom)
.post('/:roomId/:userId/message', protect, chatRoom.postMessage)
.put('/:roomId/join/:userId', protect, chatRoom.joinChatroom)
.put('/:roomId/leave/:userId', protect, chatRoom.leaveChatroom)
.delete('/:roomId', protect, chatRoom.deleteRoomById)
.delete('/message/:messageId', protect, chatRoom.deleteMessageById)

module.exports = router;
