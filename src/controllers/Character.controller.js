import CharacterModel from "../models/Character.model.js"
import StatusCode from "../../config/StatusCode.js"

const createCharacter = async (req, res) => {

    const character = new CharacterModel({
        health: req.body.health,
        strength: req.body.strength
    })

    try {

        const response = await character.save()
        res.status(StatusCode.CREATED).send(response)

    }
    catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }

}

const getAllCharacters = async (req, res) => {
    try {
        const response = await CharacterModel.find()
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }

}

export default {
    createCharacter,
    getAllCharacters
}