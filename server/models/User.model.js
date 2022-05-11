const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please add a name'],
		unique: true,
		maxlength: 128,
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		match: /@gmail.com/,
		lowercase: true,
		maxlength: 128,
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		maxlength: 128,
	}
}, {
	timestamps: true,
})


userSchema.statics.registerUser = async function(username, email, password) {
	try {
		if (!username || !email || !password) throw ({
			error: 'Add all fields'
		});

		const userExists = await this.findOne({
			email
		})

		if (userExists) throw ({
			error: 'User with this email already exists'
		});

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = await this.create({
			username,
			email,
			password: hashedPassword
		});

		return {
			user,
			token: generateToken(user._id)
		};
	} catch (error) {
		throw error;
	}
}

userSchema.statics.loginUser = async function(email, password) {
	try {
		const user = await this.findOne({
			email
		})

		if (user && (await bcrypt.compare(password, user.password))) {
			return {
				user,
				token: generateToken(user._id)
			};
		} else throw {
			error: 'Invalid data'
		}
	} catch (error) {
		throw error;
	}
}

userSchema.statics.getUserById = async function(userId) {
	try {
		const user = await this.findOne({
			_id: userId
		});
		if (!user) throw ({
			error: 'No user with this id found'
		});
		return user;
	} catch (error) {
		throw error;
	}
}

userSchema.statics.getUsersByNames = async function(names) {
	try {

		return this.aggregate([{
			$match: {
				username: {
					$in: names
				}
			}
		}, {
			"$project": {
				password: 0,
				createdAt: 0,
				updatedAt: 0,
				__v: 0
			}
		}]);
	} catch (error) {
		throw error;
	}
}

userSchema.statics.getUsers = async function() {
	try {
		const users = await this.find();
		return users;
	} catch (error) {
		throw error;
	}
}

userSchema.statics.getUsersByIds = async function(ids) {
	try {

		return this.aggregate([{
			$match: {
				_id: {
					$in: ids
				}
			}
		}, {
			"$project": {
				password: 0,
				createdAt: 0,
				updatedAt: 0,
				__v: 0
			}
		}]);
	} catch (error) {
		throw error;
	}
}

userSchema.statics.deleteUserById = async function(userId) {
	try {
		const result = await this.remove({
			_id: userId
		});
		return result;
	} catch (error) {
		throw error;
	}
}

const generateToken = (id) => {
	return jwt.sign({
		id
	}, process.env.JWT_SECRET, {
		expiresIn: '1d',
	})
}

module.exports = mongoose.model('User', userSchema)
