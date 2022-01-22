import mongoose from 'mongoose'

const CharacterSchema = mongoose.Schema(
    {
        health: String,
        strength: String,
    }, { timestamps: true }
)

const CharacterModel = mongoose.model('character', CharacterSchema)

export default CharacterModel