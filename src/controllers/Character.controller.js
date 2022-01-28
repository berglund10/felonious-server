import StatusCode from "../../config/StatusCode.js"

const createCharacterWithUserId = async (req, res) => {


    const user = await UserModel.findById(req.params.userId)


    const character = new CharacterModel({
        health: req.body.health,
        strength: req.body.strength,
        rundor: 10
    })

    user.character = character._id

    try {

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

const getCharacterWithId = async (req, res) => {
    try {
        const response = await CharacterModel.findById(req.params.charId)
        res.status(StatusCode.OK).send(response)
    } catch (error)  {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Error when trying to get char with id: " + req.params.charId,
        error: error.message
    })
}
}

const updateCharacterRundor = async (req, res) => {
    try {
        const rundor = await CharacterModel.findById(req.params.charId)
        const response = await CharacterModel.findByIdAndUpdate(req.params.charId, {
            rundor: rundor.rundor + 25
        }, {new: true}) // Är false by default
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte uppdatera denna char:" + req.params.charId,
            error: error.message
        })

    }
}

const deleteChar = async (req, res) => {
    try {
        const response = await CharacterModel.findByIdAndDelete(req.params.charId)
        res.status(StatusCode.OK).send({
            message: "Du tog bort char:" + " med id: " + req.params.charId
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Kunde inte hitta någon med detta ID:" + req.params.charId,
            error: error.message
        })
    }
}

export default {
    createCharacterWithUserId,
    getAllCharacters,
    getCharacterWithId,
    updateCharacterRundor,
    deleteChar
}