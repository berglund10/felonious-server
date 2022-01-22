import CharacterModel from "../models/Character.model.js"
import StatusCode from "../../config/StatusCode.js"
import UserController from "./User.controller.js"
import UserModel from "../models/User.model.js"

const createCharacterWithUserId = async (req, res) => {


    const user = await UserModel.findById(req.params.userId)


    const character = new CharacterModel({
        health: req.body.health,
        strength: req.body.strength,
    })

    user.character = character._id

    try {


        character.user = user.userId;

        await user.save()

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
    createCharacterWithUserId,
    getAllCharacters
}