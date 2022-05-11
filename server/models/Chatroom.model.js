const mongoose = require('mongoose');

const chatroomSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
		maxlength: 128,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Please add a creator'],
	},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
}, {
	timestamps: true,
})



chatroomSchema.statics.getChatRoomsByUserId = async function (chatroomMemberId) {
  try {
    const rooms = await this.find({ members: { $all: [(chatroomMemberId)] } });
    return rooms;
  } catch (error) {
    throw error;
  }
}

chatroomSchema.statics.getChatRoomByRoomId = async function (chatroomId) {
  try {
    const room = await this.findOne({ _id: chatroomId });
    return room;
  } catch (error) {
    throw error;
  }
}

chatroomSchema.statics.createChatroom = async function(chatroomName, chatroomCreator, chatroomMembers) {
	try {
		const chatroom = await this.create({
			name: chatroomName, 
      creator: chatroomCreator , 
      members: chatroomMembers
		});
		return chatroom;
	} catch (error) {
		throw error;
	}
}

chatroomSchema.statics.addUserToChatroom = async function (chatroomId, userId) {
  try {

    this.findOneAndUpdate({ _id: chatroomId }, { $push: { members: userId  } }, (err, doc) => {
        if (err) {
            throw err;
        } 
        });
    const room = await this.findOne({ _id: chatroomId });
    return room;
  } catch (error) {
    throw error;
  }
}

chatroomSchema.statics.deleteUserFromChatroom = async function (chatroomId, userId) {
  try {

    this.findOneAndUpdate({ _id: chatroomId }, { $pull: { members: userId  } }, (err, doc) => {
        if (err) {
            throw er;
        } 
        });
    const room = await this.findOne({ _id: chatroomId });
    return room;
  } catch (error) {
    throw error;
  }
}

module.exports = mongoose.model('Chatroom', chatroomSchema)
