import mongoose from 'mongoose'

const CharacterSchema = mongoose.Schema(
    {
        health: String,
        strength: String,
        rundor: { type: Number, min: 0, max: 125 }
    }, { timestamps: true }
)

const CharacterModel = mongoose.model('character', CharacterSchema)

export default CharacterModel