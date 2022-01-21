import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        character: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'character'
        },

    }, { timestamps: true }
)

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
