import CharacterController from "../controllers/Character.controller.js"

const routes = (app) => {

    app.post('/char/:userId', CharacterController.createCharacterWithUserId)
    app.get('/char', CharacterController.getAllCharacters)
    app.get('/char/:charId', CharacterController.getCharacterWithId)
    app.put('/char/:charId', CharacterController.updateCharacterRundor)

}

export default {
    routes
}