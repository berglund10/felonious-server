import UserModel from "../models/User.model.js"
import StatusCode from "../../config/StatusCode.js"
import CharacterModel from "../models/Character.model.js"


const createUser = async (req, res) => {

    const character = new CharacterModel({
        health: "0",
        strength: "0",
    })

    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        character: character._id,
    })

    character.user = user.userId;

    await character.save()

    console.log(character.health)


    try {

        const response = await user.save()
        res.status(StatusCode.CREATED).send(response)
        console.log(response.character)

    }
    catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }

}

const getAllUsers = async (req, res) => {
    try {
        const response = await UserModel.find()
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }

}

const getUserWithId = async (req, res) => {
    try {
        const response = await UserModel.findById(req.params.userId)
        res.status(StatusCode.OK).send(response)
    } catch (error)  {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Error when trying to get user with id: " + req.params.userId,
        error: error.message
    })
}
}

const getUserWithUsernameQuery = async (req, res) => {
    try {
        const response = await UserModel.find({
            username: req.query.username
        })
        response.length !==0 
        ? res.status(StatusCode.OK).send(response) 
        : res.status(StatusCode.NOT_FOUND).send({message: 'Could not find user with username: ' + req.query.username})
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Error when searching for: " + req.query.userId,
            error: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        if(!req.body) {return res.status(400).send({message: "Cannot update empty values"})}
        const response = await UserModel.findByIdAndUpdate(req.params.userId, {
            username: req.body.username,
            password: req.body.password
        }, {new: true}) // Är false by default
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte uppdaterda denna användaren:" + req.params.userId,
            error: error.message
        })

    }
}

const deleteUser = async (req, res) => {
    try {
        const response = await UserModel.findByIdAndDelete(req.params.userId)
        res.status(StatusCode.OK).send({
            message: "Du tog bort användare:" + response.username + " med id: " + req.params.userId
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte hitta någon med detta ID:" + req.params.userId,
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const response = await UserModel.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if(response.character === undefined) {
            console.log("har ingen char")
        }
        res.status(StatusCode.OK).send(response)

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte hitta denna användaren:" + req.params.userId,
            error: error.message
        })

    }
}

const checkUser = async (req, res) => {
    try {
        const response = await UserModel.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if(response.character === undefined) {
            return console.log("Du har ingen char")
        }
        res.status(StatusCode.OK).send(response.character)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Hittade ingen användare",
            error: error.message
        })
    }
}


export default {
    createUser,
    getAllUsers,
    getUserWithId,
    getUserWithUsernameQuery,
    updateUser,
    deleteUser,
    loginUser,
    checkUser
}