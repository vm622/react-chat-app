const express = require('express');

const chatRoom = require('../controllers/Chatroom.controller.js');
const { protect } = require('../middleware/AuthMiddleware')

const router = express.Router();

router.get('/', protect, chatRoom.getUserChatrooms)
.get('/chat/:roomId', protect, chatRoom.getConversationByRoomId)
.post('/create', protect, chatRoom.createChatroom)
.post('/message/:roomId', protect, chatRoom.postMessage)
.put('/join/:roomId/:userId', protect, chatRoom.joinChatroom)
.put('/leave/:roomId/:userId', protect, chatRoom.leaveChatroom)
.delete('/:roomId', protect, chatRoom.deleteRoomById)
.delete('/message/:messageId', protect, chatRoom.deleteMessageById)

module.exports = router;
