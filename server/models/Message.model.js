const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	chatroom: {
		type: String,
		required: [true, 'Please add a chatroom'],
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Please add an creator'],
	},
	message: {
		type: String,
		required: [true, 'Please add a message'],
		maxlength: 128,
	},
}, {
	timestamps: true,
})

messageSchema.statics.createPostInChatRoom = async function (chatRoomId, postedByUser, messageText) {
  try {
    const post = await this.create({
			chatroom: chatRoomId,
            creator: postedByUser,
            message: messageText
		});

    return this.aggregate([
          { $match: { _id: post._id } },
          { $project : { chatroom:0, updatedAt:0, __v:0 } },
          {
            $lookup: {
              from: 'users',
              let: {'creator_id': '$creator'},
              pipeline: [
                { "$match": { "$expr": { "$eq": ["$_id", "$$creator_id"] }}},
                { "$project": { email:0, password:0, testArray:0, createdAt:0, updatedAt:0, __v:0 }}
              ],
              as: 'postedByUser',
            }
          },
        ]);
      } catch (error) {
        throw error;
      }
    }

messageSchema.statics.getConversationByRoomId = async function (chatRoomId, options = {}) {
  try {
        return this.aggregate([
              { $match: { chatroom: chatRoomId } },
              { $sort: { createdAt: 1 } },
              { $project : { updatedAt:0, __v:0 } },
              {
                $lookup: {
                  from: 'users',
                  let: {'creator_id': '$creator'},
                  pipeline: [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$creator_id"] }}},
                    { "$project": { email:0, password:0, testArray:0, createdAt:0, updatedAt:0, __v:0 }}
                  ],
                  as: 'postedByUser',
                }
              },
              { $skip: options.page * options.limit },
              //consider this option of sorting them 2 times and printing ONLY LAST 10 (maybe should be removed)
//              { $sort: { createdAt: -1 } },
//              { $limit: options.limit },
              { $sort: { createdAt: 1 } },
            ]);
  } catch (error) {
    throw error;
  }
}

module.exports = mongoose.model('Message', messageSchema);
